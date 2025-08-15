<template>
  <LoadingSpinner 
    v-if="!user" 
    message="Loading carer dashboard..." 
    sub-message="Please wait while we authenticate you" 
  />
  
  <div v-else class="max-w-7xl mx-auto">
        <!-- Welcome Section -->
        <div class="mb-8">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold mb-2">
                  Welcome back, {{ user.firstName }}! <Icon name="mdi:stethoscope" class="inline" />
                </h1>
                <p class="text-green-100 text-lg">Here's your schedule and assignments for today</p>
                <div class="flex items-center mt-4 space-x-4">
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:calendar" class="text-lg" />
                    <span class="text-sm">{{ new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:clock" class="text-lg" />
                    <span class="text-sm">{{ new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }}</span>
                  </div>
                </div>
              </div>
              <div class="hidden lg:block">
                <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="mdi:stethoscope" class="text-white text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <NuxtLink to="/carer/schedule" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:calendar" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">View Schedule</p>
                <p class="text-sm text-gray-500">Check your assignments</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/carer/assignments" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:clipboard-text" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">My Assignments</p>
                <p class="text-sm text-gray-500">Current patient care</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/carer/reports" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:chart-line" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Submit Report</p>
                <p class="text-sm text-gray-500">Update patient status</p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:calendar" class="text-green-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Today's Assignments</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.todayAssignments || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:check-circle" class="text-green-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Completed Today</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.completedToday || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:star" class="text-green-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Average Rating</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.averageRating || '0.0' }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:currency-usd" class="text-green-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">This Month</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(dashboardData?.monthlyEarnings || 0) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div class="space-y-4">
              <div v-for="assignment in dashboardData?.todaySchedule?.slice(0, 5)" :key="assignment.id" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="mdi:clock" class="text-green-600 text-sm" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ assignment.patientName }}</p>
                  <p class="text-xs text-gray-500">{{ assignment.time }} • {{ assignment.careType }}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="{
                  'bg-green-100 text-green-800': assignment.status === 'COMPLETED',
                  'bg-yellow-100 text-yellow-800': assignment.status === 'IN_PROGRESS',
                  'bg-green-100 text-green-800': assignment.status === 'SCHEDULED'
                }">
                  {{ assignment.status }}
                </span>
              </div>
              <div v-if="!dashboardData?.todaySchedule?.length" class="text-center py-8 text-gray-500">
                <Icon name="mdi:calendar" class="text-2xl" />
                <p class="mt-2">No assignments today</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
            <div class="space-y-4">
              <div v-for="report in dashboardData?.recentReports?.slice(0, 5)" :key="report.id" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="mdi:clipboard-text" class="text-green-600 text-sm" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ report.patientName }}</p>
                  <p class="text-xs text-gray-500">Submitted {{ new Date(report.createdAt).toLocaleDateString() }}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Submitted
                </span>
              </div>
              <div v-if="!dashboardData?.recentReports?.length" class="text-center py-8 text-gray-500">
                <Icon name="mdi:clipboard-text" class="text-2xl" />
                <p class="mt-2">No recent reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
// Apply carer layout
definePageMeta({ 
  
  layout: 'carer'
})

const { user, init } = useAuth()

// Initialize auth state
await init()

// Fetch dashboard data only if user is authenticated
const { data: dashboardData, error } = await useFetch('/api/dashboard', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  // Only fetch if user is authenticated
  server: false
})

// Handle authentication errors
if (error.value) {
  console.error('Carer dashboard error:', error.value)
  // Redirect to login if there's an authentication error
  if (error.value.statusCode === 401) {
    await navigateTo('/login')
  }
}

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}
</script>