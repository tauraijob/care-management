# Lucerna & Stern Health - Developer Guide

## Software Requirements Specification (SRS)

**Project Name:** Lucerna & Stern Health  
**Prepared for:** Webdev  
**Prepared by:** Lucerna & Stern Health  

---

## 1. Project Overview

This platform provides a secure, premium healthcare solution for patients in Zimbabwe. The primary users are diaspora-based clients (e.g., UK, USA, SA) who arrange, pay for, and monitor in-home care for their loved ones in Zimbabwe. The site enables bookings, secure payment processing, real-time care updates, and user-specific access to medical/care records. A premium design, seamless user journey, and high-level trust features are critical.

### Key Objectives
- Provide secure, premium healthcare booking platform
- Enable diaspora clients to manage care for loved ones remotely
- Facilitate real-time care monitoring and updates
- Ensure secure payment processing
- Maintain medical-grade trust and reliability

---

## 2. User Roles and Access

| Role | Capabilities |
|------|-------------|
| **Admin** | Full control: manage users, carers, content, payments, care plans |
| **Diaspora Client** | Secure login; book care; pay online; view care logs and documents |
| **Carer** | Secure backend login; input care notes, visit logs, medication updates |
| **Patient** | Receives care (no platform login required) |

---

## 3. Functional Requirements

### 3.1 Booking System

| Feature | Description |
|---------|-------------|
| **Service Selection** | User selects type, frequency, and duration of care |
| **Calendar View** | Allows client to choose available slots or dates |
| **One-Off or Recurring** | Booking options for one-time or repeating care visits |
| **Patient Details** | Form to capture patient info and preferences |

### 3.2 Online Payment System

| Feature | Description |
|---------|-------------|
| **Payment Gateway Integration** | Stripe, PayPal, and local options (e.g., EcoCash) |
| **Payment Types** | One-time and recurring |
| **Receipts & Invoices** | Automatically generated and emailed |
| **Security Compliance** | PCI-DSS, SSL/TLS encrypted transactions |

### 3.3 Secure Client Portal

| Feature | Description |
|---------|-------------|
| **Login & Dashboard** | Password-protected access, dashboard view of care history and updates |
| **Document Access** | View/download visit notes, medical logs, and care plans |
| **Messaging** | Internal message centre for updates |

### 3.4 Carer Interface

| Feature | Description |
|---------|-------------|
| **Mobile Access** | Carers log care activity via mobile |
| **Care Task Logging** | Record visit time, task completion, notes, medication |
| **Timestamping** | Tracks exact time of each entry |

### 3.5 Notifications

| Trigger | Notification Sent To | Method |
|---------|---------------------|--------|
| **Missed/Late Visits** | Diaspora Client, Admin | SMS/Email |
| **Medication Alerts** | Admin, Client | Email |
| **Payment Reminders** | Client | Email |
| **Daily Summary** | Client | Optional Email |

---

## 4. Non-Functional Requirements

| Requirement | Detail |
|-------------|--------|
| **Responsive Design** | Compatible with mobile, tablet, desktop |
| **Load Speed** | Pages load within 3 seconds on 3G |
| **Scalability** | System supports 100+ concurrent users |
| **Security** | HTTPS, encryption, role-based access |
| **Data Compliance** | GDPR (diaspora), local Zimbabwe data laws |
| **Backup & Recovery** | Daily automated backups |
| **Uptime Guarantee** | 99.9% uptime |
| **Visual Identity** | Premium, minimalist UI with soft tones, medical-grade trust cues |
| **Accessibility** | WCAG 2.1 Level AA compliant where possible |
| **Branding** | Custom fonts, icons, and brand-consistent styling integrated |

---

## 5. Content Management

| Component | Editable By Admin? | Notes |
|-----------|-------------------|-------|
| **About Us Page** | Yes | Update company story and values |
| **Services Page** | Yes | Add/edit service offerings |
| **FAQs** | Yes | Manage questions and answers |
| **Testimonials** | Yes | Add/remove client feedback |
| **News/Blog** | Yes | Optional blog section |
| **Image/Video Upload** | Yes | Branded media content |

---

## 6. Optional / Future Features

| Feature | Purpose |
|---------|---------|
| **Video Check-In** | Allow family members to video call patients via the portal |
| **Ratings/Feedback** | Rate carers and provide service reviews |
| **Health Record Upload** | Upload prescriptions, doctor notes, etc. |
| **WhatsApp Notifications** | Enable appointment and care updates via WhatsApp |
| **AI Chat Support** | Assist families with FAQs and care updates |

---

## 7. Deliverables

| Item | Description |
|------|-------------|
| **Website Front-End** | Fully functional, premium design, mobile responsive |
| **Admin CMS Panel** | Control panel for site management |
| **Secure Portals** | Separate login areas for clients and carers |
| **Integrated Payment System** | Fully set up with test/live modes |
| **User Guide** | Admin and client manual (PDF or online) |
| **Branding Kit** | Fonts, logos, and design components used on the site |

---

## 8. Technical Architecture

### 8.1 Technology Stack
- **Frontend:** Nuxt.js 3 with Vue.js 3
- **Styling:** Tailwind CSS
- **Backend:** Nuxt.js server-side API routes
- **Database:** Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Authentication:** JWT-based authentication
- **Payment:** Stripe, PayPal, EcoCash integration
- **Deployment:** Vercel, Netlify, or similar

### 8.2 Project Structure
```
lucerna/
├── app/                    # Main app component
├── assets/                 # Static assets (CSS, images)
├── components/             # Reusable Vue components
├── composables/            # Vue composables (useAuth, etc.)
├── layouts/                # Page layouts (admin, client, carer)
├── middleware/             # Authentication middleware
├── pages/                  # Application pages
│   ├── admin/             # Admin dashboard pages
│   ├── carer/             # Carer interface pages
│   ├── client/            # Client portal pages
│   └── public/            # Public pages (home, about, etc.)
├── plugins/                # Nuxt plugins
├── prisma/                 # Database schema and migrations
├── public/                 # Public static files
├── server/                 # API routes and server utilities
└── uploads/                # File uploads directory
```

### 8.3 Database Schema
- **Users:** Admin, Client, Carer accounts
- **Patients:** Patient information and medical details
- **Bookings:** Care appointments and schedules
- **Payments:** Transaction records and receipts
- **Care Logs:** Visit notes and care activities
- **Messages:** Internal communication system

---

## 9. Development Guidelines

### 9.1 Code Standards
- Use TypeScript for type safety
- Follow Vue.js 3 Composition API patterns
- Implement proper error handling
- Write comprehensive comments
- Use semantic HTML and accessibility features

### 9.2 Security Requirements
- Implement role-based access control (RBAC)
- Use HTTPS for all communications
- Encrypt sensitive data at rest
- Implement proper input validation
- Follow OWASP security guidelines

### 9.3 Performance Requirements
- Optimize images and assets
- Implement lazy loading
- Use proper caching strategies
- Minimize bundle size
- Ensure mobile-first responsive design

### 9.4 Testing Strategy
- Unit tests for components
- Integration tests for API routes
- End-to-end tests for critical user flows
- Performance testing
- Security testing

---

## 10. Deployment & Maintenance

### 10.1 Environment Setup
- Development environment with hot reload
- Staging environment for testing
- Production environment with monitoring

### 10.2 Monitoring & Analytics
- Error tracking and logging
- Performance monitoring
- User analytics
- Security monitoring

### 10.3 Backup Strategy
- Daily automated database backups
- File system backups
- Disaster recovery plan
- Data retention policies

---

## 11. Contact Information

**WhatsApp:** [Contact number to be provided] 
**Email:** [Contact email to be provided]  
**Website:** [Production URL to be provided]

---

*This document serves as the complete specification for the Lucerna & Stern Health platform. All development should follow these requirements to ensure a secure, reliable, and user-friendly healthcare booking system.*