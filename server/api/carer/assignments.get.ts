import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token)

        if (!user || user.role !== 'CARER') {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const query = getQuery(event)
        const status = query.status as string
        const serviceType = query.serviceType as string
        const dateRange = query.dateRange as string

        // Build where clause for filtering
        let whereClause: any = {
            carerId: user.id
        }

        // Filter by status
        if (status && status !== 'all') {
            if (status === 'active') {
                whereClause.status = { in: ['PENDING', 'CONFIRMED'] }
            } else if (status === 'upcoming') {
                whereClause.startDate = { gte: new Date() }
                whereClause.status = { in: ['PENDING', 'CONFIRMED'] }
            } else if (status === 'completed') {
                whereClause.status = 'COMPLETED'
            }
        }

        // Filter by date range
        if (dateRange && dateRange !== 'all') {
            const now = new Date()
            let startDate = new Date()

            if (dateRange === 'today') {
                startDate.setHours(0, 0, 0, 0)
                whereClause.startDate = { gte: startDate }
            } else if (dateRange === 'week') {
                startDate.setDate(startDate.getDate() - 7)
                whereClause.startDate = { gte: startDate }
            } else if (dateRange === 'month') {
                startDate.setMonth(startDate.getMonth() - 1)
                whereClause.startDate = { gte: startDate }
            }
        }

        // Fetch bookings for this carer
        const prisma = await getPrisma()
        const bookings = await prisma.booking.findMany({
            where: whereClause,
            include: {
                client: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                patient: {
                    select: {
                        firstName: true,
                        lastName: true,
                        dateOfBirth: true
                    }
                }
            },
            orderBy: { startDate: 'asc' }
        })

        // Calculate statistics
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

        const [activeAssignments, upcomingAssignments, completedToday, totalHours] = await Promise.all([
            // Active assignments (pending or confirmed)
            prisma.booking.count({
                where: {
                    carerId: user.id,
                    status: { in: ['PENDING', 'CONFIRMED'] }
                }
            }),
            // Upcoming assignments (next 7 days)
            prisma.booking.count({
                where: {
                    carerId: user.id,
                    startDate: { gte: now },
                    status: { in: ['PENDING', 'CONFIRMED'] }
                }
            }),
            // Completed today
            prisma.booking.count({
                where: {
                    carerId: user.id,
                    status: 'COMPLETED',
                    startDate: { gte: today }
                }
            }),
            // Total hours this week (estimated)
            prisma.booking.count({
                where: {
                    carerId: user.id,
                    startDate: { gte: weekStart },
                    status: { in: ['PENDING', 'CONFIRMED', 'COMPLETED'] }
                }
            })
        ])

        // Map bookings to assignment format
        const assignments = bookings.map(booking => {
            const patientAge = booking.patient.dateOfBirth
                ? Math.floor((now.getTime() - new Date(booking.patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
                : 0

            const patientInitials = `${booking.patient.firstName.charAt(0)}${booking.patient.lastName.charAt(0)}`

            // Determine status
            let status = 'Upcoming'
            if (booking.status === 'COMPLETED') {
                status = 'Completed'
            } else if (booking.status === 'CONFIRMED' && booking.startDate <= now) {
                status = 'Active'
            }

            // Calculate duration (estimate 2 hours if no specific duration)
            const duration = 2 // Default duration

            // Format date and time
            const date = booking.startDate.toISOString().split('T')[0]
            const startTime = booking.startTime || '09:00'
            const endTime = booking.endTime || '11:00'
            const time = `${startTime} - ${endTime}`

            // Map care type to services
            const services = [booking.careType.replace('_', ' ')]

            return {
                id: booking.id,
                patientName: `${booking.patient.firstName} ${booking.patient.lastName}`,
                patientInitials,
                patientAge,
                location: booking.location || 'Client Location',
                title: `${booking.careType.replace('_', ' ')} Session`,
                duration,
                date,
                time,
                services,
                status,
                careType: booking.careType,
                notes: booking.notes
            }
        })

        // Get recent activities (from logs)
        const recentActivities = await prisma.log.findMany({
            where: {
                carerId: user.id
            },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                booking: true,
                carer: true
            }
        })

        const activities = recentActivities.map(log => {
            const timeAgo = Math.floor((now.getTime() - log.createdAt.getTime()) / (60 * 60 * 1000))
            let timeText = `${timeAgo} hours ago`
            if (timeAgo < 1) timeText = 'Just now'
            else if (timeAgo === 1) timeText = '1 hour ago'

            return {
                id: log.id,
                title: log.message,
                time: timeText,
                icon: 'mdi:file-document',
                color: 'bg-blue-500'
            }
        })

        return {
            success: true,
            data: {
                assignments,
                statistics: {
                    activeAssignments,
                    upcomingAssignments,
                    completedToday,
                    totalHours: totalHours * 2 // Estimate 2 hours per booking
                },
                activities
            }
        }

    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer assignments error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})

