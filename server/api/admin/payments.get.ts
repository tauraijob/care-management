import { getPrisma } from '~/server/utils/prisma'
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

        if (!user || user.role !== 'ADMIN') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Admin access required'
            })
        }

        const prisma = await getPrisma()

        // Get query parameters for filtering
        const query = getQuery(event)
        const status = query.status as string
        const method = query.method as string
        const page = parseInt(query.page as string) || 1
        const limit = parseInt(query.limit as string) || 20
        const search = query.search as string
        const startDate = query.startDate as string
        const endDate = query.endDate as string

        // Build where clause
        const where: any = {}

        if (status && status !== 'all') {
            where.status = status.toUpperCase()
        }

        if (method && method !== 'all') {
            where.paymentMethod = method.toUpperCase()
        }

        if (search) {
            where.OR = [
                {
                    booking: {
                        patient: {
                            OR: [
                                { firstName: { contains: search, mode: 'insensitive' } },
                                { lastName: { contains: search, mode: 'insensitive' } }
                            ]
                        }
                    }
                },
                {
                    booking: {
                        client: {
                            OR: [
                                { firstName: { contains: search, mode: 'insensitive' } },
                                { lastName: { contains: search, mode: 'insensitive' } }
                            ]
                        }
                    }
                },
                { transactionId: { contains: search, mode: 'insensitive' } }
            ]
        }

        if (startDate && endDate) {
            where.createdAt = {
                gte: new Date(startDate),
                lte: new Date(endDate)
            }
        }

        // Calculate pagination
        const skip = (page - 1) * limit

        // Fetch payments with related data
        const [payments, totalCount, stats] = await Promise.all([
            prisma.payment.findMany({
                where,
                include: {
                    booking: {
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
                                    phone: true,
                                    email: true
                                }
                            },
                            carer: {
                                select: {
                                    id: true,
                                    firstName: true,
                                    lastName: true,
                                    phone: true,
                                    email: true
                                }
                            }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),

            prisma.payment.count({ where }),

            // Get payment statistics
            prisma.payment.groupBy({
                by: ['status'],
                _count: { status: true },
                _sum: { amount: true }
            })
        ])

        // Format the response
        const formattedPayments = payments.map(payment => ({
            id: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            status: payment.status,
            paymentMethod: payment.paymentMethod,
            transactionId: payment.transactionId,
            booking: {
                id: payment.booking.id,
                patient: {
                    id: payment.booking.patient.id,
                    name: `${payment.booking.patient.firstName} ${payment.booking.patient.lastName}`,
                    dateOfBirth: payment.booking.patient.dateOfBirth
                },
                client: {
                    id: payment.booking.client.id,
                    name: `${payment.booking.client.firstName} ${payment.booking.client.lastName}`,
                    phone: payment.booking.client.phone,
                    email: payment.booking.client.email
                },
                carer: payment.booking.carer ? {
                    id: payment.booking.carer.id,
                    name: `${payment.booking.carer.firstName} ${payment.booking.carer.lastName}`,
                    phone: payment.booking.carer.phone,
                    email: payment.booking.carer.email
                } : null,
                careType: payment.booking.careType,
                startDate: payment.booking.startDate
            },
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt
        }))

        // Calculate statistics
        const paymentStats = stats.reduce((acc, stat) => {
            acc[stat.status.toLowerCase()] = {
                count: stat._count.status,
                amount: stat._sum.amount || 0
            }
            return acc
        }, {} as any)

        // Calculate total revenue
        const totalRevenue = stats.reduce((sum, stat) => {
            return sum + (stat._sum.amount || 0)
        }, 0)

        return {
            success: true,
            data: {
                payments: formattedPayments,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                },
                statistics: paymentStats,
                totalRevenue
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin payments error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 