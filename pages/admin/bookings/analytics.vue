<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Booking Analytics</h1>
          <p class="text-sm text-gray-600 mt-1">Comprehensive booking insights and performance metrics</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportAnalytics" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export Report
          </button>
          <NuxtLink to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
            Back to Bookings
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Analytics Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:chart-line" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                <dd class="text-lg font-medium text-gray-900">{{ totalBookings }}</dd>
                <dd class="text-sm text-green-600">{{ bookingsChange }}% from last month</dd>
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
                <Icon name="mdi:currency-usd" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                <dd class="text-lg font-medium text-gray-900">${{ totalRevenue }}</dd>
                <dd class="text-sm text-green-600">{{ revenueChange }}% from last month</dd>
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
                <Icon name="mdi:account-group" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Carers</dt>
                <dd class="text-lg font-medium text-gray-900">{{ activeCarers }}</dd>
                <dd class="text-sm text-green-600">{{ carersChange }} from last month</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:star" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg Rating</dt>
                <dd class="text-lg font-medium text-gray-900">{{ avgRating }}</dd>
                <dd class="text-sm text-green-600">{{ avgRatingChange }} from last month</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Booking Trends -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Booking Trends</h3>
          <p class="text-sm text-gray-500 mt-1">Monthly booking volume over the last 12 months</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Booking trends over time</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Service Distribution -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Service Distribution</h3>
          <p class="text-sm text-gray-500 mt-1">Breakdown of bookings by service type</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-pie" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Service type distribution</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Carer Performance -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Top Performing Carers</h3>
          <p class="text-sm text-gray-500 mt-1">Carers with highest completion rates</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="carer in topCarers" :key="carer.id" class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <span class="text-xs font-medium text-gray-700">{{ carer.initials }}</span>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">{{ carer.name }}</p>
                  <p class="text-xs text-gray-500">{{ carer.specialty }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ carer.completionRate }}%</p>
                <p class="text-xs text-gray-500">{{ carer.bookings }} bookings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Popular Services -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Most Popular Services</h3>
          <p class="text-sm text-gray-500 mt-1">Services with highest demand</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="service in popularServices" :key="service.name" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
                <p class="text-xs text-gray-500">{{ service.category }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ service.bookings }}</p>
                <p class="text-xs text-gray-500">{{ service.percentage }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue by Month -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Revenue by Month</h3>
          <p class="text-sm text-gray-500 mt-1">Monthly revenue breakdown</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="month in revenueByMonth" :key="month.month" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ month.month }}</p>
                <p class="text-xs text-gray-500">{{ month.bookings }} bookings</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">${{ month.revenue }}</p>
                <p class="text-xs" :class="month.growth >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ month.growth >= 0 ? '+' : '' }}{{ month.growth }}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { user } = useAuth()

// Fetch real data
const { data: bookingsData } = await useFetch('/api/admin/bookings', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})
const { data: carersPerformanceData } = await useFetch('/api/admin/carers/performance', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})
const { data: revenueData } = await useFetch('/api/admin/reports/revenue-analysis', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Stats
const totalBookings = computed(() => bookingsData.value?.data?.bookings?.length || 0)
const totalRevenue = computed(() => revenueData.value?.data?.totalRevenue || 0)
const activeCarers = computed(() => carersPerformanceData.value?.data?.carers?.length || 0)
const avgRating = computed(() => {
  const carers = carersPerformanceData.value?.data?.carers || []
  if (!carers.length) return 0
  return (carers.reduce((sum, c) => sum + (c.rating || 0), 0) / carers.length).toFixed(1)
})

// Top Carers
const topCarers = computed(() => {
  const carers = carersPerformanceData.value?.data?.carers || []
  return carers
    .sort((a, b) => (b.completionRate || 0) - (a.completionRate || 0))
    .slice(0, 4)
    .map(carer => ({
      id: carer.id,
      name: carer.name,
      initials: carer.name ? carer.name.split(' ').map(n => n[0]).join('').toUpperCase() : '',
      specialty: carer.specialty || '',
      completionRate: carer.completionRate || 0,
      bookings: carer.bookings || 0
    }))
})

// Popular Services
const popularServices = computed(() => {
  const bookings = bookingsData.value?.data?.bookings || []
  const serviceMap = {}
  bookings.forEach(b => {
    if (!serviceMap[b.careType]) serviceMap[b.careType] = { name: b.careType, category: b.careType, bookings: 0 }
    serviceMap[b.careType].bookings++
  })
  const total = bookings.length
  return Object.values(serviceMap)
    .map(s => ({ ...s, percentage: total ? Math.round((s.bookings / total) * 100) : 0 }))
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 4)
})

// Revenue by Month
const revenueByMonth = computed(() => {
  const months = {}
  const bookings = bookingsData.value?.data?.bookings || []
  bookings.forEach(b => {
    const date = new Date(b.startDate)
    const key = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`
    if (!months[key]) months[key] = { month: key, revenue: 0, bookings: 0, growth: 0 }
    months[key].revenue += b.amount || 0
    months[key].bookings++
  })
  // Calculate growth
  const monthArr = Object.values(months).sort((a, b) => new Date(a.month) - new Date(b.month))
  for (let i = 1; i < monthArr.length; i++) {
    const prev = monthArr[i - 1]
    const curr = monthArr[i]
    curr.growth = prev.revenue ? Math.round(((curr.revenue - prev.revenue) / prev.revenue) * 100) : 0
  }
  return monthArr
})

const exportAnalytics = () => {
  console.log('Exporting analytics report...')
}

// Month-over-month change helpers
function getMonthKeys() {
  const bookings = bookingsData.value?.data?.bookings || []
  const months = [...new Set(bookings.map(b => {
    const d = new Date(b.startDate)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }))].sort()
  return months
}

const monthKeys = computed(() => getMonthKeys())
const currentMonthKey = computed(() => monthKeys.value[monthKeys.value.length - 1])
const prevMonthKey = computed(() => monthKeys.value[monthKeys.value.length - 2])

function getBookingsCountForMonth(key) {
  const bookings = bookingsData.value?.data?.bookings || []
  return bookings.filter(b => {
    const d = new Date(b.startDate)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === key
  }).length
}

function getRevenueForMonth(key) {
  const bookings = bookingsData.value?.data?.bookings || []
  return bookings.filter(b => {
    const d = new Date(b.startDate)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === key
  }).reduce((sum, b) => sum + (b.amount || 0), 0)
}

function getActiveCarersForMonth(key) {
  const bookings = bookingsData.value?.data?.bookings || []
  const carers = new Set()
  bookings.forEach(b => {
    const d = new Date(b.startDate)
    if (`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` === key && b.carer?.id) {
      carers.add(b.carer.id)
    }
  })
  return carers.size
}

function getAvgRatingForMonth(key) {
  const carers = carersPerformanceData.value?.data?.carers || []
  // Assume ratings are updated monthly, fallback to current average
  if (!carers.length) return 0
  return (carers.reduce((sum, c) => sum + (c.rating || 0), 0) / carers.length).toFixed(1)
}

const bookingsChange = computed(() => {
  if (!currentMonthKey.value || !prevMonthKey.value) return 0
  const curr = getBookingsCountForMonth(currentMonthKey.value)
  const prev = getBookingsCountForMonth(prevMonthKey.value)
  if (prev === 0) return 0
  return Math.round(((curr - prev) / prev) * 100)
})

const revenueChange = computed(() => {
  if (!currentMonthKey.value || !prevMonthKey.value) return 0
  const curr = getRevenueForMonth(currentMonthKey.value)
  const prev = getRevenueForMonth(prevMonthKey.value)
  if (prev === 0) return 0
  return Math.round(((curr - prev) / prev) * 100)
})

const carersChange = computed(() => {
  if (!currentMonthKey.value || !prevMonthKey.value) return 0
  const curr = getActiveCarersForMonth(currentMonthKey.value)
  const prev = getActiveCarersForMonth(prevMonthKey.value)
  return curr - prev
})

const avgRatingChange = computed(() => {
  if (!currentMonthKey.value || !prevMonthKey.value) return 0
  const curr = getAvgRatingForMonth(currentMonthKey.value)
  const prev = getAvgRatingForMonth(prevMonthKey.value)
  return (curr - prev).toFixed(1)
})

// Set page title
useHead({
  title: 'Booking Analytics - Admin Dashboard'
})
</script> 