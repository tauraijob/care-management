import { createError } from 'h3'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const me = await getUserFromToken(token)
        if (!me || me.role !== 'CARER') throw createError({ statusCode: 403, statusMessage: 'Carer access required' })

        const prisma = await getPrisma()
        const items = await prisma.certification.findMany({
            where: { carerId: me.id },
            orderBy: { createdAt: 'desc' }
        })

        return { success: true, data: { items } }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer list certificates error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


