<template>
  <LoadingSpinner 
    v-if="!user" 
    message="Loading admin dashboard..." 
    sub-message="Please wait while we authenticate you" 
  />
  
  <div v-else class="max-w-7xl mx-auto">
        <!-- Welcome Section -->
        <div class="mb-8">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold mb-2">
                  Welcome back, {{ user.firstName }}! <Icon name="mdi:lightning-bolt" class="inline" />
                </h1>
                <p class="text-green-100 text-lg">Here's your platform overview and management dashboard</p>
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
                  <Icon name="mdi:lightning-bolt" class="text-white text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <NuxtLink to="/admin/users/create" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:account-plus" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Add User</p>
                <p class="text-sm text-gray-500">Create new user account</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/admin/bookings" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:calendar" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Manage Bookings</p>
                <p class="text-sm text-gray-500">Review and approve bookings</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/admin/reports" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:chart-line" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">View Reports</p>
                <p class="text-sm text-gray-500">Analytics and insights</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/admin/settings" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:cog" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Settings</p>
                <p class="text-sm text-gray-500">Platform configuration</p>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:account-group" class="text-blue-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Users</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.data?.overview?.totalUsers || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:calendar-check" class="text-green-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.data?.overview?.totalBookings || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:currency-usd" class="text-purple-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Revenue</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(dashboardData?.data?.overview?.totalRevenue || 0) }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:star" class="text-yellow-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Patients</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.data?.overview?.totalPatients || 0 }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:account-heart" class="text-indigo-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Active Carers</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.data?.statistics?.users?.carer || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:account" class="text-pink-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Active Clients</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.data?.statistics?.users?.client || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:calendar-clock" class="text-orange-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Pending Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.data?.statistics?.bookings?.pending || 0 }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
            <div class="space-y-4">
              <div v-for="booking in dashboardData?.data?.recentActivity?.bookings?.slice(0, 5)" :key="booking.id" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="mdi:calendar" class="text-green-600 text-sm" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ booking.patient }} - {{ booking.carer }}</p>
                  <p class="text-xs text-gray-500">{{ formatDate(booking.startDate) }} - {{ booking.status }}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="{
                  'bg-green-100 text-green-800': booking.status === 'CONFIRMED',
                  'bg-yellow-100 text-yellow-800': booking.status === 'PENDING',
                  'bg-blue-100 text-blue-800': booking.status === 'COMPLETED',
                  'bg-red-100 text-red-800': booking.status === 'CANCELLED'
                }">
                  {{ booking.status }}
                </span>
              </div>
              <div v-if="!dashboardData?.data?.recentActivity?.bookings?.length" class="text-center py-8 text-gray-500">
                <Icon name="mdi:calendar" class="text-2xl" />
                <p class="mt-2">No recent bookings</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Payments</h3>
            <div class="space-y-4">
              <div v-for="payment in dashboardData?.data?.recentActivity?.payments?.slice(0, 5)" :key="payment.id" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="mdi:currency-usd" class="text-green-600 text-sm" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ payment.patient }} - {{ payment.client }}</p>
                  <p class="text-xs text-gray-500">{{ formatCurrency(payment.amount) }} • {{ payment.method }}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="{
                  'bg-green-100 text-green-800': payment.status === 'COMPLETED',
                  'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
                  'bg-red-100 text-red-800': payment.status === 'FAILED'
                }">
                  {{ payment.status }}
                </span>
              </div>
              <div v-if="!dashboardData?.data?.recentActivity?.payments?.length" class="text-center py-8 text-gray-500">
                <Icon name="mdi:currency-usd" class="text-2xl" />
                <p class="mt-2">No recent payments</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Carers Section -->
        <div v-if="dashboardData?.data?.topCarers?.length" class="mt-8">
          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Performing Carers</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="carer in dashboardData.data.topCarers.slice(0, 6)" :key="carer.id" class="p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ carer.name }}</p>
                    <p class="text-xs text-gray-500">{{ carer.email }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-lg font-bold text-green-600">{{ carer.bookingCount }}</p>
                    <p class="text-xs text-gray-500">bookings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
// Apply admin layout
definePageMeta({ 
  layout: 'admin'
})

const { user, init } = useAuth()

// Initialize auth state
await init()

// Fetch dashboard data only if user is authenticated
const { data: dashboardData, error } = await useFetch('/api/admin/dashboard', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  // Only fetch if user is authenticated
  server: false
})

// Handle authentication errors
if (error.value) {
  console.error('Admin dashboard error:', error.value)
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

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Invalid Date'
  }
}
</script>