import { PrismaClient, UserRole, CareType, Frequency, BookingStatus, PaymentMethod, PaymentStatus, NotificationType, DocumentType, ReportType, ReportStatus } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seeding...')

    // Clear existing data
    await prisma.report.deleteMany()
    await prisma.message.deleteMany()
    await prisma.log.deleteMany()
    await prisma.document.deleteMany()
    await prisma.payment.deleteMany()
    await prisma.notification.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.patient.deleteMany()
    await prisma.user.deleteMany()

    console.log('🧹 Cleared existing data')

    // Hash passwords
    const hashedPassword = await bcrypt.hash('password123', 12)

    // Create Admin User
    const admin = await prisma.user.create({
        data: {
            email: 'admin@lucerna.com',
            password: hashedPassword,
            role: UserRole.ADMIN,
            firstName: 'Sarah',
            lastName: 'Johnson',
            phone: '+27611234567',
            whatsapp: true
        }
    })

    // Create Client Users
    const client1 = await prisma.user.create({
        data: {
            email: 'client@lucerna.com',
            password: hashedPassword,
            role: UserRole.CLIENT,
            firstName: 'Michael',
            lastName: 'Smith',
            phone: '+27616291609',
            whatsapp: true
        }
    })

    const client2 = await prisma.user.create({
        data: {
            email: 'client2@lucerna.com',
            password: hashedPassword,
            role: UserRole.CLIENT,
            firstName: 'Jennifer',
            lastName: 'Davis',
            phone: '+27616291610',
            whatsapp: false
        }
    })

    // Create Carer Users
    const carer1 = await prisma.user.create({
        data: {
            email: 'carer@lucerna.com',
            password: hashedPassword,
            role: UserRole.CARER,
            firstName: 'Emma',
            lastName: 'Wilson',
            phone: '+27616291611',
            whatsapp: true
        }
    })

    const carer2 = await prisma.user.create({
        data: {
            email: 'carer2@lucerna.com',
            password: hashedPassword,
            role: UserRole.CARER,
            firstName: 'David',
            lastName: 'Brown',
            phone: '+27616291612',
            whatsapp: true
        }
    })

    const carer3 = await prisma.user.create({
        data: {
            email: 'carer3@lucerna.com',
            password: hashedPassword,
            role: UserRole.CARER,
            firstName: 'Lisa',
            lastName: 'Garcia',
            phone: '+27616291613',
            whatsapp: false
        }
    })

    console.log('👥 Created users')

    // Create Patients for Client 1
    const patient1 = await prisma.patient.create({
        data: {
            clientId: client1.id,
            firstName: 'Robert',
            lastName: 'Smith',
            dateOfBirth: new Date('1945-03-15'),
            medicalConditions: {
                conditions: ['Diabetes', 'Hypertension', 'Arthritis'],
                medications: ['Metformin', 'Lisinopril', 'Ibuprofen'],
                allergies: ['Penicillin']
            },
            emergencyContact: {
                name: 'Mary Smith',
                relationship: 'Daughter',
                phone: '+27616291614',
                email: 'mary.smith@email.com'
            },
            address: '123 Oak Street, Johannesburg, South Africa'
        }
    })

    const patient2 = await prisma.patient.create({
        data: {
            clientId: client1.id,
            firstName: 'Margaret',
            lastName: 'Smith',
            dateOfBirth: new Date('1948-07-22'),
            medicalConditions: {
                conditions: ['Dementia', 'Osteoporosis'],
                medications: ['Donepezil', 'Calcium supplements'],
                allergies: ['None known']
            },
            emergencyContact: {
                name: 'Michael Smith',
                relationship: 'Son',
                phone: '+27616291609',
                email: 'client@lucerna.com'
            },
            address: '123 Oak Street, Johannesburg, South Africa'
        }
    })

    // Create Patients for Client 2
    const patient3 = await prisma.patient.create({
        data: {
            clientId: client2.id,
            firstName: 'William',
            lastName: 'Davis',
            dateOfBirth: new Date('1952-11-08'),
            medicalConditions: {
                conditions: ['Heart Disease', 'Post-Surgery Recovery'],
                medications: ['Aspirin', 'Beta-blocker'],
                allergies: ['Sulfa drugs']
            },
            emergencyContact: {
                name: 'Jennifer Davis',
                relationship: 'Daughter',
                phone: '+27616291610',
                email: 'client2@lucerna.com'
            },
            address: '456 Pine Avenue, Cape Town, South Africa'
        }
    })

    console.log('🏥 Created patients')

    // Create Bookings
    const booking1 = await prisma.booking.create({
        data: {
            clientId: client1.id,
            carerId: carer1.id,
            patientId: patient1.id,
            careType: CareType.ELDERLY_CARE,
            frequency: Frequency.DAILY,
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-02-15'),
            status: BookingStatus.CONFIRMED,
            notes: 'Daily medication assistance and meal preparation required'
        }
    })

    const booking2 = await prisma.booking.create({
        data: {
            clientId: client1.id,
            carerId: carer2.id,
            patientId: patient2.id,
            careType: CareType.ELDERLY_CARE,
            frequency: Frequency.WEEKLY,
            startDate: new Date('2024-01-20'),
            endDate: new Date('2024-03-20'),
            status: BookingStatus.IN_PROGRESS,
            notes: 'Weekly companionship and light housekeeping'
        }
    })

    const booking3 = await prisma.booking.create({
        data: {
            clientId: client2.id,
            carerId: carer3.id,
            patientId: patient3.id,
            careType: CareType.POST_SURGERY_CARE,
            frequency: Frequency.DAILY,
            startDate: new Date('2024-01-25'),
            endDate: new Date('2024-02-25'),
            status: BookingStatus.PENDING,
            notes: 'Post-surgery wound care and rehabilitation support'
        }
    })

    const booking4 = await prisma.booking.create({
        data: {
            clientId: client1.id,
            patientId: patient1.id,
            careType: CareType.DISABILITY_CARE,
            frequency: Frequency.ONCE,
            startDate: new Date('2024-02-01'),
            status: BookingStatus.PENDING,
            notes: 'One-time assistance for medical appointment'
        }
    })

    console.log('📅 Created bookings')

    // Create Payments
    const payment1 = await prisma.payment.create({
        data: {
            bookingId: booking1.id,
            amount: 2500.00,
            currency: 'USD',
            paymentMethod: PaymentMethod.STRIPE,
            status: PaymentStatus.COMPLETED,
            transactionId: 'txn_stripe_001',
            receiptUrl: 'https://receipts.lucerna.com/txn_001.pdf'
        }
    })

    const payment2 = await prisma.payment.create({
        data: {
            bookingId: booking2.id,
            amount: 1800.00,
            currency: 'USD',
            paymentMethod: PaymentMethod.PAYPAL,
            status: PaymentStatus.COMPLETED,
            transactionId: 'txn_paypal_002',
            receiptUrl: 'https://receipts.lucerna.com/txn_002.pdf'
        }
    })

    const payment3 = await prisma.payment.create({
        data: {
            bookingId: booking3.id,
            amount: 3200.00,
            currency: 'USD',
            paymentMethod: PaymentMethod.ECOCASH,
            status: PaymentStatus.PENDING,
            transactionId: 'txn_ecocash_003'
        }
    })

    console.log('💳 Created payments')

    // Create Notifications
    const notifications = [
        // Admin notifications
        {
            userId: admin.id,
            type: NotificationType.EMAIL,
            title: 'New Booking Request',
            message: 'A new booking request has been submitted and requires approval.'
        },
        {
            userId: admin.id,
            type: NotificationType.PUSH,
            title: 'System Update',
            message: 'Database backup completed successfully.'
        },
        {
            userId: admin.id,
            type: NotificationType.EMAIL,
            title: 'Payment Received',
            message: 'Payment of $2,500.00 has been received for booking #BK001.'
        },

        // Client notifications
        {
            userId: client1.id,
            type: NotificationType.EMAIL,
            title: 'Booking Confirmed',
            message: 'Your booking for Robert Smith has been confirmed with Emma Wilson.'
        },
        {
            userId: client1.id,
            type: NotificationType.SMS,
            title: 'Care Visit Today',
            message: 'Emma will arrive at 9:00 AM for Robert\'s daily care visit.'
        },
        {
            userId: client1.id,
            type: NotificationType.PUSH,
            title: 'Payment Due',
            message: 'Payment of $800.00 is due for your upcoming booking.'
        },

        // Carer notifications
        {
            userId: carer1.id,
            type: NotificationType.SMS,
            title: 'New Assignment',
            message: 'You have been assigned to care for Robert Smith starting tomorrow.'
        },
        {
            userId: carer1.id,
            type: NotificationType.PUSH,
            title: 'Visit Reminder',
            message: 'You have a care visit scheduled for Robert Smith in 30 minutes.'
        },
        {
            userId: carer2.id,
            type: NotificationType.EMAIL,
            title: 'Performance Review',
            message: 'Your monthly performance review is now available in your dashboard.'
        }
    ]

    for (const notification of notifications) {
        await prisma.notification.create({
            data: notification
        })
    }

    console.log('🔔 Created notifications')

    // Create Documents
    const documents = [
        {
            bookingId: booking1.id,
            type: DocumentType.CARE_PLAN,
            fileName: 'Robert_Smith_Care_Plan.pdf',
            fileUrl: 'https://docs.lucerna.com/care_plans/robert_smith.pdf',
            uploadedBy: carer1.id
        },
        {
            bookingId: booking1.id,
            type: DocumentType.MEDICAL_RECORD,
            fileName: 'Robert_Smith_Medical_History.pdf',
            fileUrl: 'https://docs.lucerna.com/medical_records/robert_smith.pdf',
            uploadedBy: admin.id
        },
        {
            bookingId: booking1.id,
            type: DocumentType.INVOICE,
            fileName: 'Invoice_BK001.pdf',
            fileUrl: 'https://docs.lucerna.com/invoices/invoice_bk001.pdf',
            uploadedBy: admin.id
        },
        {
            bookingId: booking2.id,
            type: DocumentType.CARE_PLAN,
            fileName: 'Margaret_Smith_Care_Plan.pdf',
            fileUrl: 'https://docs.lucerna.com/care_plans/margaret_smith.pdf',
            uploadedBy: carer2.id
        }
    ]

    for (const document of documents) {
        await prisma.document.create({
            data: document
        })
    }

    console.log('📄 Created documents')

    // Create Care Logs
    const logs = [
        {
            bookingId: booking1.id,
            carerId: carer1.id,
            taskCompleted: {
                tasks: ['Medication given', 'Meal prepared', 'Vital signs checked'],
                completed: true
            },
            medicationGiven: {
                medications: ['Metformin', 'Lisinopril'],
                time: '09:00 AM',
                notes: 'Patient took medications without issues'
            },
            visitStartTime: new Date('2024-01-15T09:00:00Z'),
            visitEndTime: new Date('2024-01-15T11:30:00Z'),
            notes: 'Patient was in good spirits today. Blood pressure was normal.'
        },
        {
            bookingId: booking1.id,
            carerId: carer1.id,
            taskCompleted: {
                tasks: ['Medication given', 'Meal prepared', 'Light exercise'],
                completed: true
            },
            medicationGiven: {
                medications: ['Metformin', 'Lisinopril'],
                time: '09:00 AM',
                notes: 'Patient took medications as prescribed'
            },
            visitStartTime: new Date('2024-01-16T09:00:00Z'),
            visitEndTime: new Date('2024-01-16T11:00:00Z'),
            notes: 'Completed 15-minute walk in garden. Patient enjoyed the fresh air.'
        },
        {
            bookingId: booking2.id,
            carerId: carer2.id,
            taskCompleted: {
                tasks: ['Companionship', 'Light housekeeping', 'Medication reminder'],
                completed: true
            },
            medicationGiven: {
                medications: ['Donepezil'],
                time: '10:00 AM',
                notes: 'Patient took medication with assistance'
            },
            visitStartTime: new Date('2024-01-20T10:00:00Z'),
            visitEndTime: new Date('2024-01-20T14:00:00Z'),
            notes: 'Spent time reading together and organizing photos. Patient was very engaged.'
        }
    ]

    for (const log of logs) {
        await prisma.log.create({
            data: log
        })
    }

    console.log('📝 Created care logs')

    // Create Messages
    const messages = [
        {
            senderId: client1.id,
            receiverId: carer1.id,
            bookingId: booking1.id,
            message: 'Hi Emma, how was Robert today?'
        },
        {
            senderId: carer1.id,
            receiverId: client1.id,
            bookingId: booking1.id,
            message: 'Hi Michael, Robert had a great day! He took his medications well and we went for a short walk. His blood pressure was normal.'
        },
        {
            senderId: client1.id,
            receiverId: carer1.id,
            bookingId: booking1.id,
            message: 'That\'s wonderful! Thank you for the update.'
        },
        {
            senderId: admin.id,
            receiverId: carer1.id,
            message: 'Emma, please remember to submit your weekly report by Friday.'
        },
        {
            senderId: carer1.id,
            receiverId: admin.id,
            message: 'Will do, Sarah. I\'ll have it ready by Thursday.'
        },
        {
            senderId: client2.id,
            receiverId: carer3.id,
            bookingId: booking3.id,
            message: 'Hi Lisa, when can we discuss the care plan for my father?'
        }
    ]

    for (const message of messages) {
        await prisma.message.create({
            data: message
        })
    }

    console.log('💬 Created messages')

    // Create Sample Reports
    const reports = [
        {
            name: 'Monthly Booking Summary',
            type: ReportType.BOOKING_SUMMARY,
            dateRange: '2024-01-01 - 2024-01-31',
            content: {
                totalBookings: 4,
                bookings: [
                    { id: 'BK001', client: 'Michael Smith', carer: 'Emma Wilson', patient: 'Robert Smith', status: 'CONFIRMED', startDate: '2024-01-15', careType: 'ELDERLY_CARE' },
                    { id: 'BK002', client: 'Michael Smith', carer: 'David Brown', patient: 'Margaret Smith', status: 'IN_PROGRESS', startDate: '2024-01-20', careType: 'ELDERLY_CARE' },
                    { id: 'BK003', client: 'Jennifer Davis', carer: 'Lisa Garcia', patient: 'William Davis', status: 'PENDING', startDate: '2024-01-25', careType: 'POST_SURGERY_CARE' },
                    { id: 'BK004', client: 'Michael Smith', carer: 'Unassigned', patient: 'Robert Smith', status: 'PENDING', startDate: '2024-02-01', careType: 'DISABILITY_CARE' }
                ]
            },
            generatedBy: admin.vvid,
            status: ReportStatus.COMPLETED
        },
        {
            name: 'Revenue Analysis Q1 2024',
            type: ReportType.REVENUE_ANALYSIS,
            dateRange: '2024-01-01 - 2024-03-31',
            content: {
                totalRevenue: 4300.00,
                totalPayments: 2,
                payments: [
                    { id: 'PAY001', amount: 2500.00, client: 'Michael Smith', date: '2024-01-15', method: 'STRIPE' },
                    { id: 'PAY002', amount: 1800.00, client: 'Michael Smith', date: '2024-01-20', method: 'PAYPAL' }
                ]
            },
            generatedBy: admin.id,
            status: ReportStatus.COMPLETED
        },
        {
            name: 'Carer Performance Report',
            type: ReportType.CARER_PERFORMANCE,
            dateRange: '2024-01-01 - 2024-01-31',
            content: {
                totalLogs: 3,
                logs: [
                    { id: 'LOG001', carer: 'Emma Wilson', patient: 'Robert Smith', visitStart: '2024-01-15T09:00:00Z', visitEnd: '2024-01-15T11:30:00Z', notes: 'Patient was in good spirits today. Blood pressure was normal.' },
                    { id: 'LOG002', carer: 'Emma Wilson', patient: 'Robert Smith', visitStart: '2024-01-16T09:00:00Z', visitEnd: '2024-01-16T11:00:00Z', notes: 'Completed 15-minute walk in garden. Patient enjoyed the fresh air.' },
                    { id: 'LOG003', carer: 'David Brown', patient: 'Margaret Smith', visitStart: '2024-01-20T10:00:00Z', visitEnd: '2024-01-20T14:00:00Z', notes: 'Spent time reading together and organizing photos. Patient was very engaged.' }
                ]
            },
            generatedBy: admin.id,
            status: ReportStatus.COMPLETED
        }
    ]

    for (const report of reports) {
        await prisma.report.create({
            data: report
        })
    }

    console.log('📊 Created sample reports')

    console.log('✅ Database seeding completed successfully!')
    console.log('\n📋 Demo Accounts Created:')
    console.log('👨‍💼 Admin: admin@lucerna.com / password123')
    console.log('👤 Client 1: client@lucerna.com / password123')
    console.log('👤 Client 2: client2@lucerna.com / password123')
    console.log('👩‍⚕️ Carer 1: carer@lucerna.com / password123')
    console.log('👨‍⚕️ Carer 2: carer2@lucerna.com / password123')
    console.log('👩‍⚕️ Carer 3: carer3@lucerna.com / password123')
    console.log('\n📊 Data Summary:')
    console.log('- 6 Users (1 Admin, 2 Clients, 3 Carers)')
    console.log('- 3 Patients')
    console.log('- 4 Bookings (various statuses)')
    console.log('- 3 Payments (different methods)')
    console.log('- 9 Notifications')
    console.log('- 4 Documents')
    console.log('- 3 Care Logs')
    console.log('- 6 Messages')
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    }) 