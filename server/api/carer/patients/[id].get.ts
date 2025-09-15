import { createError, getRouterParam } from 'h3'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token as string)
        if (!user || user.role !== 'CARER') {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const patientId = getRouterParam(event, 'id')
        if (!patientId) {
            throw createError({ statusCode: 400, statusMessage: 'Patient ID is required' })
        }

        const prisma = await getPrisma()

        // Ensure the carer has at least one booking with this patient
        const hasAccess = await prisma.booking.findFirst({
            where: { carerId: user.id, patientId },
            select: { id: true }
        })
        if (!hasAccess) {
            throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
        }

        const patient = await prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                client: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
                bookings: {
                    where: { carerId: user.id },
                    include: { payments: true },
                    orderBy: { startDate: 'desc' },
                },
                // Fetch last 50 logs related to this patient & carer
                // There is no direct relation from patient to logs, so query separately below if needed
            }
        })

        if (!patient) {
            throw createError({ statusCode: 404, statusMessage: 'Patient not found' })
        }

        // Optionally fetch logs for bookings of this patient and carer
        const bookingIds = patient.bookings.map((b: any) => b.id)
        const logs = bookingIds.length ? await prisma.log.findMany({
            where: { bookingId: { in: bookingIds }, carerId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 50
        }) : []

        return { success: true, patient, logs }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer patient details error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


