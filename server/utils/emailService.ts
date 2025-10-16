import * as brevo from '@getbrevo/brevo'

// Initialize Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi()

// Set API key with proper error handling
const brevoApiKey = process.env.BREVO_API_KEY || 'frcxUh4a9MJy6DFV'
console.log('Brevo API Key loaded:', brevoApiKey ? 'Yes' : 'No')
console.log('API Key value:', brevoApiKey ? `${brevoApiKey.substring(0, 4)}...` : 'Not found')

if (!brevoApiKey) {
  console.error('BREVO_API_KEY is not set in environment variables')
}

apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey)

export interface EmailTemplate {
  subject: string
  htmlContent: string
  textContent?: string
}

export interface EmailRecipient {
  email: string
  name?: string
}

export interface EmailOptions {
  to: EmailRecipient[]
  cc?: EmailRecipient[]
  bcc?: EmailRecipient[]
  replyTo?: EmailRecipient
  attachments?: any[]
}

// Email templates
export const emailTemplates = {
  // User registration and authentication
  welcome: (name: string, userType: string): EmailTemplate => ({
    subject: `Welcome to Lucerna & Stern Health - ${userType} Account Created`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Lucerna & Stern Health</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">🏥</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Welcome to Lucerna & Stern Health</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Professional Care with Zimbabwean Heart</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 600;">Dear ${name},</p>
            <p style="color: #475569; line-height: 1.7; font-size: 16px; margin-bottom: 20px;">Welcome to Lucerna & Stern Health! Your ${userType.toLowerCase()} account has been successfully created and you're now part of our caring community.</p>
            <p style="color: #475569; line-height: 1.7; font-size: 16px; margin-bottom: 30px;">You can now access your dashboard and start using our comprehensive care services.</p>
            
            <!-- Next Steps Card -->
            <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 20px; font-weight: 600;">🎯 Your Next Steps:</h3>
              <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Complete your profile setup for personalized care</li>
                <li style="margin-bottom: 8px;">Explore our comprehensive service offerings</li>
                <li style="margin-bottom: 8px;">Contact our team if you need any assistance</li>
              </ul>
            </div>
            
            <!-- Contact Info -->
            <div style="background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📞 Need Help?</h3>
              <p style="color: #475569; line-height: 1.6; margin: 0;">We're here to support you every step of the way</p>
              <div style="margin-top: 15px;">
                <p style="color: #475569; margin: 5px 0;"><strong>📱 Phone/WhatsApp:</strong> +263 710708027</p>
                <p style="color: #475569; margin: 5px 0;"><strong>✉️ Email:</strong> info@lucernaandsternhealth.co.zw</p>
                <p style="color: #475569; margin: 5px 0;"><strong>📍 Address:</strong> 6 Chelmsford Road, Belgravia, Harare</p>
              </div>
            </div>
            
            <p style="color: #475569; margin-top: 40px; text-align: center; font-style: italic;">Thank you for choosing Lucerna & Stern Health for your care needs.</p>
            <p style="color: #475569; margin-top: 20px; text-align: center;">Best regards,<br><strong style="color: #1e40af;">The Lucerna & Stern Health Team</strong></p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px;">
            <p style="margin: 0;">© 2025 Lucerna & Stern Health. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Professional care services with Zimbabwean heart</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Booking notifications
  bookingCreated: (clientName: string, carerName: string, serviceType: string, date: string): EmailTemplate => ({
    subject: `New Booking Created - ${serviceType}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmed - Lucerna & Stern Health</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">✅</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Booking Confirmed</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Your care is scheduled</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 600;">Dear ${clientName},</p>
            <p style="color: #475569; line-height: 1.7; font-size: 16px; margin-bottom: 30px;">Great news! Your booking has been successfully created and confirmed. We're excited to provide you with exceptional care.</p>
            
            <!-- Booking Details Card -->
            <div style="background: linear-gradient(135deg, #f0fdf4, #dcfce7); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h3 style="color: #059669; margin-top: 0; margin-bottom: 20px; font-size: 20px; font-weight: 600;">📅 Booking Details</h3>
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 20px; margin-right: 10px;">🏥</span>
                  <div>
                    <strong style="color: #059669;">Service:</strong>
                    <span style="color: #475569; margin-left: 8px;">${serviceType}</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 20px; margin-right: 10px;">👩‍⚕️</span>
                  <div>
                    <strong style="color: #059669;">Assigned Carer:</strong>
                    <span style="color: #475569; margin-left: 8px;">${carerName}</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 20px; margin-right: 10px;">📅</span>
                  <div>
                    <strong style="color: #059669;">Scheduled Date:</strong>
                    <span style="color: #475569; margin-left: 8px;">${date}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div style="background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 30px 0;">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📞 What Happens Next?</h3>
              <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Your carer will contact you before the scheduled time</li>
                <li style="margin-bottom: 8px;">We'll confirm all details and answer any questions</li>
                <li style="margin-bottom: 8px;">Care will be provided as scheduled</li>
              </ul>
            </div>
            
            <p style="color: #475569; margin-top: 40px; text-align: center;">Best regards,<br><strong style="color: #059669;">The Lucerna & Stern Health Team</strong></p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px;">
            <p style="margin: 0;">© 2025 Lucerna & Stern Health. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Professional care services with Zimbabwean heart</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  bookingAccepted: (clientName: string, carerName: string, serviceType: string, date: string): EmailTemplate => ({
    subject: `Booking Accepted - ${carerName} will provide your care`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Booking Accepted</h1>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Dear ${clientName},</p>
          <p style="color: #475569; line-height: 1.6;">Great news! Your booking has been accepted by ${carerName}.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #a855f7;">
            <h3 style="color: #7c3aed; margin-top: 0;">Confirmed Details:</h3>
            <ul style="color: #475569; list-style: none; padding: 0;">
              <li style="margin: 8px 0;"><strong>Service:</strong> ${serviceType}</li>
              <li style="margin: 8px 0;"><strong>Carer:</strong> ${carerName}</li>
              <li style="margin: 8px 0;"><strong>Date:</strong> ${date}</li>
            </ul>
          </div>
          <p style="color: #475569; line-height: 1.6;">Your carer will contact you before the scheduled time to confirm details and answer any questions.</p>
          <p style="color: #475569; margin-top: 30px;">Best regards,<br><strong>The Lucerna & Stern Health Team</strong></p>
        </div>
      </div>
    `
  }),

  // Payment notifications
  paymentReceived: (clientName: string, amount: string, serviceType: string): EmailTemplate => ({
    subject: `Payment Received - ${serviceType}`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Payment Received</h1>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Dear ${clientName},</p>
          <p style="color: #475569; line-height: 1.6;">We have successfully received your payment.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
            <h3 style="color: #dc2626; margin-top: 0;">Payment Details:</h3>
            <ul style="color: #475569; list-style: none; padding: 0;">
              <li style="margin: 8px 0;"><strong>Amount:</strong> ${amount}</li>
              <li style="margin: 8px 0;"><strong>Service:</strong> ${serviceType}</li>
              <li style="margin: 8px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>
          </div>
          <p style="color: #475569; line-height: 1.6;">Thank you for your payment. Your service will proceed as scheduled.</p>
          <p style="color: #475569; margin-top: 30px;">Best regards,<br><strong>The Lucerna & Stern Health Team</strong></p>
        </div>
      </div>
    `
  }),

  // Profile updates
  profileUpdated: (name: string, userType: string): EmailTemplate => ({
    subject: `Profile Updated - ${userType} Account`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ea580c, #f97316); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Profile Updated</h1>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Dear ${name},</p>
          <p style="color: #475569; line-height: 1.6;">Your ${userType.toLowerCase()} profile has been successfully updated.</p>
          <p style="color: #475569; line-height: 1.6;">The changes have been saved and are now active in your account.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f97316;">
            <h3 style="color: #ea580c; margin-top: 0;">What's Next?</h3>
            <ul style="color: #475569;">
              <li>Review your updated information</li>
              <li>Continue using our services</li>
              <li>Contact us if you need further assistance</li>
            </ul>
          </div>
          <p style="color: #475569; margin-top: 30px;">Best regards,<br><strong>The Lucerna & Stern Health Team</strong></p>
        </div>
      </div>
    `
  }),

  // Admin notifications
  newUserRegistered: (userType: string, userName: string, userEmail: string): EmailTemplate => ({
    subject: `New ${userType} Registration - ${userName}`,
    htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">New User Registration</h1>
        </div>
        <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px;">Admin Notification</p>
          <p style="color: #475569; line-height: 1.6;">A new ${userType.toLowerCase()} has registered on the platform.</p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #374151;">
            <h3 style="color: #1f2937; margin-top: 0;">User Details:</h3>
            <ul style="color: #475569; list-style: none; padding: 0;">
              <li style="margin: 8px 0;"><strong>Name:</strong> ${userName}</li>
              <li style="margin: 8px 0;"><strong>Email:</strong> ${userEmail}</li>
              <li style="margin: 8px 0;"><strong>Type:</strong> ${userType}</li>
              <li style="margin: 8px 0;"><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>
          </div>
          <p style="color: #475569; line-height: 1.6;">Please review the new registration in your admin dashboard.</p>
          <p style="color: #475569; margin-top: 30px;">Best regards,<br><strong>Lucerna & Stern Health System</strong></p>
        </div>
      </div>
    `
  }),

  // Password reset
  passwordReset: (name: string, resetLink: string): EmailTemplate => ({
    subject: 'Password Reset Request - Lucerna & Stern Health',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Lucerna & Stern Health</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">🔐</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Password Reset Request</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Secure your account</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 600;">Dear ${name},</p>
            <p style="color: #475569; line-height: 1.7; font-size: 16px; margin-bottom: 20px;">We received a request to reset your password for your Lucerna & Stern Health account.</p>
            <p style="color: #475569; line-height: 1.7; font-size: 16px; margin-bottom: 30px;">Click the button below to reset your password. This link will expire in 1 hour for security reasons.</p>
            
            <!-- Reset Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 6px rgba(220, 38, 38, 0.3);">Reset My Password</a>
            </div>
            
            <!-- Security Notice -->
            <div style="background: #fef2f2; padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #ef4444; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h3 style="color: #dc2626; margin-top: 0; margin-bottom: 15px; font-size: 18px; font-weight: 600;">🔒 Security Notice</h3>
              <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">This link expires in 1 hour</li>
                <li style="margin-bottom: 8px;">If you didn't request this reset, please ignore this email</li>
                <li style="margin-bottom: 8px;">Never share your password with anyone</li>
                <li style="margin-bottom: 8px;">Contact us immediately if you suspect unauthorized access</li>
              </ul>
            </div>
            
            <p style="color: #475569; margin-top: 40px; text-align: center; font-style: italic;">If the button doesn't work, copy and paste this link into your browser:</p>
            <p style="color: #3b82f6; margin-top: 10px; text-align: center; word-break: break-all; font-size: 14px;">${resetLink}</p>
            
            <p style="color: #475569; margin-top: 40px; text-align: center;">Best regards,<br><strong style="color: #dc2626;">The Lucerna & Stern Health Team</strong></p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px;">
            <p style="margin: 0;">© 2025 Lucerna & Stern Health. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Professional care services with Zimbabwean heart</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Password changed confirmation
  passwordChanged: (name: string): EmailTemplate => ({
    subject: 'Password Changed Successfully - Lucerna & Stern Health',
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed - Lucerna & Stern Health</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">✅</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Password Changed Successfully</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Your account is secure</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 600;">Dear ${name},</p>
            <p style="color: #475569; line-height: 1.7; font-size: 16px; margin-bottom: 20px;">Your password has been successfully changed for your Lucerna & Stern Health account.</p>
            <p style="color: #475569; line-height: 1.7; font-size: 16px; margin-bottom: 30px;">If you made this change, no further action is required. Your account remains secure.</p>
            
            <!-- Security Notice -->
            <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #10b981; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h3 style="color: #059669; margin-top: 0; margin-bottom: 15px; font-size: 18px; font-weight: 600;">🛡️ Security Reminder</h3>
              <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">If you didn't make this change, contact us immediately</li>
                <li style="margin-bottom: 8px;">Use a strong, unique password</li>
                <li style="margin-bottom: 8px;">Never share your login credentials</li>
                <li style="margin-bottom: 8px;">Log out from shared devices</li>
              </ul>
            </div>
            
            <p style="color: #475569; margin-top: 40px; text-align: center;">Best regards,<br><strong style="color: #059669;">The Lucerna & Stern Health Team</strong></p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px;">
            <p style="margin: 0;">© 2025 Lucerna & Stern Health. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Professional care services with Zimbabwean heart</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // Booking cancellation
  bookingCancelled: (clientName: string, carerName: string, serviceType: string, date: string): EmailTemplate => ({
    subject: `Booking Cancelled - ${serviceType}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Cancelled - Lucerna & Stern Health</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ea580c, #f97316); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">❌</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Booking Cancelled</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Service update notification</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 600;">Dear ${clientName},</p>
            <p style="color: #475569; line-height: 1.7; font-size: 16px; margin-bottom: 30px;">We're writing to inform you that your booking has been cancelled.</p>
            
            <!-- Booking Details Card -->
            <div style="background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #f59e0b; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h3 style="color: #d97706; margin-top: 0; margin-bottom: 20px; font-size: 20px; font-weight: 600;">📅 Cancelled Booking Details</h3>
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 20px; margin-right: 10px;">🏥</span>
                  <div>
                    <strong style="color: #d97706;">Service:</strong>
                    <span style="color: #475569; margin-left: 8px;">${serviceType}</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 12px;">
                  <span style="font-size: 20px; margin-right: 10px;">👩‍⚕️</span>
                  <div>
                    <strong style="color: #d97706;">Carer:</strong>
                    <span style="color: #475569; margin-left: 8px;">${carerName}</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center;">
                  <span style="font-size: 20px; margin-right: 10px;">📅</span>
                  <div>
                    <strong style="color: #d97706;">Scheduled Date:</strong>
                    <span style="color: #475569; margin-left: 8px;">${date}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Next Steps -->
            <div style="background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 30px 0;">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📞 What's Next?</h3>
              <ul style="color: #475569; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">If you need to reschedule, please contact us</li>
                <li style="margin-bottom: 8px;">Any payments made will be refunded if applicable</li>
                <li style="margin-bottom: 8px;">We're here to help with alternative arrangements</li>
              </ul>
            </div>
            
            <p style="color: #475569; margin-top: 40px; text-align: center;">Best regards,<br><strong style="color: #ea580c;">The Lucerna & Stern Health Team</strong></p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px;">
            <p style="margin: 0;">© 2025 Lucerna & Stern Health. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Professional care services with Zimbabwean heart</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  // General notifications
  generalNotification: (name: string, title: string, message: string): EmailTemplate => ({
    subject: title,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">💌</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">${title}</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Lucerna & Stern Health</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 600;">Dear ${name},</p>
            
            <!-- Message Card -->
            <div style="background: linear-gradient(135deg, #f8fafc, #e2e8f0); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #3b82f6; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <p style="color: #475569; line-height: 1.7; margin: 0; font-size: 16px;">${message}</p>
            </div>
            
            <!-- Contact Info -->
            <div style="background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📞 Contact Us</h3>
              <div style="margin-top: 15px;">
                <p style="color: #475569; margin: 5px 0;"><strong>📱 Phone/WhatsApp:</strong> +263 710708027</p>
                <p style="color: #475569; margin: 5px 0;"><strong>✉️ Email:</strong> info@lucernaandsternhealth.co.zw</p>
                <p style="color: #475569; margin: 5px 0;"><strong>📍 Address:</strong> 6 Chelmsford Road, Belgravia, Harare</p>
              </div>
            </div>
            
            <p style="color: #475569; margin-top: 40px; text-align: center;">Best regards,<br><strong style="color: #1e40af;">The Lucerna & Stern Health Team</strong></p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px;">
            <p style="margin: 0;">© 2025 Lucerna & Stern Health. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Professional care services with Zimbabwean heart</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  technicalIssueNotification: (reporterName: string, subject: string, priority: string, description: string, issueId: string) => ({
    subject: `Technical Issue #${issueId}: ${subject}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Technical Issue Report</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
            <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 32px;">🔧</span>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Technical Issue Report</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Issue ID: #${issueId}</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 600;">New technical issue reported by ${reporterName}</p>
            
            <!-- Issue Details -->
            <div style="background: #fef2f2; padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #dc2626; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
              <h3 style="color: #dc2626; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📋 Issue Details</h3>
              <p style="color: #374151; margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="color: #374151; margin: 10px 0;"><strong>Priority:</strong> <span style="background: ${priority === 'CRITICAL' ? '#dc2626' : priority === 'HIGH' ? '#ea580c' : priority === 'MEDIUM' ? '#d97706' : '#16a34a'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">${priority}</span></p>
              <p style="color: #374151; margin: 10px 0;"><strong>Issue ID:</strong> #${issueId}</p>
              <p style="color: #374151; margin: 10px 0;"><strong>Reported:</strong> ${new Date().toLocaleString()}</p>
            </div>
            
            <!-- Description -->
            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px; font-size: 18px;">📝 Description</h3>
              <p style="color: #475569; line-height: 1.7; margin: 0; font-size: 16px; white-space: pre-wrap;">${description}</p>
            </div>
            
            <!-- Action Required -->
            <div style="background: #fef3c7; padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 5px solid #f59e0b;">
              <h3 style="color: #92400e; margin-top: 0; margin-bottom: 15px; font-size: 18px;">⚡ Action Required</h3>
              <p style="color: #92400e; margin: 0; font-size: 16px;">Please review this technical issue and respond within 2 hours for ${priority.toLowerCase()} priority issues.</p>
            </div>
            
            <p style="color: #475569; margin-top: 40px; text-align: center;">Best regards,<br><strong style="color: #1e40af;">Lucerna & Stern Health System</strong></p>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 20px 30px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px;">
            <p style="margin: 0;">© 2025 Lucerna & Stern Health. All rights reserved.</p>
            <p style="margin: 5px 0 0;">Professional care services with Zimbabwean heart</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
}

// Main email sending function
export async function sendEmail(template: EmailTemplate, options: EmailOptions): Promise<boolean> {
  try {
    console.log('Attempting to send email with Brevo API...')
    console.log('Recipients:', options.to.map(r => r.email))
    console.log('Subject:', template.subject)
    console.log('API Key loaded:', brevoApiKey ? 'Yes' : 'No')

    const sendSmtpEmail = new brevo.SendSmtpEmail()

    sendSmtpEmail.subject = template.subject
    sendSmtpEmail.htmlContent = template.htmlContent
    sendSmtpEmail.textContent = template.textContent || template.htmlContent.replace(/<[^>]*>/g, '')

    sendSmtpEmail.sender = {
      name: 'Lucerna & Stern Health',
      email: 'info@lucernaandsternhealth.co.zw'
    }

    sendSmtpEmail.to = options.to
    if (options.cc) sendSmtpEmail.cc = options.cc
    if (options.bcc) sendSmtpEmail.bcc = options.bcc
    if (options.replyTo) sendSmtpEmail.replyTo = options.replyTo
    if (options.attachments) sendSmtpEmail.attachment = options.attachments

    console.log('Sending email via Brevo API...')
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log('Email sent successfully:', result.body?.messageId || 'No message ID returned')
    return true
  } catch (error: any) {
    console.error('Email sending failed:', error)
    console.error('Error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message
    })
    return false
  }
}

// Convenience functions for common email types
export const emailService = {
  // User management
  sendWelcomeEmail: async (email: string, name: string, userType: string) => {
    const template = emailTemplates.welcome(name, userType)
    return await sendEmail(template, {
      to: [{ email, name }]
    })
  },

  sendProfileUpdateEmail: async (email: string, name: string, userType: string) => {
    const template = emailTemplates.profileUpdated(name, userType)
    return await sendEmail(template, {
      to: [{ email, name }]
    })
  },

  // Booking management
  sendBookingCreatedEmail: async (clientEmail: string, clientName: string, carerName: string, serviceType: string, date: string) => {
    const template = emailTemplates.bookingCreated(clientName, carerName, serviceType, date)
    return await sendEmail(template, {
      to: [{ email: clientEmail, name: clientName }]
    })
  },

  sendBookingAcceptedEmail: async (clientEmail: string, clientName: string, carerName: string, serviceType: string, date: string) => {
    const template = emailTemplates.bookingAccepted(clientName, carerName, serviceType, date)
    return await sendEmail(template, {
      to: [{ email: clientEmail, name: clientName }]
    })
  },

  // Payment notifications
  sendPaymentReceivedEmail: async (clientEmail: string, clientName: string, amount: string, serviceType: string) => {
    const template = emailTemplates.paymentReceived(clientName, amount, serviceType)
    return await sendEmail(template, {
      to: [{ email: clientEmail, name: clientName }]
    })
  },

  // Admin notifications
  sendNewUserNotification: async (adminEmail: string, userType: string, userName: string, userEmail: string) => {
    const template = emailTemplates.newUserRegistered(userType, userName, userEmail)
    return await sendEmail(template, {
      to: [{ email: adminEmail, name: 'Admin' }]
    })
  },

  // Password management
  sendPasswordResetEmail: async (email: string, name: string, resetLink: string) => {
    const template = emailTemplates.passwordReset(name, resetLink)
    return await sendEmail(template, {
      to: [{ email, name }]
    })
  },

  sendPasswordChangedEmail: async (email: string, name: string) => {
    const template = emailTemplates.passwordChanged(name)
    return await sendEmail(template, {
      to: [{ email, name }]
    })
  },

  // Booking management
  sendBookingCancelledEmail: async (clientEmail: string, clientName: string, carerName: string, serviceType: string, date: string) => {
    const template = emailTemplates.bookingCancelled(clientName, carerName, serviceType, date)
    return await sendEmail(template, {
      to: [{ email: clientEmail, name: clientName }]
    })
  },

  // General notifications
  sendGeneralNotification: async (email: string, name: string, title: string, message: string) => {
    const template = emailTemplates.generalNotification(name, title, message)
    return await sendEmail(template, {
      to: [{ email, name }]
    })
  },

  // Technical support
  sendTechnicalIssueNotification: async (adminEmail: string, reporterName: string, subject: string, priority: string, description: string, issueId: string) => {
    const template = emailTemplates.technicalIssueNotification(reporterName, subject, priority, description, issueId)
    return await sendEmail(template, {
      to: [{ email: adminEmail, name: 'Technical Support' }]
    })
  }
}
