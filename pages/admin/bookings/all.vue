<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">All Bookings</h1>
          <p class="text-sm text-gray-600 mt-1">View and manage all bookings in the system</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportBookings" class="inline-flex items-center px-4 py-2 border border-lucerna-primary rounded-md shadow-sm text-sm font-medium text-brand bg-white hover:bg-gray-50">
            <Icon name="mdi:download" class="mr-2 h-4 w-4 text-brand" />
            Export
          </button>
          <NuxtLink to="/admin/bookings/create" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
            <Icon name="mdi:plus" class="mr-2 h-4 w-4" />
            New Booking
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Booking Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:calendar" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                <dd class="text-lg font-medium text-gray-900">{{ totalBookings }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:clock" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
                <dd class="text-lg font-medium text-gray-900">{{ pendingBookings }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:check-circle" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Completed</dt>
                <dd class="text-lg font-medium text-gray-900">{{ completedBookings }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:close-circle" class="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Cancelled</dt>
                <dd class="text-lg font-medium text-gray-900">{{ cancelledBookings }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                          <input v-model="filters.search" type="text" placeholder="Search bookings..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="filters.status" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <!-- Date Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input v-model="filters.fromDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input v-model="filters.toDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          </div>
        </div>
        
        <div class="flex justify-between items-center mt-4">
          <button @click="clearFilters" class="text-sm text-gray-600 hover:text-gray-900">
            Clear Filters
          </button>
          <div class="text-sm text-gray-600">
            {{ filteredBookings.length }} bookings found
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!bookingsData" class="bg-white shadow rounded-lg">
      <div class="flex justify-center items-center py-12">
        <div class="text-center">
          <Icon name="mdi:loading" class="animate-spin h-8 w-8 text-green-600 mx-auto mb-4" />
          <p class="text-gray-500">Loading bookings...</p>
        </div>
      </div>
    </div>

    <!-- Bookings Table -->
    <div v-else class="bg-white shadow rounded-lg">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Client</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Carer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Service</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Date & Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Cost</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in paginatedBookings" :key="booking.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ booking.id }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span class="text-xs font-medium text-gray-700">{{ booking.clientInitials }}</span>
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900 truncate">{{ booking.clientName }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ booking.clientPhone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span class="text-xs font-medium text-gray-700">{{ booking.carerInitials }}</span>
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900 truncate">{{ booking.carerName }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ booking.carerSpecialty }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <span class="truncate block">{{ booking.service }}</span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{{ formatDate(booking.date) }}</div>
                <div class="text-xs text-gray-400">{{ booking.time }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(booking.status)">
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(booking.cost) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-1">
                  <button @click="viewBooking(booking)" class="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded" title="View">
                    <Icon name="mdi:eye" class="h-4 w-4" />
                  </button>
                  <button @click="editBooking(booking)" class="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded" title="Edit">
                    <Icon name="mdi:pencil" class="h-4 w-4" />
                  </button>
                  <button @click="deleteBooking(booking)" class="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded" title="Delete">
                    <Icon name="mdi:delete" class="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredBookings.length === 0" class="text-center py-12">
        <Icon name="mdi:calendar-blank" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
        <p class="mt-1 text-sm text-gray-500">There are no bookings matching your criteria.</p>
        <div class="mt-6">
          <NuxtLink to="/admin/bookings/create" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Icon name="mdi:plus" class="mr-2 h-4 w-4" />
            Create New Booking
          </NuxtLink>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="filteredBookings.length > 0" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
              Previous
            </button>
            <button @click="nextPage" :disabled="currentPage >= totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ filteredBookings.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  <Icon name="mdi:chevron-left" class="h-5 w-5" />
                </button>
                <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage 
                    ? 'z-10 bg-green-50 border-green-500 text-green-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                ]">
                  {{ page }}
                </button>
                <button @click="nextPage" :disabled="currentPage >= totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                  <Icon name="mdi:chevron-right" class="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { user, init } = useAuth()

// Initialize auth state
await init()

// Filters
const filters = ref({
  search: '',
  status: '',
  fromDate: '',
  toDate: ''
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 10

// Fetch real bookings data
const { data: bookingsData, error } = await useFetch('/api/admin/bookings', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Handle authentication errors
if (error.value) {
  console.error('Admin bookings error:', error.value)
  // Redirect to login if there's an authentication error
  if (error.value.statusCode === 401) {
    await navigateTo('/login')
  }
}

// Reactive bookings data
const bookings = computed(() => {
  if (!bookingsData.value?.data?.bookings) return []
  
  return bookingsData.value.data.bookings.map(booking => ({
    id: booking.id,
    clientName: booking.client.name,
    clientInitials: booking.client.name.split(' ').map(n => n[0]).join(''),
    clientPhone: booking.client.phone,
    carerName: booking.carer?.name || 'Unassigned',
    carerInitials: booking.carer ? booking.carer.name.split(' ').map(n => n[0]).join('') : 'UN',
    carerSpecialty: booking.carer?.specializations?.[0] || 'General Care',
    service: booking.careType,
    date: booking.startDate,
    time: new Date(booking.startDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    status: booking.status.toLowerCase(),
    cost: booking.payment?.amount?.toFixed(2) || '0.00'
  }))
})

// Computed properties
const filteredBookings = computed(() => {
  return bookings.value.filter(booking => {
    const matchesSearch = !filters.value.search || 
      booking.clientName.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      booking.carerName.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      booking.service.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesStatus = !filters.value.status || booking.status === filters.value.status
    
    const matchesDateRange = (!filters.value.fromDate || new Date(booking.date) >= new Date(filters.value.fromDate)) &&
                            (!filters.value.toDate || new Date(booking.date) <= new Date(filters.value.toDate))
    
    return matchesSearch && matchesStatus && matchesDateRange
  })
})

const totalPages = computed(() => Math.ceil(filteredBookings.value.length / itemsPerPage))

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredBookings.value.length))

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

// Statistics computed properties
const totalBookings = computed(() => {
  return bookingsData.value?.data?.pagination?.total || 0
})

const pendingBookings = computed(() => {
  return bookingsData.value?.data?.statistics?.pending || 0
})

const completedBookings = computed(() => {
  // Check for both 'completed' and 'confirmed' statuses
  return (bookingsData.value?.data?.statistics?.completed || 0) + 
         (bookingsData.value?.data?.statistics?.confirmed || 0)
})

const cancelledBookings = computed(() => {
  return bookingsData.value?.data?.statistics?.cancelled || 0
})

// Methods
const getStatusClasses = (status) => {
  const classes = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    'in_progress': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    fromDate: '',
    toDate: ''
  }
  currentPage.value = 1
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const exportBookings = () => {
  console.log('Exporting bookings...')
}

const viewBooking = (booking) => {
  console.log('View booking:', booking)
}

const editBooking = (booking) => {
  console.log('Edit booking:', booking)
}

const deleteBooking = (booking) => {
  if (confirm(`Are you sure you want to delete booking ${booking.id}?`)) {
    console.log('Delete booking:', booking)
  }
}

// Set page title
useHead({
  title: 'All Bookings - Admin Dashboard'
})
</script> 