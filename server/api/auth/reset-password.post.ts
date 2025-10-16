import { hash } from 'bcrypt'
import { getPrisma } from '~/server/utils/prisma'
import { emailService } from '~/server/utils/emailService'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { token, newPassword } = body

        // Validation
        if (!token || !newPassword) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Reset token and new password are required'
            })
        }

        // Password strength validation
        if (newPassword.length < 8) {
            throw createError({
                statusCode: 400,
                statusMessage: 'New password must be at least 8 characters long'
            })
        }

        const prisma = await getPrisma()

        // Find user with valid reset token
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date() // Token must not be expired
                }
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true
            }
        })

        if (!user) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid or expired reset token'
            })
        }

        // Hash new password
        const hashedPassword = await hash(newPassword, 12)

        // Update password and clear reset token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
                updatedAt: new Date()
            }
        })

        // Send password changed confirmation email
        try {
            await emailService.sendPasswordChangedEmail(
                user.email,
                user.firstName
            )
        } catch (emailError) {
            console.error('Password changed email failed:', emailError)
            // Don't fail the request if email fails
        }

        return {
            success: true,
            message: 'Password has been reset successfully'
        }

    } catch (error) {
        console.error('Reset password error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during password reset'
        })
    }
})
