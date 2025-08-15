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
        const rating = query.rating as string
        const status = query.status as string
        const specialization = query.specialization as string
        const page = parseInt(query.page as string) || 1
        const limit = parseInt(query.limit as string) || 20
        const search = query.search as string

        // Build where clause
        const where: any = {
            role: 'CARER'
        }

        if (rating) {
            where.rating = {
                gte: parseFloat(rating)
            }
        }

        if (status && status !== 'all') {
            where.status = status.toUpperCase()
        }

        if (specialization && specialization !== 'all') {
            where.specializations = {
                has: specialization
            }
        }

        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } }
            ]
        }

        // Calculate pagination
        const skip = (page - 1) * limit

        // Fetch carers with performance data
        const [carers, totalCount, stats] = await Promise.all([
            prisma.user.findMany({
                where,
                include: {
                    carerBookings: {
                        include: {
                            patient: {
                                select: {
                                    firstName: true,
                                    lastName: true
                                }
                            },
                            client: {
                                select: {
                                    firstName: true,
                                    lastName: true
                                }
                            },
                            payment: {
                                select: {
                                    amount: true,
                                    status: true
                                }
                            }
                        }
                    },
                    _count: {
                        select: {
                            carerBookings: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),

            prisma.user.count({ where }),

            // Get carer statistics
            prisma.user.groupBy({
                by: ['status'],
                where: { role: 'CARER' },
                _count: { status: true }
            })
        ])

        // Calculate performance metrics for each carer
        const carerPerformance = carers.map(carer => {
            const completedBookings = carer.carerBookings.filter(booking => booking.status === 'COMPLETED')
            const totalEarnings = completedBookings.reduce((sum, booking) => {
                return sum + (booking.payment?.amount || 0)
            }, 0)

            const thisMonthBookings = completedBookings.filter(booking => {
                const bookingDate = new Date(booking.startDate)
                const now = new Date()
                return bookingDate.getMonth() === now.getMonth() &&
                    bookingDate.getFullYear() === now.getFullYear()
            })

            const thisMonthEarnings = thisMonthBookings.reduce((sum, booking) => {
                return sum + (booking.payment?.amount || 0)
            }, 0)

            // Calculate average rating (mock data for now)
            const avgRating = 4.5 + Math.random() * 0.5 // Random rating between 4.5-5.0
            const totalReviews = Math.floor(Math.random() * 200) + 50 // Random reviews between 50-250

            return {
                id: carer.id,
                name: `${carer.firstName} ${carer.lastName}`,
                email: carer.email,
                phone: carer.phone,
                status: carer.status,
                specializations: carer.specializations || [],
                joinDate: carer.createdAt,
                lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(), // Random last active time
                rating: parseFloat(avgRating.toFixed(1)),
                totalReviews,
                completedTasks: completedBookings.length,
                thisMonth: thisMonthBookings.length,
                successRate: Math.floor(85 + Math.random() * 15), // Random success rate between 85-100%
                totalEarnings,
                thisMonthEarnings,
                avgPerTask: completedBookings.length > 0 ? Math.floor(totalEarnings / completedBookings.length) : 0,
                activeAssignments: carer.carerBookings.filter(booking =>
                    ['CONFIRMED', 'IN_PROGRESS'].includes(booking.status)
                ).length,
                recentActivity: [
                    {
                        id: 1,
                        icon: 'mdi:check-circle',
                        description: `Completed care session for ${completedBookings[0]?.patient?.firstName || 'Patient'}`,
                        time: '2 hours ago'
                    },
                    {
                        id: 2,
                        icon: 'mdi:calendar',
                        description: 'Started new assignment',
                        time: '4 hours ago'
                    },
                    {
                        id: 3,
                        icon: 'mdi:star',
                        description: 'Received 5-star review from client',
                        time: '1 day ago'
                    }
                ]
            }
        })

        // Calculate overall statistics
        const totalCarers = totalCount
        const averageRating = carerPerformance.reduce((sum, carer) => sum + carer.rating, 0) / carerPerformance.length
        const totalCompletedTasks = carerPerformance.reduce((sum, carer) => sum + carer.completedTasks, 0)
        const activeAssignments = carerPerformance.reduce((sum, carer) => sum + carer.activeAssignments, 0)
        const busyCarers = carerPerformance.filter(carer => carer.status === 'BUSY').length

        // Calculate performance growth (mock data)
        const performanceGrowth = 12.5

        // Rating distribution (mock data)
        const ratingDistribution = [
            { stars: 5, count: Math.floor(totalCarers * 0.6), percentage: 60 },
            { stars: 4, count: Math.floor(totalCarers * 0.33), percentage: 33 },
            { stars: 3, count: Math.floor(totalCarers * 0.05), percentage: 5 },
            { stars: 2, count: Math.floor(totalCarers * 0.01), percentage: 1 },
            { stars: 1, count: 0, percentage: 0 }
        ]

        // Specialization performance (mock data)
        const specializationPerformance = [
            { name: 'Elderly Care', carers: Math.floor(totalCarers * 0.3), avgRating: 4.8, tasksCompleted: Math.floor(totalCompletedTasks * 0.4), successRate: 97 },
            { name: 'Post-Surgery Care', carers: Math.floor(totalCarers * 0.2), avgRating: 4.9, tasksCompleted: Math.floor(totalCompletedTasks * 0.25), successRate: 98 },
            { name: 'Disability Care', carers: Math.floor(totalCarers * 0.15), avgRating: 4.7, tasksCompleted: Math.floor(totalCompletedTasks * 0.2), successRate: 95 },
            { name: 'Palliative Care', carers: Math.floor(totalCarers * 0.1), avgRating: 4.9, tasksCompleted: Math.floor(totalCompletedTasks * 0.1), successRate: 99 },
            { name: 'Nursing Care', carers: Math.floor(totalCarers * 0.25), avgRating: 4.8, tasksCompleted: Math.floor(totalCompletedTasks * 0.3), successRate: 96 }
        ]

        return {
            success: true,
            data: {
                carers: carerPerformance,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                },
                overview: {
                    totalCarers,
                    averageRating: parseFloat(averageRating.toFixed(1)),
                    totalCompletedTasks,
                    activeAssignments,
                    busyCarers,
                    performanceGrowth
                },
                ratingDistribution,
                specializationPerformance
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin carers performance error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 