import { z } from 'zod'
import { emailService } from '~/server/utils/emailService'

// Validation schema for contact form
const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  serviceInterest: z.string().min(1, 'Service interest is required'),
  message: z.string().min(5, 'Message must be at least 5 characters')
})

export default defineEventHandler(async (event) => {
  try {
    // Only allow POST requests
    if (getMethod(event) !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    // Parse and validate request body
    const body = await readBody(event)
    const validatedData = contactSchema.parse(body)

    // Send notification to business with beautiful template
    const businessEmailContent = `
      <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #3b82f6;">
        <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 20px; font-size: 20px;">📋 Contact Form Details</h3>
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
          <p style="margin: 8px 0; color: #475569;"><strong>👤 Name:</strong> ${validatedData.firstName} ${validatedData.lastName}</p>
          <p style="margin: 8px 0; color: #475569;"><strong>📧 Email:</strong> ${validatedData.email}</p>
          <p style="margin: 8px 0; color: #475569;"><strong>📱 Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
          <p style="margin: 8px 0; color: #475569;"><strong>📍 Location:</strong> ${validatedData.location}</p>
          <p style="margin: 8px 0; color: #475569;"><strong>🏥 Service Interest:</strong> ${validatedData.serviceInterest}</p>
        </div>
        <div style="background: white; padding: 20px; border-radius: 8px;">
          <p style="margin: 0 0 10px; color: #1e40af; font-weight: 600;">💬 Message:</p>
          <p style="margin: 0; color: #475569; line-height: 1.6; white-space: pre-wrap;">${validatedData.message}</p>
        </div>
        <p style="margin: 15px 0 0; color: #64748b; font-size: 14px; font-style: italic;">This message was sent from the Lucerna & Stern Health contact form.</p>
      </div>
    `

    const businessEmailSent = await emailService.sendGeneralNotification(
      'taurai@webdev.co.zw', // ← Change this to your preferred email
      'Lucerna & Stern Health',
      `New Contact Form Submission from ${validatedData.firstName} ${validatedData.lastName}`,
      businessEmailContent
    )

    // Send auto-reply to customer with beautiful template
    const autoReplyMessage = `
      <div style="background: linear-gradient(135deg, #f0f9ff, #e0f2fe); padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #0ea5e9;">
        <h3 style="color: #0c4a6e; margin-top: 0; margin-bottom: 15px; font-size: 20px;">✅ Message Received</h3>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 15px;">Thank you for reaching out to us! We have received your message and will get back to you within 24 hours.</p>
      </div>
      
      <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 25px; border-radius: 12px; margin: 20px 0; border-left: 5px solid #3b82f6;">
        <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Your Inquiry Details</h3>
        <div style="background: white; padding: 15px; border-radius: 8px;">
          <p style="margin: 5px 0; color: #475569;"><strong>🏥 Service Interest:</strong> ${validatedData.serviceInterest}</p>
          <p style="margin: 5px 0; color: #475569;"><strong>📍 Location:</strong> ${validatedData.location}</p>
          <p style="margin: 5px 0; color: #475569;"><strong>💬 Message:</strong> ${validatedData.message}</p>
        </div>
      </div>
      
      <div style="background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 20px 0; text-align: center;">
        <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📞 Need Immediate Assistance?</h3>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 15px;">Feel free to contact us directly:</p>
        <div style="background: white; padding: 15px; border-radius: 8px; margin-top: 10px;">
          <p style="margin: 5px 0; color: #475569;"><strong>📱 Phone/WhatsApp:</strong> +263 710708027</p>
          <p style="margin: 5px 0; color: #475569;"><strong>✉️ Email:</strong> info@lucernaandsternhealth.co.zw</p>
          <p style="margin: 5px 0; color: #475569;"><strong>📍 Address:</strong> 6 Chelmsford Road, Belgravia, Harare, Zimbabwe</p>
        </div>
      </div>
      
      <p style="color: #475569; text-align: center; font-style: italic; margin-top: 30px;">We look forward to helping you with your care needs and providing the support your family deserves.</p>
    `

    const autoReplySent = await emailService.sendGeneralNotification(
      validatedData.email,
      validatedData.firstName,
      'Thank You for Contacting Lucerna & Stern Health',
      autoReplyMessage
    )

    return {
      success: businessEmailSent && autoReplySent,
      message: 'Message sent successfully',
      businessEmailSent,
      autoReplySent
    }

  } catch (error) {
    console.error('Contact form error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Validation Error',
        data: error.errors
      })
    }

    // Handle Brevo API errors
    if ((error as any).response) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Email service error',
        data: (error as any).response.body
      })
    }

    // Generic error
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})
