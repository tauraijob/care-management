<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Performance Metrics</h1>
          <p class="text-sm text-gray-600 mt-1">Track booking and carer performance metrics</p>
        </div>
        <NuxtLink to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
          Back to Bookings
        </NuxtLink>
      </div>
    </div>

    <div v-if="loading" class="text-center py-10 text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center py-10 text-red-500">{{ error }}</div>
    <template v-else>
      <!-- Performance Overview -->
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
                  <dt class="text-sm font-medium text-gray-500 truncate">Completion Rate</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ completionRate }}%</dd>
                  <dd class="text-sm text-green-600">Compared to last month</dd>
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
                  <Icon name="mdi:clock" class="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Avg Response Time</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ avgResponseTime }}h</dd>
                  <dd class="text-sm text-green-600">Compared to last month</dd>
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
                  <dt class="text-sm font-medium text-gray-500 truncate">Client Satisfaction</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ clientSatisfaction }}/5</dd>
                  <dd class="text-sm text-green-600">Compared to last month</dd>
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
                  <dt class="text-sm font-medium text-gray-500 truncate">Carer Utilization</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ carerUtilization }}%</dd>
                  <dd class="text-sm text-green-600">Compared to last month</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Charts -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Carer Performance -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Carer Performance</h3>
            <p class="text-sm text-gray-500 mt-1">Top performing carers by completion rate</p>
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
        <!-- Service Performance -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Service Performance</h3>
            <p class="text-sm text-gray-500 mt-1">Performance metrics by service type</p>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="service in servicePerformance" :key="service.name" class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ service.name }}</p>
                  <p class="text-xs text-gray-500">{{ service.category }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-900">{{ service.completionRate }}%</p>
                  <p class="text-xs text-gray-500">{{ service.avgRating }}/5 rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Metrics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Monthly Trends -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Monthly Trends</h3>
            <p class="text-sm text-gray-500 mt-1">Performance trends over time</p>
          </div>
          <div class="p-6">
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div class="text-center">
                <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
                <p class="text-gray-500">Chart placeholder - Monthly performance trends</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Response Time Analysis -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Response Time Analysis</h3>
            <p class="text-sm text-gray-500 mt-1">Average response times by carer</p>
          </div>
          <div class="p-6">
            <div class="space-y-3">
              <div v-for="carer in responseTimes" :key="carer.id" class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <span class="text-xs font-medium text-gray-700">{{ carer.initials }}</span>
                  </div>
                  <span class="ml-2 text-sm text-gray-900">{{ carer.name }}</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ carer.avgResponseTime }}h</span>
              </div>
            </div>
          </div>
        </div>
        <!-- Quality Metrics -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Quality Metrics</h3>
            <p class="text-sm text-gray-500 mt-1">Client satisfaction and quality scores</p>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-900">Overall Satisfaction</span>
                <span class="text-sm font-medium text-gray-900">{{ clientSatisfaction }}/5</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-900">Service Quality</span>
                <span class="text-sm font-medium text-gray-900">4.7/5</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-900">Communication</span>
                <span class="text-sm font-medium text-gray-900">4.9/5</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-900">Punctuality</span>
                <span class="text-sm font-medium text-gray-900">4.6/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin'
})

const { user } = useAuth()

const performanceData = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await $fetch('/api/admin/bookings/performance', {
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      }
    })
    performanceData.value = res.data
  } catch (e) {
    error.value = 'Failed to load performance data'
  } finally {
    loading.value = false
  }
})

const topCarers = computed(() => performanceData.value?.topCarers || [])
const servicePerformance = computed(() => performanceData.value?.servicePerformance || [])
const responseTimes = computed(() => performanceData.value?.responseTimes || [])
const completionRate = computed(() => performanceData.value?.completionRate || '0.0')
const avgResponseTime = computed(() => performanceData.value?.avgResponseTime || '0.0')
const clientSatisfaction = computed(() => performanceData.value?.clientSatisfaction || '0.0')
const carerUtilization = computed(() => performanceData.value?.carerUtilization || '0.0')

// Set page title
useHead({
  title: 'Performance Metrics - Admin Dashboard'
})
</script> 