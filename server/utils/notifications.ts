import sgMail from '@sendgrid/mail'
import twilio from 'twilio'

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

// Initialize Twilio
const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID || '',
    process.env.TWILIO_AUTH_TOKEN || ''
)

export interface NotificationData {
    to: string
    subject?: string
    message: string
    type: 'email' | 'sms' | 'whatsapp'
    bookingId?: string
    userId?: string
}

export const sendEmail = async (to: string, subject: string, message: string) => {
    try {
        const msg = {
            to,
            from: 'noreply@lucernahealth.com', // Update with your verified sender
            subject,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
                        <h1 style="margin: 0;">Lucerna & Stern Health</h1>
                    </div>
                    <div style="padding: 20px; background: #f9f9f9;">
                        ${message}
                    </div>
                    <div style="background: #333; color: white; padding: 15px; text-align: center; font-size: 12px;">
                        <p>© 2024 Lucerna & Stern Health. All rights reserved.</p>
                        <p>Contact: +27611234567 | info@lucernahealth.com</p>
                    </div>
                </div>
            `
        }

        await sgMail.send(msg)
        return { success: true }
    } catch (error) {
        console.error('Email sending error:', error)
        return { success: false, error }
    }
}

export const sendSMS = async (to: string, message: string) => {
    try {
        const result = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER || '',
            to: to.startsWith('+') ? to : `+${to}`
        })

        return { success: true, messageId: result.sid }
    } catch (error) {
        console.error('SMS sending error:', error)
        return { success: false, error }
    }
}

export const sendWhatsApp = async (to: string, message: string) => {
    try {
        // For WhatsApp, we need to use the WhatsApp API
        // This is a placeholder for WhatsApp Business API integration
        const whatsappNumber = to.startsWith('+') ? to : `+${to}`

        // TODO: Implement actual WhatsApp API call
        console.log(`WhatsApp message to ${whatsappNumber}: ${message}`)

        return { success: true, message: 'WhatsApp message logged (API integration pending)' }
    } catch (error) {
        console.error('WhatsApp sending error:', error)
        return { success: false, error }
    }
}

export const sendNotification = async (data: NotificationData) => {
    try {
        let result

        switch (data.type) {
            case 'email':
                result = await sendEmail(data.to, data.subject || 'Lucerna Health Notification', data.message)
                break
            case 'sms':
                result = await sendSMS(data.to, data.message)
                break
            case 'whatsapp':
                result = await sendWhatsApp(data.to, data.message)
                break
            default:
                throw new Error('Invalid notification type')
        }

        // Log notification to database
        await logNotification(data, result.success)

        return result
    } catch (error) {
        console.error('Notification sending error:', error)
        return { success: false, error }
    }
}

const logNotification = async (data: NotificationData, success: boolean) => {
    try {
        const { prisma } = await import('./prisma')

        await prisma.notification.create({
            data: {
                userId: data.userId || null,
                type: data.type.toUpperCase(),
                title: data.subject || 'Notification',
                message: data.message,
                status: success ? 'SENT' : 'FAILED',
                metadata: {
                    to: data.to,
                    bookingId: data.bookingId
                }
            }
        })
    } catch (error) {
        console.error('Notification logging error:', error)
    }
}

// Predefined notification templates
export const notificationTemplates = {
    bookingCreated: {
        email: (booking: any, client: any) => ({
            subject: 'Booking Confirmation - Lucerna Health',
            message: `
                <h2>Booking Confirmation</h2>
                <p>Dear ${client.firstName} ${client.lastName},</p>
                <p>Your healthcare booking has been successfully created.</p>
                <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3>Booking Details:</h3>
                    <p><strong>Patient:</strong> ${booking.patient.firstName} ${booking.patient.lastName}</p>
                    <p><strong>Care Type:</strong> ${booking.careType}</p>
                    <p><strong>Start Date:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
                    <p><strong>Status:</strong> ${booking.status}</p>
                </div>
                <p>We will notify you once a carer has been assigned to your booking.</p>
                <p>Thank you for choosing Lucerna & Stern Health!</p>
            `
        }),
        sms: (booking: any, client: any) =>
            `Hi ${client.firstName}, your booking for ${booking.patient.firstName} has been confirmed. We'll notify you when a carer is assigned. - Lucerna Health`
    },

    carerAssigned: {
        email: (booking: any, client: any, carer: any) => ({
            subject: 'Carer Assigned - Lucerna Health',
            message: `
                <h2>Carer Assigned</h2>
                <p>Dear ${client.firstName} ${client.lastName},</p>
                <p>A carer has been assigned to your booking.</p>
                <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3>Carer Details:</h3>
                    <p><strong>Name:</strong> ${carer.firstName} ${carer.lastName}</p>
                    <p><strong>Contact:</strong> ${carer.phone || 'Will be provided'}</p>
                </div>
                <p>Your carer will contact you shortly to discuss the care plan.</p>
                <p>Thank you for choosing Lucerna & Stern Health!</p>
            `
        }),
        sms: (booking: any, client: any, carer: any) =>
            `Hi ${client.firstName}, ${carer.firstName} ${carer.lastName} has been assigned to your booking. They will contact you soon. - Lucerna Health`
    },

    paymentReceived: {
        email: (payment: any, client: any) => ({
            subject: 'Payment Received - Lucerna Health',
            message: `
                <h2>Payment Confirmation</h2>
                <p>Dear ${client.firstName} ${client.lastName},</p>
                <p>We have received your payment.</p>
                <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
                    <h3>Payment Details:</h3>
                    <p><strong>Amount:</strong> USD ${payment.amount}</p>
                    <p><strong>Method:</strong> ${payment.paymentMethod}</p>
                    <p><strong>Transaction ID:</strong> ${payment.transactionId}</p>
                    <p><strong>Status:</strong> ${payment.status}</p>
                </div>
                <p>Thank you for your payment!</p>
            `
        }),
        sms: (payment: any, client: any) =>
            `Hi ${client.firstName}, we received your payment of USD ${payment.amount}. Transaction ID: ${payment.transactionId} - Lucerna Health`
    }
}