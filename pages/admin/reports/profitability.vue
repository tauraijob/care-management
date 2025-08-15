<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Profitability Analysis</h1>
          <p class="text-sm text-gray-600 mt-1">Comprehensive profitability insights and financial performance</p>
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

    <!-- Profitability Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:chart-line" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Net Profit</dt>
                <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.netProfit?.amount || 0) }}</dd>
                <dd class="text-sm" :class="stats?.netProfit?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.netProfit?.changeText || '0% vs last year' }}
                </dd>
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
                <Icon name="mdi:percent" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Profit Margin</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.profitMargin?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.profitMargin?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.profitMargin?.changeText || '0% vs last year' }}
                </dd>
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
                <Icon name="mdi:trending-up" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Revenue Growth</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.revenueGrowth?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.revenueGrowth?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.revenueGrowth?.changeText || '0% vs target' }}
                </dd>
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
                <Icon name="mdi:account-group" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">ROI</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.roi?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.roi?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.roi?.changeText || '0% vs last year' }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profitability Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Profit Trend -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Profit Trend</h3>
          <p class="text-sm text-gray-500 mt-1">Monthly profit trends over time</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Profit trend</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profit by Service -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Profit by Service</h3>
          <p class="text-sm text-gray-500 mt-1">Profitability by service category</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-bar" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Profit by service</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <!-- Profitable Services -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Most Profitable Services</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="service in stats?.profitableServices || []" :key="service.name" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
                <p class="text-xs text-gray-500">{{ service.category }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ service.margin }}%</p>
                <p class="text-xs text-gray-500">{{ formatCurrency(service.profit) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cost Analysis -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Cost Analysis</h3>
          <p class="text-sm text-gray-500 mt-1">Breakdown of costs and expenses</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="cost in stats?.costAnalysis || []" :key="cost.category" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ cost.category }}</p>
                <p class="text-xs text-gray-500">{{ cost.description }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ formatCurrency(cost.amount) }}</p>
                <p class="text-xs text-gray-500">{{ cost.percentage }}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Monthly Comparison -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Monthly Comparison</h3>
          <p class="text-sm text-gray-500 mt-1">Profit comparison by month</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="month in stats?.monthlyProfit || []" :key="month.month" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-900">{{ month.month }}</p>
                <p class="text-xs text-gray-500">{{ formatCurrency(month.revenue) }} revenue</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">{{ formatCurrency(month.profit) }}</p>
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

// Fetch profitability data
const { data: statsData, error } = await useFetch('/api/admin/reports/profitability', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const stats = computed(() => statsData.value?.data || {})

const formatCurrency = (amount) => {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const exportReport = () => {
  console.log('Exporting profitability report...')
}

// Set page title
useHead({
  title: 'Profitability Analysis - Admin Reports'
})
</script> 