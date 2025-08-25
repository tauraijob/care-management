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

        // Set default date range (last 12 months)
        const end = endDate ? new Date(endDate) : new Date()
        const start = startDate ? new Date(startDate) : new Date(end.getTime() - 365 * 24 * 60 * 60 * 1000)

        // Fetch booking analytics data
        const [
            totalBookings,
            bookingsByStatus,
            bookingsByService,
            bookingsByMonth,
            topClients,
            topCarers,
            bookingTrends,
            bookingsByHour
        ] = await Promise.all([
            // Total bookings
            prisma.booking.count({
                where: {
                    createdAt: { gte: start, lte: end }
                }
            }),

            // Bookings by status
            prisma.booking.groupBy({
                by: ['status'],
                where: {
                    createdAt: { gte: start, lte: end }
                },
                _count: { status: true }
            }),

            // Bookings by service type
            prisma.booking.groupBy({
                by: ['careType'],
                where: {
                    createdAt: { gte: start, lte: end }
                },
                _count: { careType: true }
            }),

            // Bookings by month
            prisma.booking.groupBy({
                by: ['createdAt'],
                where: {
                    createdAt: { gte: start, lte: end }
                },
                _count: { createdAt: true }
            }),

            // Top clients by booking count
            prisma.user.findMany({
                where: {
                    role: 'CLIENT',
                    bookings: {
                        some: {
                            createdAt: { gte: start, lte: end }
                        }
                    }
                },
                include: {
                    _count: {
                        select: {
                            bookings: {
                                where: {
                                    createdAt: { gte: start, lte: end }
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    bookings: {
                        _count: 'desc'
                    }
                },
                take: 10
            }),

            // Top carers by booking count
            prisma.user.findMany({
                where: {
                    role: 'CARER',
                    carerBookings: {
                        some: {
                            createdAt: { gte: start, lte: end }
                        }
                    }
                },
                include: {
                    _count: {
                        select: {
                            carerBookings: {
                                where: {
                                    createdAt: { gte: start, lte: end }
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    carerBookings: {
                        _count: 'desc'
                    }
                },
                take: 10
            }),

            // Booking trends (daily for last 30 days)
            prisma.booking.groupBy({
                by: ['createdAt'],
                where: {
                    createdAt: {
                        gte: new Date(end.getTime() - 30 * 24 * 60 * 60 * 1000),
                        lte: end
                    }
                },
                _count: { createdAt: true }
            }),
            prisma.booking.findMany({
                where: {
                    createdAt: { gte: start, lte: end }
                },
                select: {
                    createdAt: true
                }
            })
        ])

        // Format bookings by status
        const statusData = bookingsByStatus.map(item => ({
            status: item.status,
            count: item._count.status,
            percentage: totalBookings > 0 ? Math.round((item._count.status / totalBookings) * 100) : 0
        }))

        // Format bookings by service
        const serviceData = bookingsByService.map(item => ({
            service: item.careType,
            count: item._count.careType,
            percentage: totalBookings > 0 ? Math.round((item._count.careType / totalBookings) * 100) : 0
        }))

        // Format monthly bookings
        const monthlyData = bookingsByMonth.map(item => ({
            month: item.createdAt,
            bookings: item._count.createdAt
        }))

        // Format top clients
        const topClientsData = topClients.map(client => ({
            id: client.id,
            name: `${client.firstName} ${client.lastName}`,
            initials: `${client.firstName[0]}${client.lastName[0]}`,
            bookings: client._count.bookings,
            email: client.email
        }))

        // Format top carers
        const topCarersData = topCarers.map(carer => ({
            id: carer.id,
            name: `${carer.firstName} ${carer.lastName}`,
            initials: `${carer.firstName[0]}${carer.lastName[0]}`,
            bookings: carer._count.carerBookings,
            specialty: 'General Care'
        }))

        // Format booking trends
        const trendData = bookingTrends.map(item => ({
            date: item.createdAt,
            bookings: item._count.createdAt
        }))

        // Calculate completion rate
        const completedBookings = statusData.find(item => item.status === 'COMPLETED')?.count || 0
        const completionRate = totalBookings > 0 ? Math.round((completedBookings / totalBookings) * 100) : 0

        // Calculate average bookings per day
        const daysInRange = Math.ceil((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000))
        const avgBookingsPerDay = daysInRange > 0 ? Math.round(totalBookings / daysInRange * 100) / 100 : 0

        // Format bookings by city (placeholder since city field doesn't exist)
        const cityDataWithPercent = []

        // Peak hours: group bookings by hour
        const hourCounts = Array(24).fill(0)
        bookingsByHour.forEach(b => {
            const hour = new Date(b.createdAt).getHours()
            hourCounts[hour]++
        })
        // Define peak hour ranges
        const peakRanges = [
            { label: '9:00 AM - 11:00 AM', hours: [9, 10, 11] },
            { label: '2:00 PM - 4:00 PM', hours: [14, 15, 16] },
            { label: '6:00 PM - 8:00 PM', hours: [18, 19, 20] },
        ]
        const peakHourData = peakRanges.map(range => {
            const count = range.hours.reduce((sum, h) => sum + hourCounts[h], 0)
            return { label: range.label, count }
        })
        // Other times
        const peakHoursTotal = peakHourData.reduce((sum, p) => sum + p.count, 0)
        peakHourData.push({ label: 'Other Times', count: totalBookings - peakHoursTotal })
        // Add percentages and descriptions
        const peakHourDataWithPercent = peakHourData.map(p => ({
            ...p,
            percentage: totalBookings > 0 ? Math.round((p.count / totalBookings) * 100) : 0,
            description: p.label === '9:00 AM - 11:00 AM' ? 'Peak morning' :
                p.label === '2:00 PM - 4:00 PM' ? 'Afternoon rush' :
                    p.label === '6:00 PM - 8:00 PM' ? 'Evening hours' : 'Distributed'
        }))

        return {
            success: true,
            data: {
                overview: {
                    totalBookings,
                    completionRate,
                    avgBookingsPerDay,
                    totalClients: topClientsData.length,
                    totalCarers: topCarersData.length
                },
                byStatus: statusData,
                byService: serviceData,
                byCity: cityDataWithPercent,
                peakHours: peakHourDataWithPercent,
                monthlyTrend: monthlyData,
                topClients: topClientsData.slice(0, 5),
                topCarers: topCarersData.slice(0, 5),
                trends: trendData,
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

        console.error('Booking analytics error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 