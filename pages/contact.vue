<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Contact Us</h1>
        <p class="text-2xl text-white/90">We're Here to Help</p>
        <p class="text-lg text-white/80">Get in touch with our care team today</p>
      </div>
    </section>

    <!-- Contact Content -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Get Started Today</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions? Need help arranging care for a loved one in Zimbabwe? We're here to support you—whether you live locally or abroad.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Contact Information -->
        <div class="space-y-8">
          <div class="bg-lucerna-primary rounded-xl p-8 text-contrast">
            <h3 class="text-2xl font-bold text-on-background mb-6">Contact Information</h3>
            
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/20 border border-white/30">
                  <Icon name="mdi:email" class="text-2xl text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-on-background mb-1">Email</h4>
                  <p class="opacity-80 text-on-background">info@lucernaandsternhealth.co.zw</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/20 border border-white/30">
                  <Icon name="mdi:phone" class="text-2xl text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-on-background mb-1">Phone & WhatsApp</h4>
                  <p class="opacity-80 text-on-background">+263 710708027</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/20 border border-white/30">
                  <Icon name="mdi:map-marker" class="text-2xl text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-on-background mb-1">Head Office (By Appointment Only)</h4>
                  <p class="opacity-80 text-on-background">6 Chelmsford Road,<br>Belgravia, Harare<br>Zimbabwe</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/20 border border-white/30">
                  <Icon name="mdi:clock" class="text-2xl text-white" />
                </div>
                <div>
                  <h4 class="font-semibold text-on-background mb-1">Response Time</h4>
                  <p class="opacity-80 text-on-background">We'll respond promptly and guide you through the next steps with clarity and care.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 rounded-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Why Choose Us</h3>
            <ul class="space-y-4">
              <li class="flex items-start space-x-3">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 flex-shrink-0" />
                <span class="text-gray-700">Free initial consultation to understand your needs</span>
              </li>
              <li class="flex items-start space-x-3">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 flex-shrink-0" />
                <span class="text-gray-700">Personalized care plans tailored to your family</span>
              </li>
              <li class="flex items-start space-x-3">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 flex-shrink-0" />
                <span class="text-gray-700">24/7 support for families in the diaspora</span>
              </li>
              <li class="flex items-start space-x-3">
                <Icon name="mdi:check-circle" class="text-lucerna-primary mt-1 flex-shrink-0" />
                <span class="text-gray-700">Culturally sensitive care that respects Zimbabwean traditions</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-xl shadow-lg p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="form-label">First Name</label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  class="input-field focus:ring-2 focus:ring-lucerna-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  class="input-field focus:ring-2 focus:ring-lucerna-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="input-field focus:ring-2 focus:ring-lucerna-primary focus:border-transparent"
                required
              />
            </div>

            <div>
              <label for="phone" class="form-label">Phone Number</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="input-field focus:ring-2 focus:ring-lucerna-primary focus:border-transparent"
              />
            </div>

            <div>
              <label for="location" class="form-label">Location</label>
              <select
                id="location"
                v-model="form.location"
                class="input-field focus:ring-2 focus:ring-lucerna-primary focus:border-transparent"
                required
              >
                <option value="" class="text-gray-900">Select your location</option>
                <option value="harare" class="text-gray-900">Harare</option>
                <option value="bulawayo" class="text-gray-900">Bulawayo</option>
                <option value="gweru" class="text-gray-900">Gweru</option>
                <option value="mutare" class="text-gray-900">Mutare</option>
                <option value="masvingo" class="text-gray-900">Masvingo</option>
                <option value="victoria-falls" class="text-gray-900">Victoria Falls</option>
                <option value="chinhoyi" class="text-gray-900">Chinhoyi</option>
                <option value="bindura" class="text-gray-900">Bindura</option>
                <option value="other" class="text-gray-900">Other</option>
              </select>
            </div>

            <div>
              <label for="serviceInterest" class="form-label">Service Interest</label>
              <select
                id="serviceInterest"
                v-model="form.serviceInterest"
                class="input-field focus:ring-2 focus:ring-lucerna-primary focus:border-transparent"
                required
              >
                <option value="" class="text-gray-900">Select a service</option>
                <option value="personal-care" class="text-gray-900">Personal Care</option>
                <option value="companion-care" class="text-gray-900">Companion Care</option>
                <option value="respite-care" class="text-gray-900">Respite Care</option>
                <option value="complex-care" class="text-gray-900">24/7 Complex Care</option>
                <option value="live-in-care" class="text-gray-900">Live-In Care</option>
                <option value="skilled-nursing" class="text-gray-900">Skilled Nursing Care</option>
                <option value="physiotherapy" class="text-gray-900">Physiotherapy</option>
                <option value="speech-therapy" class="text-gray-900">Speech Therapy</option>
                <option value="occupational-therapy" class="text-gray-900">Occupational Therapy</option>
                <option value="learning-disabilities" class="text-gray-900">Learning Disabilities & Autism Support</option>
                <option value="other" class="text-gray-900">Other</option>
              </select>
            </div>

            <div>
              <label for="message" class="form-label">Message <span class="text-gray-500 text-sm">(minimum 5 characters)</span></label>
              <textarea
                id="message"
                v-model="form.message"
                rows="4"
                minlength="5"
                class="input-field focus:ring-2 focus:ring-lucerna-primary focus:border-transparent"
                placeholder="Tell us about your care needs and how we can help..."
                required
              ></textarea>
            </div>

            <button type="submit" class="w-full btn-primary text-lg py-3">
              Send Message
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// Contact form data
const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  serviceInterest: '',
  message: ''
})

// Submit form
const submitForm = async () => {
  try {
    // Send form data to API endpoint
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    })
    
    if (response.success) {
      // Show success message
      alert('Thank you for your message! We will get back to you within 24 hours. You should also receive a confirmation email shortly.')
      
      // Reset form
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        serviceInterest: '',
        message: ''
      }
    } else {
      throw new Error('Failed to send message')
    }
  } catch (error) {
    console.error('Error submitting form:', error)
    
    // Handle validation errors
    if (error.data && error.data.length > 0) {
      const errorMessages = error.data.map(err => err.message).join(', ')
      alert(`Please fix the following errors:\n\n${errorMessages}`)
    } else if (error.statusMessage) {
      alert(`Error: ${error.statusMessage}`)
    } else {
      alert('There was an error sending your message. Please try again or contact us directly at +263 710708027.')
    }
  }
}

useSeo({
  title: 'Contact Us',
  description: 'Get in touch with Lucerna & Stern Health. Contact our care team in Zimbabwe for home care services, consultations, and support. Email: info@lucernaandsternhealth.co.zw | Phone: +263 710708027',
  keywords: 'contact healthcare Zimbabwe, home care consultation, healthcare support Zimbabwe, care coordinator, healthcare booking Zimbabwe',
  canonical: 'https://lucernahealth.co.zw/contact',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Lucerna & Stern Health',
    description: 'Contact our healthcare team for consultations and care services in Zimbabwe',
    url: 'https://lucernahealth.co.zw/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'Lucerna & Stern Health',
      telephone: '+263 710708027',
      email: 'info@lucernaandsternhealth.co.zw',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '6 Chelmsford Road',
        addressLocality: 'Belgravia',
        addressRegion: 'Harare',
        addressCountry: 'ZW'
      }
    }
  }
})
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lucerna-primary focus:border-transparent transition-colors bg-white text-gray-900 placeholder-gray-500;
  color: #1f2937 !important;
}

.input-field::placeholder {
  color: #6b7280 !important;
}

.btn-primary {
  @apply inline-flex items-center px-4 py-2 bg-lucerna-primary text-white rounded-lg hover:bg-lucerna-primary-dark transition-colors font-medium;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

/* Ensure placeholder and option text colors are readable */
input::placeholder,
textarea::placeholder {
  @apply text-gray-500;
  color: #6b7280 !important;
}

select,
option {
  @apply text-gray-900;
  color: #1f2937 !important;
}

textarea {
  color: #1f2937 !important;
}

select.input-field {
  color: #1f2937 !important;
}
</style>