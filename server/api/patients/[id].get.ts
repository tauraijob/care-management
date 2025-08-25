import { getPrisma } from '~/server/utils/prisma'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        // Get patient ID from route params
        const patientId = getRouterParam(event, 'id')
        if (!patientId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Patient ID is required'
            })
        }

        // Authenticate user
        const token = extractTokenFromRequest(event)
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'No token provided'
            })
        }

        const user = await getUserFromToken(token)
        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid token'
            })
        }

        // Get patient
        const prisma = await getPrisma()
        const patient = await prisma.patient.findFirst({
            where: {
                id: patientId,
                clientId: user.id
            }
        })

        if (!patient) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Patient not found'
            })
        }

        return {
            success: true,
            patient
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }
        console.error('Get patient error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 