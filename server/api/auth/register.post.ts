import { hash, compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email, password, firstName, lastName, phone, role = 'CLIENT' } = body

        // Validation
        if (!email || !password || !firstName || !lastName) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Missing required fields'
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

        // Password strength validation
        if (password.length < 8) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Password must be at least 8 characters long'
            })
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'User with this email already exists'
            })
        }

        // Hash password
        const hashedPassword = await hash(password, 12)

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                lastName,
                phone,
                role,
                whatsapp: false
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

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        )

        // Send welcome email (optional)
        // await sendWelcomeEmail(user.email, user.firstName)

        return {
            success: true,
            message: 'User registered successfully',
            user,
            token
        }

    } catch (error) {
        console.error('Registration error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during registration'
        })
    }
})