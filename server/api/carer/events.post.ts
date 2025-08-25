import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token)

        if (!user || user.role !== 'CARER') {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const body = await readBody(event)
        const { title, type, date, startTime, endTime, location, description } = body

        // Validation
        if (!title || !type || !date || !startTime || !endTime) {
            throw createError({ 
                statusCode: 400, 
                statusMessage: 'Title, type, date, start time, and end time are required' 
            })
        }

        // Validate date is not in the past
        const eventDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        if (eventDate < today) {
            throw createError({ 
                statusCode: 400, 
                statusMessage: 'Cannot create events in the past' 
            })
        }

        // Validate time format (HH:MM)
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
            throw createError({ 
                statusCode: 400, 
                statusMessage: 'Time must be in HH:MM format' 
            })
        }

        // Validate end time is after start time
        if (startTime >= endTime) {
            throw createError({ 
                statusCode: 400, 
                statusMessage: 'End time must be after start time' 
            })
        }

        // First, check if there's a patient record for the carer, if not create one
        const prisma = await getPrisma()
        let patient = await prisma.patient.findFirst({
            where: { clientId: user.id }
        })

        if (!patient) {
            // Create a dummy patient record for carer events
            patient = await prisma.patient.create({
                data: {
                    clientId: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    dateOfBirth: new Date('1990-01-01'), // Default date
                    medicalConditions: {},
                    emergencyContact: {}
                }
            })
        }

        // Create a booking record for the carer event
        const carerEvent = await prisma.booking.create({
            data: {
                clientId: user.id,
                carerId: user.id,
                patientId: patient.id,
                careType: 'ELDERLY_CARE', // Default care type for events
                frequency: 'ONCE',
                startDate: eventDate,
                endDate: eventDate,
                startTime: startTime,
                endTime: endTime,
                location: location || 'Office',
                status: 'CONFIRMED',
                notes: `Carer Event: ${title} - ${description || ''}`
            },
            include: {
                client: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })

        return {
            success: true,
            message: 'Event created successfully',
            event: {
                id: carerEvent.id,
                title: title,
                type: type,
                date: date,
                startTime: startTime,
                endTime: endTime,
                location: location,
                description: description
            }
        }

    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer event creation error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})
