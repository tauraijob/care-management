import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token)
        if (!user || user.role !== 'CARER') {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        // Get query params for date range (optional)
        const query = getQuery(event)
        const startDate = query.startDate ? new Date(query.startDate as string) : new Date()
        const endDate = query.endDate ? new Date(query.endDate as string) : new Date(startDate.getTime() + 14 * 24 * 60 * 60 * 1000) // default 2 weeks

        // Fetch bookings for this carer
        const bookings = await prisma.booking.findMany({
            where: {
                carerId: user.id,
                startDate: { gte: startDate, lte: endDate }
            },
            select: {
                id: true,
                client: { select: { firstName: true, lastName: true } },
                careType: true,
                startDate: true,
                endDate: true,
                startTime: true,
                endTime: true,
                location: true,
                status: true,
                notes: true
            },
            orderBy: { startDate: 'asc' }
        })

        // Map bookings to event format
        const events = bookings.map(b => ({
            id: b.id,
            title: `${b.client?.firstName || ''} ${b.client?.lastName || ''} - ${b.careType}`.trim(),
            type: 'appointment',
            date: b.startDate.toISOString().split('T')[0],
            startTime: b.startTime || b.startDate.toTimeString().substring(0, 5),
            endTime: b.endTime || (b.endDate ? b.endDate.toTimeString().substring(0, 5) : '10:00'),
            location: b.location || 'Client Location',
            status: b.status,
            description: b.notes || ''
        }))

        return { success: true, data: { events } }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer schedule error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})
