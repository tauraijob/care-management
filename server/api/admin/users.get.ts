import { prisma } from '~/server/utils/prisma'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'No token provided'
            })
        }

        const user = await getUserFromToken(token)

        if (!user || user.role !== 'ADMIN') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Admin access required'
            })
        }

        // Get query parameters for filtering
        const query = getQuery(event)
        const role = query.role as string
        const status = query.status as string
        const page = parseInt(query.page as string) || 1
        const limit = parseInt(query.limit as string) || 20
        const search = query.search as string

        // Build where clause
        const where: any = {}

        if (role && role !== 'all') {
            where.role = role.toUpperCase()
        }

        // Note: status field doesn't exist in User model, so we'll skip this filter

        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } }
            ]
        }

        // Calculate pagination
        const skip = (page - 1) * limit

        // Fetch users with related data
        const [users, totalCount, stats] = await Promise.all([
            prisma.user.findMany({
                where,
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    role: true,
                    whatsapp: true,
                    createdAt: true,
                    updatedAt: true,
                    // Include role-specific data
                    _count: {
                        select: {
                            clientBookings: true,
                            carerBookings: true,
                            patients: true
                        }
                    }
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit
            }),

            prisma.user.count({ where }),

            // Get user statistics
            prisma.user.groupBy({
                by: ['role'],
                _count: { role: true }
            })
        ])

        // Format the response
        const formattedUsers = users.map(user => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            whatsapp: user.whatsapp,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            stats: {
                bookings: user.role === 'CLIENT' ? user._count.clientBookings : user._count.carerBookings,
                patients: user.role === 'CLIENT' ? user._count.patients : 0
            }
        }))

        // Calculate statistics
        const userStats = stats.reduce((acc, stat) => {
            acc[stat.role.toLowerCase()] = stat._count.role
            return acc
        }, {} as any)

        return {
            success: true,
            data: {
                users: formattedUsers,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                },
                statistics: userStats
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin users error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 