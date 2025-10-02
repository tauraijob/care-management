let prismaInstance: any | undefined

async function connectWithRetry(client: any, retries = 3, delayMs = 500): Promise<void> {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			await client.$connect()
			return
		} catch (err) {
			console.error(`Prisma connect failed (attempt ${attempt}/${retries}):`, err)
			if (attempt === retries) throw err
			await new Promise(res => setTimeout(res, delayMs))
		}
	}
}

export const getPrisma = async (): Promise<any> => {
	if (prismaInstance) return prismaInstance
	const { PrismaClient } = await import('@prisma/client')
	prismaInstance = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })
	await connectWithRetry(prismaInstance)
	return prismaInstance
}