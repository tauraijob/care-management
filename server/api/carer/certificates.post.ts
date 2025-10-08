import { createError, readMultipartFormData } from 'h3'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { promises as fsp } from 'fs'
import { join } from 'pathe'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        if (!token) throw createError({ statusCode: 401, statusMessage: 'No token provided' })
        const me = await getUserFromToken(token)
        if (!me || me.role !== 'CARER') throw createError({ statusCode: 403, statusMessage: 'Carer access required' })

        const formData = await readMultipartFormData(event)
        if (!formData) throw createError({ statusCode: 400, statusMessage: 'No form data' })

        let filePart: any = null
        let title = ''
        let issuedAt: Date | undefined
        let expiresAt: Date | undefined

        for (const part of formData) {
            // File parts have a filename; fields do not
            if (!filePart && part.filename) {
                filePart = part
            }
            if (part.name === 'title') title = part.data.toString('utf-8')
            if (part.name === 'issuedAt') issuedAt = new Date(part.data.toString('utf-8'))
            if (part.name === 'expiresAt') expiresAt = new Date(part.data.toString('utf-8'))
        }

        if (!filePart) throw createError({ statusCode: 400, statusMessage: 'File is required' })
        if (!title) title = filePart.filename || 'Certificate'

        const contentType = filePart.type || 'application/octet-stream'
        const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if (!allowed.includes(contentType)) {
            throw createError({ statusCode: 400, statusMessage: 'Only PDF or Word documents are allowed' })
        }

        // Persist file under /public/uploads/certificates
        const uploadDir = join(process.cwd(), 'public', 'uploads', 'certificates')
        await fsp.mkdir(uploadDir, { recursive: true })
        const safeBase = (filePart.filename || 'certificate').replace(/[^a-zA-Z0-9._-]/g, '_')
        const fileName = `${Date.now()}_${safeBase}`
        const absPath = join(uploadDir, fileName)
        await fsp.writeFile(absPath, filePart.data)

        const fileUrl = `/uploads/certificates/${fileName}`

        const prisma = await getPrisma()
        if (!prisma || !(prisma as any).certification) {
            console.error('Prisma client missing Certification model. Run prisma generate & db push.')
            throw createError({ statusCode: 500, statusMessage: 'Certifications model not available. Run: npx prisma generate && npx prisma db push' })
        }
        const cert = await prisma.certification.create({
            data: {
                carerId: me.id,
                title,
                fileName: filePart.filename || fileName,
                fileUrl,
                fileType: contentType,
                issuedAt: issuedAt || undefined,
                expiresAt: expiresAt || undefined,
            }
        })

        return { success: true, data: cert }
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Upload certificate error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
    }
})


