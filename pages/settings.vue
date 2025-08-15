<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
          <p class="text-gray-600 mt-1">Configure your application preferences and account settings</p>
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
                    ? 'border-blue-500 text-blue-600'
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
            <!-- Notifications Tab -->
            <div v-if="activeTab === 'notifications'" class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Email Notifications</h4>
                      <p class="text-sm text-gray-600">Receive notifications via email</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.emailNotifications"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">SMS Notifications</h4>
                      <p class="text-sm text-gray-600">Receive notifications via SMS</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.smsNotifications"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Booking Reminders</h4>
                      <p class="text-sm text-gray-600">Get reminded about upcoming bookings</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.bookingReminders"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Payment Notifications</h4>
                      <p class="text-sm text-gray-600">Get notified about payment status</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.paymentNotifications"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Privacy Tab -->
            <div v-if="activeTab === 'privacy'" class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Profile Visibility</h4>
                      <p class="text-sm text-gray-600">Allow other users to see your profile</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.profileVisibility"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Data Sharing</h4>
                      <p class="text-sm text-gray-600">Allow data sharing for service improvement</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.dataSharing"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Analytics</h4>
                      <p class="text-sm text-gray-600">Allow analytics tracking</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.analytics"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                      <p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.twoFactorAuth"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 class="font-medium text-gray-900">Login Notifications</h4>
                      <p class="text-sm text-gray-600">Get notified of new login attempts</p>
                    </div>
                    <div class="flex items-center">
                      <input
                        v-model="settings.loginNotifications"
                        type="checkbox"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                  </div>
                  
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Change Password</h4>
                    <p class="text-sm text-gray-600 mb-4">Update your account password</p>
                    <button
                      @click="showPasswordModal = true"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Appearance Tab -->
            <div v-if="activeTab === 'appearance'" class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Appearance Settings</h3>
                <div class="space-y-4">
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Theme</h4>
                    <p class="text-sm text-gray-600 mb-4">Choose your preferred theme</p>
                    <div class="flex space-x-4">
                      <button
                        @click="settings.theme = 'light'"
                        :class="[
                          settings.theme === 'light'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700',
                          'px-4 py-2 rounded-lg transition-colors duration-200'
                        ]"
                      >
                        Light
                      </button>
                      <button
                        @click="settings.theme = 'dark'"
                        :class="[
                          settings.theme === 'dark'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700',
                          'px-4 py-2 rounded-lg transition-colors duration-200'
                        ]"
                      >
                        Dark
                      </button>
                      <button
                        @click="settings.theme = 'auto'"
                        :class="[
                          settings.theme === 'auto'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700',
                          'px-4 py-2 rounded-lg transition-colors duration-200'
                        ]"
                      >
                        Auto
                      </button>
                    </div>
                  </div>
                  
                  <div class="p-4 border border-gray-200 rounded-lg">
                    <h4 class="font-medium text-gray-900 mb-2">Language</h4>
                    <p class="text-sm text-gray-600 mb-4">Choose your preferred language</p>
                    <select
                      v-model="settings.language"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
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
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Saving...</span>
              <span v-else>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Password Change Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>
        <form @submit.prevent="changePassword" class="space-y-4">
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              id="currentPassword"
              v-model="passwordForm.currentPassword"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              id="newPassword"
              v-model="passwordForm.newPassword"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              id="confirmPassword"
              v-model="passwordForm.confirmPassword"
              type="password"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="passwordLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="passwordLoading">Changing...</span>
              <span v-else>Change Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = useAuth()
const router = useRouter()

const loading = ref(false)
const passwordLoading = ref(false)
const showPasswordModal = ref(false)
const activeTab = ref('notifications')

const tabs = [
  { id: 'notifications', name: 'Notifications' },
  { id: 'privacy', name: 'Privacy' },
  { id: 'security', name: 'Security' },
  { id: 'appearance', name: 'Appearance' }
]

const settings = ref({
  emailNotifications: true,
  smsNotifications: false,
  bookingReminders: true,
  paymentNotifications: true,
  profileVisibility: true,
  dataSharing: false,
  analytics: true,
  twoFactorAuth: false,
  loginNotifications: true,
  theme: 'light',
  language: 'en'
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const saveSettings = async () => {
  loading.value = true
  try {
    // Here you would typically make an API call to save settings
    console.log('Saving settings:', settings.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    alert('Settings saved successfully')
    
  } catch (error) {
    console.error('Error saving settings:', error)
    alert('Error saving settings. Please try again.')
  } finally {
    loading.value = false
  }
}

const resetSettings = () => {
  settings.value = {
    emailNotifications: true,
    smsNotifications: false,
    bookingReminders: true,
    paymentNotifications: true,
    profileVisibility: true,
    dataSharing: false,
    analytics: true,
    twoFactorAuth: false,
    loginNotifications: true,
    theme: 'light',
    language: 'en'
  }
}

const changePassword = async () => {
  passwordLoading.value = true
  try {
    // Validate passwords
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    
    // Here you would typically make an API call to change password
    console.log('Changing password:', passwordForm.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    alert('Password changed successfully')
    
    // Close modal and reset form
    showPasswordModal.value = false
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
    
  } catch (error) {
    console.error('Error changing password:', error)
    alert('Error changing password. Please try again.')
  } finally {
    passwordLoading.value = false
  }
}
</script> 