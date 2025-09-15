import { defineEventHandler, setHeader, readBody, createError } from 'h3'
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
        const format = ((body?.format as string) || 'pdf').toLowerCase()

        const prisma = await getPrisma()

        // Get patients assigned to this carer via any bookings (aligns with /api/patients/list)
        const bookings = await prisma.booking.findMany({
            where: { carerId: user.id },
            include: { patient: true, client: true },
            orderBy: { startDate: 'desc' }
        })

        // Unique patients
        const patientMap = new Map<string, any>()
        for (const b of bookings) {
            patientMap.set(b.patientId, b.patient)
        }
        const patients = Array.from(patientMap.values())

        if (format === 'csv' || format === 'excel') {
            const headers = ['First Name', 'Last Name', 'Date of Birth', 'Client Name']
            // Attach client names by first booking
            const clientByPatient = new Map<string, string>()
            for (const b of bookings) {
                if (!clientByPatient.has(b.patientId)) {
                    const c = b.client as any
                    clientByPatient.set(b.patientId, c ? `${c.firstName} ${c.lastName}` : '')
                }
            }
            const finalRows = patients.map((p: any) => {
                const clientName = clientByPatient.get(p.id) || ''
                return [p.firstName || '', p.lastName || '', p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : '', clientName]
            })
            const escape = (v: any) => {
                const s = (v ?? '').toString()
                if (s.includes(',') || s.includes('"') || s.includes('\n')) return '"' + s.replace(/"/g, '""') + '"'
                return s
            }
            const csv = [headers.join(','), ...finalRows.map(r => r.map(escape).join(','))].join('\n')
            const buffer = Buffer.from(csv, 'utf-8')
            setHeader(event, 'Content-Type', 'text/csv; charset=utf-8')
            setHeader(event, 'Content-Disposition', `attachment; filename="carer-patients-${new Date().toISOString().split('T')[0]}.csv"`)
            setHeader(event, 'Content-Length', buffer.length.toString())
            return buffer
        }

        // PDF via puppeteer
        const htmlRows = patients.map((p: any) => `
            <tr>
              <td>${p.firstName || ''} ${p.lastName || ''}</td>
              <td>${p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString() : ''}</td>
            </tr>
        `).join('')

        const html = `<!doctype html>
        <html>
        <head>
          <meta charset="utf-8"/>
          <title>Patients List</title>
          <style>
            body { font-family: Arial, sans-serif; color:#111827; margin:0; padding:24px; }
            .header { background:#0034b3; color:#fff; padding:20px; border-radius:12px; }
            table { width:100%; border-collapse: collapse; margin-top:16px; }
            th, td { border:1px solid #e5e7eb; padding:8px; font-size:12px; text-align:left; }
            th { background:#f1f5f9; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Patients List</h1>
            <div>Generated ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>
          </div>
          <table>
            <thead><tr><th>Patient</th><th>Date of Birth</th></tr></thead>
            <tbody>${htmlRows}</tbody>
          </table>
        </body>
        </html>`

        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage()
        await page.setContent(html, { waitUntil: 'networkidle0' })
        const pdf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '16mm', right: '16mm', bottom: '16mm', left: '16mm' } })
        await browser.close()

        setHeader(event, 'Content-Type', 'application/pdf')
        setHeader(event, 'Content-Disposition', `attachment; filename="carer-patients-${new Date().toISOString().split('T')[0]}.pdf"`)
        setHeader(event, 'Content-Length', pdf.length.toString())
        return pdf
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Carer patients export error:', error)
        throw createError({ statusCode: 500, statusMessage: 'Failed to export patients' })
    }
})


