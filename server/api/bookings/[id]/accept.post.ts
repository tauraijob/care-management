import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { createError } from 'h3'
import { getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token)

        if (!user || user.role !== 'CARER') {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized - Carer access required' })
        }

        const bookingId = getRouterParam(event, 'id')
        if (!bookingId) {
            throw createError({ statusCode: 400, statusMessage: 'Booking ID is required' })
        }

        // Check if booking exists and is available for this carer
        const prisma = await getPrisma()
        const existingBooking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                OR: [
                    { carerId: null, status: { in: ['PENDING', 'CONFIRMED'] } }, // Unassigned bookings
                    { carerId: user.id, status: 'ASSIGNED' } // Assigned to this carer
                ]
            },
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                },
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        })

        if (!existingBooking) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Booking not found or not available for acceptance'
            })
        }

        // Update booking to assign it to the carer or confirm assignment
        const updateData: any = {
            updatedAt: new Date()
        }

        if (existingBooking.carerId === null) {
            // Unassigned booking - assign to carer
            updateData.carerId = user.id
            updateData.status = 'CONFIRMED'
        } else {
            // Already assigned booking - just confirm it
            updateData.status = 'CONFIRMED'
        }

        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: updateData,
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true
                    }
                },
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                },
                carer: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        })

        // TODO: Send notification to client about booking acceptance
        // await sendNotification({
        //     userId: existingBooking.client.id,
        //     title: 'Booking Accepted',
        //     message: `Your booking for ${existingBooking.patient.firstName} ${existingBooking.patient.lastName} has been accepted by ${user.firstName} ${user.lastName}`,
        //     type: 'BOOKING_ACCEPTED'
        // })

        return {
            success: true,
            message: 'Booking accepted successfully',
            booking: {
                id: updatedBooking.id,
                patientName: `${updatedBooking.patient.firstName} ${updatedBooking.patient.lastName}`,
                clientName: `${updatedBooking.client.firstName} ${updatedBooking.client.lastName}`,
                carerName: `${updatedBooking.carer.firstName} ${updatedBooking.carer.lastName}`,
                status: updatedBooking.status,
                startDate: updatedBooking.startDate,
                careType: updatedBooking.careType
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Accept booking error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
