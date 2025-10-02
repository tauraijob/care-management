import { getPrisma } from '~/server/utils/prisma'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        }

        const me = await getUserFromToken(token)
        if (!me || me.role !== 'ADMIN') {
            throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
        }

        const prisma = await getPrisma()

        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                role: true,
                status: true,
                createdAt: true,
                _count: { select: { carerBookings: true } }
            },
            orderBy: { createdAt: 'desc' }
        })

        const payload = users.map((u) => ({
            id: u.id,
            name: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || u.email,
            email: u.email,
            role: u.role,
            status: u.status,
            phone: u.phone,
            createdAt: u.createdAt,
            stats: { bookings: u._count.carerBookings || 0 }
        }))

        return { success: true, data: { users: payload } }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Admin users list error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


