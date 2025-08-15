<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Carer Assignments</h1>
          <p class="text-sm text-gray-600 mt-1">Manage carer assignments to bookings</p>
        </div>
        <NuxtLink to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
          Back to Bookings
        </NuxtLink>
      </div>
    </div>

    <!-- Assignment Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:account-switch" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Assignments</dt>
                <dd class="text-lg font-medium text-gray-900">{{ assignments.length }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Assigned</dt>
                <dd class="text-lg font-medium text-gray-900">{{ assignedCount }}</dd>
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
                <dd class="text-lg font-medium text-gray-900">{{ pendingCount }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Unassigned</dt>
                <dd class="text-lg font-medium text-gray-900">{{ unassignedCount }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Assignments Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Carer Assignments</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Booking ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Client</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">Assigned Carer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Service</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Date & Time</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="assignment in assignments" :key="assignment.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{{ assignment.bookingId }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span class="text-xs font-medium text-gray-700">{{ assignment.clientInitials }}</span>
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900 truncate">{{ assignment.clientName }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ assignment.clientPhone }}</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div v-if="assignment.carerName" class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                    <span class="text-xs font-medium text-gray-700">{{ assignment.carerInitials }}</span>
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="text-sm font-medium text-gray-900 truncate">{{ assignment.carerName }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ assignment.carerSpecialty }}</div>
                  </div>
                </div>
                <div v-else class="text-sm text-gray-500 italic">Unassigned</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <span class="truncate block">{{ assignment.service }}</span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{{ formatDate(assignment.date) }}</div>
                <div class="text-xs text-gray-400">{{ assignment.time }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(assignment.status)">
                  {{ assignment.status }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-1">
                  <button @click="assignCarer(assignment)" class="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded" title="Assign Carer">
                    <Icon name="mdi:account-switch" class="h-4 w-4" />
                  </button>
                  <button @click="changeCarer(assignment)" v-if="assignment.carerName" class="p-1 text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50 rounded" title="Change Carer">
                    <Icon name="mdi:account-edit" class="h-4 w-4" />
                  </button>
                  <button @click="viewDetails(assignment)" class="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded" title="View Details">
                    <Icon name="mdi:eye" class="h-4 w-4" />
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

// Replace the assignments ref with:
const { data: assignmentsData, error } = await useFetch('/api/admin/bookings/assignments', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const assignments = computed(() => {
  if (!assignmentsData.value?.data?.assignments) return []
  return assignmentsData.value.data.assignments.map(assignment => ({
    id: assignment.id,
    bookingId: assignment.bookingId,
    clientName: assignment.client.name,
    clientInitials: assignment.client.name.split(' ').map(n => n[0]).join(''),
    clientPhone: assignment.client.phone,
    carerName: assignment.carer?.name || null,
    carerInitials: assignment.carer ? assignment.carer.name.split(' ').map(n => n[0]).join('') : null,
    carerSpecialty: assignment.carer?.specialty || null,
    service: assignment.service,
    date: assignment.date,
    time: assignment.time,
    status: assignment.status
  }))
})

// Computed properties
const assignedCount = computed(() => 
  assignments.value.filter(assignment => assignment.status === 'assigned').length
)

const pendingCount = computed(() => 
  assignments.value.filter(assignment => assignment.status === 'pending').length
)

const unassignedCount = computed(() => 
  assignments.value.filter(assignment => assignment.status === 'unassigned').length
)

// Methods
const getStatusClasses = (status) => {
  const classes = {
    assigned: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    unassigned: 'bg-red-100 text-red-800'
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

const assignCarer = (assignment) => {
  console.log('Assign carer to booking:', assignment)
}

const changeCarer = (assignment) => {
  console.log('Change carer for booking:', assignment)
}

const viewDetails = (assignment) => {
  console.log('View assignment details:', assignment)
}

// Set page title
useHead({
  title: 'Carer Assignments - Admin Dashboard'
})
</script> 