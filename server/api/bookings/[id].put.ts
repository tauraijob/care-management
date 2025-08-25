import { getPrisma } from '~/server/utils/prisma'
import { getUserFromToken } from '~/server/utils/auth'
import { getHeader } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const authHeader = getHeader(event, 'authorization')
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw createError({
                statusCode: 401,
                statusMessage: 'No token provided'
            })
        }

        const token = authHeader.substring(7)
        const user = await getUserFromToken(token)

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid token'
            })
        }

        const bookingId = getRouterParam(event, 'id')
        const body = await readBody(event)
        const { status, carerId, notes } = body

        // Find the booking
        const prisma = await getPrisma()
        const existingBooking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                client: true,
                carer: true
            }
        })

        if (!existingBooking) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Booking not found'
            })
        }

        // Check permissions
        if (user.role === 'CLIENT' && existingBooking.clientId !== user.id) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Access denied'
            })
        }

        if (user.role === 'CARER' && existingBooking.carerId !== user.id) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Access denied'
            })
        }

        // Prepare update data
        const updateData: any = {}

        if (status) {
            updateData.status = status
        }

        if (carerId && user.role === 'ADMIN') {
            updateData.carerId = carerId
        }

        if (notes) {
            updateData.notes = notes
        }

        // Update booking
        const booking = await prisma.booking.update({
            where: { id: bookingId },
            data: updateData,
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        dateOfBirth: true
                    }
                },
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
                }
            }
        })

        return {
            success: true,
            booking
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Update booking error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})