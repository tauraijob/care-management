import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getPrisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { email, password } = body

        // Validation
        if (!email || !password) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email and password are required'
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

        // Find user by email
        const prisma = await getPrisma()
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                firstName: true,
                lastName: true,
                role: true,
                phone: true,
                whatsapp: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'The email or password you entered is incorrect. Please check your credentials and try again.'
            })
        }

        // Verify password
        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
            // Log failed login attempt
            console.log(`Failed login attempt for email: ${email}`)

            throw createError({
                statusCode: 401,
                statusMessage: 'The email or password you entered is incorrect. Please check your credentials and try again.'
            })
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
                iat: Math.floor(Date.now() / 1000)
            },
            process.env.JWT_SECRET || 'your-secret-key',
            {
                expiresIn: '7d',
                issuer: 'lucerna-health',
                audience: 'lucerna-users'
            }
        )

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user

        // Log successful login
        console.log(`Successful login for user: ${user.email} (${user.role})`)

        // Create audit log entry (optional)
        // await createAuditLog({
        //   userId: user.id,
        //   action: 'LOGIN',
        //   details: { ip: getClientIP(event), userAgent: getUserAgent(event) }
        // })

        return {
            success: true,
            message: 'Login successful',
            user: userWithoutPassword,
            token
        }

    } catch (error) {
        console.error('Login error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during login'
        })
    }
})

// Helper function to get client IP
function getClientIP(event: any) {
    return event.node.req.headers['x-forwarded-for'] ||
        event.node.req.connection.remoteAddress ||
        event.node.req.socket.remoteAddress
}

// Helper function to get user agent
function getUserAgent(event: any) {
    return event.node.req.headers['user-agent'] || 'Unknown'
}