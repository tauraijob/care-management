import { getPrisma } from '~/server/utils/prisma'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const me = await getUserFromToken(token)
        if (!me || me.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

        const prisma = await getPrisma()
        const q = getQuery(event)
        const page = parseInt((q.page as string) || '1')
        const limit = parseInt((q.limit as string) || '20')
        const skip = (page - 1) * limit

        const [bookings, total, pending, confirmed, completed, cancelled] = await Promise.all([
            prisma.booking.findMany({
                include: {
                    patient: { select: { id: true, firstName: true, lastName: true, dateOfBirth: true } },
                    client: { select: { id: true, firstName: true, lastName: true, phone: true, email: true } },
                    carer: { select: { id: true, firstName: true, lastName: true, phone: true, email: true } },
                    payments: { select: { id: true, amount: true, currency: true, status: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma.booking.count(),
            prisma.booking.count({ where: { status: 'PENDING' } }),
            prisma.booking.count({ where: { status: 'CONFIRMED' } }),
            prisma.booking.count({ where: { status: 'COMPLETED' } }),
            prisma.booking.count({ where: { status: 'CANCELLED' } }),
        ])

        const mapped = bookings.map((b: any) => ({
            id: b.id,
            status: b.status,
            startDate: b.startDate,
            endDate: b.endDate,
            careType: b.careType,
            frequency: b.frequency,
            notes: b.notes,
            createdAt: b.createdAt,
            patient: b.patient && { id: b.patient.id, name: `${b.patient.firstName} ${b.patient.lastName}`.trim(), dateOfBirth: b.patient.dateOfBirth },
            client: b.client && { id: b.client.id, name: `${b.client.firstName} ${b.client.lastName}`.trim(), phone: b.client.phone, email: b.client.email },
            carer: b.carer ? { id: b.carer.id, name: `${b.carer.firstName} ${b.carer.lastName}`.trim(), phone: b.carer.phone, email: b.carer.email } : null,
            // Provide a singular payment object for UI convenience
            payment: {
                amount: (b.payments || []).reduce((s: number, p: any) => s + (p.amount || 0), 0),
                currency: (b.payments?.[0]?.currency) || 'USD',
                status: (b.payments?.find((p: any) => p.status) || {}).status || 'N/A',
            },
        }))

        return {
            success: true,
            data: {
                bookings: mapped,
                pagination: { page, limit, total, pages: Math.ceil(total / limit) },
                statistics: { pending, confirmed, completed, cancelled },
            },
        }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Admin bookings list error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


