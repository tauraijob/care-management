import { hash } from 'bcrypt'
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
        const { firstName, lastName, phone, whatsapp } = body

        // Validation
        if (!firstName || !lastName) {
            throw createError({
                statusCode: 400,
                statusMessage: 'First name and last name are required'
            })
        }

        // Phone validation (optional)
        if (phone) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
            if (!phoneRegex.test(phone)) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Invalid phone number format'
                })
            }
        }

        // Update user profile
        const prisma = await getPrisma()
        const updatedUser = await prisma.user.update({
            where: { id: decoded.userId },
            data: {
                firstName,
                lastName,
                phone: phone || null,
                whatsapp: whatsapp || false,
                updatedAt: new Date()
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                phone: true,
                whatsapp: true,
                createdAt: true,
                updatedAt: true
            }
        })

        // Log profile update
        console.log(`Profile updated for user: ${updatedUser.email}`)

        return {
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        }

    } catch (error) {
        console.error('Profile update error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during profile update'
        })
    }
}) 