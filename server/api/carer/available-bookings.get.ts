import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token)

        if (!user || user.role !== 'CARER') {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const query = getQuery(event)
        const { serviceType, dateRange, rateRange, search } = query

        // Build where clause for available bookings (unassigned)
        let whereClause: any = {
            carerId: null, // Unassigned bookings
            status: { in: ['PENDING', 'CONFIRMED'] } // Only pending/confirmed bookings
        }

        // Filter by service type
        if (serviceType && serviceType !== '') {
            whereClause.careType = {
                contains: serviceType,
                mode: 'insensitive'
            }
        }

        // Filter by date range
        if (dateRange && dateRange !== '') {
            const today = new Date()
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)

            switch (dateRange) {
                case 'today':
                    whereClause.startDate = {
                        gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
                        lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
                    }
                    break
                case 'tomorrow':
                    whereClause.startDate = {
                        gte: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()),
                        lt: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1)
                    }
                    break
                case 'week':
                    const weekFromNow = new Date(today)
                    weekFromNow.setDate(weekFromNow.getDate() + 7)
                    whereClause.startDate = {
                        gte: today,
                        lte: weekFromNow
                    }
                    break
                case 'next-week':
                    const nextWeekStart = new Date(today)
                    nextWeekStart.setDate(nextWeekStart.getDate() + 7)
                    const nextWeekEnd = new Date(nextWeekStart)
                    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7)
                    whereClause.startDate = {
                        gte: nextWeekStart,
                        lte: nextWeekEnd
                    }
                    break
            }
        }

        // Filter by rate range (if hourlyRate field exists)
        if (rateRange && rateRange !== '') {
            const [minRate, maxRate] = rateRange.split('-').map(Number)
            if (maxRate) {
                whereClause.hourlyRate = {
                    gte: minRate,
                    lte: maxRate
                }
            } else {
                whereClause.hourlyRate = {
                    gte: minRate
                }
            }
        }

        // Search filter
        if (search && search !== '') {
            whereClause.OR = [
                {
                    patient: {
                        OR: [
                            { firstName: { contains: search, mode: 'insensitive' } },
                            { lastName: { contains: search, mode: 'insensitive' } }
                        ]
                    }
                },
                {
                    location: { contains: search, mode: 'insensitive' }
                },
                {
                    careType: { contains: search, mode: 'insensitive' }
                }
            ]
        }

        // Fetch available bookings
        const prisma = await getPrisma()
        const availableBookings = await prisma.booking.findMany({
            where: whereClause,
            include: {
                patient: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        dateOfBirth: true,
                        address: true
                    }
                },
                client: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        phone: true,
                        email: true
                    }
                }
            },
            orderBy: {
                startDate: 'asc'
            }
        })

        // Transform data to match frontend expectations
        const transformedBookings = availableBookings.map(booking => {
            const patientAge = booking.patient?.dateOfBirth
                ? Math.floor((new Date().getTime() - new Date(booking.patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
                : 0

            return {
                id: booking.id,
                patientName: booking.patient ? `${booking.patient.firstName} ${booking.patient.lastName}` : 'Unknown Patient',
                age: patientAge,
                serviceType: booking.careType || 'General Care',
                date: booking.startDate,
                startTime: booking.startTime || '09:00',
                endTime: booking.endTime || '17:00',
                duration: booking.duration || 4,
                location: booking.location || booking.patient?.address || 'Location not specified',
                hourlyRate: booking.hourlyRate || 30,
                preferredGender: booking.preferredGender || 'Any',
                requirements: booking.requirements || '',
                urgency: booking.urgency || null,
                notes: booking.notes || '',
                patient: booking.patient,
                client: booking.client
            }
        })

        // Calculate statistics
        const elderlyCareCount = transformedBookings.filter(booking =>
            booking.serviceType.toLowerCase().includes('elderly')
        ).length

        const medicalCareCount = transformedBookings.filter(booking =>
            booking.serviceType.toLowerCase().includes('medical')
        ).length

        const averageRate = transformedBookings.length > 0
            ? Math.round(transformedBookings.reduce((sum, booking) => sum + booking.hourlyRate, 0) / transformedBookings.length)
            : 0

        return {
            success: true,
            bookings: transformedBookings,
            stats: {
                totalJobs: transformedBookings.length,
                elderlyCareCount,
                medicalCareCount,
                averageRate
            }
        }
    } catch (error: any) {
        if (error.statusCode) {
            throw error
        }

        console.error('Available bookings error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error'
        })
    }
})
