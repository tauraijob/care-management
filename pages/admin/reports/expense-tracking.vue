<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Expense Tracking</h1>
          <p class="text-sm text-gray-600 mt-1">Monitor and analyze operational expenses</p>
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

    <!-- Expense Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:trending-down" class="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.totalExpenses?.amount || 0) }}</dd>
                <dd class="text-sm" :class="stats?.totalExpenses?.change >= 0 ? 'text-red-600' : 'text-green-600'">
                  {{ stats?.totalExpenses?.changeText || '0% vs last year' }}
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
                <Icon name="mdi:account-group" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Carer Salaries</dt>
                <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.carerSalaries?.amount || 0) }}</dd>
                <dd class="text-sm" :class="stats?.carerSalaries?.change >= 0 ? 'text-red-600' : 'text-green-600'">
                  {{ stats?.carerSalaries?.changeText || '0% vs last year' }}
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
                <Icon name="mdi:medical-bag" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Supplies & Equipment</dt>
                <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.suppliesEquipment?.amount || 0) }}</dd>
                <dd class="text-sm" :class="stats?.suppliesEquipment?.change >= 0 ? 'text-red-600' : 'text-green-600'">
                  {{ stats?.suppliesEquipment?.changeText || '0% vs last year' }}
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
                <Icon name="mdi:office-building" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Administrative</dt>
                <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.administrative?.amount || 0) }}</dd>
                <dd class="text-sm" :class="stats?.administrative?.change >= 0 ? 'text-red-600' : 'text-green-600'">
                  {{ stats?.administrative?.changeText || '0% vs last year' }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expense Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Expense Trend -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Expense Trend</h3>
          <p class="text-sm text-gray-500 mt-1">Monthly expense trends over time</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Expense trend</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Expense Breakdown -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Expense Breakdown</h3>
          <p class="text-sm text-gray-500 mt-1">Distribution of expenses by category</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-pie" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Expense breakdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Expense Details -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Expense Details</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="expense in stats?.expenses || []" :key="expense.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getCategoryClasses(expense.category)">
                  {{ expense.category }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ expense.description }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(expense.amount) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(expense.date) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(expense.status)">
                  {{ expense.status }}
                </span>
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

// Fetch expense tracking data
const { data: statsData, error } = await useFetch('/api/admin/reports/expense-tracking', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const stats = computed(() => statsData.value?.data || {})

const formatCurrency = (amount) => {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const getCategoryClasses = (category) => {
  const classes = {
    'Salaries': 'bg-blue-100 text-blue-800',
    'Supplies': 'bg-yellow-100 text-yellow-800',
    'Administrative': 'bg-purple-100 text-purple-800',
    'Training': 'bg-green-100 text-green-800',
    'Technology': 'bg-indigo-100 text-indigo-800',
    'Insurance': 'bg-pink-100 text-pink-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const getStatusClasses = (status) => {
  const classes = {
    'Paid': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Overdue': 'bg-red-100 text-red-800'
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
  console.log('Exporting expense tracking report...')
}

// Set page title
useHead({
  title: 'Expense Tracking - Admin Reports'
})
</script> 