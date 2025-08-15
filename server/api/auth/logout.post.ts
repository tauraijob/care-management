import { deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        // Clear the session cookie
        deleteCookie(event, 'auth-token')

        return {
            success: true,
            message: 'Logged out successfully'
        }
    } catch (error) {
        console.error('Logout error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during logout'
        })
    }
}) 