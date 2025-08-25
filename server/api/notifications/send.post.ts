import jwt from 'jsonwebtoken'
import { getPrisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        // Verify authentication
        const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Authentication required'
            })
        }

        // Verify JWT token
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        } catch (error) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid or expired token'
            })
        }

        const body = await readBody(event)
        const {
            userId,
            type,
            title,
            message,
            bookingId = null,
            priority = 'NORMAL',
            scheduledFor = null
        } = body

        // Validation
        if (!userId || !type || !title || !message) {
            throw createError({
                statusCode: 400,
                statusMessage: 'User ID, type, title, and message are required'
            })
        }

        // Validate notification type
        const validTypes = ['EMAIL', 'SMS', 'PUSH']
        if (!validTypes.includes(type)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid notification type'
            })
        }

        // Verify user exists
        const prisma = await getPrisma()
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                phone: true,
                firstName: true,
                lastName: true,
                whatsapp: true
            }
        })

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })
        }

        // Create notification record
        const notification = await prisma.notification.create({
            data: {
                userId,
                type,
                title,
                message,
                isRead: false
            }
        })

        // Send notification based on type
        let sendResult = null

        try {
            switch (type) {
                case 'EMAIL':
                    sendResult = await sendEmailNotification(user.email, title, message, user.firstName)
                    break

                case 'SMS':
                    if (user.phone) {
                        sendResult = await sendSMSNotification(user.phone, message)
                    } else {
                        console.warn(`SMS notification requested for user ${userId} but no phone number available`)
                    }
                    break

                case 'PUSH':
                    sendResult = await sendPushNotification(userId, title, message)
                    break

                default:
                    throw new Error('Unsupported notification type')
            }
        } catch (sendError) {
            console.error('Notification sending error:', sendError)
            // Don't fail the request if notification sending fails
            // The notification is still recorded in the database
        }

        // Log notification creation
        console.log(`Notification created: ${notification.id} for user ${userId} via ${type}`)

        return {
            success: true,
            message: 'Notification sent successfully',
            notification: {
                id: notification.id,
                type: notification.type,
                title: notification.title,
                message: notification.message,
                isRead: notification.isRead,
                createdAt: notification.createdAt
            },
            sendResult
        }

    } catch (error) {
        console.error('Notification sending error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during notification sending'
        })
    }
})

// Email notification function
async function sendEmailNotification(email: string, title: string, message: string, recipientName: string) {
    console.log('Sending email notification:', { email, title, message, recipientName })

    // In real implementation, this would use a service like SendGrid, Mailgun, or AWS SES
    // const emailService = new EmailService()
    // const result = await emailService.send({
    //   to: email,
    //   subject: title,
    //   html: generateEmailTemplate(title, message, recipientName),
    //   from: 'noreply@lucernahealth.com'
    // })

    return {
        success: true,
        messageId: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        service: 'mock-email-service'
    }
}

// SMS notification function
async function sendSMSNotification(phone: string, message: string) {
    console.log('Sending SMS notification:', { phone, message })

    // In real implementation, this would use a service like Twilio, AWS SNS, or local SMS gateway
    // const smsService = new SMSService()
    // const result = await smsService.send({
    //   to: phone,
    //   message: message,
    //   from: '+27611234567' // Lucerna WhatsApp number
    // })

    return {
        success: true,
        messageId: `sms_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        service: 'mock-sms-service'
    }
}

// Push notification function
async function sendPushNotification(userId: string, title: string, message: string) {
    console.log('Sending push notification:', { userId, title, message })

    // In real implementation, this would use Firebase Cloud Messaging or similar
    // const pushService = new PushNotificationService()
    // const result = await pushService.send({
    //   userId: userId,
    //   title: title,
    //   message: message,
    //   data: { bookingId: '123' }
    // })

    return {
        success: true,
        messageId: `push_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        service: 'mock-push-service'
    }
}

// WhatsApp notification function (for future implementation)
async function sendWhatsAppNotification(phone: string, message: string) {
    console.log('Sending WhatsApp notification:', { phone, message })

    // In real implementation, this would use WhatsApp Business API
    // const whatsappService = new WhatsAppService()
    // const result = await whatsappService.send({
    //   to: phone,
    //   message: message,
    //   from: '+27611234567'
    // })

    return {
        success: true,
        messageId: `whatsapp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        service: 'mock-whatsapp-service'
    }
}

// Generate email template
function generateEmailTemplate(title: string, message: string, recipientName: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Lucerna & Stern Health</h1>
        </div>
        <div class="content">
          <h2>Hello ${recipientName},</h2>
          <p>${message}</p>
          <p>Best regards,<br>The Lucerna & Stern Health Team</p>
        </div>
        <div class="footer">
          <p>This is an automated message. Please do not reply to this email.</p>
          <p>Contact us: +27611234567</p>
        </div>
      </div>
    </body>
    </html>
  `
} 