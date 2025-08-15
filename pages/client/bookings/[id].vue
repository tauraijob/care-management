<template>
  <LoadingSpinner 
    v-if="!user" 
    message="Loading user data..." 
    sub-message="Please wait while we authenticate you" 
  />
  
  <div v-else-if="error" class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
    <div class="text-center">
      <Icon name="mdi:alert-circle" class="text-red-500 text-4xl mx-auto mb-4" />
      <p class="text-gray-600">Authentication Error</p>
      <p class="text-sm text-gray-500 mt-2">Please log in again</p>
      <NuxtLink to="/login" class="mt-4 inline-block btn-primary">
        Go to Login
      </NuxtLink>
    </div>
  </div>
  
  <div v-else>
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div>
            <NuxtLink to="/client/bookings" class="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
              <Icon name="mdi:arrow-left" class="mr-2" />
              Back to Bookings
            </NuxtLink>
            <h1 class="text-3xl font-bold text-gray-900">Booking Details</h1>
            <p class="text-gray-600 mt-2">View detailed information about your booking</p>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div class="text-center">
          <div class="w-16 h-16 text-green-500 animate-spin mx-auto mb-4 text-4xl">
            <Icon name="mdi:loading" />
          </div>
          <p class="text-gray-500">Loading booking details...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div class="text-center">
          <Icon name="mdi:alert-circle" class="w-16 h-16 text-red-500 mx-auto mb-4 text-4xl" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Booking</h3>
          <p class="text-gray-500 mb-6">{{ error }}</p>
          <NuxtLink to="/client/bookings" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Icon name="mdi:arrow-left" class="mr-2" />
            Back to Bookings
          </NuxtLink>
        </div>
      </div>

      <!-- Booking Details -->
      <div v-else-if="booking" class="space-y-6">
        <!-- Booking Header -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:account" class="text-green-600 text-2xl" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-gray-900">
                  {{ booking.patient ? `${booking.patient.firstName} ${booking.patient.lastName}` : 'Unknown Patient' }}
                </h2>
                <p class="text-gray-500">Booking #{{ booking.id }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span :class="getStatusBadgeClass(booking.status)" class="px-4 py-2 text-sm font-medium rounded-full">
                {{ booking.status }}
              </span>
              <div class="flex space-x-2">
                <button @click="downloadInvoice(booking.id)" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  <Icon name="mdi:file-document" class="mr-2" />
                  Download Invoice
                </button>
                <button v-if="booking.status === 'PENDING'" @click="cancelBooking(booking.id)" class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  <Icon name="mdi:close-circle" class="mr-2" />
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Booking Information -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Service Details -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="mdi:heart" class="mr-2 text-green-600" />
              Service Details
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Care Type:</span>
                <span class="font-medium text-gray-900">{{ booking.careType }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Frequency:</span>
                <span class="font-medium text-gray-900">{{ booking.frequency }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Start Date:</span>
                <span class="font-medium text-gray-900">{{ formatDate(booking.startDate) }}</span>
              </div>
              <div v-if="booking.endDate" class="flex justify-between">
                <span class="text-gray-600">End Date:</span>
                <span class="font-medium text-gray-900">{{ formatDate(booking.endDate) }}</span>
              </div>
              <div v-if="booking.startTime" class="flex justify-between">
                <span class="text-gray-600">Start Time:</span>
                <span class="font-medium text-gray-900">{{ booking.startTime }}</span>
              </div>
              <div v-if="booking.endTime" class="flex justify-between">
                <span class="text-gray-600">End Time:</span>
                <span class="font-medium text-gray-900">{{ booking.endTime }}</span>
              </div>
              <div v-if="booking.location" class="flex justify-between">
                <span class="text-gray-600">Location:</span>
                <span class="font-medium text-gray-900">{{ booking.location }}</span>
              </div>
            </div>
          </div>

          <!-- Patient Information -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="mdi:account" class="mr-2 text-green-600" />
              Patient Information
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Name:</span>
                <span class="font-medium text-gray-900">{{ booking.patient ? `${booking.patient.firstName} ${booking.patient.lastName}` : 'N/A' }}</span>
              </div>
              <div v-if="booking.patient?.dateOfBirth" class="flex justify-between">
                <span class="text-gray-600">Date of Birth:</span>
                <span class="font-medium text-gray-900">{{ formatDate(booking.patient.dateOfBirth) }}</span>
              </div>
            </div>
          </div>

          <!-- Carer Information -->
          <div v-if="booking.carer" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="mdi:account-tie" class="mr-2 text-green-600" />
              Carer Information
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Name:</span>
                <span class="font-medium text-gray-900">{{ `${booking.carer.firstName} ${booking.carer.lastName}` }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Email:</span>
                <span class="font-medium text-gray-900">{{ booking.carer.email }}</span>
              </div>
              <div v-if="booking.carer.phone" class="flex justify-between">
                <span class="text-gray-600">Phone:</span>
                <span class="font-medium text-gray-900">{{ booking.carer.phone }}</span>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="mdi:currency-usd" class="mr-2 text-green-600" />
              Payment Information
            </h3>
            <div v-if="booking.payments && booking.payments.length > 0" class="space-y-4">
              <div class="flex justify-between">
                <span class="text-gray-600">Amount:</span>
                <span class="font-medium text-green-600">${{ booking.payments[0].amount }} {{ booking.payments[0].currency }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Status:</span>
                <span class="font-medium text-gray-900">{{ booking.payments[0].status }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Payment Date:</span>
                <span class="font-medium text-gray-900">{{ formatDate(booking.payments[0].createdAt) }}</span>
              </div>
            </div>
            <div v-else class="text-gray-500">
              No payment information available
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="booking.notes" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Icon name="mdi:note-text" class="mr-2 text-green-600" />
            Additional Notes
          </h3>
          <p class="text-gray-700">{{ booking.notes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'client'
})

const route = useRoute()
const router = useRouter()
const { user } = useAuth()

const booking = ref(null)
const loading = ref(true)
const error = ref(null)

// Fetch booking details
const fetchBooking = async () => {
  try {
    loading.value = true
    error.value = null
    
    const { data, error: fetchError } = await useFetch(`/api/bookings/${route.params.id}`)
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to fetch booking')
    }
    
    if (data.value && data.value.success) {
      booking.value = data.value.booking
    } else {
      throw new Error('Booking not found')
    }
  } catch (err) {
    console.error('Error fetching booking:', err)
    error.value = err.message || 'Failed to load booking details'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchBooking()
})

// Methods
const cancelBooking = async (bookingId) => {
  if (!confirm('Are you sure you want to cancel this booking?')) {
    return
  }
  
  try {
    const response = await $fetch(`/api/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.success) {
      alert('Booking cancelled successfully')
      await fetchBooking() // Refresh booking data
    } else {
      alert('Failed to cancel booking')
    }
  } catch (error) {
    console.error('Error cancelling booking:', error)
    alert('Failed to cancel booking. Please try again.')
  }
}

const downloadInvoice = async (bookingId) => {
  try {
    const response = await $fetch(`/api/bookings/${bookingId}/invoice`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      }
    })
    
    if (response.success) {
      const blob = new Blob([response.data], { type: 'text/html' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${bookingId}.html`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } else {
      alert('Failed to download invoice')
    }
  } catch (error) {
    console.error('Error downloading invoice:', error)
    alert('Failed to download invoice. Please try again.')
  }
}

const getStatusBadgeClass = (status) => {
  const classes = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    ACTIVE: 'bg-green-100 text-green-800',
    COMPLETED: 'bg-purple-100 text-purple-800',
    CANCELLED: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useHead({ title: 'Booking Details - Lucerna & Stern Health' })
</script>
