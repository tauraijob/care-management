<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Carer Performance</h1>
          <p class="text-sm text-gray-600 mt-1">Comprehensive carer performance metrics and insights</p>
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

    <!-- Performance Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:stethoscope" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Carers</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.activeCarers?.count || 0 }}</dd>
                <dd class="text-sm" :class="stats?.activeCarers?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.activeCarers?.changeText || '0 this month' }}
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
                <Icon name="mdi:star" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg Rating</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.avgRating?.rating || 0 }}/5</dd>
                <dd class="text-sm" :class="stats?.avgRating?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.avgRating?.changeText || '0 vs last month' }}
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
                <Icon name="mdi:check-circle" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Completion Rate</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.completionRate?.percentage || 0 }}%</dd>
                <dd class="text-sm" :class="stats?.completionRate?.change >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.completionRate?.changeText || '0% vs last month' }}
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
                <Icon name="mdi:clock" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg Response Time</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.avgResponseTime?.hours || 0 }}h</dd>
                <dd class="text-sm" :class="stats?.avgResponseTime?.change <= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ stats?.avgResponseTime?.changeText || '0h vs last month' }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Performance Trend -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Performance Trend</h3>
          <p class="text-sm text-gray-500 mt-1">Monthly performance metrics over time</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Performance trend</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance by Specialty -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Performance by Specialty</h3>
          <p class="text-sm text-gray-500 mt-1">Average ratings by carer specialty</p>
        </div>
        <div class="p-6">
          <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div class="text-center">
              <Icon name="mdi:chart-bar" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Chart placeholder - Performance by specialty</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Performers -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Top Performing Carers</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carer</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion Rate</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Response Time</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="carer in stats?.topCarers || []" :key="carer.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span class="text-xs font-medium text-gray-700">{{ carer.initials }}</span>
                  </div>
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ carer.name }}</div>
                    <div class="text-sm text-gray-500">{{ carer.experience }} years</div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ carer.specialty }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <Icon name="mdi:star" class="h-4 w-4 text-yellow-400 mr-1" />
                  <span class="text-sm font-medium text-gray-900">{{ carer.rating }}</span>
                </div>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ carer.bookings }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ carer.completionRate }}%
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ carer.responseTime }}
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

// Fetch carer performance data
const { data: statsData, error } = await useFetch('/api/admin/reports/carer-performance', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const stats = computed(() => statsData.value?.data || {})

const exportReport = () => {
  console.log('Exporting carer performance report...')
}

// Set page title
useHead({
  title: 'Carer Performance - Admin Reports'
})
</script> 