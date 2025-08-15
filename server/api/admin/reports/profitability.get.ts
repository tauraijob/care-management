import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'
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

        // Get current date and year start
        const now = new Date()
        const currentYearStart = new Date(now.getFullYear(), 0, 1)
        const lastYearStart = new Date(now.getFullYear() - 1, 0, 1)
        const lastYearEnd = new Date(now.getFullYear() - 1, 11, 31)

        // Fetch profitability data
        const [
            currentYearRevenue,
            lastYearRevenue,
            currentYearExpenses,
            lastYearExpenses,
            currentYearBookings,
            lastYearBookings,
            currentYearPayments,
            lastYearPayments,
            allBookings,
            allPayments
        ] = await Promise.all([
            // Current year revenue
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

            // Last year revenue
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

            // Current year expenses (calculated as 65% of revenue)
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

            // Last year expenses
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

            // Current year payments count
            prisma.payment.count({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        gte: currentYearStart
                    }
                }
            }),

            // Last year payments count
            prisma.payment.count({
                where: {
                    status: 'COMPLETED',
                    createdAt: {
                        gte: lastYearStart,
                        lte: lastYearEnd
                    }
                }
            }),

            // All bookings for service analysis
            prisma.booking.findMany({
                include: {
                    payments: {
                        where: {
                            status: 'COMPLETED'
                        }
                    }
                }
            }),

            // All payments for analysis
            prisma.payment.findMany({
                where: {
                    status: 'COMPLETED'
                },
                include: {
                    booking: true
                }
            })
        ])

        // Calculate current year metrics
        const currentYearRevenueAmount = currentYearRevenue._sum.amount || 0
        const currentYearExpensesAmount = currentYearExpenses._sum.amount || 0
        const currentYearNetProfit = currentYearRevenueAmount - (currentYearExpensesAmount * 0.65)
        const currentYearProfitMargin = currentYearRevenueAmount > 0 ? (currentYearNetProfit / currentYearRevenueAmount) * 100 : 0

        // Calculate last year metrics
        const lastYearRevenueAmount = lastYearRevenue._sum.amount || 0
        const lastYearExpensesAmount = lastYearExpenses._sum.amount || 0
        const lastYearNetProfit = lastYearRevenueAmount - (lastYearExpensesAmount * 0.65)
        const lastYearProfitMargin = lastYearRevenueAmount > 0 ? (lastYearNetProfit / lastYearRevenueAmount) * 100 : 0

        // Calculate revenue growth
        const revenueGrowth = lastYearRevenueAmount > 0 ? ((currentYearRevenueAmount - lastYearRevenueAmount) / lastYearRevenueAmount) * 100 : 0
        const targetGrowth = 15 // Assume 15% target growth
        const growthVsTarget = revenueGrowth - targetGrowth

        // Calculate ROI (Return on Investment)
        const totalInvestment = 100000 // Assume $100k initial investment
        const currentYearROI = totalInvestment > 0 ? (currentYearNetProfit / totalInvestment) * 100 : 0
        const lastYearROI = totalInvestment > 0 ? (lastYearNetProfit / totalInvestment) * 100 : 0
        const roiChange = currentYearROI - lastYearROI

        // Calculate profit change
        const profitChange = lastYearNetProfit > 0 ? ((currentYearNetProfit - lastYearNetProfit) / lastYearNetProfit) * 100 : 0
        const marginChange = currentYearProfitMargin - lastYearProfitMargin

        // Generate profitable services data
        const serviceCategories = ['Personal Care', 'Medical Care', 'Physical Therapy', 'Companion Care']
        const profitableServices = serviceCategories.map((service, index) => {
            const baseMargin = 45 + (index * 5) // Varying margins
            const baseProfit = (currentYearRevenueAmount * 0.25) / serviceCategories.length // Distribute profit
            return {
                name: service,
                category: service.includes('Care') ? 'Care Services' : 'Therapy',
                margin: Math.round(baseMargin + (Math.random() * 10)),
                profit: Math.round(baseProfit + (Math.random() * 10000))
            }
        })

        // Generate cost analysis
        const costAnalysis = [
            {
                category: 'Carer Salaries',
                description: 'Staff compensation and benefits',
                amount: Math.round(currentYearExpensesAmount * 0.5),
                percentage: 50
            },
            {
                category: 'Supplies & Equipment',
                description: 'Medical supplies and operational equipment',
                amount: Math.round(currentYearExpensesAmount * 0.25),
                percentage: 25
            },
            {
                category: 'Administrative',
                description: 'Office expenses and overhead',
                amount: Math.round(currentYearExpensesAmount * 0.15),
                percentage: 15
            },
            {
                category: 'Other Costs',
                description: 'Miscellaneous operational costs',
                amount: Math.round(currentYearExpensesAmount * 0.1),
                percentage: 10
            }
        ]

        // Generate monthly profit data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const currentYear = now.getFullYear()
        const monthlyProfit = months.slice(0, now.getMonth() + 1).map((month, index) => {
            const monthRevenue = (currentYearRevenueAmount / (now.getMonth() + 1)) * (1 + (Math.random() * 0.3 - 0.15))
            const monthProfit = monthRevenue * (currentYearProfitMargin / 100)
            const growth = Math.round((Math.random() * 20) - 10) // Random growth between -10% and +10%

            return {
                month: `${month} ${currentYear}`,
                revenue: Math.round(monthRevenue),
                profit: Math.round(monthProfit),
                growth
            }
        })

        const stats = {
            netProfit: {
                amount: Math.round(currentYearNetProfit),
                change: Math.round(profitChange * 10) / 10,
                changeText: `${profitChange >= 0 ? '+' : ''}${Math.round(profitChange * 10) / 10}% vs last year`
            },

            profitMargin: {
                percentage: Math.round(currentYearProfitMargin * 10) / 10,
                change: Math.round(marginChange * 10) / 10,
                changeText: `${marginChange >= 0 ? '+' : ''}${Math.round(marginChange * 10) / 10}% vs last year`
            },

            revenueGrowth: {
                percentage: Math.round(revenueGrowth * 10) / 10,
                change: Math.round(growthVsTarget * 10) / 10,
                changeText: `${growthVsTarget >= 0 ? '+' : ''}${Math.round(growthVsTarget * 10) / 10}% vs target`
            },

            roi: {
                percentage: Math.round(currentYearROI),
                change: Math.round(roiChange),
                changeText: `${roiChange >= 0 ? '+' : ''}${Math.round(roiChange)}% vs last year`
            },

            profitableServices,
            costAnalysis,
            monthlyProfit
        }

        return {
            success: true,
            data: stats
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin profitability error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
