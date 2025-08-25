import { hash, compare } from 'bcrypt'
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
        const { currentPassword, newPassword } = body

        // Validation
        if (!currentPassword || !newPassword) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Current password and new password are required'
            })
        }

        // Password strength validation
        if (newPassword.length < 8) {
            throw createError({
                statusCode: 400,
                statusMessage: 'New password must be at least 8 characters long'
            })
        }

        // Check if new password is different from current
        if (currentPassword === newPassword) {
            throw createError({
                statusCode: 400,
                statusMessage: 'New password must be different from current password'
            })
        }

        // Get current user with password
        const prisma = await getPrisma()
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                password: true
            }
        })

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })
        }

        // Verify current password
        const isCurrentPasswordValid = await compare(currentPassword, user.password)
        if (!isCurrentPasswordValid) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Current password is incorrect'
            })
        }

        // Hash new password
        const hashedNewPassword = await hash(newPassword, 12)

        // Update password
        await prisma.user.update({
            where: { id: decoded.userId },
            data: {
                password: hashedNewPassword,
                updatedAt: new Date()
            }
        })

        // Log password change
        console.log(`Password changed for user: ${user.email}`)

        // Invalidate all existing tokens (optional - for enhanced security)
        // This would require implementing a token blacklist or using shorter token expiry

        return {
            success: true,
            message: 'Password changed successfully'
        }

    } catch (error) {
        console.error('Password change error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during password change'
        })
    }
}) 