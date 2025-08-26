import { getPrisma } from '~/server/utils/prisma'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { createError, readBody } from 'h3'

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

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid token'
            })
        }

        // Only clients can create patients
        if (user.role !== 'CLIENT') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Only clients can create patients'
            })
        }

        const body = await readBody(event)
        const {
            firstName,
            lastName,
            dateOfBirth,
            medicalConditions,
            emergencyContact,
            address
        } = body

        // Validate required fields
        if (!firstName || !lastName || !dateOfBirth) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields'
            })
        }

        // Create patient
        const prisma = await getPrisma()
        const patient = await prisma.patient.create({
            data: {
                clientId: user.id,
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth),
                medicalConditions: medicalConditions || null,
                emergencyContact: emergencyContact || null,
                address: address || null
            }
        })

        return {
            success: true,
            patient
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Create patient error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})