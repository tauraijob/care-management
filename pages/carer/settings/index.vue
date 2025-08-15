<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
          <p class="text-sm text-gray-600 mt-1">Manage your account preferences and work settings</p>
        </div>
      </div>
    </div>

    <!-- Settings Tabs -->
    <div class="bg-white shadow rounded-lg">
      <!-- Tab Navigation -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 px-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="activeTab === tab.id ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            <Icon :name="tab.icon" class="mr-2 h-4 w-4 inline" />
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="p-6">
        <!-- Notifications Tab -->
        <div v-if="activeTab === 'notifications'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">New Booking Requests</h4>
                  <p class="text-sm text-gray-500">Get notified when new patients request your services</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.newBookings" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Schedule Changes</h4>
                  <p class="text-sm text-gray-500">Receive alerts when appointments are rescheduled</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.scheduleChanges" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Patient Messages</h4>
                  <p class="text-sm text-gray-500">Get notified when patients send you messages</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.patientMessages" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Payment Updates</h4>
                  <p class="text-sm text-gray-500">Receive notifications about payment processing</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="notifications.payments" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Privacy Tab -->
        <div v-if="activeTab === 'privacy'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Privacy Settings</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Profile Visibility</h4>
                  <p class="text-sm text-gray-500">Control who can see your profile information</p>
                </div>
                <select v-model="privacy.profileVisibility" class="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="public">Public</option>
                  <option value="patients">Patients Only</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Location Sharing</h4>
                  <p class="text-sm text-gray-500">Allow patients to see your general location</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.locationSharing" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Contact Information</h4>
                  <p class="text-sm text-gray-500">Show your contact details to patients</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="privacy.showContact" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                  <p class="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="security.twoFactor" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Session Timeout</h4>
                  <p class="text-sm text-gray-500">Automatically log out after inactivity</p>
                </div>
                <select v-model="security.sessionTimeout" class="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Login Notifications</h4>
                  <p class="text-sm text-gray-500">Get notified of new login attempts</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="security.loginNotifications" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Work Preferences Tab -->
        <div v-if="activeTab === 'work'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Work Preferences</h3>
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Maximum Daily Hours</h4>
                  <p class="text-sm text-gray-500">Set your preferred maximum working hours per day</p>
                </div>
                <select v-model="workPreferences.maxHours" class="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="4">4 hours</option>
                  <option value="6">6 hours</option>
                  <option value="8">8 hours</option>
                  <option value="10">10 hours</option>
                  <option value="12">12 hours</option>
                </select>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Preferred Distance</h4>
                  <p class="text-sm text-gray-500">Maximum travel distance for appointments</p>
                </div>
                <select v-model="workPreferences.maxDistance" class="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="5">5 miles</option>
                  <option value="10">10 miles</option>
                  <option value="15">15 miles</option>
                  <option value="20">20 miles</option>
                  <option value="25">25 miles</option>
                </select>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Auto-Accept Bookings</h4>
                  <p class="text-sm text-gray-500">Automatically accept booking requests within preferences</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="workPreferences.autoAccept" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 class="text-sm font-medium text-gray-900">Emergency Availability</h4>
                  <p class="text-sm text-gray-500">Allow emergency booking requests outside normal hours</p>
                </div>
                <div class="flex items-center space-x-3">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="workPreferences.emergencyAvailable" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="mt-6 flex justify-end">
      <button @click="saveSettings" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Icon name="mdi:content-save" class="mr-2 h-4 w-4" />
        Save Settings
      </button>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'carer',
  
})

const { user } = useAuth()

// Reactive data
const activeTab = ref('notifications')

const tabs = [
  { id: 'notifications', name: 'Notifications', icon: 'mdi:bell' },
  { id: 'privacy', name: 'Privacy', icon: 'mdi:shield-account' },
  { id: 'security', name: 'Security', icon: 'mdi:lock' },
  { id: 'work', name: 'Work Preferences', icon: 'mdi:briefcase' }
]

const notifications = ref({
  newBookings: true,
  scheduleChanges: true,
  patientMessages: true,
  payments: false
})

const privacy = ref({
  profileVisibility: 'public',
  locationSharing: true,
  showContact: true
})

const security = ref({
  twoFactor: false,
  sessionTimeout: '30',
  loginNotifications: true
})

const workPreferences = ref({
  maxHours: '8',
  maxDistance: '15',
  autoAccept: false,
  emergencyAvailable: true
})

// Methods
const saveSettings = () => {
  console.log('Saving settings:', {
    notifications: notifications.value,
    privacy: privacy.value,
    security: security.value,
    workPreferences: workPreferences.value
  })
  // Implement save functionality
}
</script> 