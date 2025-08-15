<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p class="text-sm text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div class="flex items-center space-x-3">
          <select v-model="selectedPeriod" class="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-gray-900">
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button @click="exportAnalytics" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export Report
          </button>
        </div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-if="keyMetrics.length === 0" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:loading" class="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Loading Metrics...</dt>
                <dd class="text-lg font-medium text-gray-900">...</dd>
                <dd class="text-sm text-gray-600">...</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div v-else v-for="(metric, index) in keyMetrics" :key="index" class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:trending-up" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">{{ metric.label }}</dt>
                <dd class="text-lg font-medium text-gray-900">{{ metric.value }}</dd>
                <dd class="text-sm text-green-600">{{ metric.sub }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Revenue Chart -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Revenue Trends</h3>
          <p class="text-sm text-gray-500 mt-1">Monthly revenue over the selected period</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p class="text-sm text-gray-500">Revenue chart visualization</p>
              <p class="text-xs text-gray-400 mt-2">Using Chart.js or similar library</p>
            </div>
          </div>
        </div>
      </div>

      <!-- User Growth Chart -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">User Growth</h3>
          <p class="text-sm text-gray-500 mt-1">New user registrations over time</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-area" class="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p class="text-sm text-gray-500">User growth chart visualization</p>
              <p class="text-xs text-gray-400 mt-2">Using Chart.js or similar library</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Service Performance -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Service Performance</h3>
          <p class="text-sm text-gray-500 mt-1">Most popular services</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(service, index) in servicePerformance" :key="index" class="flex items-center justify-between">
              <div class="flex items-center">
                <Icon :name="service.icon" class="h-5 w-5" :class="service.color" />
                <span class="text-sm font-medium text-gray-900">{{ service.service }}</span>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">{{ service.percentage }}%</div>
                <div class="text-xs text-gray-500">{{ service.change }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Geographic Distribution -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Geographic Distribution</h3>
          <p class="text-sm text-gray-500 mt-1">Service requests by location</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(city, index) in geoDistribution" :key="index" class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">{{ city.city }}</span>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">{{ city.percentage }}%</div>
                <div class="text-xs text-gray-500">{{ city.requests }} requests</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Peak Hours -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Peak Hours</h3>
          <p class="text-sm text-gray-500 mt-1">Most active booking times</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(hour, index) in peakHours" :key="index" class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-900">{{ hour.timeRange }}</span>
              <div class="text-right">
                <div class="text-sm font-medium text-gray-900">{{ hour.percentage }}%</div>
                <div class="text-xs text-gray-500">{{ hour.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Performance Metrics</h3>
        <p class="text-sm text-gray-500 mt-1">Key performance indicators and benchmarks</p>
      </div>
      <div class="overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Previous</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="metric in performanceMetrics" :key="metric.name" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Icon :name="metric.icon" class="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ metric.name }}</div>
                    <div class="text-sm text-gray-500">{{ metric.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ metric.current }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ metric.previous }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="metric.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  <Icon :name="metric.change >= 0 ? 'mdi:trending-up' : 'mdi:trending-down'" class="h-3 w-3 mr-1" />
                  {{ metric.change >= 0 ? '+' : '' }}{{ metric.change }}%
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ metric.target }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Insights and Recommendations -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Insights & Recommendations</h3>
        <p class="text-sm text-gray-500 mt-1">AI-powered insights and actionable recommendations</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="insight in insights" :key="insight.id" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <Icon :name="insight.icon" class="h-6 w-6" :class="insight.color" />
              </div>
              <div class="ml-3">
                <h4 class="text-sm font-medium text-gray-900">{{ insight.title }}</h4>
                <p class="text-sm text-gray-500 mt-1">{{ insight.description }}</p>
                <div class="mt-3">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="insight.priority === 'high' ? 'bg-red-100 text-red-800' : insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'">
                    {{ insight.priority }} priority
                  </span>
                </div>
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
  layout: 'admin',
  
})

const { user } = useAuth()

// Reactive data
const selectedPeriod = ref('30d')

// Insights data
const insights = ref([
  {
    id: 1,
    title: 'Peak Hour Optimization',
    description: 'Consider increasing carer availability during 9-11 AM peak hours to reduce response times.',
    priority: 'high',
    icon: 'mdi:trending-up',
    color: 'text-green-600'
  },
  {
    id: 2,
    title: 'Geographic Expansion',
    description: 'High demand in Johannesburg suggests potential for expansion in surrounding areas.',
    priority: 'medium',
    icon: 'mdi:map-marker',
    color: 'text-blue-600'
  },
  {
    id: 3,
    title: 'Service Diversification',
    description: 'Elderly care services show strong growth. Consider adding specialized care programs.',
    priority: 'medium',
    icon: 'mdi:medical-bag',
    color: 'text-purple-600'
  },
  {
    id: 4,
    title: 'Customer Retention',
    description: 'Satisfaction scores are improving. Focus on maintaining quality standards.',
    priority: 'low',
    icon: 'mdi:heart',
    color: 'text-red-600'
  }
])

// Fetch analytics data from API
const { data: analyticsData, error } = await useFetch('/api/admin/reports/booking-analytics', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Key metrics from API
const keyMetrics = computed(() => {
  if (!analyticsData.value?.data) return []
  return [
    {
      label: 'Revenue Growth',
      value: analyticsData.value.data.revenueGrowth,
      sub: analyticsData.value.data.revenueGrowthChange
    },
    {
      label: 'Active Users',
      value: analyticsData.value.data.activeUsers,
      sub: analyticsData.value.data.activeUsersChange
    },
    {
      label: 'Booking Rate',
      value: analyticsData.value.data.bookingRate,
      sub: analyticsData.value.data.bookingRateChange
    },
    {
      label: 'Satisfaction',
      value: analyticsData.value.data.satisfaction,
      sub: analyticsData.value.data.satisfactionChange
    }
  ]
})

// Service Performance (byService)
const servicePerformance = computed(() => {
  if (!analyticsData.value?.data?.byService) return []
  // Map careType to icon and color
  const iconMap = {
    'Elderly Care': { icon: 'mdi:heart', color: 'text-red-500' },
    'Medical Care': { icon: 'mdi:medical-bag', color: 'text-blue-500' },
    'Companionship': { icon: 'mdi:account-group', color: 'text-green-500' }
  }
  return analyticsData.value.data.byService.map(s => ({
    ...s,
    ...iconMap[s.service] || { icon: 'mdi:help', color: 'text-gray-500' }
  }))
})

// Geographic Distribution (byCity)
const geoDistribution = computed(() => analyticsData.value?.data?.byCity || [])

// Peak Hours
const peakHours = computed(() => analyticsData.value?.data?.peakHours || [])

// Performance Metrics (completion rate, etc.)
const performanceMetrics = computed(() => {
  if (!analyticsData.value?.data) return []
  const overview = analyticsData.value.data.overview
  return [
    {
      name: 'Booking Completion Rate',
      description: 'Percentage of bookings completed successfully',
      current: `${overview.completionRate || 0}%`,
      previous: '-',
      change: '-',
      target: '95%',
      icon: 'mdi:check-circle'
    },
    {
      name: 'Average Bookings/Day',
      description: 'Average number of bookings per day',
      current: overview.avgBookingsPerDay,
      previous: '-',
      change: '-',
      target: '-',
      icon: 'mdi:calendar'
    },
    {
      name: 'Total Clients',
      description: 'Number of unique clients',
      current: overview.totalClients,
      previous: '-',
      change: '-',
      target: '-',
      icon: 'mdi:account'
    },
    {
      name: 'Total Carers',
      description: 'Number of unique carers',
      current: overview.totalCarers,
      previous: '-',
      change: '-',
      target: '-',
      icon: 'mdi:account-group'
    }
  ]
})

// Methods
const exportAnalytics = () => {
  // Implement analytics export functionality
  console.log('Exporting analytics report for period:', selectedPeriod.value)
}

// Watch for period changes
watch(selectedPeriod, (newPeriod) => {
  // Here you would typically fetch new data based on the selected period
  console.log('Period changed to:', newPeriod)
  // Update charts and metrics based on new period
})
</script> 