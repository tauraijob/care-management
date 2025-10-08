import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event) || ''
        const user = await getUserFromToken(token)
        if (!user || user.role !== 'CARER') throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

        const body = await readBody(event)
        const { id, title, type, date, startTime, endTime, location, description } = body
        if (!id) throw createError({ statusCode: 400, statusMessage: 'Event id is required' })

        const prisma = await getPrisma()
        const booking = await prisma.booking.findUnique({ where: { id } })
        if (!booking || booking.carerId !== user.id) throw createError({ statusCode: 404, statusMessage: 'Event not found' })

        // Basic validations
        if (date) {
            const d = new Date(date)
            if (isNaN(d.getTime())) throw createError({ statusCode: 400, statusMessage: 'Invalid date' })
        }
        if (startTime && endTime && startTime >= endTime) {
            throw createError({ statusCode: 400, statusMessage: 'End time must be after start time' })
        }

        const updated = await prisma.booking.update({
            where: { id },
            data: {
                startDate: date ? new Date(date) : booking.startDate,
                endDate: date ? new Date(date) : booking.endDate,
                startTime: startTime ?? booking.startTime,
                endTime: endTime ?? booking.endTime,
                location: typeof location !== 'undefined' ? location : booking.location,
                notes: typeof description !== 'undefined' ? `Carer Event: ${title || booking.notes || ''} - ${description}` : booking.notes
            },
            select: { id: true }
        })

        return { success: true, data: { id: updated.id } }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer event update error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


