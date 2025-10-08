<template>
  <div class="min-h-screen bg-gray-50">
    
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900">Carer Profile Settings</h1>
          <p class="text-gray-600 mt-1">Manage your personal information and healthcare professional settings</p>
        </div>
        
        <!-- Profile Form -->
        <form @submit.prevent="updateProfile" class="p-6 space-y-6">
          <!-- Personal Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  id="firstName"
                  v-model="form.firstName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  id="lastName"
                  v-model="form.lastName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>
          
          <!-- Professional Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="licenseNumber" class="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                <input
                  id="licenseNumber"
                  v-model="form.licenseNumber"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label for="specialization" class="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  id="specialization"
                  v-model="form.specialization"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select specialization</option>
                  <option value="elderly-care">Elderly Care</option>
                  <option value="pediatric">Pediatric Care</option>
                  <option value="post-surgery">Post-Surgery Care</option>
                  <option value="disability">Disability Support</option>
                  <option value="mental-health">Mental Health</option>
                  <option value="general">General Care</option>
                </select>
              </div>
              <div>
                <label for="experience" class="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                <input
                  id="experience"
                  v-model="form.experience"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label for="availability" class="block text-sm font-medium text-gray-700 mb-2">Availability Status</label>
                <select
                  id="availability"
                  v-model="form.availability"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- Contact Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div class="space-y-4">
              <div>
                <label for="address" class="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  id="address"
                  v-model="form.address"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                ></textarea>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label for="city" class="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    id="city"
                    v-model="form.city"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label for="state" class="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                  <input
                    id="state"
                    v-model="form.state"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label for="zipCode" class="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
                  <input
                    id="zipCode"
                    v-model="form.zipCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <!-- Account Settings -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
            <div class="space-y-4">
              <div>
                <label for="currentPassword" class="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  id="currentPassword"
                  v-model="form.currentPassword"
                  type="password"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label for="newPassword" class="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    id="newPassword"
                    v-model="form.newPassword"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    type="password"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

        <!-- Certifications Upload -->
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Professional Certifications</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Certificate Title</label>
                <input v-model="certForm.title" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="e.g., Basic Life Support (BLS)" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Document (PDF or Word)</label>
                <input @change="onFileChange" type="file" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" class="w-full text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Issued At</label>
                <input v-model="certForm.issuedAt" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Expires At (optional)</label>
                <input v-model="certForm.expiresAt" type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button type="button" :disabled="uploading || !selectedFile" @click="uploadCertificate" class="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">Upload Certificate</button>
              <span v-if="uploading" class="text-gray-500 text-sm">Uploading...</span>
            </div>

            <!-- List -->
            <div class="mt-6">
              <h4 class="text-md font-semibold text-gray-900 mb-2">Your Certificates</h4>
              <div v-if="certsLoading" class="text-gray-500 text-sm">Loading certificates...</div>
              <div v-else>
                <div v-if="certs.length === 0" class="text-gray-500 text-sm">No certificates uploaded yet.</div>
                <ul v-else class="divide-y divide-gray-200">
                  <li v-for="c in certs" :key="c.id" class="py-3 flex items-center justify-between">
                    <div>
                      <div class="font-medium text-gray-900">{{ c.title }}</div>
                      <div class="text-sm text-gray-500">{{ c.fileName }} • <span class="uppercase">{{ (c.fileType || '').split('/').pop() }}</span></div>
                      <div class="text-xs text-gray-400">Issued {{ formatDate(c.issuedAt) }} <span v-if="c.expiresAt">• Expires {{ formatDate(c.expiresAt) }}</span></div>
                    </div>
                    <div class="flex items-center gap-3">
                      <NuxtLink :href="c.fileUrl" target="_blank" class="text-blue-600 hover:text-blue-700 text-sm">View</NuxtLink>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
            </div>
          </div>
          
          <!-- Notifications -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                  id="emailNotifications"
                  v-model="form.emailNotifications"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="emailNotifications" class="ml-2 block text-sm text-gray-900">
                  Email notifications
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="assignmentAlerts"
                  v-model="form.assignmentAlerts"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="assignmentAlerts" class="ml-2 block text-sm text-gray-900">
                  Assignment alerts
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="scheduleUpdates"
                  v-model="form.scheduleUpdates"
                  type="checkbox"
                  class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label for="scheduleUpdates" class="ml-2 block text-sm text-gray-900">
                  Schedule updates
                </label>
              </div>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Saving...</span>
              <span v-else>Save Changes</span>
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

const form = ref({
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  licenseNumber: user.value?.licenseNumber || '',
  specialization: user.value?.specialization || '',
  experience: user.value?.experience || '',
  availability: user.value?.availability || 'available',
  address: user.value?.address || '',
  city: user.value?.city || '',
  state: user.value?.state || '',
  zipCode: user.value?.zipCode || '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  emailNotifications: true,
  assignmentAlerts: true,
  scheduleUpdates: true
})

const updateProfile = async () => {
  loading.value = true
  try {
    // Validate password change
    if (form.value.newPassword && form.value.newPassword !== form.value.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    
    // Here you would typically make an API call to update the profile
    console.log('Updating carer profile:', form.value)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    alert('Profile updated successfully')
    
    // Clear password fields
    form.value.currentPassword = ''
    form.value.newPassword = ''
    form.value.confirmPassword = ''
    
  } catch (error) {
    console.error('Error updating profile:', error)
    alert('Error updating profile. Please try again.')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    firstName: user.value?.firstName || '',
    lastName: user.value?.lastName || '',
    email: user.value?.email || '',
    phone: user.value?.phone || '',
    licenseNumber: user.value?.licenseNumber || '',
    specialization: user.value?.specialization || '',
    experience: user.value?.experience || '',
    availability: user.value?.availability || 'available',
    address: user.value?.address || '',
    city: user.value?.city || '',
    state: user.value?.state || '',
    zipCode: user.value?.zipCode || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    assignmentAlerts: true,
    scheduleUpdates: true
  }
}

// Certifications state & handlers
const certForm = ref({ title: '', issuedAt: '', expiresAt: '' })
const selectedFile = ref(null)
const uploading = ref(false)
const certs = ref([])
const certsLoading = ref(false)

onMounted(() => {
  fetchCertificates()
})

function onFileChange(e) {
  const input = e.target
  if (input && input.files && input.files[0]) {
    selectedFile.value = input.files[0]
  }
}

async function uploadCertificate() {
  if (!selectedFile.value) return
  const contentType = selectedFile.value.type
  const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  if (!allowed.includes(contentType)) {
    alert('Only PDF or Word documents are allowed')
    return
  }
  uploading.value = true
  try {
    const form = new FormData()
    form.append('title', certForm.value.title || selectedFile.value.name)
    if (certForm.value.issuedAt) form.append('issuedAt', certForm.value.issuedAt)
    if (certForm.value.expiresAt) form.append('expiresAt', certForm.value.expiresAt)
    form.append('file', selectedFile.value)

    const res = await $fetch('/api/carer/certificates', { method: 'POST', body: form })
    if (res && res.success) {
      certForm.value = { title: '', issuedAt: '', expiresAt: '' }
      selectedFile.value = null
      await fetchCertificates()
    }
  } catch (e) {
    console.error('Upload error', e)
    alert('Failed to upload certificate')
  } finally {
    uploading.value = false
  }
}

async function fetchCertificates() {
  certsLoading.value = true
  try {
    const res = await $fetch('/api/carer/certificates', { method: 'GET' })
    certs.value = res?.data?.items || []
  } catch (e) {
    console.error('Fetch certificates error', e)
  } finally {
    certsLoading.value = false
  }
}

function formatDate(d) {
  if (!d) return '-'
  const dt = new Date(d)
  if (isNaN(dt.getTime())) return '-'
  return dt.toLocaleDateString()
}
</script> 