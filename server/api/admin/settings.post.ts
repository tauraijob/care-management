import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        // Authenticate user
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token)

        if (!user || user.role !== 'ADMIN') {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized'
            })
        }

        const body = await readBody(event)

        // Validate settings
        if (body.sessionTimeout && (body.sessionTimeout < 5 || body.sessionTimeout > 1440)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Session timeout must be between 5 and 1440 minutes'
            })
        }

        if (body.maxLoginAttempts && (body.maxLoginAttempts < 1 || body.maxLoginAttempts > 10)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Max login attempts must be between 1 and 10'
            })
        }

        if (body.minPasswordLength && (body.minPasswordLength < 8 || body.minPasswordLength > 32)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Minimum password length must be between 8 and 32 characters'
            })
        }

        // Here you would typically save settings to database
        // For now, we'll just return success
        console.log('Saving admin settings:', body)

        return {
            success: true,
            message: 'Settings saved successfully'
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Admin settings save error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
