import { createError, defineEventHandler } from 'h3'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const me = await getUserFromToken(token)
        if (!me || me.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

        const { carerId, startDate, endDate } = getQuery(event)
        if (!carerId || typeof carerId !== 'string') {
            throw createError({ statusCode: 400, statusMessage: 'carerId is required' })
        }

        const start = startDate ? new Date(startDate as string) : new Date()
        const end = endDate ? new Date(endDate as string) : new Date(start.getTime() + 14 * 24 * 60 * 60 * 1000)

        const prisma = await getPrisma()
        const bookings = await prisma.booking.findMany({
            where: {
                carerId: carerId as string,
                startDate: { gte: start, lte: end },
            },
            include: {
                client: { select: { firstName: true, lastName: true } },
                patient: { select: { firstName: true, lastName: true } },
            },
            orderBy: { startDate: 'asc' }
        })

        const events = bookings.map((b: any) => ({
            id: b.id,
            title: `${b.patient?.firstName || ''} ${b.patient?.lastName || ''}`.trim(),
            clientName: `${b.client?.firstName || ''} ${b.client?.lastName || ''}`.trim(),
            patientName: `${b.patient?.firstName || ''} ${b.patient?.lastName || ''}`.trim(),
            careType: b.careType,
            status: b.status,
            date: b.startDate,
            startTime: b.startTime || null,
            endTime: b.endTime || null,
            location: b.location || null,
            notes: b.notes || ''
        }))

        return { success: true, data: { events } }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Admin carer schedule error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


