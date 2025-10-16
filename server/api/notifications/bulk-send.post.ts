import { z } from 'zod'
import { emailService } from '~/server/utils/emailService'
import { getPrisma } from '~/server/utils/prisma'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'

// Validation schema for bulk notification sending
const bulkNotificationSchema = z.object({
    recipientType: z.enum(['ALL', 'CLIENTS', 'CARERS', 'ADMINS']),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
    customRecipients: z.array(z.object({
        email: z.string().email(),
        name: z.string().min(1)
    })).optional()
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

        // Only allow admin users to send bulk notifications
        if (user.role !== 'ADMIN') {
            throw createError({
                statusCode: 403,
                statusMessage: 'Only admin users can send bulk notifications'
            })
        }

        // Parse and validate request body
        const body = await readBody(event)
        const validatedData = bulkNotificationSchema.parse(body)

        const prisma = await getPrisma()
        let recipients = []

        // Get recipients based on type
        if (validatedData.customRecipients && validatedData.customRecipients.length > 0) {
            // Use custom recipients
            recipients = validatedData.customRecipients
        } else {
            // Get recipients from database based on type
            const whereClause = validatedData.recipientType === 'ALL'
                ? {}
                : { role: validatedData.recipientType.slice(0, -1) } // Remove 'S' from end

            const users = await prisma.user.findMany({
                where: whereClause,
                select: {
                    email: true,
                    firstName: true,
                    lastName: true
                }
            })

            recipients = users.map(user => ({
                email: user.email,
                name: `${user.firstName} ${user.lastName}`
            }))
        }

        if (recipients.length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No recipients found for the specified criteria'
            })
        }

        // Send emails to all recipients
        const emailPromises = recipients.map(recipient =>
            emailService.sendGeneralNotification(
                recipient.email,
                recipient.name,
                validatedData.subject,
                validatedData.message
            )
        )

        const results = await Promise.allSettled(emailPromises)

        // Count successful and failed emails
        const successful = results.filter(result => result.status === 'fulfilled' && result.value).length
        const failed = results.length - successful

        // Log bulk notification in database
        await prisma.notification.create({
            data: {
                userId: user.id,
                type: 'EMAIL',
                title: `Bulk Notification: ${validatedData.subject}`,
                message: `Sent to ${recipients.length} recipients. ${successful} successful, ${failed} failed.`,
                recipientEmail: 'bulk@lucernaandsternhealth.co.zw',
                recipientName: 'Bulk Recipients'
            }
        })

        return {
            success: true,
            message: `Bulk notification sent to ${recipients.length} recipients`,
            totalRecipients: recipients.length,
            successful,
            failed,
            recipients: recipients.map(r => ({ email: r.email, name: r.name }))
        }

    } catch (error) {
        console.error('Bulk notification sending error:', error)

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
