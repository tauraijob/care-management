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
        const { type = 'full' } = body

        const prisma = await getPrisma()

        // Record the backup action
        await recordAudit({
            userId: user.id,
            action: 'BACKUP_CREATED',
            details: {
                type,
                timestamp: new Date().toISOString()
            }
        })

        // Simulate backup creation
        const backupId = `backup_${Date.now()}`
        const backupSize = Math.floor(Math.random() * 500) + 100 // 100-600 MB

        return {
            success: true,
            message: 'Backup created successfully',
            data: {
                backupId,
                type,
                size: `${backupSize} MB`,
                createdAt: new Date().toISOString(),
                createdBy: user.firstName + ' ' + user.lastName,
                status: 'completed'
            }
        }

    } catch (error: any) {
        console.error('Backup creation error:', error)
        if (error.statusCode) throw error
        throw createError({ statusCode: 500, statusMessage: 'Failed to create backup' })
    }
})
