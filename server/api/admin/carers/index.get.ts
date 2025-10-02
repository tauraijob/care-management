import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const token = extractTokenFromRequest(event)
    if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
    const me = await getUserFromToken(token)
    if (!me || me.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

    const prisma = await getPrisma()
    const carers = await prisma.user.findMany({
        where: { role: 'CARER' },
        select: { id: true, firstName: true, lastName: true },
        orderBy: { createdAt: 'desc' }
    })

    const data = carers.map((c: any) => ({ id: c.id, fullName: `${c.firstName} ${c.lastName}`.trim(), specialty: 'General Care' }))
    return { success: true, data }
})


