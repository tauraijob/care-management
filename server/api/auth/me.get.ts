import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'No token provided'
            })
        }

        const user = await getUserFromToken(token)

        if (!user) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid token'
            })
        }

        return {
            success: true,
            user
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Get user error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})