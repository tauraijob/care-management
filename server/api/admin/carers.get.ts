import { defineEventHandler, createError } from 'h3'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        // Authenticate user
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
                statusMessage: 'Access denied. Admin role required.'
            })
        }

        // Fetch all carers
        const carers = await prisma.user.findMany({
            where: {
                role: 'CARER'
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                createdAt: true
            },
            orderBy: {
                firstName: 'asc'
            }
        })

        return {
            success: true,
            data: carers.map(carer => ({
                id: carer.id,
                firstName: carer.firstName,
                lastName: carer.lastName,
                email: carer.email,
                phone: carer.phone,
                fullName: `${carer.firstName} ${carer.lastName}`,
                specialty: 'General Care' // Default specialty since it's not in the schema
            }))
        }

    } catch (error: any) {
        console.error('Fetch carers error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch carers'
        })
    }
})
