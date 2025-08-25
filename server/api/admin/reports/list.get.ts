import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const user = await getUserFromToken(token)
        if (!user || user.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
        
        // Fetch real reports from database
        const prisma = await getPrisma()
        const reports = await prisma.report.findMany({
            orderBy: { generatedAt: 'desc' },
            include: {
                generator: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })
        
        return { data: { reports } }
    } catch (e) {
        throw createError({ statusCode: 500, statusMessage: e.message })
    }
})