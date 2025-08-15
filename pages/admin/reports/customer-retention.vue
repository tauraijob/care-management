<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Customer Retention</h1>
          <p class="text-sm text-gray-600 mt-1">Customer retention metrics and loyalty analysis</p>
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

    <!-- Retention Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:account-multiple" class="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Retention Rate</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.retentionRate?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.retentionRate?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.retentionRate?.changeText || '0% vs last month' }}
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
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:account-group" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Customers</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.activeCustomers?.count?.toLocaleString() || 0 }}</dd>
                <dd class="text-sm" :class="stats?.activeCustomers?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.activeCustomers?.changeText || '0 this month' }}
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
                <Icon name="mdi:calendar" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg Lifetime</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.avgLifetime?.months || 0 }} months</dd>
                <dd class="text-sm" :class="stats?.avgLifetime?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.avgLifetime?.changeText || '0 months' }}
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
                <Icon name="mdi:currency-usd" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">LTV</dt>
                <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.ltv?.amount || 0) }}</dd>
                <dd class="text-sm" :class="stats?.ltv?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.ltv?.changeText || '0% vs last month' }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Retention Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Retention Trend -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Retention Trend</h3>
          <p class="text-sm text-gray-500 mt-1">Monthly retention rates over time</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Retention trend</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Segments -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Customer Segments</h3>
          <p class="text-sm text-gray-500 mt-1">Retention by customer segment</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-pie" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Customer segments</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Details -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Customer Retention Details</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bookings</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Booking</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LTV</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in stats?.customerRetention || []" :key="customer.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ customer.name }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(customer.joinDate) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ customer.totalBookings }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ customer.lastBooking ? formatDate(customer.lastBooking) : 'N/A' }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(customer.status)">
                  {{ customer.status }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(customer.ltv) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { user } = useAuth()

// Fetch customer retention data
const { data: statsData, error } = await useFetch('/api/admin/reports/customer-retention', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const stats = computed(() => statsData.value?.data || {})

const formatCurrency = (amount) => {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const getStatusClasses = (status) => {
  const classes = {
    'Active': 'bg-green-100 text-green-800',
    'At Risk': 'bg-yellow-100 text-yellow-800',
    'Churned': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const exportReport = () => {
  console.log('Exporting customer retention report...')
}

// Set page title
useHead({
  title: 'Customer Retention - Admin Reports'
})
</script> 