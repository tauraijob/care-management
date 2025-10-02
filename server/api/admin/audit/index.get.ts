import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { listAudit } from '~/server/utils/audit'

export default defineEventHandler(async (event) => {
    const token = extractTokenFromRequest(event)
    if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
    const me = await getUserFromToken(token)
    if (!me || me.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

    const q = getQuery(event)
    const page = parseInt((q.page as string) || '1')
    const limit = parseInt((q.limit as string) || '50')
    const data = await listAudit(page, limit)
    return { success: true, data }
})


