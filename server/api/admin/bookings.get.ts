import { getPrisma } from '~/server/utils/prisma'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
	const token = extractTokenFromRequest(event)
	if (!token) {
		throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
	}
	const prisma = await getPrisma()
	const bookings = await prisma.booking.findMany({
		orderBy: { createdAt: 'desc' },
		include: {
			client: { select: { firstName: true, lastName: true } },
			carer: { select: { firstName: true, lastName: true } },
			patient: { select: { firstName: true, lastName: true } },
		}
	})
	return { data: bookings }
}) 