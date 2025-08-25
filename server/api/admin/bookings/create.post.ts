import { defineEventHandler, readBody, createError } from 'h3'
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

        // Get request body
        const body = await readBody(event)
        const {
            clientId,
            carerId,
            patientId,
            careType,
            frequency,
            startDate,
            endDate,
            startTime,
            endTime,
            location,
            notes,
            status
        } = body

        // Set status based on whether carer is assigned
        let bookingStatus = 'PENDING'
        if (carerId) {
            bookingStatus = 'ASSIGNED' // New status for assigned bookings that need acceptance
        }

        // Validate required fields
        if (!clientId || !patientId || !careType || !frequency || !startDate) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields'
            })
        }

        // Validate that client exists
        const prisma = await getPrisma()
        const client = await prisma.user.findUnique({
            where: { id: clientId, role: 'CLIENT' }
        })
        if (!client) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid client'
            })
        }

        // Validate that patient exists and belongs to the client
        const patient = await prisma.patient.findFirst({
            where: { id: patientId, clientId }
        })
        if (!patient) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid patient or patient does not belong to client'
            })
        }

        // Validate carer if provided
        if (carerId) {
            const carer = await prisma.user.findUnique({
                where: { id: carerId, role: 'CARER' }
            })
            if (!carer) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Invalid carer'
                })
            }
        }

        // Create the booking
        const booking = await prisma.booking.create({
            data: {
                clientId,
                carerId: carerId || null,
                patientId,
                careType,
                frequency,
                startDate: new Date(startDate),
                endDate: endDate ? new Date(endDate) : null,
                startTime: startTime || null,
                endTime: endTime || null,
                location: location || null,
                status: bookingStatus,
                notes: notes || null
            },
            include: {
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true
                    }
                },
                carer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true
                    }
                },
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        dateOfBirth: true
                    }
                }
            }
        })

        return {
            success: true,
            message: 'Booking created successfully',
            data: {
                id: booking.id,
                client: {
                    id: booking.client.id,
                    name: `${booking.client.firstName} ${booking.client.lastName}`,
                    email: booking.client.email,
                    phone: booking.client.phone
                },
                carer: booking.carer ? {
                    id: booking.carer.id,
                    name: `${booking.carer.firstName} ${booking.carer.lastName}`,
                    email: booking.carer.email,
                    phone: booking.carer.phone
                } : null,
                patient: {
                    id: booking.patient.id,
                    name: `${booking.patient.firstName} ${booking.patient.lastName}`,
                    dateOfBirth: booking.patient.dateOfBirth
                },
                careType: booking.careType,
                frequency: booking.frequency,
                startDate: booking.startDate,
                endDate: booking.endDate,
                startTime: booking.startTime,
                endTime: booking.endTime,
                location: booking.location,
                status: booking.status,
                notes: booking.notes,
                createdAt: booking.createdAt
            }
        }

    } catch (error: any) {
        console.error('Create booking error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to create booking'
        })
    }
})
