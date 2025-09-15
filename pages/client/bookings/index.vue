<template>
  <ClientOnly>
    <div v-if="!user" class="flex items-center justify-center min-h-screen">
      <LoadingSpinner 
        message="Loading user data..." 
        sub-message="Please wait while we authenticate you" 
      />
    </div>
    
    <div v-else-if="error" class="flex items-center justify-center min-h-screen">
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
      <!-- Header -->
      <div class="mb-8">
        <div class="bg-[#0034b3] rounded-2xl p-8 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold mb-2">My Bookings</h1>
              <p class="text-white/80 text-lg">Manage your healthcare appointments and care schedules</p>
            </div>
            <div class="flex items-center space-x-4">
              <NuxtLink to="/client/bookings/create" class="px-4 py-2 bg-white text-brand rounded-lg font-medium hover:brightness-95 transition-colors shadow-soft">
                <Icon name="mdi:plus" class="mr-2" />
                New Booking
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Bookings</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
            </div>
            <div class="w-12 h-12 bg-[#0034b3]/10 rounded-xl flex items-center justify-center">
              <Icon name="mdi:calendar" class="text-[#0034b3] text-xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.active }}</p>
            </div>
            <div class="w-12 h-12 bg-[#0034b3]/10 rounded-xl flex items-center justify-center">
              <Icon name="mdi:play" class="text-[#0034b3] text-xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.pending }}</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:clock-outline" class="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:check-circle" class="text-green-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Filters & Search</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Search -->
            <div class="lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                  <Icon name="mdi:magnify" />
                </span>
                <input 
                  v-model="filters.search" 
                  type="text" 
                  placeholder="Search by patient name, care type, or booking ID..."
                  class="w-full pl-10 pr-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0034b3] focus:border-[#0034b3] transition"
                />
              </div>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select v-model="filters.status" class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0034b3] focus:border-[#0034b3] transition">
                <option value="" class="text-gray-900">All Status</option>
                <option value="PENDING" class="text-gray-900">Pending</option>
                <option value="CONFIRMED" class="text-gray-900">Confirmed</option>
                <option value="IN_PROGRESS" class="text-gray-900">In Progress</option>
                <option value="COMPLETED" class="text-gray-900">Completed</option>
                <option value="CANCELLED" class="text-gray-900">Cancelled</option>
              </select>
            </div>

            <!-- Care Type Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Care Type</label>
              <select v-model="filters.careType" class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0034b3] focus:border-[#0034b3] transition">
                <option value="" class="text-gray-900">All Types</option>
                <option value="ELDERLY_CARE" class="text-gray-900">Elderly Care</option>
                <option value="DISABILITY_CARE" class="text-gray-900">Disability Care</option>
                <option value="POST_SURGERY_CARE" class="text-gray-900">Post-Surgery Care</option>
                <option value="PALLIATIVE_CARE" class="text-gray-900">Palliative Care</option>
              </select>
            </div>
          </div>

          <!-- Date Range Filter -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input 
                type="date" 
                v-model="filters.fromDate" 
                class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0034b3] focus:border-[#0034b3] transition"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input 
                type="date" 
                v-model="filters.toDate" 
                class="w-full p-3 bg-white text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0034b3] focus:border-[#0034b3] transition"
              />
            </div>
            <div class="flex items-end">
              <button @click="clearFilters" class="w-full px-4 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-[#0034b3] focus:border-[#0034b3] transition">
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Bookings List -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-gray-900">All Bookings</h2>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">{{ filteredBookings.length }} bookings</span>
              <select v-model="sortBy" class="text-sm bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition">
                <option value="date" class="text-gray-900">Sort by Date</option>
                <option value="status" class="text-gray-900">Sort by Status</option>
                <option value="patient" class="text-gray-900">Sort by Patient</option>
              </select>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div v-if="loading" class="text-center py-12">
            <div class="w-16 h-16 text-[#0034b3] animate-spin mx-auto mb-4 text-4xl">
              <Icon name="mdi:loading" />
            </div>
            <p class="text-gray-500">Loading bookings...</p>
          </div>
          <div v-else-if="error" class="text-center py-12 text-red-600">
            {{ error }}
          </div>
          <div v-else-if="filteredBookings.length === 0" class="text-center py-12">
            <Icon name="mdi:calendar" class="w-16 h-16 text-gray-400 mx-auto mb-4 text-4xl" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p class="text-gray-500 mb-6">Try adjusting your filters or create a new booking</p>
            <NuxtLink to="/client/bookings/create" class="inline-flex items-center px-4 py-2 bg-white text-brand rounded-lg hover:brightness-95 transition-colors shadow-soft">
              <Icon name="mdi:plus" class="mr-2" />
              Create New Booking
            </NuxtLink>
          </div>

          <div v-else class="space-y-4">
            <div v-for="booking in paginatedBookings" :key="booking.id" class="bg-gradient-to-r from-gray-50 to-[#0034b3]/5 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 bg-[#0034b3]/10 rounded-xl flex items-center justify-center">
                    <Icon name="mdi:account" class="text-[#0034b3] text-xl" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ booking.patient ? `${booking.patient.firstName} ${booking.patient.lastName}` : 'Unknown Patient' }}</h3>
                    <p class="text-sm text-gray-500">Booking #{{ booking.id }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <span :class="getStatusBadgeClass(booking.status)" class="px-3 py-1 text-sm font-medium rounded-full">
                    {{ booking.status }}
                  </span>
                  <div class="relative">
                    <button @click="toggleBookingMenu(booking.id)" class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Icon name="mdi:dots-vertical" class="text-lg" />
                    </button>
                    
                    <!-- Dropdown Menu -->
                    <div v-if="openMenu === booking.id" class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-10">
                      <div class="py-2">
                        <button @click="viewBooking(booking.id)" class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <Icon name="mdi:eye" class="mr-3" />
                          View Details
                        </button>
                        <button v-if="booking.status === 'PENDING'" @click="cancelBooking(booking.id)" class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <Icon name="mdi:close-circle" class="mr-3" />
                          Cancel Booking
                        </button>
                        <button @click="downloadInvoice(booking.id)" class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <Icon name="mdi:file-document" class="mr-3" />
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:heart" class="text-gray-400" />
                  <span class="text-sm text-gray-600">{{ booking.careType }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:calendar" class="text-gray-400" />
                  <span class="text-sm text-gray-600">{{ booking.frequency }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:clock" class="text-gray-400" />
                  <span class="text-sm text-gray-600">{{ formatDate(booking.startDate) }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:currency-usd" class="text-gray-400" />
                  <span class="text-sm text-gray-600">${{ booking.payments && booking.payments.length > 0 ? booking.payments[0].amount : 'N/A' }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                <div class="flex items-center space-x-4">
                  <div v-if="booking.carer" class="flex items-center space-x-2">
                    <Icon name="mdi:account" class="text-gray-400" />
                    <span class="text-sm text-gray-600">Carer: {{ booking.carer ? `${booking.carer.firstName} ${booking.carer.lastName}` : 'Unassigned' }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:phone" class="text-gray-400" />
                    <span class="text-sm text-gray-600">{{ booking.client ? booking.client.phone : 'N/A' }}</span>
                  </div>
                </div>
                
                <div class="flex space-x-2">
                  <button @click="viewBooking(booking.id)" class="px-4 py-2 bg-[#0034b3] text-white rounded-lg text-sm font-medium hover:brightness-90 transition-colors">
                    View Details
                  </button>
                  <button v-if="booking.status === 'PENDING'" @click="cancelBooking(booking.id)" class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredBookings.length }} bookings</span>
            </div>
            
            <div class="flex space-x-2">
              <button @click="currentPage--" :disabled="currentPage === 1" class="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
                Previous
              </button>
              
              <div class="flex space-x-1">
                <button v-for="page in visiblePages" :key="page" @click="currentPage = page" :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  currentPage === page 
                    ? 'bg-[#0034b3] text-white' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                ]">
                  {{ page }}
                </button>
              </div>
              
              <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-3 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
definePageMeta({ 
  layout: 'client'
})

const router = useRouter()
const { user, init } = useAuth()

// Filters
const filters = ref({
  search: '',
  status: '',
  careType: '',
  fromDate: '',
  toDate: ''
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)
const sortBy = ref('date')
const openMenu = ref(null)

// Bookings data
const bookings = ref([])
const loading = ref(true)
const error = ref(null)

// Fetch bookings from API
const fetchBookings = async () => {
  try {
    loading.value = true
    error.value = null
    
    // Build query params from filters
    const params = new URLSearchParams()
    if (filters.value.status) params.append('status', filters.value.status)
    if (filters.value.careType) params.append('careType', filters.value.careType)
    if (filters.value.search) params.append('search', filters.value.search)
    if (filters.value.fromDate) params.append('fromDate', filters.value.fromDate)
    if (filters.value.toDate) params.append('toDate', filters.value.toDate)
    
    const { data, error: fetchError } = await useFetch(`/api/bookings/list?${params.toString()}`)
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to fetch bookings')
    }
    
    if (data.value && data.value.success) {
      bookings.value = data.value.bookings || []
    } else {
      bookings.value = []
    }
  } catch (err) {
    console.error('Error fetching bookings:', err)
    error.value = err.message || 'Failed to load bookings'
    bookings.value = []
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await init()
  fetchBookings()
})

// Watch filters and refetch
watch(filters, fetchBookings, { deep: true })

// Computed properties
const filteredBookings = computed(() => {
  let filtered = bookings.value
  
  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    filtered = filtered.filter(booking => {
      const patientName = booking.patient ? `${booking.patient.firstName} ${booking.patient.lastName}` : ''
      return patientName.toLowerCase().includes(search) ||
             booking.careType?.toLowerCase().includes(search) ||
             booking.id.toLowerCase().includes(search)
    })
  }
  
  // Status filter
  if (filters.value.status) {
    filtered = filtered.filter(booking => booking.status === filters.value.status)
  }
  
  // Care type filter
  if (filters.value.careType) {
    filtered = filtered.filter(booking => booking.careType === filters.value.careType)
  }
  
  // Date range filters
  if (filters.value.fromDate) {
    filtered = filtered.filter(booking => new Date(booking.startDate) >= new Date(filters.value.fromDate))
  }
  if (filters.value.toDate) {
    filtered = filtered.filter(booking => new Date(booking.startDate) <= new Date(filters.value.toDate))
  }
  
  // Sorting
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date':
        return new Date(b.startDate) - new Date(a.startDate)
      case 'status':
        return a.status.localeCompare(b.status)
      case 'patient':
        const aName = a.patient ? `${a.patient.firstName} ${a.patient.lastName}` : ''
        const bName = b.patient ? `${b.patient.firstName} ${b.patient.lastName}` : ''
        return aName.localeCompare(bName)
      default:
        return 0
    }
  })
  
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredBookings.value.length / itemsPerPage.value))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredBookings.value.length))

const paginatedBookings = computed(() => {
  return filteredBookings.value.slice(startIndex.value, endIndex.value)
})

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)
  
  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const stats = computed(() => {
  const total = bookings.value.length
  const active = bookings.value.filter(b => b.status === 'ACTIVE').length
  const pending = bookings.value.filter(b => b.status === 'PENDING').length
  const completed = bookings.value.filter(b => b.status === 'COMPLETED').length
  
  return { total, active, pending, completed }
})

// Methods
const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    careType: '',
    fromDate: '',
    toDate: ''
  }
  currentPage.value = 1
}

const toggleBookingMenu = (bookingId) => {
  openMenu.value = openMenu.value === bookingId ? null : bookingId
}

const viewBooking = (bookingId) => {
  console.log('Viewing booking:', bookingId)
  // Navigate to booking details page
  router.push(`/client/bookings/${bookingId}`)
}

const cancelBooking = async (bookingId) => {
  try {
    console.log('Cancelling booking:', bookingId)
    
    // Call API to cancel booking
    const response = await $fetch(`/api/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.success) {
      // Show success message
      alert('Booking cancelled successfully')
      // Refresh bookings
      await fetchBookings()
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
    console.log('Downloading invoice for booking:', bookingId)
    
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
    month: 'short',
    day: 'numeric'
  })
}

useHead({ title: 'My Bookings - Lucerna & Stern Health' })
</script>