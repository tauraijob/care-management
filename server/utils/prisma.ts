let prismaInstance: any | undefined

export const getPrisma = async (): Promise<any> => {
	if (prismaInstance) return prismaInstance
	const { PrismaClient } = await import('@prisma/client')
	prismaInstance = new PrismaClient()
	return prismaInstance
}