<template>
  <div class="max-w-4xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Create New Booking</h1>
          <p class="text-sm text-gray-600 mt-1">Schedule a new care service booking</p>
        </div>
        <NuxtLink to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
          Back to Bookings
        </NuxtLink>
      </div>
    </div>

    <!-- Booking Form -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Booking Details</h3>
      </div>
      <form @submit.prevent="createBooking" class="p-6 space-y-6">
        <!-- Client Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Client</label>
          <select v-model="form.clientId" @change="onClientChange" required class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
            <option value="">Select a client</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.fullName }} - {{ client.phone }}
            </option>
          </select>
        </div>

        <!-- Patient Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Patient</label>
          <select v-model="form.patientId" required class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition" :disabled="!form.clientId">
            <option value="">Select a patient</option>
            <option v-for="patient in selectedClientPatients" :key="patient.id" :value="patient.id">
              {{ patient.fullName }} ({{ formatDate(patient.dateOfBirth) }})
            </option>
          </select>
        </div>

        <!-- Carer Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Carer (Optional)</label>
          <select v-model="form.carerId" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
            <option value="">Select a carer (optional)</option>
            <option v-for="carer in carers" :key="carer.id" :value="carer.id">
              {{ carer.fullName }} - {{ carer.specialty }}
            </option>
          </select>
        </div>

        <!-- Service Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
          <select v-model="form.careType" required class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
            <option value="">Select service type</option>
            <option value="ELDERLY_CARE">Elderly Care</option>
            <option value="DISABILITY_CARE">Disability Care</option>
            <option value="POST_SURGERY_CARE">Post Surgery Care</option>
            <option value="PALLIATIVE_CARE">Palliative Care</option>
          </select>
        </div>

        <!-- Frequency -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
          <select v-model="form.frequency" required class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
            <option value="">Select frequency</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="ONCE">Once</option>
          </select>
        </div>

        <!-- Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input v-model="form.startDate" type="date" required class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">End Date (Optional)</label>
            <input v-model="form.endDate" type="date" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Time (Optional)</label>
            <input v-model="form.startTime" type="time" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">End Time (Optional)</label>
            <input v-model="form.endTime" type="time" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
          </div>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Service Location (Optional)</label>
          <input v-model="form.location" type="text" placeholder="Enter service location" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
          <textarea v-model="form.notes" rows="4" placeholder="Any special instructions or requirements" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"></textarea>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <NuxtLink to="/admin/bookings" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Cancel
          </NuxtLink>
          <button type="submit" :disabled="isLoading" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50">
            <Icon v-if="isLoading" name="mdi:loading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isLoading ? 'Creating...' : 'Create Booking' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { user } = useAuth()

// Form data
const form = ref({
  clientId: '',
  carerId: '',
  patientId: '',
  careType: '',
  frequency: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  location: '',
  notes: ''
})

const isLoading = ref(false)

// Fetch real data
const { data: clientsData } = await useFetch('/api/admin/clients', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const { data: carersData } = await useFetch('/api/admin/carers', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Reactive data
const clients = computed(() => clientsData.value?.data || [])
const carers = computed(() => carersData.value?.data || [])

// Selected client's patients
const selectedClientPatients = computed(() => {
  if (!form.value.clientId) return []
  const selectedClient = clients.value.find(client => client.id === form.value.clientId)
  return selectedClient?.patients || []
})

// Methods
const onClientChange = () => {
  // Reset patient selection when client changes
  form.value.patientId = ''
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const showNotification = (message, type = 'info') => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`
  notification.textContent = message
  
  // Add to page
  document.body.appendChild(notification)
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 3000)
}

const createBooking = async () => {
  isLoading.value = true
  
  try {
    // Validate required fields
    if (!form.value.clientId || !form.value.patientId || !form.value.careType || !form.value.frequency || !form.value.startDate) {
      showNotification('Please fill in all required fields', 'error')
      return
    }

    // Prepare booking data
    const bookingData = {
      clientId: form.value.clientId,
      carerId: form.value.carerId || null,
      patientId: form.value.patientId,
      careType: form.value.careType,
      frequency: form.value.frequency,
      startDate: form.value.startDate,
      endDate: form.value.endDate || null,
      startTime: form.value.startTime || null,
      endTime: form.value.endTime || null,
      location: form.value.location || null,
      notes: form.value.notes || null
    }

    // Create booking
    const response = await $fetch('/api/admin/bookings/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`,
        'Content-Type': 'application/json'
      },
      body: bookingData
    })

    if (response.success) {
      showNotification('Booking created successfully!', 'success')
      // Redirect to bookings list
      await navigateTo('/admin/bookings')
    } else {
      showNotification('Failed to create booking', 'error')
    }
    
  } catch (error) {
    console.error('Error creating booking:', error)
    showNotification('Failed to create booking. Please try again.', 'error')
  } finally {
    isLoading.value = false
  }
}

// Set page title
useHead({
  title: 'Create Booking - Admin Dashboard'
})
</script> 