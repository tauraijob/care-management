import { defineEventHandler, createError } from 'h3'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { getRouterParam } from 'h3'
import { emailService } from '~/server/utils/emailService'

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
        if (!user || user.role !== 'CLIENT') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Access denied. Client role required.'
            })
        }

        const bookingId = getRouterParam(event, 'id')
        if (!bookingId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Booking ID is required'
            })
        }

        // Check if booking exists and belongs to this client
        const prisma = await getPrisma()
        const booking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                clientId: user.id
            },
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })

        if (!booking) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Booking not found or access denied'
            })
        }

        // Check if booking can be cancelled (only pending or confirmed bookings)
        if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Booking cannot be cancelled in its current status'
            })
        }

        // Update booking status to cancelled
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                status: 'CANCELLED',
                updatedAt: new Date()
            },
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                },
                carer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        })

        // Send email notification to carer about booking cancellation
        if (updatedBooking.carer) {
            try {
                await emailService.sendBookingCancelledEmail(
                    updatedBooking.carer.email,
                    `${updatedBooking.carer.firstName} ${updatedBooking.carer.lastName}`,
                    `${updatedBooking.carer.firstName} ${updatedBooking.carer.lastName}`,
                    updatedBooking.careType.toLowerCase().replace('_', ' '),
                    updatedBooking.startDate.toLocaleDateString()
                )
            } catch (emailError) {
                console.error('Booking cancellation email failed:', emailError)
                // Don't fail booking cancellation if email fails
            }

            // Create notification for carer
            await prisma.notification.create({
                data: {
                    userId: updatedBooking.carer.id,
                    type: 'EMAIL',
                    title: 'Booking Cancelled',
                    message: `Booking for ${updatedBooking.patient.firstName} ${updatedBooking.patient.lastName} has been cancelled by the client`
                }
            })
        }

        return {
            success: true,
            message: 'Booking cancelled successfully',
            data: {
                id: updatedBooking.id,
                status: updatedBooking.status,
                patientName: `${updatedBooking.patient.firstName} ${updatedBooking.patient.lastName}`,
                cancelledAt: updatedBooking.updatedAt
            }
        }

    } catch (error: any) {
        console.error('Cancel booking error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to cancel booking'
        })
    }
})
