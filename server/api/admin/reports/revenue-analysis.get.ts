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

        // Get query parameters
        const query = getQuery(event)
        const startDate = query.startDate as string
        const endDate = query.endDate as string

        // Initialize Prisma
        const prismaClient = await getPrisma()

        // Set default date range (last 12 months)
        const end = endDate ? new Date(endDate) : new Date()
        const start = startDate ? new Date(startDate) : new Date(end.getTime() - 365 * 24 * 60 * 60 * 1000)

        // Fetch revenue data
        const [
            totalRevenue,
            monthlyRevenue,
            topRevenueServices,
            topRevenueCarers
        ] = await Promise.all([
            // Total revenue
            prismaClient.payment.aggregate({
                where: {
                    status: 'COMPLETED',
                    createdAt: { gte: start, lte: end }
                },
                _sum: { amount: true },
                _count: true
            }),

            // Monthly revenue trend
            prismaClient.payment.groupBy({
                by: ['createdAt'],
                where: {
                    status: 'COMPLETED',
                    createdAt: { gte: start, lte: end }
                },
                _sum: { amount: true },
                _count: true
            }),

            // Revenue by service type - get bookings with payments
            prismaClient.booking.findMany({
                where: {
                    payments: {
                        some: {
                            status: 'COMPLETED',
                            createdAt: { gte: start, lte: end }
                        }
                    }
                },
                include: {
                    payments: {
                        where: {
                            status: 'COMPLETED',
                            createdAt: { gte: start, lte: end }
                        }
                    }
                }
            }),

            // Top revenue carers
            prismaClient.user.findMany({
                where: {
                    role: 'CARER',
                    carerBookings: {
                        some: {
                            payments: {
                                some: {
                                    status: 'COMPLETED',
                                    createdAt: { gte: start, lte: end }
                                }
                            }
                        }
                    }
                },
                include: {
                    carerBookings: {
                        where: {
                            payments: {
                                some: {
                                    status: 'COMPLETED',
                                    createdAt: { gte: start, lte: end }
                                }
                            }
                        },
                        include: {
                            payments: {
                                where: {
                                    status: 'COMPLETED',
                                    createdAt: { gte: start, lte: end }
                                }
                            }
                        }
                    }
                },
                take: 10
            })
        ])

        // Format monthly revenue data
        const monthlyRevenueData = monthlyRevenue.map((item: any) => ({
            month: item.createdAt,
            revenue: item._sum.amount || 0,
            bookings: item._count
        }))

        // Format top revenue services
        const serviceRevenueMap = new Map<string, any>()
        topRevenueServices.forEach((booking: any) => {
            const careType = booking.careType as string
            const totalAmount = booking.payments.reduce((sum: number, payment: any) => sum + payment.amount, 0)

            if (serviceRevenueMap.has(careType)) {
                const existing = serviceRevenueMap.get(careType)
                existing.revenue += totalAmount
                existing.bookings += 1
            } else {
                serviceRevenueMap.set(careType, {
                    name: careType,
                    revenue: totalAmount,
                    bookings: 1,
                    percentage: 0
                })
            }
        })

        const topServices = Array.from(serviceRevenueMap.values())

        // Calculate percentages for services
        const totalServiceRevenue = topServices.reduce((sum, service) => sum + service.revenue, 0)
        topServices.forEach(service => {
            service.percentage = totalServiceRevenue > 0 ? Math.round((service.revenue / totalServiceRevenue) * 100) : 0
        })

        // Format top revenue carers
        const topCarers = topRevenueCarers.map((carer: any) => {
            const totalRevenue = carer.carerBookings.reduce((sum: number, booking: any) => {
                const bookingPayments = booking.payments || []
                return sum + bookingPayments.reduce((paymentSum: number, payment: any) => paymentSum + (payment.amount || 0), 0)
            }, 0)
            const totalBookings = carer.carerBookings.length
            return {
                id: carer.id,
                name: `${carer.firstName} ${carer.lastName}`,
                initials: `${carer.firstName[0]}${carer.lastName[0]}`,
                specialty: 'General Care',
                revenue: totalRevenue,
                bookings: totalBookings
            }
        })

        // Calculate growth rate (compare with previous period)
        const previousStart = new Date(start.getTime() - (end.getTime() - start.getTime()))
        const prisma = await getPrisma()
        const previousRevenue = await prismaClient.payment.aggregate({
            where: {
                status: 'COMPLETED',
                createdAt: { gte: previousStart, lt: start }
            },
            _sum: { amount: true }
        })

        const currentRevenue = totalRevenue._sum.amount || 0
        const previousRevenueAmount = previousRevenue._sum.amount || 0
        const growthRate = previousRevenueAmount > 0 ? ((currentRevenue - previousRevenueAmount) / previousRevenueAmount) * 100 : 0

        return {
            success: true,
            data: {
                overview: {
                    totalRevenue: currentRevenue,
                    totalBookings: totalRevenue._count,
                    growthRate: Math.round(growthRate * 100) / 100,
                    avgRevenuePerBooking: totalRevenue._count > 0 ? currentRevenue / totalRevenue._count : 0
                },
                monthlyTrend: monthlyRevenueData,
                topServices: topServices.sort((a: any, b: any) => b.revenue - a.revenue).slice(0, 5),
                topCarers: topCarers.sort((a: any, b: any) => b.revenue - a.revenue).slice(0, 5),
                dateRange: {
                    start: start.toISOString(),
                    end: end.toISOString()
                }
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Revenue analysis error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 