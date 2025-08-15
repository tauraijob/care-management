<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Satisfaction Scores</h1>
          <p class="text-sm text-gray-600 mt-1">Customer satisfaction metrics and feedback analysis</p>
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

    <!-- Satisfaction Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <dt class="text-sm font-medium text-gray-500 truncate">Overall Rating</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.overallRating?.rating || 0 }}/5</dd>
                <dd class="text-sm" :class="stats?.overallRating?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.overallRating?.changeText || '0 vs last month' }}
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
                <dt class="text-sm font-medium text-gray-500 truncate">Total Reviews</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.totalReviews?.count?.toLocaleString() || 0 }}</dd>
                <dd class="text-sm" :class="stats?.totalReviews?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.totalReviews?.changeText || '0 this month' }}
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
                <Icon name="mdi:thumb-up" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Satisfied Customers</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.satisfiedCustomers?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.satisfiedCustomers?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.satisfiedCustomers?.changeText || '0% vs last month' }}
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
                <Icon name="mdi:trending-up" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">NPS Score</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.npsScore?.score || 0 }}</dd>
                <dd class="text-sm" :class="stats?.npsScore?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.npsScore?.changeText || '0 vs last month' }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Satisfaction Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Rating Distribution -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Rating Distribution</h3>
          <p class="text-sm text-gray-500 mt-1">Distribution of customer ratings</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-bar" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Rating distribution</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Satisfaction Trend -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Satisfaction Trend</h3>
          <p class="text-sm text-gray-500 mt-1">Average ratings over time</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Satisfaction trend</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating Details -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Recent Reviews</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="review in stats?.recentReviews || []" :key="review.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ review.customer }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ review.service }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Icon name="mdi:star" class="h-4 w-4 text-yellow-400 mr-1" />
                  <span class="text-sm font-medium text-gray-900">{{ review.rating }}</span>
                </div>
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <div class="max-w-xs truncate">{{ review.comment }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(review.date) }}
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

// Fetch satisfaction scores data
const { data: statsData, error } = await useFetch('/api/admin/reports/satisfaction-scores', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const stats = computed(() => statsData.value?.data || {})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const exportReport = () => {
  console.log('Exporting satisfaction scores report...')
}

// Set page title
useHead({
  title: 'Satisfaction Scores - Admin Reports'
})
</script> 