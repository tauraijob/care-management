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
        const { status, page = 1, limit = 10 } = query

        const skip = (Number(page) - 1) * Number(limit)

        let whereClause: any = {}

        // Filter by user role
        if (user.role === 'CLIENT') {
            whereClause.clientId = user.id
        } else if (user.role === 'CARER') {
            whereClause.carerId = user.id
        }
        // ADMIN can see all bookings

        // Filter by status if provided
        if (status) {
            whereClause.status = status
        }

        const [bookings, total] = await Promise.all([
            prisma.booking.findMany({
                where: whereClause,
                include: {
                    patient: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            dateOfBirth: true
                        }
                    },
                    client: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true
                        }
                    },
                    carer: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true
                        }
                    },
                    payments: {
                        select: {
                            id: true,
                            amount: true,
                            currency: true,
                            status: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                },
                skip,
                take: Number(limit)
            }),
            prisma.booking.count({ where: whereClause })
        ])

        return {
            success: true,
            bookings,
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

        console.error('List bookings error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})