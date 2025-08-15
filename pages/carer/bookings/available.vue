<template>
  <div class="max-w-7xl mx-auto">
    <!-- Success Notification -->
    <div v-if="showSuccessMessage" class="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg max-w-md">
      <div class="flex items-center">
        <Icon name="mdi:check-circle" class="h-5 w-5 text-green-400 mr-2" />
        <div class="flex-1">
          <h4 class="text-sm font-medium text-green-800">Booking Accepted!</h4>
          <p class="text-sm text-green-600 mt-1">{{ successMessage }}</p>
        </div>
        <button @click="showSuccessMessage = false" class="text-green-400 hover:text-green-600">
          <Icon name="mdi:close" class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="text-center">
        <Icon name="mdi:loading" class="mx-auto h-8 w-8 text-gray-400 animate-spin" />
        <p class="mt-2 text-sm text-gray-500">Loading available bookings...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <Icon name="mdi:alert-circle" class="h-5 w-5 text-red-400 mr-2" />
        <span class="text-red-800">{{ error }}</span>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
      <!-- Page Header -->
      <div class="mb-8">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Available Jobs</h1>
            <p class="text-sm text-gray-600 mt-1">Browse and accept new booking requests from patients</p>
          </div>
          <div class="flex items-center space-x-3">
            <button @click="refreshBookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              <Icon name="mdi:refresh" class="mr-2 h-4 w-4" />
              Refresh
            </button>
            <button @click="showFilters = !showFilters" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              <Icon name="mdi:filter" class="mr-2 h-4 w-4" />
              Filters
            </button>
            <NuxtLink to="/carer/bookings" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              <Icon name="mdi:calendar" class="mr-2 h-4 w-4" />
              My Bookings
            </NuxtLink>
          </div>
        </div>
      </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:calendar-clock" class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Jobs</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.totalJobs }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:account-heart" class="h-6 w-6 text-green-600" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Elderly Care</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.elderlyCareCount }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:medical-bag" class="h-6 w-6 text-purple-600" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Medical Care</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.medicalCareCount }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:currency-usd" class="h-6 w-6 text-yellow-600" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg. Rate</dt>
                <dd class="text-lg font-medium text-gray-900">${{ stats.averageRate }}/hr</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div v-if="showFilters" class="bg-white shadow rounded-lg mb-6">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Filters</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label class="block text-sm font-semibold text-gray-800 mb-2">Service Type</label>
            <select v-model="filters.serviceType" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors">
              <option value="">All Services</option>
              <option value="elderly">Elderly Care</option>
              <option value="medical">Medical Care</option>
              <option value="companionship">Companionship</option>
              <option value="physical">Physical Therapy</option>
              <option value="respite">Respite Care</option>
            </select>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label class="block text-sm font-semibold text-gray-800 mb-2">Date Range</label>
            <select v-model="filters.dateRange" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors">
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This Week</option>
              <option value="next-week">Next Week</option>
            </select>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label class="block text-sm font-semibold text-gray-800 mb-2">Hourly Rate</label>
            <select v-model="filters.rateRange" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors">
              <option value="">All Rates</option>
              <option value="20-30">$20 - $30</option>
              <option value="30-40">$30 - $40</option>
              <option value="40-50">$40 - $50</option>
              <option value="50+">$50+</option>
            </select>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label class="block text-sm font-semibold text-gray-800 mb-2">Distance</label>
            <select v-model="filters.distance" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors">
              <option value="">Any Distance</option>
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
              <option value="15">Within 15 miles</option>
              <option value="20">Within 20 miles</option>
            </select>
          </div>
        </div>
        <div class="mt-4 flex justify-end space-x-3">
          <button @click="clearFilters" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Clear Filters
          </button>
          <button @click="applyFilters" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="p-6">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
          </div>
          <input v-model="searchQuery" type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-900 transition-colors" placeholder="Search by patient name, location, or service type..." />
        </div>
      </div>
    </div>

    <!-- Available Bookings Grid -->
    <div v-if="availableBookings.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="booking in availableBookings" :key="booking.id" class="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <!-- Booking Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ booking.patientName }}</h3>
              <p class="text-sm text-gray-500">{{ booking.age }} years old</p>
            </div>
            <div :class="getServiceTypeClasses(booking.serviceType)" class="px-2 py-1 rounded-full text-xs font-medium">
              {{ booking.serviceType }}
            </div>
          </div>
        </div>

        <!-- Booking Details -->
        <div class="px-6 py-4">
          <div class="space-y-3">
            <div class="flex items-center text-sm text-gray-600">
              <Icon name="mdi:calendar" class="mr-2 h-4 w-4 text-gray-400" />
              <span>{{ formatDate(booking.date) }}</span>
            </div>
            
            <div class="flex items-center text-sm text-gray-600">
              <Icon name="mdi:clock-outline" class="mr-2 h-4 w-4 text-gray-400" />
              <span>{{ booking.startTime }} - {{ booking.endTime }} ({{ booking.duration }} hours)</span>
            </div>
            
            <div class="flex items-center text-sm text-gray-600">
              <Icon name="mdi:map-marker" class="mr-2 h-4 w-4 text-gray-400" />
              <span>{{ booking.location }}</span>
            </div>
            
            <div class="flex items-center text-sm text-gray-600">
              <Icon name="mdi:currency-usd" class="mr-2 h-4 w-4 text-gray-400" />
              <span class="font-semibold text-green-600">${{ booking.hourlyRate }}/hour</span>
            </div>
            
            <div class="flex items-center text-sm text-gray-600">
              <Icon name="mdi:account-group" class="mr-2 h-4 w-4 text-gray-400" />
              <span>{{ booking.preferredGender || 'Any gender' }} preferred</span>
            </div>
          </div>

          <!-- Patient Requirements -->
          <div v-if="booking.requirements" class="mt-4 pt-4 border-t border-gray-200">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
            <p class="text-sm text-gray-600">{{ booking.requirements }}</p>
          </div>

          <!-- Urgency Badge -->
          <div v-if="booking.urgency" class="mt-4">
            <span :class="booking.urgency === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
              <Icon name="mdi:alert" class="mr-1 h-3 w-3" />
              {{ booking.urgency === 'urgent' ? 'Urgent' : 'Priority' }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <div class="flex space-x-2">
            <button @click="viewBookingDetails(booking)" class="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Icon name="mdi:eye" class="mr-1.5 h-3 w-3" />
              View Details
            </button>
            <button @click="acceptBooking(booking)" class="flex-1 inline-flex justify-center items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <Icon name="mdi:check" class="mr-1.5 h-3 w-3" />
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <Icon name="mdi:calendar-remove" class="mx-auto h-12 w-12 text-gray-400" />
             <h3 class="mt-2 text-sm font-medium text-gray-900">No available jobs</h3>
       <p class="mt-1 text-sm text-gray-500">There are no booking requests matching your criteria.</p>
      <div class="mt-6">
        <button @click="clearFilters" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Booking Details Modal -->
    <div v-if="showBookingModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Booking Details</h3>
            <button @click="showBookingModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
              <Icon name="mdi:close" class="h-6 w-6" />
            </button>
          </div>
          
          <div v-if="selectedBooking" class="space-y-4">
            <div>
              <h4 class="text-lg font-medium text-gray-900">{{ selectedBooking.patientName }}</h4>
              <p class="text-sm text-gray-500">{{ selectedBooking.age }} years old</p>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Service Type:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedBooking.serviceType }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Date:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedBooking.date) }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Time:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedBooking.startTime }} - {{ selectedBooking.endTime }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Duration:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedBooking.duration }} hours</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Location:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedBooking.location }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Hourly Rate:</span>
                <span class="text-sm font-medium text-green-600">${{ selectedBooking.hourlyRate }}/hour</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total Amount:</span>
                <span class="text-sm font-bold text-green-600">${{ (selectedBooking.hourlyRate * selectedBooking.duration).toFixed(2) }}</span>
              </div>
            </div>
            
            <div v-if="selectedBooking.requirements" class="pt-4 border-t border-gray-200">
              <h5 class="text-sm font-medium text-gray-900 mb-2">Special Requirements:</h5>
              <p class="text-sm text-gray-600">{{ selectedBooking.requirements }}</p>
            </div>
            
            <div v-if="selectedBooking.notes" class="pt-4 border-t border-gray-200">
              <h5 class="text-sm font-medium text-gray-900 mb-2">Additional Notes:</h5>
              <p class="text-sm text-gray-600">{{ selectedBooking.notes }}</p>
            </div>
          </div>
          
          <div class="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button @click="showBookingModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              Close
            </button>
            <button @click="acceptBooking(selectedBooking)" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              Accept Booking
            </button>
          </div>
                 </div>
       </div>
     </div>
   </div>
 </div>
 </template>

<script setup>
definePageMeta({
  layout: 'carer',
})

const { user } = useAuth()

// Reactive data
const showFilters = ref(false)
const showBookingModal = ref(false)
const selectedBooking = ref(null)
const searchQuery = ref('')
const loading = ref(true)
const error = ref(null)
const availableBookings = ref([])
const showSuccessMessage = ref(false)
const successMessage = ref('')
const stats = ref({
  totalJobs: 0,
  elderlyCareCount: 0,
  medicalCareCount: 0,
  averageRate: 0
})

const filters = ref({
  serviceType: '',
  dateRange: '',
  rateRange: '',
  distance: ''
})

// Fetch available bookings from API
const fetchAvailableBookings = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Build query parameters
    const queryParams = new URLSearchParams()
    if (filters.value.serviceType) queryParams.append('serviceType', filters.value.serviceType)
    if (filters.value.dateRange) queryParams.append('dateRange', filters.value.dateRange)
    if (filters.value.rateRange) queryParams.append('rateRange', filters.value.rateRange)
    if (searchQuery.value) queryParams.append('search', searchQuery.value)
    
    const response = await $fetch(`/api/carer/available-bookings?${queryParams.toString()}`, {
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      }
    })
    
    if (response.success) {
      availableBookings.value = response.bookings || []
      stats.value = response.stats || {
        totalJobs: 0,
        elderlyCareCount: 0,
        medicalCareCount: 0,
        averageRate: 0
      }
    } else {
      error.value = response.message || 'Failed to fetch available bookings'
    }
  } catch (err) {
    console.error('Error fetching available bookings:', err)
    error.value = 'Failed to load available bookings. Please try again.'
  } finally {
    loading.value = false
  }
}

// Fetch bookings on page load
await fetchAvailableBookings()

// Methods
const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

const getServiceTypeClasses = (serviceType) => {
  if (!serviceType) return 'bg-gray-100 text-gray-800'
  
  const classes = {
    'Elderly Care': 'bg-blue-100 text-blue-800',
    'Medical Care': 'bg-purple-100 text-purple-800',
    'Companionship': 'bg-green-100 text-green-800',
    'Physical Therapy': 'bg-orange-100 text-orange-800',
    'Respite Care': 'bg-pink-100 text-pink-800'
  }
  return classes[serviceType] || 'bg-gray-100 text-gray-800'
}

const viewBookingDetails = (booking) => {
  if (!booking) return
  selectedBooking.value = booking
  showBookingModal.value = true
}

const acceptBooking = async (booking) => {
  if (!booking) return
  
  try {
  console.log('Accepting booking:', booking)
    
    // Call the actual booking acceptance API
    const response = await $fetch(`/api/bookings/${booking.id}/accept`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      }
    })
    
    if (response.success) {
  // Remove from available bookings
  const index = availableBookings.value.findIndex(b => b.id === booking.id)
  if (index > -1) {
    availableBookings.value.splice(index, 1)
  }
  
      // Update stats
      stats.value.totalJobs = availableBookings.value.length
      stats.value.elderlyCareCount = availableBookings.value.filter(b => 
        b.serviceType.toLowerCase().includes('elderly')
      ).length
      stats.value.medicalCareCount = availableBookings.value.filter(b => 
        b.serviceType.toLowerCase().includes('medical')
      ).length
      stats.value.averageRate = availableBookings.value.length > 0 
        ? Math.round(availableBookings.value.reduce((sum, b) => sum + b.hourlyRate, 0) / availableBookings.value.length)
        : 0
  
  // Close modal if open
  if (showBookingModal.value) {
    showBookingModal.value = false
    selectedBooking.value = null
  }
  
      // Show success message
      successMessage.value = `You are now assigned to care for ${response.booking.patientName}. The client ${response.booking.clientName} has been notified.`
      showSuccessMessage.value = true
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        showSuccessMessage.value = false
      }, 5000)
      
    } else {
      error.value = response.message || 'Failed to accept booking'
    }
  } catch (err) {
    console.error('Error accepting booking:', err)
    if (err.statusCode === 404) {
      error.value = 'This booking is no longer available or has already been assigned to another carer.'
    } else if (err.statusCode === 401) {
      error.value = 'You are not authorized to accept this booking.'
    } else {
      error.value = 'Failed to accept booking. Please try again.'
    }
  }
}

const refreshBookings = () => {
  fetchAvailableBookings()
}

const clearFilters = () => {
  filters.value = {
    serviceType: '',
    dateRange: '',
    rateRange: '',
    distance: ''
  }
  searchQuery.value = ''
  fetchAvailableBookings()
}

const applyFilters = () => {
  fetchAvailableBookings()
}

// Watch for filter changes
watch([filters, searchQuery], () => {
  fetchAvailableBookings()
}, { deep: true })
</script> 