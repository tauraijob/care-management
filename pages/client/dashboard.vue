<template>
  <LoadingSpinner 
    v-if="!user" 
    message="Loading user data..." 
    sub-message="Please wait while we authenticate you" 
  />
  
  <div v-else-if="error" class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
    <div class="text-center">
      <Icon name="mdi:alert-circle" class="text-red-500 text-4xl mx-auto mb-4" />
      <p class="text-gray-600">Authentication Error</p>
      <p class="text-sm text-gray-500 mt-2">Please log in again</p>
      <NuxtLink to="/login" class="mt-4 inline-block btn-primary">
        Go to Login
      </NuxtLink>
    </div>
  </div>
  
  <div v-else class="max-w-7xl mx-auto">
        <!-- Welcome Section -->
        <div class="mb-8">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold mb-2">
                  Welcome back, {{ user.firstName }}! <Icon name="mdi:hand-wave" class="inline" />
                </h1>
                <p class="text-green-100 text-lg">Here's what's happening with your healthcare services today</p>
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
                  <Icon name="mdi:heart" class="text-white text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <NuxtLink v-if="user.role === 'CLIENT'" to="/client/bookings/create" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:plus" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">New Booking</p>
                <p class="text-sm text-gray-500">Schedule care for a patient</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink v-if="user.role === 'CLIENT'" to="/client/patients/create" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:account-plus" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Add Patient</p>
                <p class="text-sm text-gray-500">Register a new patient</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/client/bookings" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:calendar" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">My Bookings</p>
                <p class="text-sm text-gray-500">View all bookings</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink to="/client/payments" class="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="mdi:currency-usd" class="text-white text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors">Payments</p>
                <p class="text-sm text-gray-500">View payment history</p>
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
                  <Icon name="mdi:account-group" class="text-green-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Patients</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.totalPatients || 0 }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon name="mdi:calendar" class="text-green-600 text-xl" />
                </div>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Active Bookings</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.activeBookings || 0 }}</p>
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
                <p class="text-sm font-medium text-gray-500">Completed</p>
                <p class="text-2xl font-bold text-gray-900">{{ dashboardData?.completedBookings || 0 }}</p>
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
                <p class="text-sm font-medium text-gray-500">Total Spent</p>
                <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(dashboardData?.totalSpent || 0) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
            <div class="space-y-4">
              <div v-for="booking in dashboardData?.recentBookings?.slice(0, 5)" :key="booking.id" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="mdi:calendar" class="text-green-600 text-sm" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ booking.patientName }}</p>
                  <p class="text-xs text-gray-500">{{ booking.date }} - {{ booking.time }}</p>
                </div>
                <span class="px-2 py-1 text-xs font-medium rounded-full" :class="{
                  'bg-green-100 text-green-800': booking.status === 'CONFIRMED',
                  'bg-yellow-100 text-yellow-800': booking.status === 'PENDING',
                  'bg-red-100 text-red-800': booking.status === 'CANCELLED'
                }">
                  {{ booking.status }}
                </span>
              </div>
              <div v-if="!dashboardData?.recentBookings?.length" class="text-center py-8 text-gray-500">
                <Icon name="mdi:calendar" class="text-2xl" />
                <p class="mt-2">No recent bookings</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
            <div class="space-y-4">
              <div v-for="patient in dashboardData?.recentPatients?.slice(0, 5)" :key="patient.id" class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="mdi:account" class="text-green-600 text-sm" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ patient.firstName }} {{ patient.lastName }}</p>
                  <p class="text-xs text-gray-500">Added {{ new Date(patient.createdAt).toLocaleDateString() }}</p>
                </div>
                <NuxtLink :to="`/client/patients/${patient.id}`" class="text-green-600 hover:text-green-800 text-sm font-medium">
                  View
                </NuxtLink>
              </div>
              <div v-if="!dashboardData?.recentPatients?.length" class="text-center py-8 text-gray-500">
                <Icon name="mdi:account-group" class="text-2xl" />
                <p class="mt-2">No patients added yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script setup>
// Apply client layout
definePageMeta({ 
  
  layout: 'client'
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
  console.error('Dashboard error:', error.value)
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