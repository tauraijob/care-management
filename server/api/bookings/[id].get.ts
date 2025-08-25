import { defineEventHandler, createError } from 'h3'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { getRouterParam } from 'h3'

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

        const bookingId = getRouterParam(event, 'id')
        if (!bookingId) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Booking ID is required'
            })
        }

        // Build where clause based on user role
        let whereClause: any = { id: bookingId }

        if (user.role === 'CLIENT') {
            whereClause.clientId = user.id
        } else if (user.role === 'CARER') {
            whereClause.carerId = user.id
        }
        // Admin can view any booking, so no additional filter needed

        // Fetch the booking with all related data
        const prisma = await getPrisma()
        const booking = await prisma.booking.findFirst({
            where: whereClause,
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
                        dateOfBirth: true,
                        address: true,
                        emergencyContact: true
                    }
                },
                payments: {
                    select: {
                        id: true,
                        amount: true,
                        currency: true,
                        status: true,
                        paymentMethod: true,
                        createdAt: true,
                        updatedAt: true
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

        return {
            success: true,
            booking: {
                id: booking.id,
                careType: booking.careType,
                frequency: booking.frequency,
                startDate: booking.startDate,
                endDate: booking.endDate,
                startTime: booking.startTime,
                endTime: booking.endTime,
                location: booking.location,
                status: booking.status,
                notes: booking.notes,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt,
                client: booking.client,
                carer: booking.carer,
                patient: booking.patient,
                payments: booking.payments
            }
        }

    } catch (error: any) {
        console.error('Fetch booking error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch booking'
        })
    }
})
