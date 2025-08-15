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

        // Get current date and date 30 days ago
        const now = new Date()
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

        // Fetch data based on user role
        if (user.role === 'CLIENT') {
            const [
                totalBookings,
                pendingBookings,
                completedBookings,
                totalSpent,
                recentBookings,
                recentPayments,
                todaysSchedule,
                notifications
            ] = await Promise.all([
                // Total bookings for this client
                prisma.booking.count({
                    where: { clientId: user.id }
                }),

                // Pending bookings
                prisma.booking.count({
                    where: {
                        clientId: user.id,
                        status: 'PENDING'
                    }
                }),

                // Completed bookings
                prisma.booking.count({
                    where: {
                        clientId: user.id,
                        status: 'COMPLETED'
                    }
                }),

                // Total spent (completed payments)
                prisma.payment.aggregate({
                    where: {
                        booking: {
                            clientId: user.id
                        },
                        status: 'COMPLETED'
                    },
                    _sum: { amount: true }
                }),

                // Recent bookings (last 5)
                prisma.booking.findMany({
                    where: { clientId: user.id },
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        patient: {
                            select: { firstName: true, lastName: true }
                        },
                        carer: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                }),

                // Recent payments (last 5)
                prisma.payment.findMany({
                    where: {
                        booking: {
                            clientId: user.id
                        }
                    },
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        booking: {
                            include: {
                                patient: {
                                    select: { firstName: true, lastName: true }
                                }
                            }
                        }
                    }
                }),

                // Today's schedule
                prisma.booking.findMany({
                    where: {
                        clientId: user.id,
                        startDate: {
                            gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                            lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
                        }
                    },
                    include: {
                        patient: {
                            select: { firstName: true, lastName: true }
                        },
                        carer: {
                            select: { firstName: true, lastName: true }
                        }
                    },
                    orderBy: { startDate: 'asc' }
                }),

                // Notifications (last 10)
                prisma.notification.findMany({
                    where: { userId: user.id },
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                })
            ])

            return {
                success: true,
                data: {
                    stats: {
                        totalBookings,
                        pendingBookings,
                        completedBookings,
                        totalSpent: totalSpent._sum.amount || 0
                    },
                    recentBookings: recentBookings.map(booking => ({
                        id: booking.id,
                        patient: `${booking.patient.firstName} ${booking.patient.lastName}`,
                        carer: booking.carer ? `${booking.carer.firstName} ${booking.carer.lastName}` : 'Unassigned',
                        status: booking.status,
                        careType: booking.careType,
                        startDate: booking.startDate,
                        createdAt: booking.createdAt
                    })),
                    recentPayments: recentPayments.map(payment => ({
                        id: payment.id,
                        amount: payment.amount,
                        currency: payment.currency,
                        status: payment.status,
                        method: payment.paymentMethod,
                        patient: `${payment.booking.patient.firstName} ${payment.booking.patient.lastName}`,
                        createdAt: payment.createdAt
                    })),
                    todaysSchedule: todaysSchedule.map(booking => ({
                        id: booking.id,
                        title: `${booking.careType} - ${booking.patient.firstName} ${booking.patient.lastName}`,
                        time: booking.startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        status: booking.status,
                        carer: booking.carer ? `${booking.carer.firstName} ${booking.carer.lastName}` : 'Unassigned'
                    })),
                    notifications: notifications.map(notification => ({
                        id: notification.id,
                        title: notification.title,
                        message: notification.message,
                        type: notification.type,
                        isRead: notification.isRead,
                        createdAt: notification.createdAt
                    }))
                }
            }
        } else if (user.role === 'CARER') {
            // Carer dashboard data
            const [
                totalBookings,
                todaysBookings,
                completedBookings,
                recentLogs,
                notifications
            ] = await Promise.all([
                // Total bookings assigned to this carer
                prisma.booking.count({
                    where: { carerId: user.id }
                }),

                // Today's bookings
                prisma.booking.findMany({
                    where: {
                        carerId: user.id,
                        startDate: {
                            gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                            lt: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
                        }
                    },
                    include: {
                        patient: {
                            select: { firstName: true, lastName: true }
                        },
                        client: {
                            select: { firstName: true, lastName: true }
                        }
                    },
                    orderBy: { startDate: 'asc' }
                }),

                // Completed bookings
                prisma.booking.count({
                    where: {
                        carerId: user.id,
                        status: 'COMPLETED'
                    }
                }),

                // Recent care logs
                prisma.log.findMany({
                    where: { carerId: user.id },
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        booking: {
                            include: {
                                patient: {
                                    select: { firstName: true, lastName: true }
                                }
                            }
                        }
                    }
                }),

                // Notifications
                prisma.notification.findMany({
                    where: { userId: user.id },
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                })
            ])

            return {
                success: true,
                data: {
                    stats: {
                        totalBookings,
                        todaysBookings: todaysBookings.length,
                        completedBookings
                    },
                    todaysSchedule: todaysBookings.map(booking => ({
                        id: booking.id,
                        title: `${booking.careType} - ${booking.patient.firstName} ${booking.patient.lastName}`,
                        time: booking.startDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        status: booking.status,
                        client: `${booking.client.firstName} ${booking.client.lastName}`
                    })),
                    recentLogs: recentLogs.map(log => ({
                        id: log.id,
                        patient: `${log.booking.patient.firstName} ${log.booking.patient.lastName}`,
                        visitDate: log.visitStartTime,
                        tasks: log.taskCompleted?.tasks || [],
                        notes: log.notes
                    })),
                    notifications: notifications.map(notification => ({
                        id: notification.id,
                        title: notification.title,
                        message: notification.message,
                        type: notification.type,
                        isRead: notification.isRead,
                        createdAt: notification.createdAt
                    }))
                }
            }
        } else if (user.role === 'ADMIN') {
            // Admin dashboard data
            const [
                totalUsers,
                totalBookings,
                pendingBookings,
                totalRevenue,
                recentBookings,
                recentPayments,
                notifications
            ] = await Promise.all([
                // Total users
                prisma.user.count(),

                // Total bookings
                prisma.booking.count(),

                // Pending bookings
                prisma.booking.count({
                    where: { status: 'PENDING' }
                }),

                // Total revenue (completed payments)
                prisma.payment.aggregate({
                    where: { status: 'COMPLETED' },
                    _sum: { amount: true }
                }),

                // Recent bookings (last 5)
                prisma.booking.findMany({
                    take: 5,
                    orderBy: { createdAt: 'desc' },
                    include: {
                        patient: {
                            select: { firstName: true, lastName: true }
                        },
                        client: {
                            select: { firstName: true, lastName: true }
                        },
                        carer: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                }),

                // Recent payments (last 5)
                prisma.payment.findMany({
                    take: 5,
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

                // Notifications (last 10)
                prisma.notification.findMany({
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                })
            ])

            return {
                success: true,
                data: {
                    stats: {
                        totalUsers,
                        totalBookings,
                        pendingBookings,
                        totalRevenue: totalRevenue._sum.amount || 0
                    },
                    recentBookings: recentBookings.map(booking => ({
                        id: booking.id,
                        patient: `${booking.patient.firstName} ${booking.patient.lastName}`,
                        client: `${booking.client.firstName} ${booking.client.lastName}`,
                        carer: booking.carer ? `${booking.carer.firstName} ${booking.carer.lastName}` : 'Unassigned',
                        status: booking.status,
                        careType: booking.careType,
                        startDate: booking.startDate,
                        createdAt: booking.createdAt
                    })),
                    recentPayments: recentPayments.map(payment => ({
                        id: payment.id,
                        amount: payment.amount,
                        currency: payment.currency,
                        status: payment.status,
                        method: payment.paymentMethod,
                        patient: `${payment.booking.patient.firstName} ${payment.booking.patient.lastName}`,
                        client: `${payment.booking.client.firstName} ${payment.booking.client.lastName}`,
                        createdAt: payment.createdAt
                    })),
                    notifications: notifications.map(notification => ({
                        id: notification.id,
                        title: notification.title,
                        message: notification.message,
                        type: notification.type,
                        isRead: notification.isRead,
                        createdAt: notification.createdAt
                    }))
                }
            }
        } else {
            // Unknown role
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid user role'
            })
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Dashboard error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 