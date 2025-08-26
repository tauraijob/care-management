import { getPrisma } from '~/server/utils/prisma'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getRouterParam, createError, readBody } from 'h3'

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

        // Verify patient belongs to user
        const prisma = await getPrisma()
        const existingPatient = await prisma.patient.findFirst({
            where: {
                id: patientId,
                clientId: user.id
            }
        })

        if (!existingPatient) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Patient not found'
            })
        }

        // Get request body
        const body = await readBody(event)
        const {
            firstName,
            lastName,
            dateOfBirth,
            address,
            medicalConditions,
            emergencyContact
        } = body

        // Validate required fields
        if (!firstName || !lastName || !dateOfBirth) {
            throw createError({
                statusCode: 400,
                statusMessage: 'First name, last name, and date of birth are required'
            })
        }

        // Update patient
        const updatedPatient = await prisma.patient.update({
            where: {
                id: patientId
            },
            data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                dateOfBirth: new Date(dateOfBirth),
                address: address?.trim() || null,
                medicalConditions: medicalConditions || null,
                emergencyContact: emergencyContact || null
            }
        })

        return {
            success: true,
            patient: updatedPatient,
            message: 'Patient updated successfully'
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }
        console.error('Update patient error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
}) 