<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Schedule Manager</h1>
          <p class="text-sm text-gray-600 mt-1">Manage and view booking schedules</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportSchedule" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export Schedule
          </button>
          <NuxtLink to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
            Back to Bookings
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Schedule Controls -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Date Selector -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">View Date</label>
            <input v-model="selectedDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900">
          </div>
          
          <!-- Carer Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Carer</label>
            <select v-model="selectedCarer" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900">
              <option value="">All Carers</option>
              <option v-for="carer in carers" :key="carer.id" :value="carer.id">
                {{ carer.firstName }} {{ carer.lastName }}
              </option>
            </select>
          </div>
          
          <!-- Service Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Service</label>
            <select v-model="selectedService" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900">
              <option value="">All Services</option>
              <option value="personal-care">Personal Care</option>
              <option value="medical-care">Medical Care</option>
              <option value="companion-care">Companion Care</option>
              <option value="physical-therapy">Physical Therapy</option>
            </select>
          </div>
          
          <!-- View Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">View Type</label>
            <select v-model="viewType" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900">
              <option value="daily">Daily View</option>
              <option value="weekly">Weekly View</option>
              <option value="monthly">Monthly View</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Overview -->
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
                <dd class="text-lg font-medium text-gray-900">{{ filteredSchedule.length }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Confirmed</dt>
                <dd class="text-lg font-medium text-gray-900">{{ confirmedBookings.length }}</dd>
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
                <dd class="text-lg font-medium text-gray-900">{{ pendingBookings.length }}</dd>
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
                <Icon name="mdi:alert" class="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Conflicts</dt>
                <dd class="text-lg font-medium text-gray-900">{{ scheduleConflicts.length }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Schedule Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Schedule for {{ formatDate(selectedDate) }}</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Client</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Carer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Service</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Duration</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in filteredSchedule" :key="booking.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ booking.time }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span class="text-xs font-medium text-gray-700">{{ booking.clientInitials }}</span>
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900 truncate">{{ booking.clientName }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ booking.location }}</div>
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
                  <button @click="rescheduleBooking(booking)" class="p-1 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded" title="Reschedule">
                    <Icon name="mdi:calendar-edit" class="h-4 w-4" />
                  </button>
                  <button @click="assignCarer(booking)" class="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded" title="Assign Carer">
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

// Schedule controls
const selectedDate = ref(new Date().toISOString().split('T')[0])
const selectedCarer = ref('')
const selectedService = ref('')
const viewType = ref('daily')

// Replace hardcoded carers and schedule arrays with real API data:
const { data: carersData } = await useFetch('/api/admin/carers', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})
const { data: bookingsData } = await useFetch('/api/admin/bookings', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const carers = computed(() => {
  if (!carersData.value?.data?.carers) return []
  return carersData.value.data.carers.map(carer => ({
    id: carer.id,
    firstName: carer.firstName,
    lastName: carer.lastName
  }))
})

const schedule = computed(() => {
  if (!bookingsData.value?.data?.bookings) return []
  return bookingsData.value.data.bookings.map(booking => ({
    id: booking.id,
    clientName: booking.client?.name || 'N/A',
    clientInitials: booking.client?.name ? booking.client.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A',
    carerName: booking.carer?.name || 'N/A',
    carerInitials: booking.carer?.name ? booking.carer.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'N/A',
    carerSpecialty: booking.carer?.specialty || 'N/A',
    service: booking.careType || 'N/A',
    time: booking.preferredTime || '',
    duration: booking.duration || '',
    status: booking.status,
    location: booking.location || ''
  }))
})

// Computed properties
const filteredSchedule = computed(() => {
  return schedule.value.filter(booking => {
    const matchesCarer = !selectedCarer.value || booking.carerName.includes(selectedCarer.value)
    const matchesService = !selectedService.value || booking.service.toLowerCase().includes(selectedService.value.toLowerCase())
    return matchesCarer && matchesService
  }).sort((a, b) => a.time.localeCompare(b.time))
})

const confirmedBookings = computed(() => 
  filteredSchedule.value.filter(booking => booking.status === 'confirmed')
)

const pendingBookings = computed(() => 
  filteredSchedule.value.filter(booking => booking.status === 'pending')
)

const scheduleConflicts = computed(() => {
  // Simple conflict detection - overlapping times for same carer
  const conflicts = []
  const carerSchedules = {}
  
  filteredSchedule.value.forEach(booking => {
    if (!carerSchedules[booking.carerName]) {
      carerSchedules[booking.carerName] = []
    }
    carerSchedules[booking.carerName].push(booking)
  })
  
  Object.values(carerSchedules).forEach(carerBookings => {
    if (carerBookings.length > 1) {
      // Check for overlapping times (simplified)
      conflicts.push(...carerBookings)
    }
  })
  
  return conflicts
})

// Methods
const getStatusClasses = (status) => {
  const classes = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const exportSchedule = () => {
  console.log('Exporting schedule...')
}

const viewBooking = (booking) => {
  console.log('View booking:', booking)
}

const rescheduleBooking = (booking) => {
  console.log('Reschedule booking:', booking)
}

const assignCarer = (booking) => {
  console.log('Assign carer to booking:', booking)
}

// Set page title
useHead({
  title: 'Schedule Manager - Admin Dashboard'
})
</script> 