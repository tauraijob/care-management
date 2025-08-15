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
                statusMessage: 'Unauthorized'
            })
        }

        const query = getQuery(event)
        const { page = 1, limit = 10, status, paymentMethod, dateRange } = query

        const skip = (Number(page) - 1) * Number(limit)

        // Build where clause based on user role and filters
        let whereClause: any = {}

        // Role-based filtering
        if (user.role === 'CLIENT') {
            // Clients see payments for their bookings
            whereClause.booking = { clientId: user.id }
        } else if (user.role === 'CARER') {
            // Carers see payments for their assigned bookings
            whereClause.booking = { carerId: user.id }
        }
        // Admins see all payments (no additional filtering)

        // Apply filters
        if (status) {
            whereClause.status = status
        }

        if (paymentMethod) {
            whereClause.paymentMethod = paymentMethod
        }

        if (dateRange) {
            const days = Number(dateRange)
            const startDate = new Date()
            startDate.setDate(startDate.getDate() - days)
            whereClause.createdAt = {
                gte: startDate
            }
        }

        const [payments, total] = await Promise.all([
            prisma.payment.findMany({
                where: whereClause,
                include: {
                    booking: {
                        include: {
                            patient: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true
                                }
                            },
                            client: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true
                                }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: Number(limit)
            }),
            prisma.payment.count({ where: whereClause })
        ])

        return {
            success: true,
            payments,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / Number(limit))
            }
        }
    } catch (error: any) {
        console.error('Error fetching payments:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})