<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold mb-2">Carer Reports</h1>
              <p class="text-green-100 text-lg">Track your performance, hours, and patient care activities</p>
              <div class="flex items-center mt-4 space-x-6">
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:chart-line" class="text-lg" />
                  <span class="text-sm">{{ totalHours }} hours this month</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:account-group" class="text-lg" />
                  <span class="text-sm">{{ totalPatients }} patients cared for</span>
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
            <button @click="generateReport" class="btn-primary">
              <Icon name="mdi:download" class="mr-2" />
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
                    ? 'bg-green-600 text-white' 
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

// Mock data
const totalHours = ref(156)
const totalPatients = ref(12)
const activePatients = ref(8)
const totalEarnings = ref('24,500')
const averageRating = ref(4.8)
const totalReviews = ref(47)

const recentActivities = ref([
  {
    id: 1,
    title: 'Completed care session with Sarah Johnson',
    time: '2 hours ago',
    icon: 'mdi:account-heart',
    color: 'bg-green-500'
  },
  {
    id: 2,
    title: 'Updated medication log for Robert Smith',
    time: '4 hours ago',
    icon: 'mdi:pill',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'Submitted weekly report',
    time: '1 day ago',
    icon: 'mdi:file-document',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'Completed training module',
    time: '2 days ago',
    icon: 'mdi:school',
    color: 'bg-orange-500'
  }
])

const careLogs = ref([
  {
    id: 1,
    patientName: 'Sarah Johnson',
    patientInitials: 'SJ',
    patientAge: 72,
    date: '2024-01-15',
    duration: '4 hours',
    services: ['Personal Care', 'Medication'],
    status: 'Completed'
  },
  {
    id: 2,
    patientName: 'Robert Smith',
    patientInitials: 'RS',
    patientAge: 68,
    date: '2024-01-14',
    duration: '6 hours',
    services: ['Personal Care', 'Meal Prep', 'Exercise'],
    status: 'Completed'
  },
  {
    id: 3,
    patientName: 'Mary Williams',
    patientInitials: 'MW',
    patientAge: 75,
    date: '2024-01-13',
    duration: '3 hours',
    services: ['Personal Care'],
    status: 'In Progress'
  }
])

const performanceMetrics = ref([
  {
    name: 'Patient Satisfaction',
    description: 'Average rating from patients',
    value: '4.8/5',
    trend: 5
  },
  {
    name: 'On-time Arrival',
    description: 'Percentage of on-time arrivals',
    value: '98%',
    trend: 2
  },
  {
    name: 'Care Plan Adherence',
    description: 'Following prescribed care plans',
    value: '95%',
    trend: 3
  },
  {
    name: 'Documentation Quality',
    description: 'Quality of care documentation',
    value: '92%',
    trend: -1
  }
])

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const earningsBreakdown = ref([
  {
    category: 'Personal Care',
    amount: 12800,
    percentage: 52,
    color: '#10B981'
  },
  {
    category: 'Medication Management',
    amount: '6,200',
    percentage: 25,
    color: '#3B82F6'
  },
  {
    category: 'Meal Preparation',
    amount: '3,500',
    percentage: 14,
    color: '#8B5CF6'
  },
  {
    category: 'Exercise Support',
    amount: '2,000',
    percentage: 9,
    color: '#F59E0B'
  }
])

// Methods
const generateReport = () => {
  // Implementation for generating reports
  console.log('Generating report:', {
    dateRange: selectedDateRange.value,
    reportType: selectedReportType.value,
    format: exportFormat.value
  })
  
  // Show success message
  alert(`Report generated successfully in ${exportFormat.value.toUpperCase()} format`)
}

const exportCareLogs = () => {
  // Implementation for exporting care logs
  console.log('Exporting care logs')
  alert('Care logs exported successfully')
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
onMounted(async () => {
  // Fetch reports data from API
  try {
    // const response = await $fetch('/api/carer/reports', {
    //   headers: {
    //     'Authorization': `Bearer ${useCookie('auth-token').value}`
    //   }
    // })
    // Update reactive data with API response
  } catch (error) {
    console.error('Failed to fetch reports data:', error)
  }
})
</script> 