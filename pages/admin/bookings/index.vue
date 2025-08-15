<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Booking Management</h1>
          <p class="text-sm text-gray-600 mt-1">Manage all bookings, schedules, and service assignments</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportBookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export Bookings
          </button>
          <NuxtLink to="/admin/bookings/create" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Icon name="mdi:plus" class="mr-2 h-4 w-4" />
            Create Booking
          </NuxtLink>
        </div>
      </div>
    </div>
      <!-- Booking Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <Icon name="mdi:clock-outline" class="h-5 w-5 text-yellow-600" />
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

      <!-- Booking Management Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Booking Overview -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Booking Overview</h3>
            <p class="text-sm text-gray-500 mt-1">View and manage all bookings</p>
          </div>
          <div class="p-6 space-y-4">
            <NuxtLink to="/admin/bookings/all" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:calendar" class="h-5 w-5 text-blue-600" />
                <span class="text-sm font-medium text-gray-900">All Bookings</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/bookings/pending" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:clock-outline" class="h-5 w-5 text-yellow-600" />
                <span class="text-sm font-medium text-gray-900">Pending Approval</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/bookings/active" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:play-circle" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Active Bookings</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
          </div>
        </div>

        <!-- Scheduling -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Scheduling</h3>
            <p class="text-sm text-gray-500 mt-1">Manage schedules and assignments</p>
          </div>
          <div class="p-6 space-y-4">
            <NuxtLink to="/admin/bookings/schedule" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:calendar-clock" class="h-5 w-5 text-purple-600" />
                <span class="text-sm font-medium text-gray-900">Schedule Manager</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/bookings/assignments" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:account-switch" class="h-5 w-5 text-indigo-600" />
                <span class="text-sm font-medium text-gray-900">Carer Assignments</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/bookings/conflicts" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:alert" class="h-5 w-5 text-red-600" />
                <span class="text-sm font-medium text-gray-900">Schedule Conflicts</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
          </div>
        </div>

        <!-- Analytics -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Analytics</h3>
            <p class="text-sm text-gray-500 mt-1">Booking insights and reports</p>
          </div>
          <div class="p-6 space-y-4">
            <NuxtLink to="/admin/bookings/analytics" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:chart-line" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Booking Analytics</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/bookings/reports" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:file-chart" class="h-5 w-5 text-blue-600" />
                <span class="text-sm font-medium text-gray-900">Reports</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/bookings/performance" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:trending-up" class="h-5 w-5 text-yellow-600" />
                <span class="text-sm font-medium text-gray-900">Performance Metrics</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Recent Bookings -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
          <p class="text-sm text-gray-500 mt-1">Latest booking activities and updates</p>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Client</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Carer</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Service</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="booking in recentBookings" :key="booking.id" class="hover:bg-gray-50">
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
                  <span class="truncate block">{{ formatDate(booking.date) }}</span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(booking.status)">
                    {{ booking.status }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-1">
                    <button @click="viewBooking(booking)" class="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded" title="View">
                      <Icon name="mdi:eye" class="h-4 w-4" />
                    </button>
                    <button @click="editBooking(booking)" class="p-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded" title="Edit">
                      <Icon name="mdi:pencil" class="h-4 w-4" />
                    </button>
                    <button @click="assignCarer(booking)" v-if="booking.status === 'pending'" class="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded" title="Assign Carer">
                      <Icon name="mdi:account-switch" class="h-4 w-4" />
                    </button>
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

// Fetch real booking data
const { data: bookingsData, error } = await useFetch('/api/admin/bookings', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Reactive booking data
const recentBookings = computed(() => {
  if (!bookingsData.value?.data?.bookings) return []
  
  return bookingsData.value.data.bookings.slice(0, 5).map(booking => ({
    id: booking.id,
    clientName: booking.client.name,
    clientInitials: booking.client.name.split(' ').map(n => n[0]).join(''),
    clientPhone: booking.client.phone,
    carerName: booking.carer?.name || 'Unassigned',
    carerInitials: booking.carer ? booking.carer.name.split(' ').map(n => n[0]).join('') : 'UN',
    carerSpecialty: booking.carer?.specializations?.[0] || 'General Care',
    service: booking.careType,
    date: booking.startDate,
    status: booking.status.toLowerCase()
  }))
})

// Computed properties for stats
const totalBookings = computed(() => {
  if (!bookingsData.value?.data?.bookings) return 0
  return bookingsData.value.data.bookings.length
})

const pendingBookings = computed(() => {
  if (!bookingsData.value?.data?.bookings) return 0
  return bookingsData.value.data.bookings.filter(b => b.status === 'pending').length
})

const completedBookings = computed(() => {
  if (!bookingsData.value?.data?.bookings) return 0
  return bookingsData.value.data.bookings.filter(b => b.status === 'completed').length
})

const cancelledBookings = computed(() => {
  if (!bookingsData.value?.data?.bookings) return 0
  return bookingsData.value.data.bookings.filter(b => b.status === 'cancelled').length
})

// Methods
const getStatusClasses = (status) => {
  const classes = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const exportBookings = () => {
  // Implement booking export functionality
  console.log('Export bookings')
}

const viewBooking = (booking) => {
  // Implement booking view functionality
  console.log('View booking:', booking)
}

const editBooking = (booking) => {
  // Implement booking edit functionality
  console.log('Edit booking:', booking)
}

const assignCarer = (booking) => {
  // Implement carer assignment functionality
  console.log('Assign carer to booking:', booking)
}
</script> 