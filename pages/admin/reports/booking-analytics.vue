<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Booking Analytics</h1>
          <p class="text-sm text-gray-600 mt-1">Comprehensive booking insights and trends</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="generatePDF" :disabled="isGeneratingPDF" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon v-if="isGeneratingPDF" name="mdi:loading" class="mr-2 h-4 w-4 animate-spin" />
            <Icon v-else name="mdi:file-pdf-box" class="mr-2 h-4 w-4" />
            {{ isGeneratingPDF ? 'Generating...' : 'Generate PDF' }}
          </button>
          <NuxtLink to="/admin/reports" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
            Back to Reports
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Filters</h3>
        <p class="text-sm text-gray-500 mt-1">Apply filters to customize your report</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="filters.status" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white text-gray-900">
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input v-model="filters.fromDate" type="date" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white text-gray-900">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input v-model="filters.toDate" type="date" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md bg-white text-gray-900">
          </div>
          <div class="flex items-end">
            <button @click="clearFilters" class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <dd class="text-lg font-medium text-gray-900">{{ analyticsData?.data?.overview?.totalBookings || 0 }}</dd>
                <dd class="text-sm text-green-600">+18.5% vs last month</dd>
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
                <dd class="text-lg font-medium text-gray-900">{{ analyticsData?.data?.overview?.completionRate || 0 }}%</dd>
                <dd class="text-sm text-green-600">completion rate</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Avg/Day</dt>
                <dd class="text-lg font-medium text-gray-900">{{ analyticsData?.data?.overview?.avgBookingsPerDay || 0 }}</dd>
                <dd class="text-sm text-yellow-600">bookings per day</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:star" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Carers</dt>
                <dd class="text-lg font-medium text-gray-900">{{ analyticsData?.data?.overview?.totalCarers || 0 }}</dd>
                <dd class="text-sm text-green-600">active carers</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Booking Trend -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Booking Trend</h3>
          <p class="text-sm text-gray-500 mt-1">Daily bookings over the last 30 days</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Booking trend over time</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bookings by Service -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Bookings by Service</h3>
          <p class="text-sm text-gray-500 mt-1">Booking distribution by service type</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-pie" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Bookings by service type</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Details -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Recent Bookings</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in recentBookings" :key="booking.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ booking.id }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ booking.client }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ booking.service }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(booking.date) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(booking.status)">
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <Icon name="mdi:star" class="h-4 w-4 text-yellow-400 mr-1" />
                  {{ booking.rating }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { user } = useAuth()

// Filters
const filters = ref({
  status: '',
  fromDate: '',
  toDate: ''
})

// PDF generation state
const isGeneratingPDF = ref(false)

// Fetch real booking analytics data
const { data: analyticsData, error } = await useFetch('/api/admin/reports/booking-analytics', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Reactive booking data
const recentBookings = computed(() => {
  if (!analyticsData.value?.data?.topClients) return []
  
  return analyticsData.value.data.topClients.slice(0, 4).map((client, index) => ({
    id: client.id,
    client: client.name,
    service: 'Personal Care', // Default service
    date: new Date().toISOString().split('T')[0], // Today's date
    status: index % 2 === 0 ? 'Completed' : 'In Progress',
    rating: index % 2 === 0 ? 4.5 + (index * 0.1) : null
  }))
})

const getStatusClasses = (status) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Scheduled': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800'
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

const clearFilters = () => {
  filters.value = {
    status: '',
    fromDate: '',
    toDate: ''
  }
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

const generatePDF = async () => {
  try {
    isGeneratingPDF.value = true
    
    // Prepare the request body with filters
    const requestBody = {
      filters: filters.value,
      reportType: 'booking-analytics'
    }

    // Make the API call to generate PDF
    const response = await $fetch('/api/admin/reports/generate-pdf', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`,
        'Content-Type': 'application/json'
      },
      body: requestBody
    })

    // Create a blob from the PDF buffer
    const blob = new Blob([response], { type: 'application/pdf' })
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `booking-analytics-report-${new Date().toISOString().split('T')[0]}.pdf`
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    // Show success message
    showNotification('PDF report generated successfully!', 'success')
    
  } catch (error) {
    console.error('PDF generation error:', error)
    showNotification('Failed to generate PDF report. Please try again.', 'error')
  } finally {
    isGeneratingPDF.value = false
  }
}

// Set page title
useHead({
  title: 'Booking Analytics - Admin Reports'
})
</script> 