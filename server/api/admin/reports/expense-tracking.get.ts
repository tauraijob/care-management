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

        // Get current date and year start
        const now = new Date()
        const currentYearStart = new Date(now.getFullYear(), 0, 1)
        const lastYearStart = new Date(now.getFullYear() - 1, 0, 1)
        const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31)

        // Fetch expense data based on payments and operational costs
        const [
            currentYearPayments,
            lastYearPayments,
            currentYearCarerPayments,
            lastYearCarerPayments,
            allBookings,
            currentYearBookings,
            lastYearBookings,
            allLogs,
            currentYearLogs,
            lastYearLogs,
            currentYearPaymentsList
        ] = await Promise.all([
            // Current year total payments (as proxy for expenses)
            prisma.payment.aggregate({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        gte: currentYearStart
                    }
                },
                _sum: {
                    amount: true
                }
            }),

            // Last year total payments
            prisma.payment.aggregate({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        gte: lastYearStart,
                        lte: lastYearEnd
                    }
                },
                _sum: {
                    amount: true
                }
            }),

            // Current year carer-related payments (salaries)
            prisma.payment.aggregate({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        gte: currentYearStart
                    },
                    booking: {
                        carerId: {
                            not: null
                        }
                    }
                },
                _sum: {
                    amount: true
                }
            }),

            // Last year carer-related payments
            prisma.payment.aggregate({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        gte: lastYearStart,
                        lte: lastYearEnd
                    },
                    booking: {
                        carerId: {
                            not: null
                        }
                    }
                },
                _sum: {
                    amount: true
                }
            }),

            // All bookings for operational analysis
            prisma.booking.count(),

            // Current year bookings
            prisma.booking.count({
                where: {
                    createdAt: {
                        gte: currentYearStart
                    }
                }
            }),

            // Last year bookings
            prisma.booking.count({
                where: {
                    createdAt: {
                        gte: lastYearStart,
                        lte: lastYearEnd
                    }
                }
            }),

            // All logs for activity-based expenses
            prisma.log.count(),

            // Current year logs
            prisma.log.count({
                where: {
                    createdAt: {
                        gte: currentYearStart
                    }
                }
            }),

            // Last year logs
            prisma.log.count({
                where: {
                    createdAt: {
                        gte: lastYearStart,
                        lte: lastYearEnd
                    }
                }
            }),

            // Current year payments list for detailed table (real data)
            prisma.payment.findMany({
                where: {
                    createdAt: { gte: currentYearStart }
                },
                include: {
                    booking: {
                        include: {
                            patient: { select: { firstName: true, lastName: true } },
                            client: { select: { firstName: true, lastName: true } },
                            carer: { select: { firstName: true, lastName: true } }
                        }
                    }
                },
                orderBy: { createdAt: 'desc' }
            })
        ])

        // Calculate total expenses (based on payments and operational costs)
        const currentYearTotal = (currentYearPayments._sum.amount || 0) * 0.65 // Assume 65% of revenue goes to expenses
        const lastYearTotal = (lastYearPayments._sum.amount || 0) * 0.65
        const totalExpenseChange = lastYearTotal > 0 ? ((currentYearTotal - lastYearTotal) / lastYearTotal) * 100 : 0

        // Calculate carer salaries (based on carer-related payments)
        const currentYearSalaries = (currentYearCarerPayments._sum.amount || 0) * 0.8 // Assume 80% of carer payments are salaries
        const lastYearSalaries = (lastYearCarerPayments._sum.amount || 0) * 0.8
        const salaryChange = lastYearSalaries > 0 ? ((currentYearSalaries - lastYearSalaries) / lastYearSalaries) * 100 : 0

        // Calculate supplies & equipment (based on activity and bookings)
        const currentYearSupplies = (currentYearBookings * 150) + (currentYearLogs * 25) // $150 per booking + $25 per log
        const lastYearSupplies = (lastYearBookings * 150) + (lastYearLogs * 25)
        const suppliesChange = lastYearSupplies > 0 ? ((currentYearSupplies - lastYearSupplies) / lastYearSupplies) * 100 : 0

        // Calculate administrative costs (based on total operations)
        const currentYearAdmin = currentYearTotal * 0.15 // 15% of total expenses
        const lastYearAdmin = lastYearTotal * 0.15
        const adminChange = lastYearAdmin > 0 ? ((currentYearAdmin - lastYearAdmin) / lastYearAdmin) * 100 : 0

        // Generate expense details from REAL payments list
        const expenseDetails = currentYearPaymentsList.map((p: any) => {
            const patientName = `${p.booking?.patient?.firstName || ''} ${p.booking?.patient?.lastName || ''}`.trim()
            const clientName = `${p.booking?.client?.firstName || ''} ${p.booking?.client?.lastName || ''}`.trim()
            const carerAssigned = !!p.booking?.carer
            const category = carerAssigned ? 'Salaries' : 'Administrative'
            const statusMap: Record<string, string> = {
                COMPLETED: 'Paid',
                PENDING: 'Pending',
                FAILED: 'Overdue',
                REFUNDED: 'Paid'
            }
            const status = statusMap[p.status] || 'Paid'
            return {
                id: p.id,
                category,
                description: `${patientName || clientName || 'General expense'}`,
                amount: p.amount,
                date: p.createdAt,
                status
            }
        })

        const stats = {
            totalExpenses: {
                amount: Math.round(currentYearTotal),
                change: Math.round(totalExpenseChange * 10) / 10,
                changeText: `${totalExpenseChange >= 0 ? '+' : ''}${Math.round(totalExpenseChange * 10) / 10}% vs last year`
            },

            carerSalaries: {
                amount: Math.round(currentYearSalaries),
                change: Math.round(salaryChange * 10) / 10,
                changeText: `${salaryChange >= 0 ? '+' : ''}${Math.round(salaryChange * 10) / 10}% vs last year`
            },

            suppliesEquipment: {
                amount: Math.round(currentYearSupplies),
                change: Math.round(suppliesChange * 10) / 10,
                changeText: `${suppliesChange >= 0 ? '+' : ''}${Math.round(suppliesChange * 10) / 10}% vs last year`
            },

            administrative: {
                amount: Math.round(currentYearAdmin),
                change: Math.round(adminChange * 10) / 10,
                changeText: `${adminChange >= 0 ? '+' : ''}${Math.round(adminChange * 10) / 10}% vs last year`
            },

            expenses: expenseDetails
        }

        return {
            success: true,
            data: stats
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin expense tracking error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
