import { defineEventHandler, createError } from 'h3'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

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

        // Fetch all clients
        const prisma = await getPrisma()
        const clients = await prisma.user.findMany({
            where: {
                role: 'CLIENT'
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                createdAt: true,
                patients: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        dateOfBirth: true
                    }
                }
            },
            orderBy: {
                firstName: 'asc'
            }
        })

        return {
            success: true,
            data: clients.map(client => ({
                id: client.id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                phone: client.phone,
                fullName: `${client.firstName} ${client.lastName}`,
                patients: client.patients.map(patient => ({
                    id: patient.id,
                    firstName: patient.firstName,
                    lastName: patient.lastName,
                    fullName: `${patient.firstName} ${patient.lastName}`,
                    dateOfBirth: patient.dateOfBirth
                }))
            }))
        }

    } catch (error: any) {
        console.error('Fetch clients error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch clients'
        })
    }
})
