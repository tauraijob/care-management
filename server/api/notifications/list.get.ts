import { createError } from 'h3'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token as string)
        if (!user) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

        const prisma = await getPrisma()
        const notifications = await prisma.notification.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' },
            take: 20
        })

        return { success: true, notifications }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Notifications list error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


