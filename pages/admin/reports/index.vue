<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
          <p class="text-sm text-gray-600 mt-1">Comprehensive reporting and analytics for your healthcare platform</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportAllReports" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export All
          </button>
          <NuxtLink to="/admin/dashboard" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
            Back to Dashboard
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Reports Overview Stats -->
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
                <dt class="text-sm font-medium text-gray-500 truncate">Total Reports</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.totalReports?.count || 0 }}</dd>
                <dd class="text-sm" :class="stats?.totalReports?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.totalReports?.changeText || '0 this month' }}
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
                <Icon name="mdi:currency-usd" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.revenue?.amount || 0) }}</dd>
                <dd class="text-sm" :class="stats?.revenue?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.revenue?.changeText || '0% this month' }}
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
                <Icon name="mdi:star" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg Rating</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.averageRating?.rating || 0 }}/5</dd>
                <dd class="text-sm" :class="stats?.averageRating?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.averageRating?.changeText || '0 this month' }}
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
                <dt class="text-sm font-medium text-gray-500 truncate">Active Clients</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.activeClients?.count || 0 }}</dd>
                <dd class="text-sm" :class="stats?.activeClients?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.activeClients?.changeText || '0 this month' }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reports Categories -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Financial Reports -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Financial Reports</h3>
          <p class="text-sm text-gray-500 mt-1">Revenue, expenses, and financial analytics</p>
        </div>
        <div class="p-6 space-y-4">
          <NuxtLink to="/admin/reports/revenue-analysis" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:trending-up" class="h-5 w-5 text-green-600" />
              <span class="text-sm font-medium text-gray-900">Revenue Analysis</span>
            </div>
            <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
          
          <NuxtLink to="/admin/reports/expense-tracking" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:trending-down" class="h-5 w-5 text-red-600" />
              <span class="text-sm font-medium text-gray-900">Expense Tracking</span>
            </div>
            <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
          
          <NuxtLink to="/admin/reports/profitability" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:chart-line" class="h-5 w-5 text-blue-600" />
              <span class="text-sm font-medium text-gray-900">Profitability</span>
            </div>
            <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
        </div>
      </div>

      <!-- Operational Reports -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Operational Reports</h3>
          <p class="text-sm text-gray-500 mt-1">Service delivery and operational metrics</p>
        </div>
        <div class="p-6 space-y-4">
          <NuxtLink to="/admin/reports/booking-analytics" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:calendar" class="h-5 w-5 text-blue-600" />
              <span class="text-sm font-medium text-gray-900">Booking Analytics</span>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-green-600 font-medium">PDF Export</span>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </div>
          </NuxtLink>
          
          <NuxtLink to="/admin/reports/carer-performance" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:stethoscope" class="h-5 w-5 text-green-600" />
              <span class="text-sm font-medium text-gray-900">Carer Performance</span>
            </div>
            <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
          
          <NuxtLink to="/admin/reports/service-utilization" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:medical-bag" class="h-5 w-5 text-purple-600" />
              <span class="text-sm font-medium text-gray-900">Service Utilization</span>
            </div>
            <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
        </div>
      </div>

      <!-- Customer Reports -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Customer Reports</h3>
          <p class="text-sm text-gray-500 mt-1">Customer insights and satisfaction metrics</p>
        </div>
        <div class="p-6 space-y-4">
          <NuxtLink to="/admin/reports/satisfaction-scores" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:star" class="h-5 w-5 text-yellow-600" />
              <span class="text-sm font-medium text-gray-900">Satisfaction Scores</span>
            </div>
            <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
          
          <NuxtLink to="/admin/reports/customer-retention" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:account-multiple" class="h-5 w-5 text-red-600" />
              <span class="text-sm font-medium text-gray-900">Customer Retention</span>
            </div>
            <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
          
          <NuxtLink to="/admin/reports/feedback-analysis" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div class="flex items-center space-x-3">
              <Icon name="mdi:message-text" class="h-5 w-5 text-blue-600" />
              <span class="text-sm font-medium text-gray-900">Feedback Analysis</span>
            </div>
            <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
          </NuxtLink>
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

// Fetch dashboard statistics
const { data: statsData, error } = await useFetch('/api/admin/reports/dashboard-stats', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const stats = computed(() => statsData.value?.data || {})

const formatCurrency = (amount) => {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const exportAllReports = () => {
  console.log('Exporting all reports...')
}

// Set page title
useHead({
  title: 'Reports Dashboard - Admin Dashboard'
})
</script> 