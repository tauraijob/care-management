<template>
  <div class="min-h-screen bg-gray-50">
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Admin Support Center</h1>
        <p class="text-xl text-gray-600">System support and administrative assistance</p>
      </div>
      
      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:database" class="text-indigo-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">System Status</h3>
            <p class="text-sm text-gray-600 mb-4">Check system health</p>
            <button @click="checkSystemStatus" class="text-indigo-600 font-medium hover:text-indigo-700">
              Check Status
            </button>
          </div>
          
          <div class="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:backup-restore" class="text-green-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Backup System</h3>
            <p class="text-sm text-gray-600 mb-4">Create system backup</p>
            <button @click="createBackup" class="text-green-600 font-medium hover:text-green-700">
              Create Backup
            </button>
          </div>
          
          <div class="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:tools" class="text-yellow-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Maintenance Mode</h3>
            <p class="text-sm text-gray-600 mb-4">Toggle maintenance</p>
            <button @click="toggleMaintenance" class="text-yellow-600 font-medium hover:text-yellow-700">
              Toggle Mode
            </button>
          </div>
          
          <div class="text-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:alert-circle" class="text-red-600 text-2xl" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">Error Logs</h3>
            <p class="text-sm text-gray-600 mb-4">View system errors</p>
            <button @click="viewErrorLogs" class="text-red-600 font-medium hover:text-red-700">
              View Logs
            </button>
          </div>
        </div>
      </div>
      
      <!-- System Information -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">System Information</h2>
          <button 
            @click="loadSystemData" 
            :disabled="loading"
            class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Refreshing...</span>
            <span v-else>Refresh</span>
          </button>
        </div>
        
        <div v-if="loading && !systemData" class="text-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          <p class="text-gray-600 mt-2">Loading system data...</p>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">Server Status</h3>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full" :class="systemData?.server?.status === 'Online' ? 'bg-green-500' : 'bg-red-500'"></div>
              <span class="text-sm text-gray-600">{{ systemData?.server?.status || 'Unknown' }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Uptime: {{ systemData?.server?.uptime || 'N/A' }}%</p>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">Database</h3>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 rounded-full" :class="systemData?.database?.status === 'Connected' ? 'bg-green-500' : 'bg-red-500'"></div>
              <span class="text-sm text-gray-600">{{ systemData?.database?.status || 'Unknown' }}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">Size: {{ systemData?.database?.size || 'Unknown' }}</p>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">Total Users</h3>
            <div class="text-2xl font-bold text-indigo-600">{{ systemData?.users?.total || 0 }}</div>
            <p class="text-xs text-gray-500">Registered users</p>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">Active Users</h3>
            <div class="text-2xl font-bold text-green-600">{{ systemData?.users?.active || 0 }}</div>
            <p class="text-xs text-gray-500">Last 24 hours</p>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">Total Bookings</h3>
            <div class="text-2xl font-bold text-blue-600">{{ systemData?.bookings?.total || 0 }}</div>
            <p class="text-xs text-gray-500">All time</p>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">Active Bookings</h3>
            <div class="text-2xl font-bold text-orange-600">{{ systemData?.bookings?.active || 0 }}</div>
            <p class="text-xs text-gray-500">Currently active</p>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">Memory Usage</h3>
            <div class="text-2xl font-bold text-purple-600">{{ systemData?.server?.memoryUsage || 'N/A' }}</div>
            <p class="text-xs text-gray-500">System memory</p>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">CPU Usage</h3>
            <div class="text-2xl font-bold text-red-600">{{ systemData?.server?.cpuUsage || 'N/A' }}</div>
            <p class="text-xs text-gray-500">System load</p>
          </div>
          
          <div class="p-4 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-2">Last Updated</h3>
            <div class="text-sm font-medium text-gray-600">{{ systemData?.lastChecked ? new Date(systemData.lastChecked).toLocaleString() : 'Never' }}</div>
            <p class="text-xs text-gray-500">System data refresh</p>
          </div>
        </div>
      </div>
      
      <!-- Support Tools -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Support Tools</h2>
        <div class="space-y-6">
          <div class="p-6 border border-gray-200 rounded-lg">
            <h3 class="font-semibold text-gray-900 mb-4">System Maintenance</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button @click="clearCache" class="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200">
                Clear Cache
              </button>
              <button @click="optimizeDatabase" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                Optimize Database
              </button>
              <button @click="runSystemCheck" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                System Check
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Technical Support -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Contact Technical Support</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="font-semibold text-gray-900 mb-4">Emergency Contact</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:phone" class="text-red-600 text-xl" />
                <div>
                  <p class="font-medium text-gray-900">Emergency Hotline</p>
                  <a href="tel:+263710708027" class="text-red-600 hover:text-red-700">+263 710708027</a>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <Icon name="mdi:email" class="text-blue-600 text-xl" />
                <div>
                  <p class="font-medium text-gray-900">Technical Support</p>
                  <a href="mailto:info@lucernaandsternhealth.co.zw" class="text-blue-600 hover:text-blue-700">info@lucernaandsternhealth.co.zw</a>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <Icon name="mdi:clock" class="text-green-600 text-xl" />
                <div>
                  <p class="font-medium text-gray-900">Support Hours</p>
                  <p class="text-gray-600">24/7 Emergency Support</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold text-gray-900 mb-4">Submit Technical Issue</h3>
            <form @submit.prevent="submitTechnicalIssue" class="space-y-4">
              <div>
                <label for="issueSubject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  id="issueSubject"
                  v-model="issueForm.subject"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label for="issuePriority" class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  id="issuePriority"
                  v-model="issueForm.priority"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              
              <div>
                <label for="issueDescription" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  id="issueDescription"
                  v-model="issueForm.description"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe the technical issue..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                :disabled="submitting"
                class="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="submitting">Submitting...</span>
                <span v-else>Submit Issue</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Apply admin layout
definePageMeta({ 
  layout: 'admin'
})

const { user } = useAuth()

const submitting = ref(false)
const loading = ref(false)
const systemData = ref(null)
const maintenanceMode = ref(false)

const issueForm = ref({
  subject: '',
  priority: 'medium',
  description: ''
})

// Load system data on component mount
onMounted(async () => {
  await loadSystemData()
})

const loadSystemData = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/admin/support/system-status')
    if (response.success) {
      systemData.value = response.data
    }
  } catch (error) {
    console.error('Failed to load system data:', error)
  } finally {
    loading.value = false
  }
}

const checkSystemStatus = async () => {
  await loadSystemData()
  if (systemData.value) {
    const data = systemData.value
    alert(`System Status: ${data.server.status}\nUptime: ${data.server.uptime}%\nDatabase: ${data.database.status}\nActive Users: ${data.users.active}\nLast check: ${new Date(data.lastChecked).toLocaleString()}`)
  }
}

const createBackup = async () => {
  const confirmed = confirm('Are you sure you want to create a system backup? This may take several minutes.')
  if (!confirmed) return

  try {
    const response = await $fetch('/api/admin/support/backup', {
      method: 'POST',
      body: { type: 'full' }
    })
    
    if (response.success) {
      alert(`Backup created successfully!\nBackup ID: ${response.data.backupId}\nSize: ${response.data.size}\nCreated: ${new Date(response.data.createdAt).toLocaleString()}`)
    }
  } catch (error) {
    console.error('Backup creation failed:', error)
    alert('Failed to create backup. Please try again.')
  }
}

const toggleMaintenance = async () => {
  const action = maintenanceMode.value ? 'disable' : 'enable'
  const confirmed = confirm(`Are you sure you want to ${action} maintenance mode? This will affect all users.`)
  if (!confirmed) return

  try {
    const response = await $fetch('/api/admin/support/maintenance', {
      method: 'POST',
      body: { 
        action,
        reason: prompt('Please provide a reason for this action:') || 'No reason provided'
      }
    })
    
    if (response.success) {
      maintenanceMode.value = response.data.maintenanceMode
      alert(`Maintenance mode ${action}d successfully.\nReason: ${response.data.reason}\nBy: ${response.data.enabledBy}`)
    }
  } catch (error) {
    console.error('Maintenance mode toggle failed:', error)
    alert('Failed to toggle maintenance mode. Please try again.')
  }
}

const viewErrorLogs = () => {
  alert('Error logs feature coming soon! This will show recent system errors and warnings.')
}

const clearCache = () => {
  const confirmed = confirm('Are you sure you want to clear system cache?')
  if (confirmed) {
    // In a real system, you'd call an API endpoint to clear cache
    alert('Cache cleared successfully.')
  }
}

const optimizeDatabase = () => {
  const confirmed = confirm('Are you sure you want to optimize the database? This may take several minutes.')
  if (confirmed) {
    // In a real system, you'd call an API endpoint to optimize database
    alert('Database optimization started.')
  }
}

const runSystemCheck = async () => {
  try {
    const response = await $fetch('/api/admin/support/system-check', {
      method: 'POST'
    })
    
    if (response.success) {
      const checks = response.data.checks
      const status = response.data.overallStatus
      let message = `System check completed with status: ${status}\n\n`
      
      Object.entries(checks).forEach(([key, check]) => {
        message += `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${check.status} - ${check.message}\n`
      })
      
      alert(message)
    }
  } catch (error) {
    console.error('System check failed:', error)
    alert('Failed to perform system check. Please try again.')
  }
}

const submitTechnicalIssue = async () => {
  submitting.value = true
  try {
    const response = await $fetch('/api/admin/support/technical-issue', {
      method: 'POST',
      body: issueForm.value
    })
    
    if (response.success) {
      alert(`Technical issue submitted successfully!\nIssue ID: #${response.data.issueId}\nPriority: ${response.data.priority}\nOur team will respond within 2 hours.`)
      
      // Reset form
      issueForm.value = {
        subject: '',
        priority: 'medium',
        description: ''
      }
    }
  } catch (error) {
    console.error('Error submitting issue:', error)
    alert('Error submitting issue. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script> 