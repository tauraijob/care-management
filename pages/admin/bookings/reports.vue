<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Reports</h1>
          <p class="text-sm text-gray-600 mt-1">Generate and view comprehensive booking reports</p>
        </div>
        <NuxtLink to="/admin/bookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
          Back to Bookings
        </NuxtLink>
      </div>
    </div>

    <!-- Report Generation -->
    <div class="bg-white shadow rounded-lg mb-8">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Generate New Report</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Report Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select v-model="reportForm.type" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900">
              <option value="">Select report type</option>
              <option value="booking-summary">Booking Summary</option>
              <option value="carer-performance">Carer Performance</option>
              <option value="revenue-analysis">Revenue Analysis</option>
              <option value="service-breakdown">Service Breakdown</option>
              <option value="client-activity">Client Activity</option>
            </select>
          </div>
          
          <!-- Date Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input v-model="reportForm.fromDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input v-model="reportForm.toDate" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900">
          </div>
        </div>
        
        <div class="mt-6 flex justify-end">
          <button @click="generateReport" :disabled="!reportForm.type" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50">
            <Icon name="mdi:file-chart" class="mr-2 h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Recent Reports</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Report Name</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Type</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Date Range</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Generated</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Status</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="report in reports" :key="report.id" class="hover:bg-gray-50">
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ report.name }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ report.type }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ report.dateRange }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(report.generatedAt) }}
              </td>
              <td class="px-4 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getStatusClasses(report.status)">
                  {{ report.status }}
                </span>
              </td>
              <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-1">
                  <button @click="downloadReport(report)" class="p-1 text-green-600 hover:text-green-900 hover:bg-green-50 rounded" title="Download">
                    <Icon name="mdi:download" class="h-4 w-4" />
                  </button>
                  <button @click="viewReport(report)" class="p-1 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded" title="View">
                    <Icon name="mdi:eye" class="h-4 w-4" />
                  </button>
                  <button @click="deleteReport(report)" class="p-1 text-red-600 hover:text-red-900 hover:bg-red-50 rounded" title="Delete">
                    <Icon name="mdi:delete" class="h-4 w-4" />
                  </button>
                </div>
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

// Report form
const reportForm = ref({
  type: '',
  fromDate: '',
  toDate: ''
})

// Fetch real reports data
const { data: reportsData } = await useFetch('/api/admin/reports/list', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const reports = computed(() => {
  if (!reportsData.value?.data?.reports) return []
  return reportsData.value.data.reports.map(report => ({
    id: report.id,
    name: report.name,
    type: report.type.toLowerCase().replace(/_/g, '-'),
    dateRange: report.dateRange,
    generatedAt: report.generatedAt,
    status: report.status.toLowerCase()
  }))
})

// Methods
const getStatusClasses = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const generateReport = async () => {
  try {
    await $fetch('/api/admin/reports/generate', {
      method: 'POST',
      body: reportForm.value,
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      }
    })
    // Refresh reports list
    await refreshReports()
    reportForm.value = { type: '', fromDate: '', toDate: '' }
  } catch (e) {
    alert('Failed to generate report')
  }
}

const downloadReport = async (report) => {
  try {
    const res = await $fetch('/api/admin/reports/download', {
      method: 'GET',
      params: { id: report.id },
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      },
      responseType: 'blob'
    })
    
    // Create download link for PDF
    const blob = new Blob([res], { type: 'application/pdf' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${report.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
  } catch (e) {
    alert('Failed to download report')
  }
}

const viewReport = async (report) => {
  try {
    const res = await $fetch('/api/admin/reports/download', {
      method: 'GET',
      params: { id: report.id },
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      },
      responseType: 'blob'
    })
    
    // Open PDF in new tab
    const blob = new Blob([res], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    URL.revokeObjectURL(url)
  } catch (e) {
    alert('Failed to view report')
  }
}

const deleteReport = async (report) => {
  if (confirm(`Are you sure you want to delete the report "${report.name}"?`)) {
    try {
      await $fetch('/api/admin/reports/delete', {
        method: 'POST',
        body: { id: report.id },
        headers: {
          'Authorization': `Bearer ${useCookie('auth-token').value}`
        }
      })
      await refreshReports()
    } catch (e) {
      alert('Failed to delete report')
    }
  }
}

const refreshReports = async () => {
  await reportsData.refresh()
}

// Set page title
useHead({
  title: 'Reports - Admin Dashboard'
})
</script> 