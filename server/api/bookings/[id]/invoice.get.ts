import { defineEventHandler, createError, setHeader } from 'h3'
import { getUserFromToken, extractTokenFromRequest } from '~/server/utils/auth'
import { getPrisma } from '~/server/utils/prisma'
import { getRouterParam } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const token = extractTokenFromRequest(event)
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No token provided'
      })
    }

    const user = await getUserFromToken(token)
    if (!user || user.role !== 'CLIENT') {
      throw createError({
        statusCode: 403,
        statusMessage: 'Access denied. Client role required.'
      })
    }

    const bookingId = getRouterParam(event, 'id')
    if (!bookingId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Booking ID is required'
      })
    }

    // Check if booking exists and belongs to this client
        const prisma = await getPrisma()
    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        clientId: user.id
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            dateOfBirth: true
          }
        },
        carer: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        client: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        payments: {
          select: {
            amount: true,
            currency: true,
            status: true,
            createdAt: true
          }
        }
      }
    })

    if (!booking) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Booking not found or access denied'
      })
    }

    // Generate invoice HTML (clean, printable, with inline logo and modern styling)
    const amount = booking.payments?.[0]?.amount ?? 0
    const amountFormatted = `$${Number(amount).toFixed(2)} USD`
    const paymentStatus = booking.payments?.[0]?.status ?? 'UNPAID'
    const paymentDate = booking.payments?.[0]?.createdAt
      ? new Date(booking.payments[0].createdAt).toLocaleDateString('en-US')
      : '—'

    const invoiceHtml = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Invoice #${booking.id} - Lucerna & Stern Health</title>
    <style>
      :root {
        --green-500: #22c55e;
        --green-600: #16a34a;
        --slate-700: #334155;
        --slate-500: #64748b;
        --slate-300: #cbd5e1;
        --slate-200: #e2e8f0;
        --slate-100: #f1f5f9;
        --white: #ffffff;
        --black: #0f172a;
      }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji"; background: var(--slate-100); color: var(--slate-700); }
      .container { max-width: 900px; margin: 40px auto; padding: 0 20px; }
      .card { background: var(--white); border: 1px solid var(--slate-200); border-radius: 16px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.07), 0 4px 6px -2px rgba(0,0,0,0.05); overflow: hidden; }
      .header { display: flex; align-items: center; justify-content: space-between; padding: 24px 28px; background: linear-gradient(90deg, var(--green-600), var(--green-500)); color: var(--white); }
      .brand { display: flex; align-items: center; gap: 12px; }
      .logo { width: 44px; height: 44px; border-radius: 10px; background: rgba(255,255,255,0.15); display: inline-flex; align-items: center; justify-content: center; }
      .brand-title { font-size: 20px; font-weight: 700; letter-spacing: 0.2px; }
      .muted { color: #e2fbe8; font-size: 12px; }
      .meta { text-align: right; }
      .meta-title { font-weight: 700; font-size: 18px; }
      .meta-sub { font-size: 13px; opacity: 0.9; }
      .section { padding: 24px 28px; border-top: 1px solid var(--slate-200); }
      .row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
      .box { background: var(--slate-100); border: 1px solid var(--slate-200); border-radius: 12px; padding: 16px; }
      .box h3 { margin: 0 0 10px 0; font-size: 14px; color: var(--slate-500); text-transform: uppercase; letter-spacing: 0.06em; }
      .kv { display: grid; grid-template-columns: 140px 1fr; gap: 10px; font-size: 14px; }
      .kv .k { color: var(--slate-500); }
      .kv .v { color: var(--black); font-weight: 600; }
      table { width: 100%; border-collapse: collapse; margin-top: 8px; }
      th, td { padding: 12px 10px; border-bottom: 1px solid var(--slate-200); text-align: left; font-size: 14px; }
      th { color: var(--slate-500); font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em; }
      .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #ecfccb; color: #3f6212; font-weight: 600; font-size: 12px; }
      .totals { margin-top: 12px; display: grid; grid-template-columns: 1fr auto; gap: 8px; align-items: center; }
      .totals .label { color: var(--slate-500); font-size: 14px; }
      .totals .value { font-size: 18px; font-weight: 800; color: var(--black); }
      .footer { padding: 18px 28px 26px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: center; color: var(--slate-500); font-size: 12px; }
      .contact { text-align: right; }
      .small { font-size: 12px; color: var(--slate-500); }
      @media print { body { background: #fff; } .container { margin: 0; padding: 0; } .card { border: none; box-shadow: none; } .header { border-bottom: 1px solid var(--slate-200); } }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <div class="brand">
            <div class="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="12" cy="12" r="10" fill="white" fill-opacity="0.9"/>
                <path d="M7 13.5C9 16.5 15 16.5 17 13.5" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round"/>
                <path d="M9 10C9 8.343 10.343 7 12 7C13.657 7 15 8.343 15 10" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round"/>
              </svg>
            </div>
            <div>
              <div class="brand-title">Lucerna & Stern Health</div>
              <div class="muted">Compassionate care, delivered</div>
            </div>
          </div>
          <div class="meta">
            <div class="meta-title">Invoice</div>
            <div class="meta-sub">Invoice #${booking.id}</div>
            <div class="meta-sub">Date: ${new Date().toLocaleDateString('en-US')}</div>
          </div>
        </div>

        <div class="section">
          <div class="row">
            <div class="box">
              <h3>Bill To</h3>
              <div class="kv">
                <div class="k">Name</div><div class="v">${booking.client.firstName} ${booking.client.lastName}</div>
                <div class="k">Email</div><div class="v">${booking.client.email}</div>
                <div class="k">Phone</div><div class="v">${booking.client.phone}</div>
              </div>
            </div>
            <div class="box">
              <h3>Company</h3>
              <div class="kv">
                <div class="k">Name</div><div class="v">Lucerna & Stern Health</div>
                <div class="k">WhatsApp</div><div class="v">+27 61 629 1608</div>
                <div class="k">Currency</div><div class="v">USD</div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 style="margin:0 0 12px 0; font-size:14px; color: var(--slate-500); text-transform:uppercase; letter-spacing:0.06em;">Booking Details</h3>
          <table>
            <thead>
              <tr>
                <th style="width: 34%;">Description</th>
                <th>Care Type</th>
                <th>Frequency</th>
                <th>Start Date</th>
                <th>Status</th>
                <th style="text-align:right;">Amount (USD)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Care services for ${booking.patient.firstName} ${booking.patient.lastName}</td>
                <td>${booking.careType}</td>
                <td>${booking.frequency}</td>
                <td>${new Date(booking.startDate).toLocaleDateString('en-US')}</td>
                <td><span class="badge">${booking.status}</span></td>
                <td style="text-align:right; font-weight:700;">${amountFormatted}</td>
              </tr>
            </tbody>
          </table>
          <div class="totals">
            <div class="label">Payment Status: <strong>${paymentStatus}</strong>${paymentDate !== '—' ? ` · Paid on ${paymentDate}` : ''}</div>
            <div class="value">Total: ${amountFormatted}</div>
          </div>
        </div>

        ${booking.carer ? `
        <div class="section">
          <div class="row">
            <div class="box">
              <h3>Carer</h3>
              <div class="kv">
                <div class="k">Name</div><div class="v">${booking.carer.firstName} ${booking.carer.lastName}</div>
                <div class="k">Email</div><div class="v">${booking.carer.email}</div>
                ${booking.carer.phone ? `<div class="k">Phone</div><div class="v">${booking.carer.phone}</div>` : ''}
              </div>
            </div>
            <div class="box">
              <h3>Location</h3>
              <div class="kv">
                <div class="k">Service Location</div><div class="v">${booking.location || 'Client Location'}</div>
              </div>
            </div>
          </div>
        </div>
        ` : ''}

        <div class="footer">
          <div class="small">Thank you for choosing Lucerna & Stern Health</div>
          <div class="contact">www.lucernaandstern.health · WhatsApp: +27 61 629 1608 · Currency: USD</div>
        </div>
      </div>
    </div>
  </body>
  </html>
        `

    // Return HTML content inside JSON for client-side download handling
    // Note: We intentionally avoid setting binary/PDF headers here since
    // the response is JSON. The client converts this HTML string to a file.
    return {
      success: true,
      data: invoiceHtml,
      message: 'Invoice generated successfully'
    }

  } catch (error: any) {
    console.error('Generate invoice error:', error)

    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate invoice'
    })
  }
})
