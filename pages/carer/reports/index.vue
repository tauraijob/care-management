<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="bg-lucerna-primary rounded-2xl p-8 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold mb-2">Carer Reports</h1>
              <p class="text-white text-lg">Track your performance, hours, and patient care activities</p>
              <div class="flex items-center mt-4 space-x-6">
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:chart-line" class="text-lg text-white" />
                  <span class="text-sm text-white">{{ totalHours }} hours this month</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:account-group" class="text-lg text-white" />
                  <span class="text-sm text-white">{{ totalPatients }} patients cared for</span>
                </div>
              </div>
            </div>
            <div class="hidden lg:block">
              <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="mdi:chart-bar" class="text-white text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Report Filters -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div class="flex flex-wrap items-center gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select v-model="selectedDateRange" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select v-model="selectedReportType" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="overview">Overview</option>
              <option value="hours">Work Hours</option>
              <option value="patients">Patient Care</option>
              <option value="earnings">Earnings</option>
              <option value="performance">Performance</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
            <select v-model="exportFormat" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          <div class="flex items-end">
            <button @click="generateReport" class="btn-primary text-white">
              <Icon name="mdi:download" class="mr-2 text-white" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Hours</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalHours }}</p>
              <p class="text-xs text-green-600 mt-2">+12% from last month</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:clock" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Patients Cared</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalPatients }}</p>
              <p class="text-xs text-blue-600 mt-2">{{ activePatients }} currently active</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:account-heart" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Earnings</p>
                              <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(totalEarnings) }}</p>
              <p class="text-xs text-purple-600 mt-2">+8% from last month</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:currency-usd" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Rating</p>
              <p class="text-2xl font-bold text-gray-900">{{ averageRating }}/5</p>
              <p class="text-xs text-orange-600 mt-2">{{ totalReviews }} reviews</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:star" class="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Report Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Work Hours Chart -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Work Hours Trend</h2>
            <div class="flex space-x-2">
              <button 
                v-for="period in ['week', 'month', 'quarter']" 
                :key="period"
                @click="selectedPeriod = period"
                :class="[
                  selectedPeriod === period 
                    ? 'bg-[#0034b3] text-white' 
                    : 'bg-gray-100 text-gray-600',
                  'px-3 py-1 rounded-lg text-sm font-medium transition-colors'
                ]"
              >
                {{ period.charAt(0).toUpperCase() + period.slice(1) }}
              </button>
            </div>
          </div>
          
          <!-- Chart Placeholder -->
          <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <Icon name="mdi:chart-line" class="text-4xl text-gray-400 mx-auto mb-2" />
              <p class="text-gray-500">Work hours chart will be displayed here</p>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="activity.color">
                <Icon :name="activity.icon" class="text-white text-sm" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Patient Care Logs -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900">Patient Care Logs</h2>
          <button @click="exportCareLogs" class="btn-secondary">
            <Icon name="mdi:download" class="mr-2" />
            Export Logs
          </button>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="log in careLogs" :key="log.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <span class="text-sm font-medium text-green-800">{{ log.patientInitials }}</span>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ log.patientName }}</div>
                      <div class="text-sm text-gray-500">{{ log.patientAge }} years</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ log.duration }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-wrap gap-1">
                    <span v-for="service in log.services" :key="service" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ service }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="[
                    log.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    log.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800',
                    'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
                  ]">
                    {{ log.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="viewLogDetails(log.id)" class="text-green-600 hover:text-green-900 mr-3">
                    View
                  </button>
                  <button @click="editLog(log.id)" class="text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
          <div class="space-y-4">
            <div v-for="metric in performanceMetrics" :key="metric.name" class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-700">{{ metric.name }}</p>
                <p class="text-xs text-gray-500">{{ metric.description }}</p>
              </div>
              <div class="text-right">
                <p class="text-lg font-bold text-gray-900">{{ metric.value }}</p>
                <p class="text-xs" :class="metric.trend > 0 ? 'text-green-600' : 'text-red-600'">
                  {{ metric.trend > 0 ? '+' : '' }}{{ metric.trend }}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Earnings Breakdown</h2>
          <div class="space-y-4">
            <div v-for="earning in earningsBreakdown" :key="earning.category" class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full mr-3" :style="{ backgroundColor: earning.color }"></div>
                <span class="text-sm font-medium text-gray-700">{{ earning.category }}</span>
              </div>
              <div class="text-right">
                <p class="text-sm font-bold text-gray-900">{{ formatCurrency(earning.amount) }}</p>
                <p class="text-xs text-gray-500">{{ earning.percentage }}%</p>
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
  layout: 'carer'
})

const { user } = useAuth()

// Reactive data
const selectedDateRange = ref('30')
const selectedReportType = ref('overview')
const exportFormat = ref('pdf')
const selectedPeriod = ref('month')

// Reactive API data containers
const totalHours = ref(0)
const totalPatients = ref(0)
const activePatients = ref(0)
const totalEarnings = ref(0)
const averageRating = ref(0)
const totalReviews = ref(0)
const recentActivities = ref([])
const careLogs = ref([])
const performanceMetrics = ref([])
const earningsBreakdown = ref([])

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

// Methods
const generateReport = async () => {
  try {
    const res = await $fetch('/api/carer/reports/download', {
      method: 'POST',
      body: { days: selectedDateRange.value, format: exportFormat.value, scope: 'report' },
      responseType: 'arrayBuffer',
      credentials: 'include'
    })
    const blob = new Blob([res], { type: exportFormat.value === 'pdf' ? 'application/pdf' : 'text/csv;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = exportFormat.value === 'pdf' ? `carer-report-${new Date().toISOString().split('T')[0]}.pdf` : `carer-report-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to download report:', error)
  }
}

const exportCareLogs = async () => {
  try {
    const res = await $fetch('/api/carer/reports/download', {
      method: 'POST',
      body: { days: selectedDateRange.value, format: exportFormat.value, scope: 'logs' },
      responseType: 'arrayBuffer',
      credentials: 'include'
    })
    const blob = new Blob([res], { type: exportFormat.value === 'pdf' ? 'application/pdf' : 'text/csv;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = exportFormat.value === 'pdf' ? `carer-logs-${new Date().toISOString().split('T')[0]}.pdf` : `carer-logs-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export logs:', error)
  }
}

const viewLogDetails = (logId) => {
  // Implementation for viewing log details
  console.log('Viewing log details for:', logId)
  // Navigate to log details page or show modal
}

const editLog = (logId) => {
  // Implementation for editing log
  console.log('Editing log:', logId)
  // Navigate to edit page or show edit modal
}

// Fetch data on component mount
const loadReports = async () => {
  try {
    const { data, error } = await useFetch('/api/carer/reports', {
      query: { days: selectedDateRange.value },
      credentials: 'include',
      key: `carer-reports-${selectedDateRange.value}`
    })
    if (error.value) throw error.value
    const d = data.value?.data
    if (!d) return
    totalHours.value = d.totalHours || 0
    totalPatients.value = d.totalPatients || 0
    activePatients.value = d.activePatients || 0
    totalEarnings.value = d.totalEarnings || 0
    averageRating.value = d.averageRating || 0
    totalReviews.value = d.totalReviews || 0
    recentActivities.value = d.recentActivities || []
    careLogs.value = d.careLogs || []
    performanceMetrics.value = d.performanceMetrics || []
    earningsBreakdown.value = d.earningsBreakdown || []
  } catch (error) {
    console.error('Failed to fetch reports data:', error)
  }
}

watch(selectedDateRange, () => {
  loadReports()
})

onMounted(async () => {
  await loadReports()
})
</script> 