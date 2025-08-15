<template>
  <div class="min-h-screen bg-gray-50">
    
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">Admin Settings</h1>
          <p class="text-gray-600 mt-1">Configure system settings and administrative preferences</p>
        </div>
        
        <!-- Settings Tabs -->
        <div class="p-6">
          <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm'
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>
          
          <!-- Tab Content -->
          <div class="mt-6">
            <!-- System Settings Tab -->
            <div v-if="activeTab === 'system'" class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
                <div class="space-y-4">
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">System Maintenance Mode</h4>
                    <p class="text-sm text-gray-600 mb-4">Enable maintenance mode to restrict access during updates</p>
                    <div class="flex items-center">
                      <input
                        v-model="settings.maintenanceMode"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label class="ml-2 block text-sm text-gray-900">
                        Enable maintenance mode
                      </label>
                    </div>
                  </div>
                  
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">User Registration</h4>
                    <p class="text-sm text-gray-600 mb-4">Control user registration settings</p>
                    <div class="space-y-3">
                      <div class="flex items-center">
                        <input
                          v-model="settings.allowRegistration"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label class="ml-2 block text-sm text-gray-900">
                          Allow new user registration
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          v-model="settings.requireApproval"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label class="ml-2 block text-sm text-gray-900">
                          Require admin approval for new users
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Session Management</h4>
                    <p class="text-sm text-gray-600 mb-4">Configure user session settings</p>
                    
                    <!-- Session Statistics -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-sm text-gray-600">Total Users</div>
                        <div class="text-lg font-semibold text-gray-900">{{ sessionStats?.totalUsers || 0 }}</div>
                      </div>
                      <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-sm text-gray-600">Active Sessions</div>
                        <div class="text-lg font-semibold text-gray-900">{{ sessionStats?.activeSessions || 0 }}</div>
                      </div>
                      <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-sm text-gray-600">Total Logins</div>
                        <div class="text-lg font-semibold text-gray-900">{{ sessionStats?.totalLogins || 0 }}</div>
                      </div>
                      <div class="bg-gray-50 p-3 rounded-lg">
                        <div class="text-sm text-gray-600">Failed Logins</div>
                        <div class="text-lg font-semibold text-gray-900">{{ sessionStats?.failedLogins || 0 }}</div>
                      </div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label for="sessionTimeout" class="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                        <input
                          id="sessionTimeout"
                          v-model="settings.sessionTimeout"
                          type="number"
                          min="5"
                          max="1440"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                        />
                      </div>
                      <div>
                        <label for="maxLoginAttempts" class="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                        <input
                          id="maxLoginAttempts"
                          v-model="settings.maxLoginAttempts"
                          type="number"
                          min="1"
                          max="10"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Notifications Tab -->
            <div v-if="activeTab === 'notifications'" class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">System Alerts</h4>
                      <p class="text-sm text-gray-600">Receive system-wide alerts and notifications</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.systemAlerts"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">User Reports</h4>
                      <p class="text-sm text-gray-600">Get notified about user reports and issues</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.userReports"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Security Alerts</h4>
                      <p class="text-sm text-gray-600">Receive security-related notifications</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.securityAlerts"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Performance Monitoring</h4>
                      <p class="text-sm text-gray-600">Get alerts about system performance issues</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.performanceAlerts"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Security Tab -->
            <div v-if="activeTab === 'security'" class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p class="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.require2FA"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">IP Whitelist</h4>
                      <p class="text-sm text-gray-600">Restrict admin access to specific IP addresses</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.ipWhitelist"
                        type="checkbox"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Password Policy</h4>
                    <p class="text-sm text-gray-600 mb-4">Configure password requirements</p>
                    <div class="space-y-3">
                      <div class="flex items-center">
                        <input
                          v-model="settings.requireUppercase"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label class="ml-2 block text-sm text-gray-900">
                          Require uppercase letters
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          v-model="settings.requireNumbers"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label class="ml-2 block text-sm text-gray-900">
                          Require numbers
                        </label>
                      </div>
                      <div class="flex items-center">
                        <input
                          v-model="settings.requireSpecialChars"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label class="ml-2 block text-sm text-gray-900">
                          Require special characters
                        </label>
                      </div>
                      <div>
                        <label for="minPasswordLength" class="block text-sm font-medium text-gray-700 mb-2">Minimum Password Length</label>
                        <input
                          id="minPasswordLength"
                          v-model="settings.minPasswordLength"
                          type="number"
                          min="8"
                          max="32"
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Backup Tab -->
            <div v-if="activeTab === 'backup'" class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Backup & Recovery</h3>
                <div class="space-y-4">
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Automatic Backups</h4>
                    <p class="text-sm text-gray-600 mb-4">Configure automatic backup settings</p>
                    <div class="space-y-3">
                      <div class="flex items-center">
                        <input
                          v-model="settings.autoBackup"
                          type="checkbox"
                          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label class="ml-2 block text-sm text-gray-900">
                          Enable automatic backups
                        </label>
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label for="backupFrequency" class="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                          <select
                            id="backupFrequency"
                            v-model="settings.backupFrequency"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                          >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                          </select>
                        </div>
                        <div>
                          <label for="backupRetention" class="block text-sm font-medium text-gray-700 mb-2">Retention (days)</label>
                          <input
                            id="backupRetention"
                            v-model="settings.backupRetention"
                            type="number"
                            min="1"
                            max="365"
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Manual Backup</h4>
                    <p class="text-sm text-gray-600 mb-4">Create a manual backup of the system</p>
                    <button
                      @click="createBackup"
                      :disabled="backupLoading"
                      class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="backupLoading">Creating Backup...</span>
                      <span v-else>Create Backup</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div v-if="activeTab === 'system'" class="mt-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="space-y-3">
                  <div v-for="activity in recentActivity" :key="activity.id" class="flex items-center justify-between text-sm">
                    <div class="flex items-center space-x-3">
                      <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span class="text-gray-900">{{ activity.user }}</span>
                      <span class="text-gray-600">{{ activity.message }}</span>
                    </div>
                    <span class="text-gray-500">{{ formatDate(activity.timestamp) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200 mt-6">
            <button
              @click="resetSettings"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Reset
            </button>
            <button
              @click="saveSettings"
              :disabled="loading"
              class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Saving...</span>
              <span v-else>Save Changes</span>
            </button>
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
const router = useRouter()

const loading = ref(false)
const backupLoading = ref(false)
const activeTab = ref('system')

const tabs = [
  { id: 'system', name: 'System' },
  { id: 'notifications', name: 'Notifications' },
  { id: 'security', name: 'Security' },
  { id: 'backup', name: 'Backup' }
]

// Fetch settings data
const { data: settingsData, error } = await useFetch('/api/admin/settings', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

const settings = ref({
  maintenanceMode: false,
  allowRegistration: true,
  requireApproval: false,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  systemAlerts: true,
  userReports: true,
  securityAlerts: true,
  performanceAlerts: false,
  require2FA: false,
  ipWhitelist: false,
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  minPasswordLength: 8,
  autoBackup: true,
  backupFrequency: 'daily',
  backupRetention: 30
})

const sessionStats = computed(() => settingsData.value?.data?.sessionStats || {})
const recentActivity = computed(() => settingsData.value?.data?.recentActivity || [])

// Update settings when data is loaded
watch(settingsData, (newData) => {
  if (newData?.data) {
    Object.assign(settings.value, newData.data)
  }
}, { immediate: true })

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const saveSettings = async () => {
  loading.value = true
  try {
    const response = await $fetch('/api/admin/settings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      },
      body: settings.value
    })
    
    if (response.success) {
      alert('Settings saved successfully')
    } else {
      alert('Error saving settings. Please try again.')
    }
    
  } catch (error) {
    console.error('Error saving settings:', error)
    alert('Error saving settings. Please try again.')
  } finally {
    loading.value = false
  }
}

const resetSettings = () => {
  if (settingsData.value?.data) {
    Object.assign(settings.value, settingsData.value.data)
  }
}

const createBackup = async () => {
  backupLoading.value = true
  try {
    // Here you would typically make an API call to create backup
    console.log('Creating backup...')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Show success message
    alert('Backup created successfully')
    
  } catch (error) {
    console.error('Error creating backup:', error)
    alert('Error creating backup. Please try again.')
  } finally {
    backupLoading.value = false
  }
}
</script> 