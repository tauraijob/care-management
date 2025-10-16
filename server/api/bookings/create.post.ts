import { getPrisma } from '~/server/utils/prisma'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { emailService } from '~/server/utils/emailService'

export default defineEventHandler(async (event) => {
    try {
        // Verify authentication (support Authorization header or cookie)
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'Authentication required' })
        const me = await getUserFromToken(token)
        if (!me) throw createError({ statusCode: 401, statusMessage: 'Invalid or expired token' })
        if (me.role !== 'CLIENT') throw createError({ statusCode: 403, statusMessage: 'Only clients can create bookings' })

        const body = await readBody(event)
        const {
            patientId,
            careType,
            frequency,
            startDate,
            endDate,
            preferredTime,
            notes,
            recurring,
            recurringDays = []
        } = body

        // Validation
        if (!patientId || !careType || !frequency || !startDate) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Patient ID, care type, frequency, and start date are required'
            })
        }

        // Validate care type
        const validCareTypes = ['ELDERLY_CARE', 'DISABILITY_CARE', 'POST_SURGERY_CARE', 'PALLIATIVE_CARE']
        if (!validCareTypes.includes(careType)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid care type'
            })
        }

        // Validate frequency
        const validFrequencies = ['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY']
        if (!validFrequencies.includes(frequency)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid frequency'
            })
        }

        // Validate dates
        const startDateTime = new Date(startDate)
        const endDateTime = endDate ? new Date(endDate) : null
        const now = new Date()

        if (startDateTime < now) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Start date cannot be in the past'
            })
        }

        if (endDateTime && endDateTime <= startDateTime) {
            throw createError({
                statusCode: 400,
                statusMessage: 'End date must be after start date'
            })
        }

        // Verify patient belongs to client
        const prisma = await getPrisma()
        const patient = await prisma.patient.findFirst({
            where: {
                id: patientId,
                clientId: me.id
            }
        })

        if (!patient) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Patient not found or access denied'
            })
        }

        // Check carer availability (simplified - would need more complex logic)
        const availableCarers = await prisma.user.findMany({
            where: {
                role: 'CARER'
            },
            select: {
                id: true,
                firstName: true,
                lastName: true
            }
        })

        if (availableCarers.length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No carers available for this time slot'
            })
        }

        // Assign carer (simple round-robin for now)
        const assignedCarer = availableCarers[0]

        // Create booking
        const booking = await prisma.booking.create({
            data: {
                clientId: me.id,
                carerId: assignedCarer.id,
                patientId,
                careType,
                frequency,
                startDate: startDateTime,
                endDate: endDateTime,
                status: 'PENDING',
                notes: notes || null
            },
            include: {
                client: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                carer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                patient: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })

        // Send email notifications
        try {
            // Send booking confirmation to client
            await emailService.sendBookingCreatedEmail(
                booking.client.email,
                `${booking.client.firstName} ${booking.client.lastName}`,
                `${assignedCarer.firstName} ${assignedCarer.lastName}`,
                careType.toLowerCase().replace('_', ' '),
                startDateTime.toLocaleDateString()
            )

            // Send assignment notification to carer
            await emailService.sendGeneralNotification(
                assignedCarer.email,
                `${assignedCarer.firstName} ${assignedCarer.lastName}`,
                'New Care Assignment',
                `You have been assigned to provide ${careType.toLowerCase().replace('_', ' ')} for ${patient.firstName} ${patient.lastName} starting ${startDateTime.toLocaleDateString()}. Please contact the client to confirm details.`
            )
        } catch (emailError) {
            console.error('Email notifications failed:', emailError)
            // Don't fail booking creation if emails fail
        }

        // Create notification for carer
        await prisma.notification.create({
            data: {
                userId: assignedCarer.id,
                type: 'EMAIL',
                title: 'New Care Assignment',
                message: `You have been assigned to provide ${careType.toLowerCase().replace('_', ' ')} for ${patient.firstName} ${patient.lastName} starting ${startDateTime.toLocaleDateString()}`
            }
        })

        // Create notification for client
        await prisma.notification.create({
            data: {
                userId: me.id,
                type: 'EMAIL',
                title: 'Booking Confirmed',
                message: `Your booking for ${patient.firstName} ${patient.lastName} has been confirmed. Carer: ${assignedCarer.firstName} ${assignedCarer.lastName}`
            }
        })

        // Log booking creation
        console.log(`Booking created: ${booking.id} by client ${me.id} for patient ${patientId}`)

        return {
            success: true,
            message: 'Booking created successfully',
            booking: {
                id: booking.id,
                careType: booking.careType,
                frequency: booking.frequency,
                startDate: booking.startDate,
                endDate: booking.endDate,
                status: booking.status,
                carer: booking.carer,
                patient: booking.patient,
                notes: booking.notes
            }
        }

    } catch (e: any) {
        console.error('Booking creation error:', e)

        if (e && e.statusCode) {
            throw e
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during booking creation'
        })
    }
})