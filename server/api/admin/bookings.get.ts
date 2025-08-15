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

        if (!user || user.role !== 'ADMIN') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Admin access required'
            })
        }

        // Get query parameters for filtering
        const query = getQuery(event)
        const status = query.status as string
        const page = parseInt(query.page as string) || 1
        const limit = parseInt(query.limit as string) || 20
        const search = query.search as string

        // Build where clause
        const where: any = {}

        if (status && status !== 'all') {
            where.status = status.toUpperCase()
        }

        if (search) {
            where.OR = [
                {
                    patient: {
                        OR: [
                            { firstName: { contains: search, mode: 'insensitive' } },
                            { lastName: { contains: search, mode: 'insensitive' } }
                        ]
                    }
                },
                {
                    client: {
                        OR: [
                            { firstName: { contains: search, mode: 'insensitive' } },
                            { lastName: { contains: search, mode: 'insensitive' } }
                        ]
                    }
                },
                {
                    carer: {
                        OR: [
                            { firstName: { contains: search, mode: 'insensitive' } },
                            { lastName: { contains: search, mode: 'insensitive' } }
                        ]
                    }
                }
            ]
        }

        // Calculate pagination
        const skip = (page - 1) * limit

        // Fetch bookings with related data
        const [bookings, totalCount, stats] = await Promise.all([
            prisma.booking.findMany({
                where,
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
                    },
                    payments: {
                        select: {
                            id: true,
                            amount: true,
                            currency: true,
                            status: true,
                            paymentMethod: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),

            prisma.booking.count({ where }),

            // Get overall booking statistics (not filtered)
            prisma.booking.groupBy({
                by: ['status'],
                _count: { status: true }
            })
        ])

        // Format the response
        const formattedBookings = bookings.map(booking => ({
            id: booking.id,
            patient: {
                id: booking.patient.id,
                name: `${booking.patient.firstName} ${booking.patient.lastName}`,
                dateOfBirth: booking.patient.dateOfBirth
            },
            client: {
                id: booking.client.id,
                name: `${booking.client.firstName} ${booking.client.lastName}`,
                phone: booking.client.phone,
                email: booking.client.email
            },
            carer: booking.carer ? {
                id: booking.carer.id,
                name: `${booking.carer.firstName} ${booking.carer.lastName}`,
                phone: booking.carer.phone,
                email: booking.carer.email
            } : null,
            careType: booking.careType,
            frequency: booking.frequency,
            startDate: booking.startDate,
            endDate: booking.endDate,
            status: booking.status,
            notes: booking.notes,
            payment: booking.payments.length > 0 ? {
                id: booking.payments[0].id,
                amount: booking.payments[0].amount,
                currency: booking.payments[0].currency,
                status: booking.payments[0].status,
                method: booking.payments[0].paymentMethod
            } : null,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }))

        // Calculate statistics
        const bookingStats = stats.reduce((acc, stat) => {
            // Handle different status formats
            const statusKey = stat.status.toLowerCase().replace('_', '-')
            acc[statusKey] = stat._count.status
            return acc
        }, {} as any)

        return {
            success: true,
            data: {
                bookings: formattedBookings,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                },
                statistics: bookingStats
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin bookings error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 