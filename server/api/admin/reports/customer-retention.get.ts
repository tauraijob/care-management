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
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1)

        // Fetch customer retention data
        const [
            totalClients,
            currentMonthActiveClients,
            lastMonthActiveClients,
            allClientsWithBookings,
            recentBookings,
            totalRevenue,
            currentMonthRevenue,
            lastMonthRevenue
        ] = await Promise.all([
            // Total clients
            prisma.user.count({
                where: {
                    role: 'CLIENT'
                }
            }),

            // Current month active clients (clients with bookings in current month)
            prisma.user.count({
                where: {
                    role: 'CLIENT',
                    clientBookings: {
                        some: {
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
                    clientBookings: {
                        some: {
                            createdAt: {
                                gte: lastMonthStart,
                                lte: lastMonthEnd
                            }
                        }
                    }
                }
            }),

            // All clients with their booking history
            prisma.user.findMany({
                where: {
                    role: 'CLIENT'
                },
                include: {
                    clientBookings: {
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            payments: {
                                where: {
                                    status: 'COMPLETED'
                                }
                            }
                        }
                    }
                }
            }),

            // Recent bookings for trend analysis
            prisma.booking.findMany({
                where: {
                    createdAt: {
                        gte: threeMonthsAgo
                    }
                },
                include: {
                    client: true,
                    payments: {
                        where: {
                            status: 'COMPLETED'
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
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
            })
        ])

        // Calculate retention rate
        const retentionRate = totalClients > 0 ? (currentMonthActiveClients / totalClients) * 100 : 0
        const lastMonthRetentionRate = totalClients > 0 ? (lastMonthActiveClients / totalClients) * 100 : 0
        const retentionChange = retentionRate - lastMonthRetentionRate

        // Calculate average customer lifetime (months since first booking)
        const customerLifetimes = allClientsWithBookings
            .filter(client => client.clientBookings.length > 0)
            .map(client => {
                const firstBooking = client.clientBookings[client.clientBookings.length - 1]
                const monthsSinceFirst = (now.getTime() - firstBooking.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
                return monthsSinceFirst
            })

        const avgLifetime = customerLifetimes.length > 0 ?
            customerLifetimes.reduce((sum, lifetime) => sum + lifetime, 0) / customerLifetimes.length : 0

        // Calculate current month average lifetime
        const currentMonthLifetimes = allClientsWithBookings
            .filter(client => client.clientBookings.some(booking => booking.createdAt >= currentMonthStart))
            .map(client => {
                const firstBooking = client.clientBookings[client.clientBookings.length - 1]
                const monthsSinceFirst = (now.getTime() - firstBooking.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
                return monthsSinceFirst
            })

        const currentMonthAvgLifetime = currentMonthLifetimes.length > 0 ?
            currentMonthLifetimes.reduce((sum, lifetime) => sum + lifetime, 0) / currentMonthLifetimes.length : 0

        // Calculate last month average lifetime
        const lastMonthLifetimes = allClientsWithBookings
            .filter(client => client.clientBookings.some(booking =>
                booking.createdAt >= lastMonthStart && booking.createdAt <= lastMonthEnd
            ))
            .map(client => {
                const firstBooking = client.clientBookings[client.clientBookings.length - 1]
                const monthsSinceFirst = (lastMonthEnd.getTime() - firstBooking.createdAt.getTime()) / (1000 * 60 * 60 * 24 * 30.44)
                return monthsSinceFirst
            })

        const lastMonthAvgLifetime = lastMonthLifetimes.length > 0 ?
            lastMonthLifetimes.reduce((sum, lifetime) => sum + lifetime, 0) / lastMonthLifetimes.length : 0

        // Calculate LTV (Lifetime Value) - average revenue per customer
        const totalRevenueAmount = totalRevenue._sum.amount || 0
        const avgLTV = totalClients > 0 ? totalRevenueAmount / totalClients : 0

        // Calculate current month LTV
        const currentMonthRevenueAmount = currentMonthRevenue._sum.amount || 0
        const currentMonthAvgLTV = currentMonthActiveClients > 0 ? currentMonthRevenueAmount / currentMonthActiveClients : 0

        // Calculate last month LTV
        const lastMonthRevenueAmount = lastMonthRevenue._sum.amount || 0
        const lastMonthAvgLTV = lastMonthActiveClients > 0 ? lastMonthRevenueAmount / lastMonthActiveClients : 0

        // Generate customer retention details
        const customerRetentionDetails = allClientsWithBookings.map(client => {
            const totalBookings = client.clientBookings.length
            const lastBooking = client.clientBookings[0] // Most recent booking
            const totalSpent = client.clientBookings.reduce((sum, booking) => {
                return sum + booking.payments.reduce((paymentSum, payment) => paymentSum + payment.amount, 0)
            }, 0)

            // Determine customer status
            let status = 'Active'
            if (lastBooking) {
                const daysSinceLastBooking = (now.getTime() - lastBooking.createdAt.getTime()) / (1000 * 60 * 60 * 24)
                if (daysSinceLastBooking > 90) {
                    status = 'Churned'
                } else if (daysSinceLastBooking > 30) {
                    status = 'At Risk'
                }
            }

            return {
                id: client.id,
                name: `${client.firstName} ${client.lastName}`,
                joinDate: client.clientBookings.length > 0 ?
                    client.clientBookings[client.clientBookings.length - 1].createdAt : client.createdAt,
                totalBookings,
                lastBooking: lastBooking?.createdAt || null,
                status,
                ltv: totalSpent
            }
        })

        const stats = {
            retentionRate: {
                percentage: Math.round(retentionRate * 10) / 10,
                change: Math.round(retentionChange * 10) / 10,
                changeText: `${retentionChange >= 0 ? '+' : ''}${Math.round(retentionChange * 10) / 10}% vs last month`
            },

            activeCustomers: {
                count: currentMonthActiveClients,
                change: currentMonthActiveClients - lastMonthActiveClients,
                changeText: `${currentMonthActiveClients - lastMonthActiveClients >= 0 ? '+' : ''}${currentMonthActiveClients - lastMonthActiveClients} this month`
            },

            avgLifetime: {
                months: Math.round(avgLifetime * 10) / 10,
                change: Math.round((currentMonthAvgLifetime - lastMonthAvgLifetime) * 10) / 10,
                changeText: `${currentMonthAvgLifetime > lastMonthAvgLifetime ? '+' : ''}${Math.round((currentMonthAvgLifetime - lastMonthAvgLifetime) * 10) / 10} months`
            },

            ltv: {
                amount: Math.round(avgLTV * 100) / 100,
                change: lastMonthAvgLTV > 0 ? Math.round(((currentMonthAvgLTV - lastMonthAvgLTV) / lastMonthAvgLTV) * 1000) / 10 : 0,
                changeText: `${lastMonthAvgLTV > 0 ?
                    (currentMonthAvgLTV > lastMonthAvgLTV ? '+' : '') +
                    Math.round(((currentMonthAvgLTV - lastMonthAvgLTV) / lastMonthAvgLTV) * 1000) / 10 : 0}% vs last month`
            },

            customerRetention: customerRetentionDetails
        }

        return {
            success: true,
            data: stats
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin customer retention error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
