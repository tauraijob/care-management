import { getPrisma } from '~/server/utils/prisma'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { recordAudit } from '~/server/utils/audit'
import { hash } from 'bcrypt'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const me = await getUserFromToken(token)
        if (!me || me.role !== 'ADMIN') throw createError({ statusCode: 403, statusMessage: 'Admin access required' })

        const body = await readBody(event)
        const {
            firstName,
            lastName,
            email,
            phone,
            password,
            role,
        } = body

        if (!firstName || !lastName || !email || !password || !role) {
            throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
        }

        const prisma = await getPrisma()

        const passwordHash = await hash(password, 10)

        // Normalize and validate role
        const normalizedRole = String(role).toUpperCase()
        const allowedRoles = ['ADMIN', 'CLIENT', 'CARER']
        if (!allowedRoles.includes(normalizedRole)) {
            throw createError({ statusCode: 400, statusMessage: 'Invalid role' })
        }

        // Only include fields that exist in the Prisma User model
        const data: any = {
            firstName,
            lastName,
            email: String(email).toLowerCase(),
            phone,
            password: passwordHash,
            role: normalizedRole,
        }
        if (typeof body.whatsapp !== 'undefined') {
            data.whatsapp = !!body.whatsapp
        }

        const created = await prisma.user.create({
            data,
            select: { id: true }
        })

        await recordAudit(event, { action: 'USER_CREATED', targetType: 'user', targetId: created.id, details: { email, role } })
        return { success: true, data: { id: created.id } }
    } catch (error: any) {
        if (error.statusCode) throw error
        // Unique constraint handling
        if (error?.code === 'P2002') {
            throw createError({ statusCode: 409, statusMessage: 'Email already exists' })
        }
        console.error('Admin user create error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


