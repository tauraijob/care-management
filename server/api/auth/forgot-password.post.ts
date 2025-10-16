import { getPrisma } from '~/server/utils/prisma'
import { emailService } from '~/server/utils/emailService'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email } = body

        // Validation
        if (!email) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email is required'
            })
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid email format'
            })
        }

        const prisma = await getPrisma()

        // Check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        })

        // Always return success to prevent email enumeration attacks
        if (!user) {
            return {
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent.'
            }
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

        // Store reset token in database
        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry
            }
        })

        // Generate reset link
        const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

        // Send password reset email
        try {
            await emailService.sendPasswordResetEmail(
                user.email,
                user.firstName,
                resetLink
            )
        } catch (emailError) {
            console.error('Password reset email failed:', emailError)
            // Don't fail the request if email fails
        }

        return {
            success: true,
            message: 'If an account with that email exists, a password reset link has been sent.'
        }

    } catch (error) {
        console.error('Forgot password error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during password reset request'
        })
    }
})
