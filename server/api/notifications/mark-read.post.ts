import { createError, readBody } from 'h3'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token as string)
        if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

        const body = await readBody(event)
        const ids: string[] = Array.isArray(body?.ids) ? body.ids : []
        if (ids.length === 0) throw createError({ statusCode: 400, statusMessage: 'No IDs provided' })

        const prisma = await getPrisma()
        await prisma.notification.updateMany({ where: { id: { in: ids }, userId: user.id }, data: { isRead: true } })

        return { success: true }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Notifications mark-read error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


