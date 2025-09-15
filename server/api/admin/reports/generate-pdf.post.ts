import { defineEventHandler, readBody, createError, setHeader } from 'h3'
import puppeteer from 'puppeteer'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // Authenticate user
    const token = extractTokenFromRequest(event)
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No token provided'
      })
    }

    const user = await getUserFromToken(token)
    if (!user || user.role !== 'ADMIN') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied. Admin role required.'
      })
    }

    // Get request body
    const body = await readBody(event)
    const { filters = {}, reportType = 'booking-analytics' } = body

    // Fetch booking data based on filters
    const where: any = {}

    if (filters.status) {
      where.status = filters.status
    }

    if (filters.fromDate) {
      where.startDate = {
        gte: new Date(filters.fromDate)
      }
    }

    if (filters.toDate) {
      where.endDate = {
        lte: new Date(filters.toDate)
      }
    }

    // Initialize Prisma
    const prisma = await getPrisma()

    // Fetch bookings with related data
    const [bookings, totalCount, stats] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          patient: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              dateOfBirth: true
            }
          },
          client: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
              email: true
            }
          },
          carer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              phone: true,
              email: true
            }
          },
          payments: {
            select: {
              id: true,
              amount: true,
              currency: true,
              status: true,
              paymentMethod: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),

      prisma.booking.count({ where }),

      // Get overall booking statistics
      prisma.booking.groupBy({
        by: ['status'],
        _count: { status: true }
      })
    ])

    // Calculate statistics
    const bookingStats = stats.reduce((acc, stat) => {
      const statusKey = stat.status.toLowerCase().replace('_', '-')
      acc[statusKey] = stat._count.status
      return acc
    }, {} as any)

    // Format bookings for PDF
    const formattedBookings = bookings.map(booking => ({
      id: booking.id,
      patient: {
        id: booking.patient.id,
        name: `${booking.patient.firstName} ${booking.patient.lastName}`,
        dateOfBirth: booking.patient.dateOfBirth
      },
      client: {
        id: booking.client.id,
        name: `${booking.client.firstName} ${booking.client.lastName}`,
        phone: booking.client.phone,
        email: booking.client.email
      },
      carer: booking.carer ? {
        id: booking.carer.id,
        name: `${booking.carer.firstName} ${booking.carer.lastName}`,
        phone: booking.carer.phone,
        email: booking.carer.email
      } : null,
      careType: booking.careType,
      frequency: booking.frequency,
      startDate: booking.startDate,
      endDate: booking.endDate,
      status: booking.status,
      notes: booking.notes,
      payment: booking.payments.length > 0 ? {
        id: booking.payments[0].id,
        amount: booking.payments[0].amount,
        currency: booking.payments[0].currency,
        status: booking.payments[0].status,
        method: booking.payments[0].paymentMethod
      } : null,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt
    }))

    // Generate HTML content for PDF
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Booking Analytics Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #2563eb;
            margin: 0;
            font-size: 28px;
          }
          .header p {
            color: #666;
            margin: 5px 0 0 0;
          }
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          .stat-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 20px;
            text-align: center;
          }
          .stat-number {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 5px;
          }
          .stat-label {
            font-size: 14px;
            color: #64748b;
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            color: #1e293b;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #e2e8f0;
            padding: 12px;
            text-align: left;
          }
          th {
            background: #f1f5f9;
            font-weight: bold;
            color: #475569;
          }
          .status-badge {
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
          .status-pending { background: #fef3c7; color: #92400e; }
          .status-confirmed { background: #d1fae5; color: #065f46; }
          .status-in-progress { background: #dbeafe; color: #1e40af; }
          .status-completed { background: #d1fae5; color: #065f46; }
          .status-cancelled { background: #fee2e2; color: #991b1b; }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            text-align: center;
            color: #64748b;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Booking Analytics Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <p>Report Type: ${reportType}</p>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-number">${totalCount}</div>
            <div class="stat-label">Total Bookings</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${bookingStats.pending || 0}</div>
            <div class="stat-label">Pending</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${(bookingStats.confirmed || 0) + (bookingStats.completed || 0)}</div>
            <div class="stat-label">Completed</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${bookingStats.cancelled || 0}</div>
            <div class="stat-label">Cancelled</div>
          </div>
        </div>

        <div class="section">
          <h2>Booking Details</h2>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Patient</th>
                <th>Client</th>
                <th>Carer</th>
                <th>Service Type</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${formattedBookings.map(booking => `
                <tr>
                  <td>${booking.id}</td>
                  <td>${booking.patient.name}</td>
                  <td>${booking.client.name}</td>
                  <td>${booking.carer ? booking.carer.name : 'Unassigned'}</td>
                  <td>${booking.careType.replace('_', ' ')}</td>
                  <td>${new Date(booking.startDate).toLocaleDateString()}</td>
                  <td>
                    <span class="status-badge status-${booking.status.toLowerCase().replace('_', '-')}">
                      ${booking.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td>${booking.payment ? `$${booking.payment.amount.toFixed(2)}` : 'N/A'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="footer">
          <p>This report was generated automatically by the Lucerna Health Care Management System</p>
          <p>For questions or support, please contact the system administrator</p>
        </div>
      </body>
      </html>
    `

    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

    const pdfBuffer = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      },
      printBackground: true
    })

    await browser.close()

    // Set response headers for PDF download
    setHeader(event, 'Content-Type', 'application/pdf')
    setHeader(event, 'Content-Disposition', `attachment; filename="booking-analytics-report-${new Date().toISOString().split('T')[0]}.pdf"`)
    setHeader(event, 'Content-Length', pdfBuffer.length.toString())

    return pdfBuffer

  } catch (error: any) {
    console.error('PDF generation error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate PDF report'
    })
  }
})
