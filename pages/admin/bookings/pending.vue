<template>
  <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
  
  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">

    <!-- Main Content -->
    <div class="transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-8 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold mb-2">Pending Bookings</h1>
                <p class="text-yellow-100 text-lg">Review and approve healthcare service requests</p>
                <div class="flex items-center mt-4 space-x-6">
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:clock-outline" class="text-lg text-yellow-200" />
                    <span class="text-sm">{{ pendingBookings.length }} bookings awaiting approval</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:calendar" class="text-lg text-yellow-200" />
                    <span class="text-sm">Last updated: {{ new Date().toLocaleTimeString() }}</span>
                  </div>
                </div>
              </div>
              <div class="hidden lg:block">
                <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="mdi:clipboard-list-outline" class="text-white text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Actions -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div class="p-6 border-b border-gray-100">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <h2 class="text-lg font-semibold text-gray-900">Filters & Actions</h2>
              <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button @click="selectAll" class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                  Select All
                </button>
                <button @click="approveSelected" :disabled="selectedBookings.length === 0" class="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Approve Selected ({{ selectedBookings.length }})
                </button>
                <button @click="rejectSelected" :disabled="selectedBookings.length === 0" class="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  Reject Selected ({{ selectedBookings.length }})
                </button>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Care Type</label>
                <select v-model="filters.careType" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                  <option value="">All Care Types</option>
                  <option value="ELDERLY_CARE">Elderly Care</option>
                  <option value="DISABILITY_CARE">Disability Care</option>
                  <option value="POST_SURGERY_CARE">Post-Surgery Care</option>
                  <option value="PALLIATIVE_CARE">Palliative Care</option>
                  <option value="NURSING_CARE">Nursing Care</option>
                  <option value="COMPANIONSHIP">Companionship</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select v-model="filters.dateRange" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                  <option value="">All Dates</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this_week">This Week</option>
                  <option value="next_week">Next Week</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
                <select v-model="filters.amountRange" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                  <option value="">All Amounts</option>
                  <option value="0-100">$0 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-300">$200 - $300</option>
                  <option value="300+">$300+</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Bookings List -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Pending Bookings ({{ filteredBookings.length }})</h2>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-500">Sort by:</span>
                <select v-model="sortBy" class="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="patient">Patient Name</option>
                  <option value="careType">Care Type</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <div v-if="filteredBookings.length === 0" class="text-center py-12">
              <Icon name="mdi:check-circle-outline" class="text-6xl mb-4 block text-green-400" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No pending bookings</h3>
              <p class="text-gray-500">All bookings have been processed</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="booking in filteredBookings" :key="booking.id" class="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div class="flex items-start space-x-4">
                  <!-- Checkbox -->
                  <div class="flex-shrink-0 pt-1">
                    <input 
                      type="checkbox" 
                      :value="booking.id" 
                      v-model="selectedBookings"
                      class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  
                  <!-- Booking Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <h3 class="text-lg font-semibold text-gray-900">{{ booking.patientName }}</h3>
                        <p class="text-sm text-gray-600">Client: {{ booking.clientName }}</p>
                        <div class="flex items-center space-x-4 mt-2">
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {{ booking.careType }}
                          </span>
                          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {{ booking.frequency }}
                          </span>
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="text-2xl font-bold text-gray-900">${{ booking.amount }}</p>
                        <p class="text-sm text-gray-500">{{ booking.date }}</p>
                      </div>
                    </div>
                    
                    <!-- Patient Details -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div class="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 class="font-medium text-gray-900 mb-2">Patient Information</h4>
                        <div class="space-y-1 text-sm">
                          <p><span class="text-gray-500">Age:</span> {{ booking.patientAge }} years</p>
                          <p><span class="text-gray-500">Medical Conditions:</span> {{ booking.medicalConditions }}</p>
                          <p><span class="text-gray-500">Emergency Contact:</span> {{ booking.emergencyContact }}</p>
                        </div>
                      </div>
                      <div class="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 class="font-medium text-gray-900 mb-2">Booking Details</h4>
                        <div class="space-y-1 text-sm">
                          <p><span class="text-gray-500">Start Date:</span> {{ booking.startDate }}</p>
                          <p><span class="text-gray-500">End Date:</span> {{ booking.endDate }}</p>
                          <p><span class="text-gray-500">Preferred Time:</span> {{ booking.preferredTime || 'Not specified' }}</p>
                          <p><span class="text-gray-500">Notes:</span> {{ booking.notes || 'No special instructions' }}</p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-500">Submitted:</span>
                        <span class="text-sm font-medium">{{ booking.submittedAt }}</span>
                      </div>
                      <div class="flex space-x-3">
                        <button @click="viewDetails(booking)" class="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                          View Details
                        </button>
                        <button @click="approveBooking(booking.id)" class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                          Approve
                        </button>
                        <button @click="rejectBooking(booking.id)" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Modal -->
    <div v-if="showApprovalModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 max-w-md mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-green-600 text-3xl">✅</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Booking Approved!</h3>
          <p class="text-gray-600 mb-6">The booking has been approved and a carer will be assigned shortly.</p>
          <button @click="showApprovalModal = false" class="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>

    <!-- Rejection Modal -->
    <div v-if="showRejectionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 max-w-md mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-red-600 text-3xl">❌</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Booking Rejected</h3>
          <p class="text-gray-600 mb-6">The booking has been rejected and the client will be notified.</p>
          <button @click="showRejectionModal = false" class="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
            Continue
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Apply admin layout
definePageMeta({ 
  
  layout: 'admin'
})

const { user } = useAuth()
const router = useRouter()
const sidebarRef = ref(null)

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.openSidebar()
  }
}

// State
const selectedBookings = ref([])
const showApprovalModal = ref(false)
const showRejectionModal = ref(false)
const sortBy = ref('date')

// Filters
const filters = ref({
  careType: '',
  dateRange: '',
  amountRange: ''
})

// Fetch real pending bookings data
const { data: bookingsData, error } = await useFetch('/api/admin/bookings', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Reactive pending bookings data
const pendingBookings = computed(() => {
  if (!bookingsData.value?.data?.bookings) return []
  
  return bookingsData.value.data.bookings
    .filter(booking => booking.status.toLowerCase() === 'pending')
    .map(booking => ({
      id: booking.id,
      patientName: booking.patient?.name || 'N/A',
      clientName: booking.client?.name || 'N/A',
      careType: booking.careType,
      frequency: booking.frequency || 'One-time',
      amount: booking.amount || 0,
      date: new Date(booking.startDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      startDate: booking.startDate,
      endDate: booking.endDate,
      preferredTime: booking.preferredTime || 'Flexible',
      patientAge: booking.patient?.age || 'N/A',
      medicalConditions: booking.patient?.medicalConditions || 'None specified',
      emergencyContact: booking.patient?.emergencyContact || 'N/A',
      notes: booking.notes || 'No additional notes',
      submittedAt: new Date(booking.createdAt).toLocaleDateString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }) + ' ago'
    }))
})

// Computed properties
const filteredBookings = computed(() => {
  let filtered = [...pendingBookings.value]
  
  if (filters.value.careType) {
    filtered = filtered.filter(booking => booking.careType === filters.value.careType)
  }
  
  if (filters.value.dateRange) {
    // Add date filtering logic here
  }
  
  if (filters.value.amountRange) {
    const [min, max] = filters.value.amountRange.split('-').map(Number)
    filtered = filtered.filter(booking => {
      if (max) {
        return booking.amount >= min && booking.amount <= max
      } else {
        return booking.amount >= min
      }
    })
  }
  
  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'amount':
        return b.amount - a.amount
      case 'patient':
        return a.patientName.localeCompare(b.patientName)
      case 'careType':
        return a.careType.localeCompare(b.careType)
      default:
        return new Date(a.submittedAt) - new Date(b.submittedAt)
    }
  })
  
  return filtered
})

// Methods
const selectAll = () => {
  if (selectedBookings.value.length === filteredBookings.value.length) {
    selectedBookings.value = []
  } else {
    selectedBookings.value = filteredBookings.value.map(booking => booking.id)
  }
}

const approveSelected = () => {
  selectedBookings.value.forEach(id => {
    approveBooking(id)
  })
  selectedBookings.value = []
  showApprovalModal.value = true
}

const rejectSelected = () => {
  selectedBookings.value.forEach(id => {
    rejectBooking(id)
  })
  selectedBookings.value = []
  showRejectionModal.value = true
}

const approveBooking = (bookingId) => {
  // Remove from pending list
  pendingBookings.value = pendingBookings.value.filter(booking => booking.id !== bookingId)
  
  // Remove from selected
  selectedBookings.value = selectedBookings.value.filter(id => id !== bookingId)
  
  console.log(`Booking ${bookingId} approved`)
}

const rejectBooking = (bookingId) => {
  // Remove from pending list
  pendingBookings.value = pendingBookings.value.filter(booking => booking.id !== bookingId)
  
  // Remove from selected
  selectedBookings.value = selectedBookings.value.filter(id => id !== bookingId)
  
  console.log(`Booking ${bookingId} rejected`)
}

const viewDetails = (booking) => {
  // Navigate to detailed view or show modal
  console.log('View details for booking:', booking.id)
}

useHead({ title: 'Pending Bookings - Admin Panel' })
</script>