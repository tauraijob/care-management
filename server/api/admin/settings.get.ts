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

        // Get system statistics for session management
        const [
            totalUsers,
            activeSessions,
            totalLogins,
            failedLogins
        ] = await Promise.all([
            prisma.user.count(),
            prisma.user.count({
                where: {
                    lastLoginAt: {
                        gte: new Date(Date.now() - 30 * 60 * 1000) // Last 30 minutes
                    }
                }
            }),
            prisma.user.count({
                where: {
                    lastLoginAt: {
                        not: null
                    }
                }
            }),
            prisma.user.count({
                where: {
                    failedLoginAttempts: {
                        gt: 0
                    }
                }
            })
        ])

        // Get recent activity
        const recentActivity = await prisma.log.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                client: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                carer: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })

        const settings = {
            maintenanceMode: false,
            allowRegistration: true,
            requireApproval: false,
            sessionTimeout: 30,
            maxLoginAttempts: 5,
            systemAlerts: true,
            userReports: true,
            securityAlerts: true,
            performanceAlerts: false,
            require2FA: false,
            ipWhitelist: false,
            requireUppercase: true,
            requireNumbers: true,
            requireSpecialChars: true,
            minPasswordLength: 8,
            autoBackup: true,
            backupFrequency: 'daily',
            backupRetention: 30,
            // Real session management data
            sessionStats: {
                totalUsers,
                activeSessions,
                totalLogins,
                failedLogins,
                sessionUtilization: totalUsers > 0 ? Math.round((activeSessions / totalUsers) * 100) : 0
            },
            recentActivity: recentActivity.map(log => ({
                id: log.id,
                type: log.type,
                message: log.message,
                user: log.client ? `${log.client.firstName} ${log.client.lastName}` :
                    log.carer ? `${log.carer.firstName} ${log.carer.lastName}` : 'System',
                timestamp: log.createdAt
            }))
        }

        return {
            success: true,
            data: settings
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin settings error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
