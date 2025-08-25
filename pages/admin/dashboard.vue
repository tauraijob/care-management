<template>
  <LoadingSpinner 
    v-if="!user" 
    message="Loading admin dashboard..." 
    sub-message="Please wait while we authenticate you" 
  />
  
  <div v-else class="max-w-7xl mx-auto">
        <!-- Welcome Section -->
        <div class="mb-8">
          <div class="bg-lucerna-primary rounded-2xl p-8 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold mb-2">
                  Welcome back, {{ user.firstName }}!
                </h1>
                <p class="text-white/80 text-lg">Here is today’s overview</p>
                <div class="flex items-center mt-4 space-x-4 text-white/80">
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
                <div class="w-24 h-24 bg-white/15 rounded-full flex items-center justify-center">
                  <Icon name="mdi:lightning-bolt" class="text-white text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Users" :value="dashboardData?.data?.overview?.totalUsers || 0" icon="mdi:account-group" />
          <StatCard label="Bookings Today" :value="dashboardData?.data?.overview?.todayBookings || 0" icon="mdi:calendar-today" />
          <StatCard label="Revenue (Today)" :value="formatCurrency(dashboardData?.data?.overview?.todayRevenue || 0)" icon="mdi:cash" />
          <StatCard label="Total Revenue" :value="formatCurrency(dashboardData?.data?.overview?.totalRevenue || 0)" icon="mdi:currency-usd" />
        </div>

        <!-- Charts + Quick Actions -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div class="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Revenue</h3>
              <div class="flex items-center gap-2">
                <button @click="revenueRange = '7d'" :class="rangeBtnClass('7d')">7d</button>
                <button @click="revenueRange = '30d'" :class="rangeBtnClass('30d')">30d</button>
                <button @click="revenueRange = '6mo'" :class="rangeBtnClass('6mo')">6mo</button>
              </div>
            </div>
            <MiniLineChart :labels="filteredRevenueLabels" :data="filteredRevenueSeries" />
            <div class="mt-3 text-xs text-gray-500 flex justify-between">
              <span>Total: {{ formatCurrency(totalFilteredRevenue) }}</span>
              <span>Avg/day: {{ formatCurrency(avgFilteredRevenue) }}</span>
            </div>
          </div>
          <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Booking Status</h3>
            <DonutChart :labels="statusLabels" :data="statusSeries" />
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <AlertBanner :items="alerts" />
          </div>
          <div class="lg:col-span-2">
            <QuickActions />
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
                  'bg-green-100 text-green-800': booking.status === 'CONFIRMED' || booking.status === 'COMPLETED',
                  'bg-yellow-100 text-yellow-800': booking.status === 'PENDING',
                  'bg-blue-100 text-blue-800': booking.status === 'IN_PROGRESS' || booking.status === 'IN PROGRESS',
                  'bg-red-100 text-red-800': booking.status === 'CANCELLED',
                  'bg-gray-100 text-gray-800': !['CONFIRMED','COMPLETED','PENDING','IN_PROGRESS','IN PROGRESS','CANCELLED'].includes(booking.status)
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
import StatCard from '~/components/dashboard/StatCard.vue'
import MiniLineChart from '~/components/dashboard/MiniLineChart.vue'
import DonutChart from '~/components/dashboard/DonutChart.vue'
import QuickActions from '~/components/dashboard/QuickActions.vue'
import AlertBanner from '~/components/dashboard/AlertBanner.vue'
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

// Derived series for charts
const revenueRaw = computed(() => (dashboardData.value?.data?.revenueTrend || []).map(r => ({ date: new Date(r.date), revenue: r.revenue })))
const revenueRange = ref('6mo')
const filteredRevenue = computed(() => {
  const now = new Date()
  let start
  if (revenueRange.value === '7d') start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  else if (revenueRange.value === '30d') start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  else start = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000)
  return revenueRaw.value.filter(p => p.date >= start)
})
const filteredRevenueLabels = computed(() => filteredRevenue.value.map(r => r.date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })))
const filteredRevenueSeries = computed(() => filteredRevenue.value.map(r => r.revenue))
const totalFilteredRevenue = computed(() => filteredRevenue.value.reduce((a, b) => a + (b.revenue || 0), 0))
const avgFilteredRevenue = computed(() => {
  if (!filteredRevenue.value.length) return 0
  return totalFilteredRevenue.value / filteredRevenue.value.length
})

const rangeBtnClass = (key) => [
  'px-2 py-1 text-xs rounded-md border',
  revenueRange.value === key ? 'bg-lucerna-primary text-white border-lucerna-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
]

const statusLabels = computed(() => Object.keys(dashboardData.value?.data?.statistics?.bookings || {}))
const statusSeries = computed(() => Object.values(dashboardData.value?.data?.statistics?.bookings || {}))

const alerts = computed(() => {
  const list = []
  const pending = dashboardData.value?.data?.statistics?.bookings?.pending || 0
  if (pending > 0) list.push(`${pending} pending bookings require approval`)
  const failed = dashboardData.value?.data?.statistics?.payments?.failed?.count || 0
  if (failed > 0) list.push(`${failed} failed payments need review`)
  return list
})
</script>