<template>
  <div class="min-h-screen bg-gray-50">
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Carer Support Center</h1>
        <p class="text-xl text-gray-600">Professional support for healthcare providers</p>
      </div>
      
      <!-- Quick Contact -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:phone" class="text-green-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Professional Support</h3>
            <p class="text-gray-600 mb-2">24/7 Available</p>
            <a href="tel:+263710708027" class="text-green-600 font-medium hover:text-green-700">
              +263 710708027
            </a>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:email" class="text-blue-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p class="text-gray-600 mb-2">Response within 4h</p>
            <a href="mailto:info@lucernaandsternhealth.co.zw" class="text-blue-600 font-medium hover:text-blue-700">
              info@lucernaandsternhealth.co.zw
            </a>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:account-group" class="text-purple-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Peer Support</h3>
            <p class="text-gray-600 mb-2">Connect with colleagues</p>
            <button @click="joinPeerSupport" class="text-purple-600 font-medium hover:text-purple-700">
              Join Group
            </button>
          </div>
        </div>
      </div>
      
      <!-- Professional Resources -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Professional Resources</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:book-open-variant" class="text-green-600 text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Training Materials</h3>
            <p class="text-sm text-gray-600 mb-4">Access to latest healthcare training resources</p>
            <button @click="accessTraining" class="text-green-600 font-medium hover:text-green-700">
              Access Materials
            </button>
          </div>
          
          <div class="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:clipboard-text" class="text-blue-600 text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Protocols & Guidelines</h3>
            <p class="text-sm text-gray-600 mb-4">Latest healthcare protocols and best practices</p>
            <button @click="viewProtocols" class="text-blue-600 font-medium hover:text-blue-700">
              View Protocols
            </button>
          </div>
          
          <div class="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:certificate" class="text-purple-600 text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Certification</h3>
            <p class="text-sm text-gray-600 mb-4">Renew certifications and get new ones</p>
            <button @click="manageCertifications" class="text-purple-600 font-medium hover:text-purple-700">
              Manage Certs
            </button>
          </div>
          
          <div class="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:calendar-clock" class="text-yellow-600 text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Schedule Support</h3>
            <p class="text-sm text-gray-600 mb-4">Get help with scheduling and assignments</p>
            <button @click="getScheduleHelp" class="text-yellow-600 font-medium hover:text-yellow-700">
              Get Help
            </button>
          </div>
          
          <div class="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:medical-bag" class="text-red-600 text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Emergency Procedures</h3>
            <p class="text-sm text-gray-600 mb-4">Emergency protocols and procedures</p>
            <button @click="viewEmergencyProcedures" class="text-red-600 font-medium hover:text-red-700">
              View Procedures
            </button>
          </div>
          
          <div class="p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-multiple" class="text-indigo-600 text-xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Team Coordination</h3>
            <p class="text-sm text-gray-600 mb-4">Coordinate with other healthcare providers</p>
            <button @click="coordinateTeam" class="text-indigo-600 font-medium hover:text-indigo-700">
              Coordinate
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
      
      <!-- Support Request Form -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Submit Support Request</h2>
        <form @submit.prevent="submitSupportRequest" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                id="name"
                v-model="supportForm.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label for="licenseNumber" class="block text-sm font-medium text-gray-700 mb-2">License Number</label>
              <input
                id="licenseNumber"
                v-model="supportForm.licenseNumber"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                id="email"
                v-model="supportForm.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                id="phone"
                v-model="supportForm.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>
          
          <div>
            <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              id="subject"
              v-model="supportForm.subject"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                id="category"
                v-model="supportForm.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="">Select a category</option>
                <option value="technical">Technical Issue</option>
                <option value="scheduling">Scheduling Problem</option>
                <option value="clinical">Clinical Support</option>
                <option value="training">Training Request</option>
                <option value="certification">Certification Issue</option>
                <option value="emergency">Emergency Support</option>
                <option value="general">General Inquiry</option>
              </select>
            </div>
            <div>
              <label for="priority" class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                id="priority"
                v-model="supportForm.priority"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          
          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              v-model="supportForm.message"
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Please describe your issue or request in detail..."
              required
            ></textarea>
          </div>
          
          <div class="flex justify-end">
            <button
              type="submit"
              :disabled="submitting"
              class="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="submitting">Submitting...</span>
              <span v-else>Submit Request</span>
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
    question: "How do I update my availability?",
    answer: "You can update your availability by going to your 'Settings' page and navigating to the 'Work' tab. There you can set your working hours, service areas, and availability status."
  },
  {
    question: "What should I do if I can't attend an assignment?",
    answer: "If you cannot attend an assignment, please contact our support team immediately at +27 61 629 1608. We'll help you reschedule or find a replacement carer."
  },
  {
    question: "How do I report an emergency situation?",
    answer: "For emergency situations, call our 24/7 emergency hotline immediately at +27 61 629 1608. Also, follow the emergency procedures outlined in your training materials."
  },
  {
    question: "How do I access my training materials?",
    answer: "You can access your training materials through the 'Professional Resources' section on this support page, or by going to the 'Training' section in your dashboard."
  },
  {
    question: "What if I have a clinical question?",
    answer: "For clinical questions, you can contact our clinical support team through the support request form, or call our professional support line during business hours."
  },
  {
    question: "How do I renew my certifications?",
    answer: "You can manage your certifications through the 'Professional Resources' section. We'll notify you when certifications are due for renewal and provide the necessary training."
  }
]

const supportForm = ref({
  name: user.value?.firstName && user.value?.lastName ? `${user.value.firstName} ${user.value.lastName}` : '',
  licenseNumber: user.value?.licenseNumber || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
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

const joinPeerSupport = () => {
  alert('Peer support group feature coming soon! You\'ll be able to connect with other healthcare providers.')
}

const accessTraining = () => {
  alert('Training materials portal coming soon! You\'ll have access to the latest healthcare training resources.')
}

const viewProtocols = () => {
  alert('Protocols and guidelines portal coming soon! You\'ll have access to the latest healthcare protocols.')
}

const manageCertifications = () => {
  alert('Certification management portal coming soon! You\'ll be able to manage and renew your certifications.')
}

const getScheduleHelp = () => {
  alert('Schedule support feature coming soon! You\'ll be able to get help with scheduling and assignments.')
}

const viewEmergencyProcedures = () => {
  alert('Emergency procedures portal coming soon! You\'ll have access to all emergency protocols.')
}

const coordinateTeam = () => {
  alert('Team coordination feature coming soon! You\'ll be able to coordinate with other healthcare providers.')
}

const submitSupportRequest = async () => {
  submitting.value = true
  try {
    // Here you would typically make an API call to submit the support request
    console.log('Submitting support request:', supportForm.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    alert('Support request submitted successfully! We\'ll get back to you within 4 hours.')
    
    // Reset form
    supportForm.value = {
      name: user.value?.firstName && user.value?.lastName ? `${user.value.firstName} ${user.value.lastName}` : '',
      licenseNumber: user.value?.licenseNumber || '',
      email: user.value?.email || '',
      phone: user.value?.phone || '',
      subject: '',
      category: '',
      priority: 'medium',
      message: ''
    }
    
  } catch (error) {
    console.error('Error submitting support request:', error)
    alert('Error submitting support request. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script> 