import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const user = await getUserFromToken(token)
        if (!user || user.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
        
        const body = await readBody(event)
        const { id } = body
        if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing report id' })
        
        // Delete report from database
        await prisma.report.delete({
            where: { id: id as string }
        })
        
        return { success: true }
    } catch (e) {
        throw createError({ statusCode: 500, statusMessage: e.message })
    }
})