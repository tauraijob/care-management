import { getPrisma } from '~/server/utils/prisma'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { recordAudit } from '~/server/utils/audit'

export default defineEventHandler(async (event) => {
    try {
        // Verify admin access
        const token = extractTokenFromRequest(event)
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const user = await getUserFromToken(token)
        if (!user || user.role !== 'ADMIN') {
            throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
        }

        const body = await readBody(event)
        const { action, reason } = body

        if (!action || !['enable', 'disable'].includes(action)) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid action. Must be "enable" or "disable"' })
        }

        const prisma = await getPrisma()

        // In a real system, you'd store maintenance mode in a database or config file
        // For now, we'll simulate it and log the action

        // Record the maintenance action
        await recordAudit({
            userId: user.id,
            action: `MAINTENANCE_${action.toUpperCase()}`,
            details: {
                action,
                reason: reason || 'No reason provided',
                timestamp: new Date().toISOString()
            }
        })

        // Simulate maintenance mode toggle
        const maintenanceMode = action === 'enable'

        return {
            success: true,
            message: `Maintenance mode ${action}d successfully`,
            data: {
                maintenanceMode,
                enabledBy: user.firstName + ' ' + user.lastName,
                enabledAt: new Date().toISOString(),
                reason: reason || 'No reason provided'
            }
        }

    } catch (error: any) {
        console.error('Maintenance mode error:', error)
        if (error.statusCode) throw error
        throw createError({ statusCode: 500, statusMessage: 'Failed to toggle maintenance mode' })
    }
})
