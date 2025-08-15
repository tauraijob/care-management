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

        // Get current date and date 30 days ago
        const now = new Date()
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

        // Fetch all statistics
        const [
            totalUsers,
            totalPatients,
            totalBookings,
            totalPayments,
            recentBookings,
            recentPayments,
            userStats,
            bookingStats,
            paymentStats,
            topCarers,
            revenueStats,
            todayBookings,
            todayRevenue,
            monthlyRevenue
        ] = await Promise.all([
            // Total counts
            prisma.user.count(),
            prisma.patient.count(),
            prisma.booking.count(),
            prisma.payment.count(),

            // Recent bookings (last 10)
            prisma.booking.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: {
                    patient: {
                        select: { firstName: true, lastName: true }
                    },
                    client: {
                        select: { firstName: true, lastName: true, email: true }
                    },
                    carer: {
                        select: { firstName: true, lastName: true }
                    }
                }
            }),

            // Recent payments (last 10)
            prisma.payment.findMany({
                take: 10,
                orderBy: { createdAt: 'desc' },
                include: {
                    booking: {
                        include: {
                            patient: {
                                select: { firstName: true, lastName: true }
                            },
                            client: {
                                select: { firstName: true, lastName: true }
                            }
                        }
                    }
                }
            }),

            // User statistics by role
            prisma.user.groupBy({
                by: ['role'],
                _count: { role: true }
            }),

            // Booking statistics by status
            prisma.booking.groupBy({
                by: ['status'],
                _count: { status: true }
            }),

            // Payment statistics by status
            prisma.payment.groupBy({
                by: ['status'],
                _count: { status: true },
                _sum: { amount: true }
            }),

            // Top carers by booking count
            prisma.user.findMany({
                where: { role: 'CARER' },
                include: {
                    _count: {
                        select: { carerBookings: true }
                    }
                },
                orderBy: {
                    carerBookings: { _count: 'desc' }
                },
                take: 10
            }),

            // Revenue statistics (last 30 days)
            prisma.payment.aggregate({
                where: {
                    createdAt: { gte: thirtyDaysAgo },
                    status: 'COMPLETED'
                },
                _sum: { amount: true },
                _count: true
            }),

            // Today's bookings
            prisma.booking.count({
                where: {
                    startDate: {
                        gte: today,
                        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            }),

            // Today's revenue
            prisma.payment.aggregate({
                where: {
                    createdAt: {
                        gte: today,
                        lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    },
                    status: 'COMPLETED'
                },
                _sum: { amount: true }
            }),

            // Monthly revenue trend (last 6 months)
            prisma.payment.groupBy({
                by: ['createdAt'],
                where: {
                    createdAt: { gte: new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000) },
                    status: 'COMPLETED'
                },
                _sum: { amount: true }
            })
        ])

        // Format the data
        const dashboardData = {
            overview: {
                totalUsers,
                totalPatients,
                totalBookings,
                totalPayments,
                totalRevenue: revenueStats._sum.amount || 0,
                monthlyRevenue: revenueStats._sum.amount || 0,
                todayBookings,
                todayRevenue: todayRevenue._sum.amount || 0
            },
            recentActivity: {
                bookings: recentBookings.map(booking => ({
                    id: booking.id,
                    patient: `${booking.patient.firstName} ${booking.patient.lastName}`,
                    client: `${booking.client.firstName} ${booking.client.lastName}`,
                    carer: booking.carer ? `${booking.carer.firstName} ${booking.carer.lastName}` : 'Unassigned',
                    status: booking.status,
                    startDate: booking.startDate,
                    createdAt: booking.createdAt
                })),
                payments: recentPayments.map(payment => ({
                    id: payment.id,
                    amount: payment.amount,
                    currency: 'USD', // Always USD
                    status: payment.status,
                    method: payment.paymentMethod,
                    patient: `${payment.booking.patient.firstName} ${payment.booking.patient.lastName}`,
                    client: `${payment.booking.client.firstName} ${payment.booking.client.lastName}`,
                    createdAt: payment.createdAt
                }))
            },
            statistics: {
                users: userStats.reduce((acc, stat) => {
                    acc[stat.role.toLowerCase()] = stat._count.role
                    return acc
                }, {} as any),
                bookings: bookingStats.reduce((acc, stat) => {
                    acc[stat.status.toLowerCase()] = stat._count.status
                    return acc
                }, {} as any),
                payments: paymentStats.reduce((acc, stat) => {
                    acc[stat.status.toLowerCase()] = {
                        count: stat._count.status,
                        amount: stat._sum.amount || 0
                    }
                    return acc
                }, {} as any)
            },
            topCarers: topCarers.map(carer => ({
                id: carer.id,
                name: `${carer.firstName} ${carer.lastName}`,
                email: carer.email,
                bookingCount: carer._count.carerBookings
            })),
            revenueTrend: monthlyRevenue.map(item => ({
                date: item.createdAt,
                revenue: item._sum.amount || 0
            }))
        }

        return {
            success: true,
            data: dashboardData
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin dashboard error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})