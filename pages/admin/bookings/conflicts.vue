<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Schedule Conflicts</h1>
          <p class="text-sm text-gray-600 mt-1">Identify and resolve booking schedule conflicts</p>
        </div>
        <NuxtLink to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
          Back to Bookings
        </NuxtLink>
      </div>
    </div>

    <!-- Conflict Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <dt class="text-sm font-medium text-gray-500 truncate">Total Conflicts</dt>
                <dd class="text-lg font-medium text-gray-900">{{ conflicts.length }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Pending Resolution</dt>
                <dd class="text-lg font-medium text-gray-900">{{ pendingConflicts.length }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Resolved</dt>
                <dd class="text-lg font-medium text-gray-900">{{ resolvedConflicts.length }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conflicts Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Schedule Conflicts</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Conflict ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Carer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Conflicting Bookings</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Time Overlap</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Severity</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="conflict in conflicts" :key="conflict.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ conflict.id }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span class="text-xs font-medium text-gray-700">{{ conflict.carerInitials }}</span>
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900 truncate">{{ conflict.carerName }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ conflict.carerSpecialty }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="space-y-1">
                  <div v-for="booking in conflict.conflictingBookings" :key="booking.id" class="text-sm">
                    <span class="font-medium">#{{ booking.id }}</span> - {{ booking.clientName }}
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(conflict.date) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ conflict.timeOverlap }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getSeverityClasses(conflict.severity)">
                  {{ conflict.severity }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-1">
                  <button @click="resolveConflict(conflict)" class="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded" title="Resolve">
                    <Icon name="mdi:check" class="h-4 w-4" />
                  </button>
                  <button @click="viewDetails(conflict)" class="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded" title="View Details">
                    <Icon name="mdi:eye" class="h-4 w-4" />
                  </button>
                  <button @click="rescheduleBooking(conflict)" class="p-1 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded" title="Reschedule">
                    <Icon name="mdi:calendar-edit" class="h-4 w-4" />
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

// Fetch real bookings data
const { data: bookingsData } = await useFetch('/api/admin/bookings', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Compute conflicts from real data
const conflicts = computed(() => {
  if (!bookingsData.value?.data?.bookings) return []
  // Group bookings by carer and date, then find overlaps
  const bookings = bookingsData.value.data.bookings
  const carerDateMap = {}
  bookings.forEach(booking => {
    if (!booking.carer || !booking.startDate || !booking.endDate) return
    const key = `${booking.carer.id}_${booking.startDate.split('T')[0]}`
    if (!carerDateMap[key]) carerDateMap[key] = []
    carerDateMap[key].push(booking)
  })
  let conflictList = []
  let conflictId = 1
  Object.values(carerDateMap).forEach(bookingsArr => {
    if (bookingsArr.length > 1) {
      // Simple overlap: all bookings for same carer on same day
      conflictList.push({
        id: `CF${String(conflictId).padStart(3, '0')}`,
        carerName: bookingsArr[0].carer.name,
        carerInitials: bookingsArr[0].carer.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        carerSpecialty: bookingsArr[0].carer.specialty || '',
        conflictingBookings: bookingsArr.map(b => ({ id: b.id, clientName: b.client?.name || 'N/A' })),
        date: bookingsArr[0].startDate,
        timeOverlap: `${new Date(bookingsArr[0].startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(bookingsArr[0].endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        severity: 'high',
        status: 'pending'
      })
      conflictId++
    }
  })
  return conflictList
})

const pendingConflicts = computed(() => conflicts.value.filter(conflict => conflict.status === 'pending'))
const resolvedConflicts = computed(() => conflicts.value.filter(conflict => conflict.status === 'resolved'))

// Methods
const getSeverityClasses = (severity) => {
  const classes = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  }
  return classes[severity] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Actions
const resolveConflict = (conflict) => {
  // Here you would call an API to mark the conflict as resolved
  // For now, just update the status in the computed list (simulate)
  conflict.status = 'resolved'
}
const viewDetails = (conflict) => {
  // Show a modal or navigate to a details page
  alert(`Viewing details for conflict ${conflict.id}`)
}
const rescheduleBooking = (conflict) => {
  // Show a modal or trigger rescheduling logic
  alert(`Rescheduling bookings for conflict ${conflict.id}`)
}

// Set page title
useHead({
  title: 'Schedule Conflicts - Admin Dashboard'
})
</script> 