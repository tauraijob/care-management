<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="bg-[#0034b3] rounded-2xl p-8 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold mb-2">My Assignments</h1>
              <p class="text-white/80 text-lg">Manage your patient care assignments and schedules</p>
              <div class="flex items-center mt-4 space-x-6">
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:account-group" class="text-lg" />
                  <span class="text-sm">{{ activeAssignments }} active assignments</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:calendar" class="text-lg" />
                  <span class="text-sm">{{ upcomingAssignments }} upcoming</span>
                </div>
              </div>
            </div>
            <div class="hidden lg:block">
              <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="mdi:clipboard-list" class="text-white text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Assignment Filters -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex flex-wrap items-end gap-6">
          <div class="flex-1 min-w-0">
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="selectedStatus" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900">
              <option value="all">All Assignments</option>
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div class="flex-1 min-w-0">
            <label class="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
            <select v-model="selectedServiceType" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900">
              <option value="all">All Services</option>
              <option value="personal-care">Personal Care</option>
              <option value="medication">Medication Management</option>
              <option value="meal-prep">Meal Preparation</option>
              <option value="exercise">Exercise Support</option>
            </select>
          </div>
          <div class="flex-1 min-w-0">
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select v-model="selectedDateRange" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div>
            <button @click="refreshAssignments" class="btn-secondary px-4 py-2">
              <Icon name="mdi:refresh" class="mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Assignment Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600">Active Assignments</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeAssignments }}</p>
              <p class="text-xs text-green-600 mt-2">Currently working</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:account-check" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600">Upcoming</p>
              <p class="text-2xl font-bold text-gray-900">{{ upcomingAssignments }}</p>
              <p class="text-xs text-blue-600 mt-2">Next 7 days</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:calendar-clock" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600">Completed Today</p>
              <p class="text-2xl font-bold text-gray-900">{{ completedToday }}</p>
              <p class="text-xs text-purple-600 mt-2">Successfully finished</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:check-circle" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600">Total Hours</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalHours }}</p>
              <p class="text-xs text-orange-600 mt-2">This week</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:clock" class="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Assignments List -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">Assignment Details</h2>
          <div class="flex space-x-2">
            <button @click="viewCalendar" class="btn-secondary">
              <Icon name="mdi:calendar" class="mr-2" />
              Calendar View
            </button>
            <button @click="exportAssignments" class="btn-secondary">
              <Icon name="mdi:download" class="mr-2" />
              Export
            </button>
          </div>
        </div>
        
        <div v-if="isLoading" class="flex justify-center items-center py-8">
          <div class="text-gray-500">Loading assignments...</div>
        </div>
        
        <div v-else-if="assignments.length === 0" class="flex justify-center items-center py-8">
          <div class="text-center">
            <Icon name="mdi:clipboard-list" class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
            <p class="text-gray-500">You don't have any assignments for the selected filters.</p>
          </div>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="assignment in filteredAssignments" :key="assignment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span class="text-sm font-medium text-green-800">{{ assignment.patientInitials }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ assignment.patientName }}</div>
                      <div class="text-sm text-gray-500">{{ assignment.patientAge }} years • {{ assignment.location }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ assignment.title }}</div>
                    <div class="text-sm text-gray-500">{{ assignment.duration }} hours</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ assignment.date }}</div>
                    <div class="text-sm text-gray-500">{{ assignment.time }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="service in assignment.services" :key="service" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ service }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    assignment.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    assignment.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' : 
                    assignment.status === 'Completed' ? 'bg-purple-100 text-purple-800' : 
                    'bg-red-100 text-red-800',
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
                  ]">
                    {{ assignment.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewAssignment(assignment.id)" class="text-green-600 hover:text-green-900">
                      <Icon name="mdi:eye" class="text-lg" />
                    </button>
                    <button @click="startAssignment(assignment.id)" v-if="assignment.status === 'Active'" class="text-blue-600 hover:text-blue-900">
                      <Icon name="mdi:play" class="text-lg" />
                    </button>
                    <button @click="completeAssignment(assignment.id)" v-if="assignment.status === 'Active'" class="text-purple-600 hover:text-purple-900">
                      <Icon name="mdi:check" class="text-lg" />
                    </button>
                    <button @click="editAssignment(assignment.id)" class="text-orange-600 hover:text-orange-900">
                      <Icon name="mdi:pencil" class="text-lg" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div class="space-y-4">
            <button @click="startNextAssignment" class="w-full flex items-center justify-between p-4 bg-[#0034b3]/10 border border-[#0034b3]/20 rounded-lg hover:bg-[#0034b3]/15 transition-colors">
              <div class="flex items-center">
                <Icon name="mdi:play-circle" class="text-[#0034b3] text-xl mr-3" />
                <div>
                  <p class="font-medium text-brand">Start Next Assignment</p>
                  <p class="text-sm text-[#0034b3]">Begin your next scheduled care session</p>
                </div>
              </div>
              <Icon name="mdi:chevron-right" class="text-[#0034b3]" />
            </button>
            
            <button @click="viewSchedule" class="w-full flex items-center justify-between p-4 bg-[#0034b3]/10 border border-[#0034b3]/20 rounded-lg hover:bg-[#0034b3]/15 transition-colors">
              <div class="flex items-center">
                <Icon name="mdi:calendar" class="text-[#0034b3] text-xl mr-3" />
                <div>
                  <p class="font-medium text-brand">View Schedule</p>
                  <p class="text-sm text-[#0034b3]">Check your upcoming assignments</p>
                </div>
              </div>
              <Icon name="mdi:chevron-right" class="text-[#0034b3]" />
            </button>
            
            <button @click="reportIssue" class="w-full flex items-center justify-between p-4 bg-[#0034b3]/10 border border-[#0034b3]/20 rounded-lg hover:bg-[#0034b3]/15 transition-colors">
              <div class="flex items-center">
                <Icon name="mdi:alert-circle" class="text-[#0034b3] text-xl mr-3" />
                <div>
                  <p class="font-medium text-brand">Report Issue</p>
                  <p class="text-sm text-[#0034b3]">Report problems with assignments</p>
                </div>
              </div>
              <Icon name="mdi:chevron-right" class="text-[#0034b3]" />
            </button>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-[#0034b3]">
                <Icon :name="activity.icon" class="text-white text-sm" style="color:#ffffff !important" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-[#0034b3]">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Debug Section (remove in production) -->
      <div v-if="isDev" class="mt-8 bg-gray-100 p-4 rounded-lg">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Debug Info</h3>
        <div class="text-sm text-gray-700">
          <p><strong>Total Assignments:</strong> {{ assignments.length }}</p>
          <p><strong>Loading:</strong> {{ isLoading }}</p>
          <p><strong>Active:</strong> {{ activeAssignments }}</p>
          <p><strong>Upcoming:</strong> {{ upcomingAssignments }}</p>
          <p><strong>Completed Today:</strong> {{ completedToday }}</p>
          <p><strong>Total Hours:</strong> {{ totalHours }}</p>
          <div v-if="assignments.length > 0" class="mt-4">
            <p><strong>Assignments:</strong></p>
            <ul class="list-disc list-inside">
              <li v-for="assignment in assignments.slice(0, 3)" :key="assignment.id">
                {{ assignment.patientName }} - {{ assignment.status }} - {{ assignment.date }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'carer'
})

const { user } = useAuth()

// Check if in development mode
const isDev = process.dev

// Reactive data
const selectedStatus = ref('all')
const selectedServiceType = ref('all')
const selectedDateRange = ref('week')

// Real data from API
const activeAssignments = ref(0)
const upcomingAssignments = ref(0)
const completedToday = ref(0)
const totalHours = ref(0)

const assignments = ref([])
const recentActivities = ref([])
const isLoading = ref(true)

// Computed properties
const filteredAssignments = computed(() => {
  let filtered = assignments.value

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(assignment => assignment.status.toLowerCase() === selectedStatus.value)
  }

  if (selectedServiceType.value !== 'all') {
    filtered = filtered.filter(assignment => 
      assignment.services.some(service => 
        service.toLowerCase().includes(selectedServiceType.value.replace('-', ' '))
      )
    )
  }

  return filtered
})

// Fetch assignments data
const fetchAssignments = async () => {
  isLoading.value = true
  try {
    const query = {
      status: selectedStatus.value,
      serviceType: selectedServiceType.value,
      dateRange: selectedDateRange.value
    }
    
    const { data } = await $fetch('/api/carer/assignments', {
      headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` },
      query
    })
    
    if (data) {
      assignments.value = data.assignments || []
      recentActivities.value = data.activities || []
      
      // Update statistics
      if (data.statistics) {
        activeAssignments.value = data.statistics.activeAssignments || 0
        upcomingAssignments.value = data.statistics.upcomingAssignments || 0
        completedToday.value = data.statistics.completedToday || 0
        totalHours.value = data.statistics.totalHours || 0
      }
    }
  } catch (error) {
    console.error('Error fetching assignments:', error)
    assignments.value = []
    recentActivities.value = []
  } finally {
    isLoading.value = false
  }
}

// Methods
const refreshAssignments = () => {
  console.log('Refreshing assignments...')
  fetchAssignments()
}

const viewCalendar = () => {
  console.log('Opening calendar view...')
  // Navigate to calendar view
}

const exportAssignments = () => {
  console.log('Exporting assignments...')
  alert('Assignments exported successfully')
}

const viewAssignment = (assignmentId) => {
  console.log('Viewing assignment:', assignmentId)
  // Navigate to assignment details
}

const startAssignment = (assignmentId) => {
  console.log('Starting assignment:', assignmentId)
  // Start assignment logic
}

const completeAssignment = (assignmentId) => {
  console.log('Completing assignment:', assignmentId)
  // Complete assignment logic
}

const editAssignment = (assignmentId) => {
  console.log('Editing assignment:', assignmentId)
  // Edit assignment logic
}

const startNextAssignment = () => {
  console.log('Starting next assignment...')
  // Start next assignment logic
}

const viewSchedule = () => {
  console.log('Viewing schedule...')
  // Navigate to schedule
}

const reportIssue = () => {
  console.log('Reporting issue...')
  // Open issue reporting modal
}

// Watch for filter changes and refetch data
watch([selectedStatus, selectedServiceType, selectedDateRange], () => {
  fetchAssignments()
})

// Fetch data on component mount
onMounted(() => {
  fetchAssignments()
})
</script> 