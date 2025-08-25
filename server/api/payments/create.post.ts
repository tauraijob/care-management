import jwt from 'jsonwebtoken'
import { getPrisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        // Verify authentication
        const token = getHeader(event, 'authorization')?.replace('Bearer ', '')
        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Authentication required'
            })
        }

        // Verify JWT token
        let decoded
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
        } catch (error) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid or expired token'
            })
        }

        const body = await readBody(event)
        const {
            bookingId,
            amount,
            paymentMethod,
            paymentDetails = {}
        } = body

        // Always use USD currency
        const currency = 'USD'

        // Validation
        if (!bookingId || !amount || !paymentMethod) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Booking ID, amount, and payment method are required'
            })
        }

        // Validate amount
        if (amount <= 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Amount must be greater than 0'
            })
        }

        // Validate payment method
        const validPaymentMethods = ['STRIPE', 'PAYPAL', 'ECOCASH']
        if (!validPaymentMethods.includes(paymentMethod)) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid payment method'
            })
        }

        // Verify booking exists and belongs to user
        const prisma = await getPrisma()
        const booking = await prisma.booking.findFirst({
            where: {
                id: bookingId,
                clientId: decoded.userId
            },
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true
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

        // Check if payment already exists for this booking
        const existingPayment = await prisma.payment.findFirst({
            where: {
                bookingId,
                status: 'COMPLETED'
            }
        })

        if (existingPayment) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Payment already completed for this booking'
            })
        }

        // Process payment based on method
        let transactionId = null
        let receiptUrl = null
        let paymentStatus = 'PENDING'

        try {
            switch (paymentMethod) {
                case 'STRIPE':
                    const stripeResult = await processStripePayment(amount, currency, paymentDetails)
                    transactionId = stripeResult.transactionId
                    receiptUrl = stripeResult.receiptUrl
                    paymentStatus = 'COMPLETED'
                    break

                case 'PAYPAL':
                    const paypalResult = await processPayPalPayment(amount, currency, paymentDetails)
                    transactionId = paypalResult.transactionId
                    receiptUrl = paypalResult.receiptUrl
                    paymentStatus = 'COMPLETED'
                    break

                case 'ECOCASH':
                    const ecoCashResult = await processEcoCashPayment(amount, currency, paymentDetails)
                    transactionId = ecoCashResult.transactionId
                    receiptUrl = ecoCashResult.receiptUrl
                    paymentStatus = 'PENDING' // EcoCash payments are typically pending until confirmed
                    break

                default:
                    throw new Error('Unsupported payment method')
            }
        } catch (paymentError) {
            console.error('Payment processing error:', paymentError)
            paymentStatus = 'FAILED'
        }

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                bookingId,
                amount,
                currency,
                paymentMethod,
                status: paymentStatus,
                transactionId,
                receiptUrl
            },
            include: {
                booking: {
                    include: {
                        patient: {
                            select: {
                                firstName: true,
                                lastName: true
                            }
                        },
                        client: {
                            select: {
                                firstName: true,
                                lastName: true,
                                email: true
                            }
                        }
                    }
                }
            }
        })

        // Create notification for successful payment
        if (paymentStatus === 'COMPLETED') {
            await prisma.notification.create({
                data: {
                    userId: decoded.userId,
                    type: 'EMAIL',
                    title: 'Payment Successful',
                    message: `Payment of ${currency} ${amount} for booking ${bookingId} has been processed successfully.`
                }
            })

            // Update booking status to confirmed
            await prisma.booking.update({
                where: { id: bookingId },
                data: { status: 'CONFIRMED' }
            })
        }

        // Log payment creation
        console.log(`Payment created: ${payment.id} for booking ${bookingId} via ${paymentMethod}`)

        return {
            success: true,
            message: `Payment ${paymentStatus.toLowerCase()}`,
            payment: {
                id: payment.id,
                amount: payment.amount,
                currency: payment.currency,
                paymentMethod: payment.paymentMethod,
                status: payment.status,
                transactionId: payment.transactionId,
                receiptUrl: payment.receiptUrl,
                createdAt: payment.createdAt
            }
        }

    } catch (error) {
        console.error('Payment creation error:', error)

        if (error.statusCode) {
            throw error
        }

        throw createError({
            statusCode: 500,
            statusMessage: 'Internal server error during payment processing'
        })
    }
})

// Payment processing functions (mock implementations)
async function processStripePayment(amount: number, currency: string, details: any) {
    // Mock Stripe integration
    console.log('Processing Stripe payment:', { amount, currency, details })

    // In real implementation, this would call Stripe API
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount * 100), // Convert to cents
    //   currency: currency.toLowerCase(),
    //   payment_method: details.paymentMethodId,
    //   confirm: true
    // })

    return {
        transactionId: `stripe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        receiptUrl: `https://receipt.stripe.com/payment/${Date.now()}`
    }
}

async function processPayPalPayment(amount: number, currency: string, details: any) {
    // Mock PayPal integration
    console.log('Processing PayPal payment:', { amount, currency, details })

    // In real implementation, this would call PayPal API
    // const paypal = require('@paypal/checkout-server-sdk')
    // const request = new paypal.orders.OrdersCreateRequest()
    // request.prefer("return=representation")
    // request.requestBody({
    //   intent: 'CAPTURE',
    //   purchase_units: [{
    //     amount: {
    //       currency_code: currency,
    //       value: amount.toString()
    //     }
    //   }]
    // })

    return {
        transactionId: `paypal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        receiptUrl: `https://www.paypal.com/receipt/${Date.now()}`
    }
}

async function processEcoCashPayment(amount: number, currency: string, details: any) {
    // Mock EcoCash integration
    console.log('Processing EcoCash payment:', { amount, currency, details })

    // In real implementation, this would call EcoCash API
    // const ecoCashApi = new EcoCashAPI(process.env.ECOCASH_API_KEY)
    // const payment = await ecoCashApi.createPayment({
    //   amount: amount,
    //   currency: currency,
    //   phoneNumber: details.phoneNumber,
    //   reference: details.reference
    // })

    return {
        transactionId: `ecocash_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        receiptUrl: `https://ecocash.co.zw/receipt/${Date.now()}`
    }
}