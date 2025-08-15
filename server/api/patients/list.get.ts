import { prisma } from '~/server/utils/prisma'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'No token provided'
            })
        }

        const user = await getUserFromToken(token)

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid token'
            })
        }

        const query = getQuery(event)
        const { page = 1, limit = 10 } = query

        const skip = (Number(page) - 1) * Number(limit)

        let whereClause: any = {}

        // Filter by user role
        if (user.role === 'CLIENT') {
            whereClause.clientId = user.id
        } else if (user.role === 'CARER') {
            // Carers can see patients they have bookings for
            const carerBookings = await prisma.booking.findMany({
                where: { carerId: user.id },
                select: { patientId: true }
            })
            const patientIds = carerBookings.map(booking => booking.patientId)
            whereClause.id = { in: patientIds }
        }
        // ADMIN can see all patients

        const [patients, total] = await Promise.all([
            prisma.patient.findMany({
                where: whereClause,
                include: {
                    client: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true
                        }
                    },
                    bookings: {
                        select: {
                            id: true,
                            status: true,
                            startDate: true,
                            careType: true
                        },
                        orderBy: {
                            startDate: 'desc'
                        },
                        take: 5
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: Number(limit)
            }),
            prisma.patient.count({ where: whereClause })
        ])

        return {
            success: true,
            patients,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('List patients error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})