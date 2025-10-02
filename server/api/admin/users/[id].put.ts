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
        const body = await readBody(event)
        const prisma = await getPrisma()

        const data: any = {}
        if (body.firstName !== undefined) data.firstName = body.firstName
        if (body.lastName !== undefined) data.lastName = body.lastName
        if (body.email !== undefined) data.email = body.email
        if (body.phone !== undefined) data.phone = body.phone
        if (body.role !== undefined) data.role = body.role
        if (body.status !== undefined) data.status = body.status

        const updated = await prisma.user.update({ where: { id }, data })
        await recordAudit(event, { action: 'USER_UPDATED', targetType: 'user', targetId: id, details: data })
        return { success: true, data: { id: updated.id } }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Admin user update error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


