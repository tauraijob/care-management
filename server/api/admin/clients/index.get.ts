import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    const token = extractTokenFromRequest(event)
    if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
    const me = await getUserFromToken(token)
    if (!me || me.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

    const prisma = await getPrisma()
    const clients = await prisma.user.findMany({
        where: { role: 'CLIENT' },
        select: {
            id: true, firstName: true, lastName: true, phone: true,
            patients: { select: { id: true, firstName: true, lastName: true, dateOfBirth: true } }
        },
        orderBy: { createdAt: 'desc' }
    })

    const data = clients.map((c: any) => ({
        id: c.id,
        fullName: `${c.firstName} ${c.lastName}`.trim(),
        phone: c.phone || '',
        patients: (c.patients || []).map((p: any) => ({
            id: p.id,
            fullName: `${p.firstName} ${p.lastName}`.trim(),
            dateOfBirth: p.dateOfBirth
        }))
    }))

    return { success: true, data }
})


