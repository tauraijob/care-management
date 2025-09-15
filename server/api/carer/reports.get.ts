import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token as string)

        if (!user || user.role !== 'CARER') {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const prisma = await getPrisma()

        const query = getQuery(event) as { days?: string }
        const days = Math.max(1, Math.min(parseInt(query.days || '30', 10) || 30, 365))

        const now = new Date()
        const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

        // Fetch core data
        const [bookings, payments, logs] = await Promise.all([
            prisma.booking.findMany({
                where: { carerId: user.id, startDate: { gte: start } },
                include: {
                    patient: { select: { firstName: true, lastName: true, dateOfBirth: true } },
                    client: { select: { firstName: true, lastName: true, phone: true } },
                    payments: true,
                },
                orderBy: { startDate: 'desc' }
            }),
            prisma.payment.findMany({
                where: {
                    status: 'COMPLETED',
                    createdAt: { gte: start },
                    booking: { carerId: user.id }
                }
            }),
            prisma.log.findMany({
                where: { carerId: user.id, createdAt: { gte: start } },
                include: {
                    booking: {
                        include: { patient: { select: { firstName: true, lastName: true, dateOfBirth: true } } }
                    }
                },
                orderBy: { createdAt: 'desc' },
                take: 100
            })
        ])

        // Total hours from logs (fallback 2 hours if missing times)
        const totalHours = logs.reduce((sum: number, log: any) => {
            if (log.visitStartTime && log.visitEndTime) {
                const dur = (log.visitEndTime.getTime() - log.visitStartTime.getTime()) / (1000 * 60 * 60)
                return sum + Math.max(0, Math.round(dur * 10) / 10)
            }
            return sum + 2
        }, 0)

        // Patients cared and active
        const patientIdSet = new Set<string>()
        let activePatients = 0
        for (const b of bookings) {
            patientIdSet.add(b.patientId)
            if (['CONFIRMED', 'IN_PROGRESS'].includes(b.status as any)) activePatients++
        }

        // Earnings
        const totalEarnings = payments.reduce((s: number, p: any) => s + (p.amount || 0), 0)

        // Recent activities from logs
        const recentActivities = logs.slice(0, 8).map((log: any) => {
            const patient = log.booking?.patient
            const name = patient ? `${patient.firstName} ${patient.lastName}` : 'patient'
            const hoursAgo = Math.max(0, Math.floor((now.getTime() - log.createdAt.getTime()) / (1000 * 60 * 60)))
            const time = hoursAgo === 0 ? 'Just now' : hoursAgo === 1 ? '1 hour ago' : `${hoursAgo} hours ago`
            const title = log.medicationGiven ? `Updated medication log for ${name}` : `Care session with ${name}`
            return {
                id: log.id,
                title,
                time,
                icon: log.medicationGiven ? 'mdi:pill' : 'mdi:account-heart',
                color: log.medicationGiven ? 'bg-blue-500' : 'bg-green-500'
            }
        })

        // Care logs table rows
        const careLogs = logs.slice(0, 25).map((log: any) => {
            const patient = log.booking?.patient
            const first = patient?.firstName || ''
            const last = patient?.lastName || ''
            const initials = `${first.charAt(0) || ''}${last.charAt(0) || ''}`.toUpperCase()
            const dob = patient?.dateOfBirth ? new Date(patient.dateOfBirth) : undefined
            const age = dob ? Math.floor((now.getTime() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0
            const date = log.createdAt.toISOString().split('T')[0]
            let duration = 2
            if (log.visitStartTime && log.visitEndTime) {
                duration = Math.max(0, Math.round(((log.visitEndTime.getTime() - log.visitStartTime.getTime()) / (1000 * 60 * 60)) * 10) / 10)
            }
            const services: string[] = []
            if (log.taskCompleted) services.push('Personal Care')
            if (log.medicationGiven) services.push('Medication')
            const bStatus = (log.booking as any)?.status as string | undefined
            const status = bStatus === 'COMPLETED' ? 'Completed' :
                bStatus === 'IN_PROGRESS' ? 'In Progress' :
                    bStatus === 'CANCELLED' ? 'Cancelled' :
                        (bStatus === 'ASSIGNED' || bStatus === 'CONFIRMED') ? 'Scheduled' : 'Pending'
            return {
                id: log.id,
                patientName: `${first} ${last}`.trim() || 'Unknown Patient',
                patientInitials: initials || 'NA',
                patientAge: age,
                date,
                duration: `${duration} hours`,
                services,
                status
            }
        })

        // Performance metrics (calculated from logs and bookings)
        const totalReviews = logs.length

        // On-time arrival: compare log.visitStartTime to booking.startTime (HH:MM) on same date, within 15 minutes
        const parseHHMM = (t?: string | null) => {
            if (!t) return null
            const [hh, mm] = t.split(':').map((v) => parseInt(v, 10))
            if (Number.isNaN(hh) || Number.isNaN(mm)) return null
            return { hh, mm }
        }

        let eligibleOnTime = 0
        let onTimeCount = 0
        for (const log of logs) {
            if (!log.visitStartTime) continue
            const b: any = log.booking
            const tm = parseHHMM(b?.startTime)
            if (!tm) continue
            eligibleOnTime++
            const scheduled = new Date(log.visitStartTime)
            scheduled.setHours(tm.hh, tm.mm, 0, 0)
            const diffMin = Math.abs((log.visitStartTime.getTime() - scheduled.getTime()) / 60000)
            if (diffMin <= 15) onTimeCount++
        }
        const onTimeArrival = eligibleOnTime === 0 ? 100 : Math.round((onTimeCount / eligibleOnTime) * 100)

        // Care plan adherence: proportion of logs with taskCompleted present
        const adherenceLogs = logs.filter((l: any) => !!l.taskCompleted).length
        const carePlanAdherence = logs.length === 0 ? 100 : Math.round((adherenceLogs / logs.length) * 100)

        // Documentation quality: notes present
        const docsGood = logs.filter((l: any) => (l.notes || '').toString().trim().length > 0).length
        const documentationQuality = logs.length === 0 ? 100 : Math.round((docsGood / logs.length) * 100)

        // Derive a 0-5 rating from adherence percentage for display (real-data-derived)
        const averageRating = Math.max(0, Math.min(5, Math.round(((carePlanAdherence / 20) * 10)) / 10))

        const performanceMetrics = [
            { name: 'Patient Satisfaction', description: 'Derived from adherence', value: `${averageRating.toFixed(1)}/5`, trend: 0 },
            { name: 'On-time Arrival', description: 'Percentage of on-time arrivals', value: `${onTimeArrival}%`, trend: 0 },
            { name: 'Care Plan Adherence', description: 'Following prescribed care plans', value: `${carePlanAdherence}%`, trend: 0 },
            { name: 'Documentation Quality', description: 'Quality of care documentation', value: `${documentationQuality}%`, trend: 0 }
        ]

        // Earnings breakdown by care type
        const careTypeToAmount = new Map<string, number>()
        for (const b of bookings as any[]) {
            const amt = (b.payments || []).filter((p: any) => p.status === 'COMPLETED').reduce((s: number, p: any) => s + (p.amount || 0), 0)
            const key = b.careType
            careTypeToAmount.set(key, (careTypeToAmount.get(key) || 0) + amt)
        }
        const totalBreakdown = Array.from(careTypeToAmount.values()).reduce((s, v) => s + v, 0) || 1
        const palette = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444']
        const earningsBreakdown = Array.from(careTypeToAmount.entries()).map(([careType, amount], idx) => ({
            category: careType.replace(/_/g, ' '),
            amount: Math.round(amount),
            percentage: Math.round((amount / totalBreakdown) * 100),
            color: palette[idx % palette.length]
        }))

        return {
            success: true,
            data: {
                totalHours: Math.round(totalHours),
                totalPatients: patientIdSet.size,
                activePatients,
                totalEarnings: Math.round(totalEarnings),
                averageRating: Math.round(averageRating * 10) / 10,
                totalReviews,
                recentActivities,
                careLogs,
                performanceMetrics,
                earningsBreakdown
            }
        }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer reports error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


