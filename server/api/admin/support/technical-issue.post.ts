import { getPrisma } from '~/server/utils/prisma'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { emailService } from '~/server/utils/emailService'

export default defineEventHandler(async (event) => {
    try {
        // Verify admin access
        const token = extractTokenFromRequest(event)
        if (!token) {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const user = await getUserFromToken(token)
        if (!user || user.role !== 'ADMIN') {
            throw createError({ statusCode: 403, statusMessage: 'Admin access required' })
        }

        const body = await readBody(event)
        const { subject, priority, description } = body

        if (!subject || !priority || !description) {
            throw createError({ statusCode: 400, statusMessage: 'Subject, priority, and description are required' })
        }

        const prisma = await getPrisma()

        // Create technical issue record
        const issue = await prisma.technicalIssue.create({
            data: {
                subject,
                priority: priority.toUpperCase(),
                description,
                status: 'OPEN',
                reportedBy: user.id,
                reportedAt: new Date()
            },
            include: {
                reporter: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true
                    }
                }
            }
        })

        // Send email notification to technical team
        try {
            await emailService.sendTechnicalIssueNotification(
                'info@lucernaandsternhealth.co.zw',
                `${user.firstName} ${user.lastName}`,
                subject,
                priority,
                description,
                issue.id
            )
        } catch (emailError) {
            console.error('Technical issue email failed:', emailError)
            // Don't fail the request if email fails
        }

        return {
            success: true,
            message: 'Technical issue submitted successfully',
            data: {
                issueId: issue.id,
                subject: issue.subject,
                priority: issue.priority,
                status: issue.status,
                reportedAt: issue.reportedAt
            }
        }

    } catch (error: any) {
        console.error('Technical issue submission error:', error)
        if (error.statusCode) throw error
        throw createError({ statusCode: 500, statusMessage: 'Failed to submit technical issue' })
    }
})
