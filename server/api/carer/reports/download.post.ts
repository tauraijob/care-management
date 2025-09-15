import { defineEventHandler, readBody, setHeader, createError } from 'h3'
import { extractTokenFromRequest, getUserFromToken } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import puppeteer from 'puppeteer'

export default defineEventHandler(async (event) => {
    try {
        const token = extractTokenFromRequest(event)
        const user = await getUserFromToken(token as string)
        if (!user || user.role !== 'CARER') {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
        }

        const body = await readBody(event)
        const days = Math.max(1, Math.min(parseInt((body?.days ?? '30') as string, 10) || 30, 365))
        const format = ((body?.format as string) || 'pdf').toLowerCase()
        const scope = ((body?.scope as string) || 'report').toLowerCase() // 'report' | 'logs'

        const prisma = await getPrisma()

        const now = new Date()
        const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

        const [bookings, payments, logs] = await Promise.all([
            prisma.booking.findMany({
                where: { carerId: user.id, startDate: { gte: start } },
                include: {
                    patient: { select: { firstName: true, lastName: true, dateOfBirth: true } },
                    client: { select: { firstName: true, lastName: true, phone: true } },
                    payments: true,
                },
                orderBy: { startDate: 'desc' }
            }),
            prisma.payment.findMany({
                where: { status: 'COMPLETED', createdAt: { gte: start }, booking: { carerId: user.id } }
            }),
            prisma.log.findMany({
                where: { carerId: user.id, createdAt: { gte: start } },
                include: { booking: { include: { patient: true } } },
                orderBy: { createdAt: 'desc' }
            })
        ])

        const hours = logs.reduce((sum: number, l: any) => {
            if (l.visitStartTime && l.visitEndTime) {
                const dur = (l.visitEndTime.getTime() - l.visitStartTime.getTime()) / 3600000
                return sum + Math.max(0, Math.round(dur * 10) / 10)
            }
            return sum + 2
        }, 0)
        const totalEarnings = payments.reduce((s: number, p: any) => s + (p.amount || 0), 0)
        const patientIdSet = new Set<string>()
        for (const b of bookings as any[]) patientIdSet.add(b.patientId)

        // Prepare logs rows
        const logRows = logs.map((log: any) => {
            const patient = log.booking?.patient
            const name = patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown'
            const date = new Date(log.createdAt).toLocaleDateString()
            const startTime = log.visitStartTime ? new Date(log.visitStartTime).toLocaleTimeString() : ''
            const endTime = log.visitEndTime ? new Date(log.visitEndTime).toLocaleTimeString() : ''
            let duration = 2
            if (log.visitStartTime && log.visitEndTime) {
                duration = Math.max(0, Math.round(((log.visitEndTime.getTime() - log.visitStartTime.getTime()) / 3600000) * 10) / 10)
            }
            const services: string[] = []
            if (log.taskCompleted) services.push('Personal Care')
            if (log.medicationGiven) services.push('Medication')
            const notes = (log.notes || '').toString().replace(/\n|\r/g, ' ')
            return { name, date, startTime, endTime, duration, services: services.join('; '), notes }
        })

        if (format === 'csv' || format === 'excel') {
            // CSV export
            const toCsv = (rows: any[], headers: string[]) => {
                const escape = (v: any) => {
                    const s = (v ?? '').toString()
                    if (s.includes(',') || s.includes('"') || s.includes('\n')) {
                        return '"' + s.replace(/"/g, '""') + '"'
                    }
                    return s
                }
                const headerLine = headers.join(',')
                const lines = rows.map((r) => headers.map((h) => escape((r as any)[h])).join(','))
                return [headerLine, ...lines].join('\n')
            }

            let csv = ''
            let filename = ''
            if (scope === 'logs') {
                csv = toCsv(logRows, ['name', 'date', 'startTime', 'endTime', 'duration', 'services', 'notes'])
                filename = `carer-logs-${new Date().toISOString().split('T')[0]}.csv`
            } else {
                const metricRows = [
                    { Metric: 'Total Hours', Value: hours },
                    { Metric: 'Patients Cared', Value: patientIdSet.size },
                    { Metric: 'Total Earnings', Value: totalEarnings },
                ]
                csv = toCsv(metricRows as any[], ['Metric', 'Value'])
                filename = `carer-report-${new Date().toISOString().split('T')[0]}.csv`
            }

            const buffer = Buffer.from(csv, 'utf-8')
            setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
            setHeader(event, 'Content-Disposition', `attachment; filename="${filename}"`)
            setHeader(event, 'Content-Length', buffer.length.toString())
            return buffer
        }

        // PDF export using Puppeteer
        const htmlRows = logRows.slice(0, 50).map((r) => `
            <tr>
              <td>${r.name}</td>
              <td>${r.date}</td>
              <td>${r.startTime}</td>
              <td>${r.endTime}</td>
              <td>${r.duration}</td>
              <td>${r.services}</td>
            </tr>
        `).join('')

        const html = `<!doctype html>
        <html>
        <head>
          <meta charset="utf-8"/>
          <title>Carer Report</title>
          <style>
            body { font-family: Arial, sans-serif; color:#111827; margin:0; padding:24px; }
            .header { background:#0034b3; color:#fff; padding:20px; border-radius:12px; }
            .grid { display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; margin:20px 0; }
            .card { background:#f8fafc; border:1px solid #e5e7eb; border-radius:8px; padding:12px; }
            h1 { margin:0 0 6px 0; }
            table { width:100%; border-collapse: collapse; }
            th, td { border:1px solid #e5e7eb; padding:8px; font-size:12px; text-align:left; }
            th { background:#f1f5f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Carer Report</h1>
            <div>Generated ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>
            <div>Range: Last ${days} days</div>
          </div>
          <div class="grid">
            <div class="card"><div><strong>Total Hours</strong></div><div>${hours}</div></div>
            <div class="card"><div><strong>Patients Cared</strong></div><div>${patientIdSet.size}</div></div>
            <div class="card"><div><strong>Total Earnings</strong></div><div>$${Math.round(totalEarnings)}</div></div>
          </div>
          <h3>Recent Care Logs</h3>
          <table>
            <thead>
              <tr><th>Patient</th><th>Date</th><th>Start</th><th>End</th><th>Duration(h)</th><th>Services</th></tr>
            </thead>
            <tbody>
              ${htmlRows}
            </tbody>
          </table>
        </body>
        </html>`

        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage()
        await page.setContent(html, { waitUntil: 'networkidle0' })
        const pdf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' } })
        await browser.close()

        setHeader(event, 'Content-Type', 'application/pdf')
        setHeader(event, 'Content-Disposition', `attachment; filename="carer-report-${new Date().toISOString().split('T')[0]}.pdf"`)
        setHeader(event, 'Content-Length', pdf.length.toString())
        return pdf
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer report download error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Failed to generate carer report' })
    }
})


