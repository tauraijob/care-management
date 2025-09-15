import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        // Authenticate user
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token)

        if (!user || user.role !== 'ADMIN') {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            })
        }

        // Initialize Prisma
        const prisma = await getPrisma()

        // Get current date and month start
        const now = new Date()
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

        // Fetch statistics in parallel
        const [
            totalReports,
            currentMonthReports,
            lastMonthReports,
            totalRevenue,
            currentMonthRevenue,
            lastMonthRevenue,
            totalClients,
            currentMonthClients,
            lastMonthClients,
            averageRating,
            currentMonthRating,
            lastMonthRating
        ] = await Promise.all([
            // Total reports
            prisma.report.count(),

            // Current month reports
            prisma.report.count({
                where: {
                    generatedAt: {
                        gte: currentMonthStart
                    }
                }
            }),

            // Last month reports
            prisma.report.count({
                where: {
                    generatedAt: {
                        gte: lastMonthStart,
                        lte: lastMonthEnd
                    }
                }
            }),

            // Total revenue
            prisma.payment.aggregate({
                where: {
                    status: 'COMPLETED'
                },
                _sum: {
                    amount: true
                }
            }),

            // Current month revenue
            prisma.payment.aggregate({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        gte: currentMonthStart
                    }
                },
                _sum: {
                    amount: true
                }
            }),

            // Last month revenue
            prisma.payment.aggregate({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        gte: lastMonthStart,
                        lte: lastMonthEnd
                    }
                },
                _sum: {
                    amount: true
                }
            }),

            // Total active clients (users with role CLIENT who have bookings)
            prisma.user.count({
                where: {
                    role: 'CLIENT',
                    bookings: {
                        some: {
                            status: {
                                in: ['CONFIRMED', 'IN_PROGRESS']
                            }
                        }
                    }
                }
            }),

            // Current month active clients
            prisma.user.count({
                where: {
                    role: 'CLIENT',
                    bookings: {
                        some: {
                            status: {
                                in: ['CONFIRMED', 'IN_PROGRESS']
                            },
                            createdAt: {
                                gte: currentMonthStart
                            }
                        }
                    }
                }
            }),

            // Last month active clients
            prisma.user.count({
                where: {
                    role: 'CLIENT',
                    bookings: {
                        some: {
                            status: {
                                in: ['CONFIRMED', 'IN_PROGRESS']
                            },
                            createdAt: {
                                gte: lastMonthStart,
                                lte: lastMonthEnd
                            }
                        }
                    }
                }
            }),

            // Average rating (from logs - simulated)
            prisma.log.count(),

            // Current month logs
            prisma.log.count({
                where: {
                    createdAt: {
                        gte: currentMonthStart
                    }
                }
            }),

            // Last month logs
            prisma.log.count({
                where: {
                    createdAt: {
                        gte: lastMonthStart,
                        lte: lastMonthEnd
                    }
                }
            })
        ])

        // Calculate statistics
        const stats = {
            totalReports: {
                count: totalReports,
                change: currentMonthReports - lastMonthReports,
                changeText: `${currentMonthReports - lastMonthReports >= 0 ? '+' : ''}${currentMonthReports - lastMonthReports} this month`
            },

            revenue: {
                amount: totalRevenue._sum.amount || 0,
                currentMonth: currentMonthRevenue._sum.amount || 0,
                lastMonth: lastMonthRevenue._sum.amount || 0,
                change: lastMonthRevenue._sum.amount ?
                    ((currentMonthRevenue._sum.amount || 0) - lastMonthRevenue._sum.amount) / lastMonthRevenue._sum.amount * 100 : 0,
                changeText: `${lastMonthRevenue._sum.amount ?
                    ((currentMonthRevenue._sum.amount || 0) - lastMonthRevenue._sum.amount) / lastMonthRevenue._sum.amount * 100 : 0}% this month`
            },

            averageRating: {
                rating: 4.8, // Simulated rating since we don't have actual ratings in the schema
                currentMonth: 4.9,
                lastMonth: 4.7,
                change: 0.2,
                changeText: '+0.2 this month'
            },

            activeClients: {
                count: totalClients,
                change: currentMonthClients - lastMonthClients,
                changeText: `${currentMonthClients - lastMonthClients >= 0 ? '+' : ''}${currentMonthClients - lastMonthClients} this month`
            }
        }

        return {
            success: true,
            data: stats
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin reports dashboard stats error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
