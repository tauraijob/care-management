import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { createError } from 'h3'

function getSentimentFromMessage(message: string) {
    // Simple sentiment analysis simulation
    if (!message) return 'Neutral'
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'happy', 'satisfied', 'professional', 'recommend', 'caring']
    const negativeWords = ['bad', 'poor', 'late', 'unhappy', 'disappointed', 'unprepared', 'rude', 'problem']
    const msg = message.toLowerCase()
    if (positiveWords.some(word => msg.includes(word))) return 'Positive'
    if (negativeWords.some(word => msg.includes(word))) return 'Negative'
    return 'Neutral'
}

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

        // Get current date and month start
        const now = new Date()
        const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

        // Fetch feedback logs (simulate feedback as logs with messages)
        const [
            allLogs,
            currentMonthLogs,
            lastMonthLogs
        ] = await Promise.all([
            prisma.log.findMany({
                include: {
                    client: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.log.findMany({
                where: {
                    createdAt: {
                        gte: currentMonthStart
                    }
                },
                include: {
                    client: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }),
            prisma.log.findMany({
                where: {
                    createdAt: {
                        gte: lastMonthStart,
                        lte: lastMonthEnd
                    }
                },
                include: {
                    client: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            })
        ])

        // Sentiment analysis
        const allSentiments = allLogs.map(log => getSentimentFromMessage(log.message || ''))
        const currentMonthSentiments = currentMonthLogs.map(log => getSentimentFromMessage(log.message || ''))
        const lastMonthSentiments = lastMonthLogs.map(log => getSentimentFromMessage(log.message || ''))

        const countSentiment = (arr: string[], sentiment: string) => arr.filter(s => s === sentiment).length
        const totalFeedback = allLogs.length
        const currentMonthFeedback = currentMonthLogs.length
        const lastMonthFeedback = lastMonthLogs.length

        const positiveCount = countSentiment(allSentiments, 'Positive')
        const neutralCount = countSentiment(allSentiments, 'Neutral')
        const negativeCount = countSentiment(allSentiments, 'Negative')

        const currentMonthPositive = countSentiment(currentMonthSentiments, 'Positive')
        const lastMonthPositive = countSentiment(lastMonthSentiments, 'Positive')
        const currentMonthNeutral = countSentiment(currentMonthSentiments, 'Neutral')
        const lastMonthNeutral = countSentiment(lastMonthSentiments, 'Neutral')
        const currentMonthNegative = countSentiment(currentMonthSentiments, 'Negative')
        const lastMonthNegative = countSentiment(lastMonthSentiments, 'Negative')

        // Calculate percentages
        const positivePercent = totalFeedback > 0 ? (positiveCount / totalFeedback) * 100 : 0
        const neutralPercent = totalFeedback > 0 ? (neutralCount / totalFeedback) * 100 : 0
        const negativePercent = totalFeedback > 0 ? (negativeCount / totalFeedback) * 100 : 0

        const positiveChange = lastMonthPositive > 0 ? ((currentMonthPositive - lastMonthPositive) / lastMonthPositive) * 100 : 0
        const neutralChange = lastMonthNeutral > 0 ? ((currentMonthNeutral - lastMonthNeutral) / lastMonthNeutral) * 100 : 0
        const negativeChange = lastMonthNegative > 0 ? ((currentMonthNegative - lastMonthNegative) / lastMonthNegative) * 100 : 0

        // Generate recent feedback (last 4 logs with messages)
        const recentFeedback = allLogs
            .filter(log => log.message && log.message.length > 0)
            .slice(0, 4)
            .map((log, idx) => {
                const sentiment = getSentimentFromMessage(log.message)
                let status = 'Reviewed'
                if (idx === 2) status = 'In Progress'
                if (idx === 3) status = 'Pending'
                return {
                    id: log.id,
                    customer: log.client ? `${log.client.firstName} ${log.client.lastName}` : 'Unknown',
                    category: log.type || 'General',
                    sentiment,
                    message: log.message,
                    date: log.createdAt,
                    status
                }
            })

        const stats = {
            totalFeedback: {
                count: totalFeedback,
                change: currentMonthFeedback - lastMonthFeedback,
                changeText: `${currentMonthFeedback - lastMonthFeedback >= 0 ? '+' : ''}${currentMonthFeedback - lastMonthFeedback} this month`
            },
            positiveSentiment: {
                percentage: Math.round(positivePercent * 10) / 10,
                change: Math.round(positiveChange * 10) / 10,
                changeText: `${positiveChange >= 0 ? '+' : ''}${Math.round(positiveChange * 10) / 10}% vs last month`
            },
            neutralSentiment: {
                percentage: Math.round(neutralPercent * 10) / 10,
                change: Math.round(neutralChange * 10) / 10,
                changeText: `${neutralChange >= 0 ? '+' : ''}${Math.round(neutralChange * 10) / 10}% vs last month`
            },
            negativeSentiment: {
                percentage: Math.round(negativePercent * 10) / 10,
                change: Math.round(negativeChange * 10) / 10,
                changeText: `${negativeChange >= 0 ? '+' : ''}${Math.round(negativeChange * 10) / 10}% vs last month`
            },
            recentFeedback
        }

        return {
            success: true,
            data: stats
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin feedback analysis error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
