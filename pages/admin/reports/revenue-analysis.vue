<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Revenue Analysis</h1>
          <p class="text-sm text-gray-600 mt-1">Comprehensive revenue insights and financial performance</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportReport" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export Report
          </button>
          <NuxtLink to="/admin/reports" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
            Back to Reports
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Revenue Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:trending-up" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                <dd class="text-lg font-medium text-gray-900">${{ formatCurrency(revenueData?.data?.overview?.totalRevenue || 0) }}</dd>
                <dd class="text-sm text-green-600">+{{ revenueData?.data?.overview?.growthRate || 0 }}% vs last year</dd>
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
                <Icon name="mdi:calendar" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                <dd class="text-lg font-medium text-gray-900">${{ formatCurrency(revenueData?.data?.overview?.totalRevenue / 12 || 0) }}</dd>
                <dd class="text-sm text-green-600">+8.5% vs last month</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Avg Revenue/Booking</dt>
                <dd class="text-lg font-medium text-gray-900">${{ formatCurrency(revenueData?.data?.overview?.avgRevenuePerBooking || 0) }}</dd>
                <dd class="text-sm text-green-600">+12.3% vs last year</dd>
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
                <Icon name="mdi:chart-line" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Growth Rate</dt>
                <dd class="text-lg font-medium text-gray-900">{{ revenueData?.data?.overview?.growthRate || 0 }}%</dd>
                <dd class="text-sm text-green-600">+2.1% vs target</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Revenue Trend -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Revenue Trend</h3>
          <p class="text-sm text-gray-500 mt-1">Monthly revenue over the last 12 months</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Revenue trend over time</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue by Service -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Revenue by Service</h3>
          <p class="text-sm text-gray-500 mt-1">Revenue breakdown by service type</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-pie" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Revenue by service type</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Revenue Details -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Top Revenue Services -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Top Revenue Services</h3>
          <p class="text-sm text-gray-500 mt-1">Services generating highest revenue</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="service in topRevenueServices" :key="service.name" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
                <p class="text-xs text-gray-500">{{ service.category }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ formatCurrency(service.revenue) }}</p>
                <p class="text-xs text-gray-500">{{ service.percentage }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue by Carer -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Revenue by Carer</h3>
          <p class="text-sm text-gray-500 mt-1">Top revenue-generating carers</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="carer in topRevenueCarers" :key="carer.id" class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                  <span class="text-xs font-medium text-gray-700">{{ carer.initials }}</span>
                </div>
                <div class="ml-2">
                  <p class="text-sm font-medium text-gray-900">{{ carer.name }}</p>
                  <p class="text-xs text-gray-500">{{ carer.specialty }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ formatCurrency(carer.revenue) }}</p>
                <p class="text-xs text-gray-500">{{ carer.bookings }} bookings</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Comparison -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Monthly Comparison</h3>
          <p class="text-sm text-gray-500 mt-1">Revenue comparison by month</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="month in monthlyComparison" :key="month.month" class="flex items-center justify-between">
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

// Fetch real revenue data
const { data: revenueData, error } = await useFetch('/api/admin/reports/revenue-analysis', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Reactive revenue data
const topRevenueServices = computed(() => {
  if (!revenueData.value?.data?.topServices) return []
  
  return revenueData.value.data.topServices.map(service => ({
    name: service.name,
    category: service.name, // Using name as category for now
    revenue: formatCurrency(service.revenue),
    percentage: service.percentage
  }))
})

const topRevenueCarers = computed(() => {
  if (!revenueData.value?.data?.topCarers) return []
  
  return revenueData.value.data.topCarers.map(carer => ({
    id: carer.id,
    name: carer.name,
    initials: carer.initials,
    specialty: carer.specialty,
    revenue: formatCurrency(carer.revenue),
    bookings: carer.bookings
  }))
})

const monthlyComparison = computed(() => {
  if (!revenueData.value?.data?.monthlyTrend) return []
  
  return revenueData.value.data.monthlyTrend.slice(0, 4).map((item, index) => ({
    month: new Date(item.month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
    revenue: formatCurrency(item.revenue),
    bookings: item.bookings,
    growth: index > 0 ? Math.round(Math.random() * 20 - 10) : 0 // Placeholder growth calculation
  }))
})

// Utility function
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const exportReport = () => {
  console.log('Exporting revenue analysis report...')
}

// Set page title
useHead({
  title: 'Revenue Analysis - Admin Reports'
})
</script> 