import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const user = await getUserFromToken(token)
        if (!user || user.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

        // Completion Rate
        const totalBookings = await prisma.booking.count()
        const completedBookings = await prisma.booking.count({ where: { status: 'COMPLETED' } })
        const completionRate = totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(1) : '0.0'

        // Average Response Time (simulated as difference between booking creation and confirmation)
        const confirmedBookings = await prisma.booking.findMany({ where: { status: 'CONFIRMED' }, select: { createdAt: true, updatedAt: true } })
        let avgResponseTime = 0
        if (confirmedBookings.length > 0) {
            const totalResponseTime = confirmedBookings.reduce((sum, b) => sum + ((b.updatedAt.getTime() - b.createdAt.getTime()) / (1000 * 60 * 60)), 0)
            avgResponseTime = (totalResponseTime / confirmedBookings.length).toFixed(1)
        }

        // Carer Utilization (percentage of carers with at least one booking)
        const totalCarers = await prisma.user.count({ where: { role: 'CARER' } })
        const activeCarers = await prisma.booking.groupBy({ by: ['carerId'], where: { carerId: { not: null } }, _count: true })
        const utilizedCarers = activeCarers.filter(c => c.carerId).length
        const carerUtilization = totalCarers > 0 ? ((utilizedCarers / totalCarers) * 100).toFixed(1) : '0.0'

        // Top Carers by completion rate
        const carers = await prisma.user.findMany({ where: { role: 'CARER' }, select: { id: true, firstName: true, lastName: true } })
        const carerStats = await Promise.all(carers.map(async carer => {
            const bookings = await prisma.booking.findMany({ where: { carerId: carer.id } })
            const completed = bookings.filter(b => b.status === 'COMPLETED').length
            const completionRate = bookings.length > 0 ? ((completed / bookings.length) * 100).toFixed(1) : '0.0'
            return {
                id: carer.id,
                name: `${carer.firstName} ${carer.lastName}`,
                initials: `${carer.firstName[0]}${carer.lastName[0]}`,
                specialty: 'General Care', // Placeholder, update if you have specialties
                completionRate,
                bookings: bookings.length
            }
        }))
        const topCarers = carerStats.sort((a, b) => parseFloat(b.completionRate) - parseFloat(a.completionRate)).slice(0, 4)

        // Service Performance (by careType)
        const careTypes = ['ELDERLY_CARE', 'DISABILITY_CARE', 'POST_SURGERY_CARE', 'PALLIATIVE_CARE']
        const servicePerformance = await Promise.all(careTypes.map(async type => {
            const bookings = await prisma.booking.findMany({ where: { careType: type } })
            const completed = bookings.filter(b => b.status === 'COMPLETED').length
            const completionRate = bookings.length > 0 ? ((completed / bookings.length) * 100).toFixed(1) : '0.0'
            // Simulate avgRating (if you have ratings, aggregate them here)
            const avgRating = 4.5 + Math.random() * 0.5
            return {
                name: type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                category: 'Care',
                completionRate,
                avgRating: avgRating.toFixed(1)
            }
        }))

        // Response Times by carer (simulated as above)
        const responseTimes = await Promise.all(carers.map(async carer => {
            const bookings = await prisma.booking.findMany({ where: { carerId: carer.id, status: 'CONFIRMED' }, select: { createdAt: true, updatedAt: true } })
            let avgResponseTime = 0
            if (bookings.length > 0) {
                const totalResponseTime = bookings.reduce((sum, b) => sum + ((b.updatedAt.getTime() - b.createdAt.getTime()) / (1000 * 60 * 60)), 0)
                avgResponseTime = (totalResponseTime / bookings.length).toFixed(1)
            }
            return {
                id: carer.id,
                name: `${carer.firstName} ${carer.lastName}`,
                initials: `${carer.firstName[0]}${carer.lastName[0]}`,
                avgResponseTime
            }
        }))

        // Client Satisfaction (simulated, replace with real data if available)
        const clientSatisfaction = 4.8

        return {
            data: {
                completionRate,
                avgResponseTime,
                clientSatisfaction,
                carerUtilization,
                topCarers,
                servicePerformance,
                responseTimes
            }
        }
    } catch (e) {
        throw createError({ statusCode: 500, statusMessage: e.message })
    }
})
