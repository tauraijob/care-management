import { createError } from 'h3'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const me = await getUserFromToken(token)
        if (!me || me.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

        const { carerId, q, page: pageRaw, limit: limitRaw } = getQuery(event)
        const page = parseInt((pageRaw as string) || '1')
        const limit = parseInt((limitRaw as string) || '20')
        const skip = (page - 1) * limit

        const where: any = {}
        if (carerId && typeof carerId === 'string') where.carerId = carerId
        if (q && typeof q === 'string') where.title = { contains: q, mode: 'insensitive' }

        const prisma = await getPrisma()
        const [certs, total] = await Promise.all([
            prisma.certification.findMany({
                where,
                include: { carer: { select: { id: true, firstName: true, lastName: true, email: true } } },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            prisma.certification.count({ where })
        ])

        const data = certs.map((c: any) => ({
            id: c.id,
            title: c.title,
            fileName: c.fileName,
            fileUrl: c.fileUrl,
            fileType: c.fileType,
            issuedAt: c.issuedAt,
            expiresAt: c.expiresAt,
            carer: { id: c.carer.id, name: `${c.carer.firstName} ${c.carer.lastName}`.trim(), email: c.carer.email },
            createdAt: c.createdAt
        }))

        return { success: true, data: { items: data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Admin list certificates error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


