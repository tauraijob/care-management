<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Feedback Analysis</h1>
          <p class="text-sm text-gray-600 mt-1">Customer feedback insights and sentiment analysis</p>
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

    <!-- Feedback Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:message-text" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Feedback</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.totalFeedback?.count || 0 }}</dd>
                <dd class="text-sm" :class="stats?.totalFeedback?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.totalFeedback?.changeText || '0 this month' }}
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
                <Icon name="mdi:emoticon-happy" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Positive Sentiment</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.positiveSentiment?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.positiveSentiment?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.positiveSentiment?.changeText || '0% vs last month' }}
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
                <Icon name="mdi:emoticon-neutral" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Neutral Sentiment</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.neutralSentiment?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.neutralSentiment?.change >= 0 ? 'text-yellow-600' : 'text-red-600'">
                  {{ stats?.neutralSentiment?.changeText || '0% vs last month' }}
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
              <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:emoticon-sad" class="h-5 w-5 text-red-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Negative Sentiment</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.negativeSentiment?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.negativeSentiment?.change >= 0 ? 'text-red-600' : 'text-green-600'">
                  {{ stats?.negativeSentiment?.changeText || '0% vs last month' }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Sentiment Trend -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Sentiment Trend</h3>
          <p class="text-sm text-gray-500 mt-1">Sentiment analysis over time</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Sentiment trend</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Feedback Categories -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Feedback Categories</h3>
          <p class="text-sm text-gray-500 mt-1">Feedback breakdown by category</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-pie" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Feedback categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback Details -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Recent Feedback</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="feedback in stats?.recentFeedback || []" :key="feedback.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ feedback.customer }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ feedback.category }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getSentimentClasses(feedback.sentiment)">
                  {{ feedback.sentiment }}
                </span>
              </td>
              <td class="px-4 py-4 text-sm text-gray-900">
                <div class="max-w-xs truncate">{{ feedback.message }}</div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(feedback.date) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(feedback.status)">
                  {{ feedback.status }}
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

// Fetch feedback analysis data
const { data: statsData, error } = await useFetch('/api/admin/reports/feedback-analysis', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const stats = computed(() => statsData.value?.data || {})

const getSentimentClasses = (sentiment) => {
  const classes = {
    'Positive': 'bg-green-100 text-green-800',
    'Neutral': 'bg-yellow-100 text-yellow-800',
    'Negative': 'bg-red-100 text-red-800'
  }
  return classes[sentiment] || 'bg-gray-100 text-gray-800'
}

const getStatusClasses = (status) => {
  const classes = {
    'Reviewed': 'bg-green-100 text-green-800',
    'In Progress': 'bg-yellow-100 text-yellow-800',
    'Pending': 'bg-red-100 text-red-800'
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
  console.log('Exporting feedback analysis report...')
}

// Set page title
useHead({
  title: 'Feedback Analysis - Admin Reports'
})
</script> 