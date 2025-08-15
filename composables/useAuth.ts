import { ref, readonly } from 'vue'

interface User {
    id: string
    email: string
    role: 'ADMIN' | 'CLIENT' | 'CARER'
    firstName: string
    lastName: string
    phone?: string
    whatsapp: boolean
    createdAt: string
    updatedAt: string
}

// Create singleton state
const user = ref<User | null>(null)
const isAuthenticated = ref(false)
const isLoading = ref(false)
const permissions = ref<string[]>([])

// Role-based permissions mapping
const rolePermissions = {
    ADMIN: [
        'manage_users',
        'manage_carers',
        'manage_content',
        'manage_payments',
        'manage_care_plans',
        'view_analytics',
        'export_data',
        'system_settings'
    ],
    CLIENT: [
        'book_care',
        'view_patients',
        'view_care_logs',
        'view_documents',
        'make_payments',
        'send_messages',
        'view_notifications'
    ],
    CARER: [
        'view_assignments',
        'log_care_activities',
        'update_medication',
        'view_patient_info',
        'send_messages',
        'view_schedule'
    ]
}

// Get user from token stored in cookie
const getUser = async () => {
    const token = useCookie('auth-token').value

    if (!token) {
        user.value = null
        isAuthenticated.value = false
        permissions.value = []
        return null
    }

    try {
        isLoading.value = true
        const response = await $fetch('/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        user.value = response.user
        isAuthenticated.value = true
        permissions.value = rolePermissions[response.user.role] || []
        return response.user
    } catch (error) {
        console.error('getUser: Failed to get user:', error)
        user.value = null
        isAuthenticated.value = false
        permissions.value = []
        // Clear invalid token
        const authCookie = useCookie('auth-token')
        authCookie.value = null
        return null
    } finally {
        isLoading.value = false
    }
}

// Login function with enhanced security
const login = async (email: string, password: string) => {
    try {
        isLoading.value = true

        // Basic validation
        if (!email || !password) {
            throw new Error('Email and password are required')
        }

        const response = await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email, password }
        })

        // Set the token in cookie with security options
        const authCookie = useCookie('auth-token', {
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
            httpOnly: false // Allow client-side access
        })
        authCookie.value = response.token

        // Set user data and permissions
        user.value = response.user
        isAuthenticated.value = true
        permissions.value = rolePermissions[response.user.role] || []

        return { success: true, user: response.user }
    } catch (error: any) {
        console.error('useAuth: Login failed:', error)

        // Extract user-friendly error message from the API response
        let errorMessage = 'Login failed. Please try again.'

        if (error.data?.statusMessage) {
            // Use the statusMessage from the API response
            errorMessage = error.data.statusMessage
        } else if (error.statusMessage) {
            // Fallback to statusMessage if data is not available
            errorMessage = error.statusMessage
        } else if (error.message) {
            // Fallback to general error message
            errorMessage = error.message
        }

        return { success: false, error: errorMessage }
    } finally {
        isLoading.value = false
    }
}

// Register function for new users
const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
    role?: 'CLIENT' | 'CARER'
}) => {
    try {
        isLoading.value = true

        const response = await $fetch('/api/auth/register', {
            method: 'POST',
            body: userData
        })

        return { success: true, user: response.user }
    } catch (error) {
        console.error('Registration failed:', error)
        return { success: false, error: error.message || 'Registration failed' }
    } finally {
        isLoading.value = false
    }
}

// Logout function with enhanced cleanup
const logout = async () => {
    try {
        // Call logout API to invalidate token on server
        await $fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${useCookie('auth-token').value}`
            }
        })
    } catch (error) {
        console.error('Logout error:', error)
    } finally {
        // Clear user data, token, and permissions
        user.value = null
        isAuthenticated.value = false
        permissions.value = []
        const authCookie = useCookie('auth-token')
        authCookie.value = null
    }
}

// Check if user has specific permission
const hasPermission = (permission: string) => {
    return permissions.value.includes(permission)
}

// Check if user has any of the specified permissions
const hasAnyPermission = (permissionList: string[]) => {
    return permissionList.some(permission => permissions.value.includes(permission))
}

// Check if user has all specified permissions
const hasAllPermissions = (permissionList: string[]) => {
    return permissionList.every(permission => permissions.value.includes(permission))
}

// Check if user is admin
const isAdmin = () => {
    return user.value?.role === 'ADMIN'
}

// Check if user is client
const isClient = () => {
    return user.value?.role === 'CLIENT'
}

// Check if user is carer
const isCarer = () => {
    return user.value?.role === 'CARER'
}

// Check if user is authenticated
const checkAuth = async () => {
    const token = useCookie('auth-token').value

    // If no token, user is not authenticated
    if (!token) {
        return false
    }

    // If no user data but we have a token, try to get user data
    if (!user.value) {
        await getUser()
    }

    return isAuthenticated.value
}

// Initialize auth state
const init = async () => {
    const result = await getUser()
    return result
}

// Refresh user data
const refreshUser = async () => {
    return await getUser()
}

// Update user profile
const updateProfile = async (profileData: Partial<User>) => {
    try {
        isLoading.value = true
        const response = await $fetch('/api/auth/profile', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${useCookie('auth-token').value}`
            },
            body: profileData
        })

        user.value = response.user
        return { success: true, user: response.user }
    } catch (error) {
        console.error('Profile update failed:', error)
        return { success: false, error: error.message || 'Profile update failed' }
    } finally {
        isLoading.value = false
    }
}

// Change password
const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
        isLoading.value = true
        const response = await $fetch('/api/auth/change-password', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${useCookie('auth-token').value}`
            },
            body: { currentPassword, newPassword }
        })

        return { success: true }
    } catch (error) {
        console.error('Password change failed:', error)
        return { success: false, error: error.message || 'Password change failed' }
    } finally {
        isLoading.value = false
    }
}

export const useAuth = () => {
    return {
        user: readonly(user),
        isAuthenticated: readonly(isAuthenticated),
        isLoading: readonly(isLoading),
        permissions: readonly(permissions),
        login,
        register,
        logout,
        getUser,
        checkAuth,
        init,
        refreshUser,
        updateProfile,
        changePassword,
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        isAdmin,
        isClient,
        isCarer
    }
}