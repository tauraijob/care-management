export default defineNuxtRouteMiddleware(async (to) => {
    // Only run middleware on client side to avoid SSR issues with cookies
    if (process.server) {
        return
    }

    const { user, isAuthenticated, checkAuth, isAdmin, isClient, isCarer } = useAuth()

    // Define public routes that don't require authentication
    const publicRoutes = [
        '/',
        '/login',
        '/register',
        '/about',
        '/services',
        '/contact',
        '/technology',
        '/blog',
        '/support',
        '/staying-connected',
        '/pay'
    ]

    // Define public route patterns (for dynamic routes like services and conditions)
    const publicRoutePatterns = [
        /^\/services\/.*$/,  // All service pages
        /^\/conditions\/.*$/ // All condition pages
    ]

    // Get the base path without hash fragments
    const basePath = to.path.split('#')[0]

    // Skip middleware for public routes
    if (publicRoutes.includes(basePath)) {
        return
    }

    // Skip middleware for public route patterns
    for (const pattern of publicRoutePatterns) {
        if (pattern.test(basePath)) {
            return
        }
    }

    // Check if user is authenticated
    const authenticated = await checkAuth()

    // If not authenticated and trying to access protected route
    if (!authenticated) {
        // Store the intended destination for redirect after login
        const authCookie = useCookie('auth-redirect')
        authCookie.value = to.fullPath

        // Redirect to login
        return navigateTo('/login')
    }

    // Check role-based access for protected routes
    if (to.path.startsWith('/admin') && !isAdmin()) {
        return navigateTo('/login')
    }

    if (to.path.startsWith('/client') && !isClient()) {
        return navigateTo('/login')
    }

    if (to.path.startsWith('/carer') && !isCarer()) {
        return navigateTo('/login')
    }

    // Add security headers
    if (process.client) {
        const meta = document.createElement('meta')
        meta.httpEquiv = 'X-Frame-Options'
        meta.content = 'DENY'
        document.head.appendChild(meta)
    }
})