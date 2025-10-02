import { getPrisma } from '~/server/utils/prisma'
import { recordAudit } from '~/server/utils/audit'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const me = await getUserFromToken(token)
        if (!me || me.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

        const id = getRouterParam(event, 'id')
        const prisma = await getPrisma()
        await prisma.user.delete({ where: { id } })
        await recordAudit(event, { action: 'USER_DELETED', targetType: 'user', targetId: id })
        return { success: true }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Admin user delete error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


