<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Support Center</h1>
        <p class="text-xl text-gray-600">We're here to help you with any questions or issues</p>
      </div>
      
      <!-- Quick Contact -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:phone" class="text-blue-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p class="text-gray-600 mb-2">24/7 Available</p>
            <a href="tel:+263710708027" class="text-blue-600 font-medium hover:text-blue-700">
              +263 710708027
            </a>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:email" class="text-green-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p class="text-gray-600 mb-2">Response within 24h</p>
            <a href="mailto:info@lucernaandsternhealth.co.zw" class="text-green-600 font-medium hover:text-green-700">
              info@lucernaandsternhealth.co.zw
            </a>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:chat" class="text-purple-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p class="text-gray-600 mb-2">Mon-Fri 8AM-6PM</p>
            <button @click="startChat" class="text-purple-600 font-medium hover:text-purple-700">
              Start Chat
            </button>
          </div>
        </div>
      </div>
      
      <!-- FAQ Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border border-gray-200 rounded-lg">
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
            >
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <Icon 
                :name="expandedFaqs.includes(index) ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
                class="text-gray-500 text-xl" 
              />
            </button>
            <div v-if="expandedFaqs.includes(index)" class="px-6 pb-4">
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Support Ticket Form -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Submit a Support Ticket</h2>
        <form @submit.prevent="submitTicket" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="form-label">Full Name</label>
              <input
                id="name"
                v-model="ticketForm.name"
                type="text"
                class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label for="email" class="form-label">Email Address</label>
              <input
                id="email"
                v-model="ticketForm.email"
                type="email"
                class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          
          <div>
            <label for="subject" class="form-label">Subject</label>
            <input
              id="subject"
              v-model="ticketForm.subject"
              type="text"
              class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label for="category" class="form-label">Category</label>
            <select
              id="category"
              v-model="ticketForm.category"
              class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="" class="text-gray-900">Select a category</option>
              <option value="technical" class="text-gray-900">Technical Issue</option>
              <option value="billing" class="text-gray-900">Billing & Payment</option>
              <option value="booking" class="text-gray-900">Booking & Scheduling</option>
              <option value="account" class="text-gray-900">Account Management</option>
              <option value="general" class="text-gray-900">General Inquiry</option>
            </select>
          </div>
          
          <div>
            <label for="priority" class="form-label">Priority</label>
            <select
              id="priority"
              v-model="ticketForm.priority"
              class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="low" class="text-gray-900">Low</option>
              <option value="medium" class="text-gray-900">Medium</option>
              <option value="high" class="text-gray-900">High</option>
              <option value="urgent" class="text-gray-900">Urgent</option>
            </select>
          </div>
          
          <div>
            <label for="message" class="form-label">Message</label>
            <textarea
              id="message"
              v-model="ticketForm.message"
              rows="6"
              class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Please describe your issue in detail..."
              required
            ></textarea>
          </div>
          
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="submitting"
              class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting">Submitting...</span>
              <span v-else>Submit Ticket</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = useAuth()

const submitting = ref(false)
const expandedFaqs = ref([])

const faqs = [
  {
    question: "How do I book a healthcare service?",
    answer: "You can book a healthcare service by navigating to the 'Bookings' section in your dashboard and clicking 'Create New Booking'. Follow the step-by-step process to select your preferred service, date, and time."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, bank transfers, and mobile money. All payments are processed securely through our payment gateway."
  },
  {
    question: "Can I cancel or reschedule my booking?",
    answer: "Yes, you can cancel or reschedule your booking up to 24 hours before the scheduled time. Go to your bookings section and use the 'Edit' or 'Cancel' options."
  },
  {
    question: "How do I update my profile information?",
    answer: "You can update your profile information by going to 'Profile Settings' in your account menu. There you can modify your personal details, contact information, and preferences."
  },
  {
    question: "What if I have an emergency?",
    answer: "For emergencies, please call our 24/7 emergency hotline at +27 61 629 1608 immediately. Our team will provide immediate assistance and coordinate with emergency services if needed."
  },
  {
    question: "How do I contact my assigned healthcare provider?",
    answer: "You can contact your assigned healthcare provider through the messaging system in your dashboard, or by calling our support line. We'll connect you with your provider as soon as possible."
  }
]

const ticketForm = ref({
  name: user.value?.firstName && user.value?.lastName ? `${user.value.firstName} ${user.value.lastName}` : '',
  email: user.value?.email || '',
  subject: '',
  category: '',
  priority: 'medium',
  message: ''
})

const toggleFaq = (index) => {
  const faqIndex = expandedFaqs.value.indexOf(index)
  if (faqIndex > -1) {
    expandedFaqs.value.splice(faqIndex, 1)
  } else {
    expandedFaqs.value.push(index)
  }
}

const startChat = () => {
  // Here you would typically integrate with a live chat service
  alert('Live chat feature coming soon! For now, please use our phone or email support.')
}

const submitTicket = async () => {
  submitting.value = true
  try {
    // Here you would typically make an API call to submit the ticket
    console.log('Submitting ticket:', ticketForm.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.')
    
    // Reset form
    ticketForm.value = {
      name: user.value?.firstName && user.value?.lastName ? `${user.value.firstName} ${user.value.lastName}` : '',
      email: user.value?.email || '',
      subject: '',
      category: '',
      priority: 'medium',
      message: ''
    }
    
  } catch (error) {
    console.error('Error submitting ticket:', error)
    alert('Error submitting ticket. Please try again.')
  } finally {
    submitting.value = false
  }
}

useHead({ title: 'Support - Lucerna & Stern Health' })
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white text-gray-900;
}

.btn-primary {
  @apply inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}
</style> 