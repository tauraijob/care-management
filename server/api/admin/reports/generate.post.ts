import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const user = await getUserFromToken(token)
        if (!user || user.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

        const body = await readBody(event)
        const { type, fromDate, toDate } = body
        if (!type || !fromDate || !toDate) throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })

        // Generate report content based on type
        let content = {}
        const fromDateTime = new Date(fromDate)
        const toDateTime = new Date(toDate)
        const prisma = await getPrisma()

        switch (type) {
            case 'booking-summary':
                const bookings = await prisma.booking.findMany({
                    where: {
                        startDate: {
                            gte: fromDateTime,
                            lte: toDateTime
                        }
                    },
                    include: {
                        client: { select: { firstName: true, lastName: true } },
                        carer: { select: { firstName: true, lastName: true } },
                        patient: { select: { firstName: true, lastName: true } }
                    }
                })
                content = {
                    totalBookings: bookings.length,
                    bookings: bookings.map(b => ({
                        id: b.id,
                        client: `${b.client.firstName} ${b.client.lastName}`,
                        carer: b.carer ? `${b.carer.firstName} ${b.carer.lastName}` : 'Unassigned',
                        patient: `${b.patient.firstName} ${b.patient.lastName}`,
                        status: b.status,
                        startDate: b.startDate,
                        careType: b.careType
                    }))
                }
                break

            case 'revenue-analysis':
                const payments = await prisma.payment.findMany({
                    where: {
                        createdAt: {
                            gte: fromDateTime,
                            lte: toDateTime
                        },
                        status: 'COMPLETED'
                    },
                    include: {
                        booking: {
                            include: {
                                client: { select: { firstName: true, lastName: true } }
                            }
                        }
                    }
                })
                const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0)
                content = {
                    totalRevenue,
                    totalPayments: payments.length,
                    payments: payments.map(p => ({
                        id: p.id,
                        amount: p.amount,
                        client: `${p.booking.client.firstName} ${p.booking.client.lastName}`,
                        date: p.createdAt,
                        method: p.paymentMethod
                    }))
                }
                break

            case 'carer-performance':
                const carerLogs = await prisma.log.findMany({
                    where: {
                        createdAt: {
                            gte: fromDateTime,
                            lte: toDateTime
                        }
                    },
                    include: {
                        carer: { select: { firstName: true, lastName: true } },
                        booking: {
                            include: {
                                patient: { select: { firstName: true, lastName: true } }
                            }
                        }
                    }
                })
                content = {
                    totalLogs: carerLogs.length,
                    logs: carerLogs.map(l => ({
                        id: l.id,
                        carer: `${l.carer.firstName} ${l.carer.lastName}`,
                        patient: `${l.booking.patient.firstName} ${l.booking.patient.lastName}`,
                        visitStart: l.visitStartTime,
                        visitEnd: l.visitEndTime,
                        notes: l.notes
                    }))
                }
                break

            default:
                content = { message: 'Report type not implemented yet' }
        }

        // Create report in database
        const report = await prisma.report.create({
            data: {
                name: `${type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Report`,
                type: type.toUpperCase().replace(/-/g, '_') as any,
                dateRange: `${fromDate} - ${toDate}`,
                content,
                generatedBy: user.id,
                status: 'COMPLETED'
            },
            include: {
                generator: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        })

        return { data: { report } }
    } catch (e) {
        throw createError({ statusCode: 500, statusMessage: e.message })
    }
})