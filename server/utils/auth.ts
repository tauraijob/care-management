import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { getHeader, getCookie } from 'h3'
import { getPrisma } from './prisma'

export interface JWTPayload { userId: string; email: string; role: string; }

export const generateToken = (payload: JWTPayload): string => {
	return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JWTPayload | null => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
	} catch (error) {
		return null
	}
}

export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 12)
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword)
}

export const getUserFromToken = async (token: string) => {
	const payload = verifyToken(token)
	if (!payload) return null
	const prisma = await getPrisma()
	const user = await prisma.user.findUnique({
		where: { id: payload.userId },
		select: { id: true, email: true, firstName: true, lastName: true, role: true, phone: true, whatsapp: true, createdAt: true }
	})
	return user
}

// New utility function to extract token from either cookies or Authorization header
export const extractTokenFromRequest = (event: any): string | null => {
	// Try Authorization header first
	const authHeader = getHeader(event, 'authorization')
	if (authHeader && authHeader.startsWith('Bearer ')) {
		return authHeader.substring(7)
	}

	// Fall back to cookie
	const cookieToken = getCookie(event, 'auth-token')
	if (cookieToken) {
		return cookieToken
	}

	return null
}