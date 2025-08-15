<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Active Bookings</h1>
          <p class="text-sm text-gray-600 mt-1">Currently active and in-progress bookings</p>
        </div>
        <NuxtLink to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
          Back to Bookings
        </NuxtLink>
      </div>
    </div>

    <!-- Active Bookings Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:play-circle" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Today</dt>
                <dd class="text-lg font-medium text-gray-900">{{ activeBookings.length }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:clock" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">In Progress</dt>
                <dd class="text-lg font-medium text-gray-900">{{ inProgressBookings.length }}</dd>
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
                <Icon name="mdi:calendar-clock" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Scheduled</dt>
                <dd class="text-lg font-medium text-gray-900">{{ scheduledBookings.length }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Bookings Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Active Bookings</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Client</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Carer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Service</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Start Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Duration</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in activeBookings" :key="booking.id" class="hover:bg-gray-50">
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
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ booking.duration }}h
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
                  <button @click="updateStatus(booking)" class="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded" title="Update Status">
                    <Icon name="mdi:update" class="h-4 w-4" />
                  </button>
                  <button @click="contactCarer(booking)" class="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded" title="Contact Carer">
                    <Icon name="mdi:phone" class="h-4 w-4" />
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

// Remove the hardcoded activeBookings array and instead fetch real data:
const { data: bookingsData, error } = await useFetch('/api/admin/bookings', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const activeBookings = computed(() => {
  if (!bookingsData.value?.data?.bookings) return []
  // Filter for active/in-progress bookings
  return bookingsData.value.data.bookings
    .filter(booking => ['in-progress', 'confirmed'].includes(booking.status))
    .map(booking => ({
      id: booking.id,
      clientName: booking.client?.name || 'N/A',
      clientInitials: booking.client?.name ? booking.client.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A',
      clientPhone: booking.client?.phone || 'N/A',
      carerName: booking.carer?.name || 'N/A',
      carerInitials: booking.carer?.name ? booking.carer.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A',
      carerSpecialty: booking.carer?.specialty || 'N/A',
      service: booking.careType || 'N/A',
      date: booking.startDate,
      time: booking.preferredTime || '',
      duration: booking.duration || '',
      status: booking.status
    }))
})

const inProgressBookings = computed(() => 
  activeBookings.value.filter(booking => booking.status === 'in-progress')
)

const scheduledBookings = computed(() => 
  activeBookings.value.filter(booking => booking.status === 'confirmed')
)

// Methods
const getStatusClasses = (status) => {
  const classes = {
    confirmed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    scheduled: 'bg-yellow-100 text-yellow-800'
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

const viewBooking = (booking) => {
  console.log('View booking:', booking)
}

const updateStatus = (booking) => {
  console.log('Update status for booking:', booking)
}

const contactCarer = (booking) => {
  console.log('Contact carer for booking:', booking)
}

// Set page title
useHead({
  title: 'Active Bookings - Admin Dashboard'
})
</script> 