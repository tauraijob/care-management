# Lucerna & Stern Health Platform

A comprehensive healthcare management platform built with Nuxt 3, Prisma, and Tailwind CSS.

## 🏥 Features

### Core Functionality
- **Multi-role Authentication**: Client, Carer, and Admin roles
- **Smart Booking System**: Automated carer assignment and conflict detection
- **Payment Integration**: Stripe, PayPal, and EcoCash support
- **Real-time Notifications**: Email, SMS, and WhatsApp integration
- **Document Management**: Secure file uploads and storage
- **Mobile-First Design**: Responsive interface for all devices

### User Dashboards
- **Client Dashboard**: Booking management, patient profiles, payment history
- **Carer Dashboard**: Mobile-optimized care logging and schedule management
- **Admin Panel**: User management, analytics, and system administration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MySQL 8.0+ (via XAMPP)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lucerna-health
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   # Database Configuration
   DATABASE_URL="mysql://root:@localhost:3306/lucerna_health"
   
   # JWT Configuration
   JWT_SECRET="your-secret-key"
   
   # Stripe Configuration
   STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
   STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
   
   # SendGrid Configuration
   SENDGRID_API_KEY="your_sendgrid_api_key"
   
   # Twilio Configuration
   TWILIO_ACCOUNT_SID="your_twilio_account_sid"
   TWILIO_AUTH_TOKEN="your_twilio_auth_token"
   
   # WhatsApp Configuration
   WHATSAPP_API_KEY="your_whatsapp_api_key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed sample data (optional)
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
lucerna-health/
├── components/          # Vue components
├── pages/              # Application pages
├── layouts/            # Page layouts
├── middleware/         # Route middleware
├── plugins/            # Nuxt plugins
├── server/             # Server-side API routes
├── prisma/             # Database schema and migrations
├── public/             # Static assets
├── assets/             # CSS, images, etc.
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

## 🛠️ Technology Stack

- **Frontend**: Nuxt 3, Vue 3, Tailwind CSS
- **UI Components**: PrimeVue
- **Backend**: Nuxt Server Routes
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Payments**: Stripe, PayPal, EcoCash
- **Notifications**: SendGrid, Twilio, WhatsApp API
- **Icons**: Nuxt Icon (Heroicons)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

## 📱 User Roles

### Client
- Book care services
- Manage patient profiles
- View care history and documents
- Make payments
- Communicate with carers

### Carer
- View assigned bookings
- Log care activities
- Update patient status
- Access mobile-optimized interface
- Track visit times

### Admin
- Manage all users and bookings
- Assign carers to bookings
- View analytics and reports
- Manage system settings
- Handle payments and invoices

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Password hashing with bcrypt
- Input validation and sanitization
- HTTPS enforcement
- CORS configuration

## 📞 Contact & Support

- **WhatsApp**: +263 710708027
- **Email**: info@lucernaandsternhealth.co.zw
- **Support**: 24/7 Available

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private healthcare platform. For support or feature requests, please contact the development team.

---

**Lucerna & Stern Health** - Professional Healthcare Management Platform
