import { z } from 'zod'
import { emailService } from '~/server/utils/emailService'
import { getPrisma } from '~/server/utils/prisma'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'

// Validation schema for notification sending
const notificationSchema = z.object({
    recipientEmail: z.string().email('Valid recipient email is required'),
    recipientName: z.string().min(1, 'Recipient name is required'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    type: z.enum(['GENERAL', 'BOOKING', 'PAYMENT', 'PROFILE', 'SYSTEM']).default('GENERAL')
})

export default defineEventHandler(async (event) => {
    try {
        // Verify authentication
        const token = extractTokenFromRequest(event)
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Authentication required'
            })
        }

        const user = await getUserFromToken(token)
        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid or expired token'
            })
        }

        // Only allow admin users to send notifications
        if (user.role !== 'ADMIN') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Only admin users can send notifications'
            })
        }

        // Parse and validate request body
        const body = await readBody(event)
        const validatedData = notificationSchema.parse(body)

        // Send email notification
        const emailSent = await emailService.sendGeneralNotification(
            validatedData.recipientEmail,
            validatedData.recipientName,
            validatedData.subject,
            validatedData.message
        )

        if (!emailSent) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to send email notification'
            })
        }

        // Log notification in database
        const prisma = await getPrisma()
        await prisma.notification.create({
            data: {
                userId: user.id,
                type: 'EMAIL',
                title: validatedData.subject,
                message: validatedData.message,
                recipientEmail: validatedData.recipientEmail,
                recipientName: validatedData.recipientName
            }
        })

        return {
            success: true,
            message: 'Notification sent successfully',
            emailSent: true
        }

    } catch (error) {
        console.error('Notification sending error:', error)

        // Handle validation errors
        if (error instanceof z.ZodError) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Validation Error',
                data: error.errors
            })
        }

        // Handle authentication errors
        if (error.statusCode === 401 || error.statusCode === 403) {
            throw error
        }

        // Generic error
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})