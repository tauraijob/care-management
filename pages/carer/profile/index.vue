<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Profile</h1>
          <p class="text-sm text-gray-600 mt-1">Manage your personal and professional information</p>
        </div>
      </div>
    </div>

    <!-- Profile Sections -->
    <div class="space-y-6">
      <!-- Personal Information -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Personal Information</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">First Name *</label>
              <input v-model="personalInfo.firstName" type="text" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter first name" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Last Name *</label>
              <input v-model="personalInfo.lastName" type="text" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter last name" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Date of Birth</label>
              <input v-model="personalInfo.dateOfBirth" type="date" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Gender</label>
              <select v-model="personalInfo.gender" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Nationality</label>
              <input v-model="personalInfo.nationality" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter nationality" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Languages Spoken</label>
              <input v-model="personalInfo.languages" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="e.g., English, Spanish, French" />
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Contact Information</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Email Address *</label>
              <input v-model="contactInfo.email" type="email" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter email address" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Phone Number *</label>
              <input v-model="contactInfo.phone" type="tel" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter phone number" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Emergency Contact</label>
              <input v-model="contactInfo.emergencyContact" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Emergency contact name" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Emergency Phone</label>
              <input v-model="contactInfo.emergencyPhone" type="tel" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Emergency contact phone" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 md:col-span-2">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Address</label>
              <textarea v-model="contactInfo.address" rows="3" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter full address"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Professional Information -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Professional Information</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">License Number *</label>
              <input v-model="professionalInfo.licenseNumber" type="text" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter license number" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">License Expiry Date</label>
              <input v-model="professionalInfo.licenseExpiry" type="date" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Years of Experience</label>
              <select v-model="professionalInfo.experience" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white">
                <option value="">Select experience</option>
                <option value="0-1">0-1 years</option>
                <option value="2-5">2-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-15">11-15 years</option>
                <option value="15+">15+ years</option>
              </select>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Specializations</label>
              <input v-model="professionalInfo.specializations" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="e.g., Elderly Care, Medical Care" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Hourly Rate ($)</label>
              <input v-model="professionalInfo.hourlyRate" type="number" step="0.01" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter hourly rate" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Certifications</label>
              <input v-model="professionalInfo.certifications" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="e.g., CPR, First Aid" />
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 md:col-span-2">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Bio/About Me</label>
              <textarea v-model="professionalInfo.bio" rows="4" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Tell patients about your experience and approach to care"></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Change Password -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Change Password</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Current Password</label>
              <div class="relative">
                <input v-model="passwordChange.currentPassword" :type="showCurrentPassword ? 'text' : 'password'" class="block w-full pr-10 px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter current password" />
                <button @click="showCurrentPassword = !showCurrentPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Icon :name="showCurrentPassword ? 'mdi:eye-off' : 'mdi:eye'" class="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">New Password</label>
              <div class="relative">
                <input v-model="passwordChange.newPassword" :type="showNewPassword ? 'text' : 'password'" class="block w-full pr-10 px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Enter new password" />
                <button @click="showNewPassword = !showNewPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Icon :name="showNewPassword ? 'mdi:eye-off' : 'mdi:eye'" class="h-5 w-5 text-gray-400" />
                </button>
              </div>
              <p class="mt-2 text-xs text-gray-600 font-medium">Password must be at least 8 characters long</p>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Confirm New Password</label>
              <div class="relative">
                <input v-model="passwordChange.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" class="block w-full pr-10 px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white" placeholder="Confirm new password" />
                <button @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Icon :name="showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'" class="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Buttons -->
    <div class="mt-6 flex justify-end space-x-3">
      <button @click="saveProfile" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Icon name="mdi:content-save" class="mr-2 h-4 w-4" />
        Save Profile
      </button>
      <button @click="changePassword" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Icon name="mdi:lock-reset" class="mr-2 h-4 w-4" />
        Change Password
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
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const personalInfo = ref({
  firstName: 'Sarah',
  lastName: 'Johnson',
  dateOfBirth: '1985-03-15',
  gender: 'female',
  nationality: 'American',
  languages: 'English, Spanish'
})

const contactInfo = ref({
  email: 'sarah.johnson@example.com',
  phone: '+1 (555) 123-4567',
  emergencyContact: 'John Johnson',
  emergencyPhone: '+1 (555) 987-6543',
  address: '123 Care Street, Healthcare City, HC 12345'
})

const professionalInfo = ref({
  licenseNumber: 'HC-12345',
  licenseExpiry: '2025-12-31',
  experience: '6-10',
  specializations: 'Elderly Care, Medical Care, Physical Therapy',
  hourlyRate: '35.00',
  certifications: 'CPR, First Aid, Nursing Assistant',
  bio: 'Experienced healthcare professional with over 8 years of experience in elderly care and medical assistance. Passionate about providing compassionate and professional care to patients in their homes.'
})

const passwordChange = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Methods
const saveProfile = () => {
  console.log('Saving profile:', {
    personalInfo: personalInfo.value,
    contactInfo: contactInfo.value,
    professionalInfo: professionalInfo.value
  })
  // Implement save functionality
}

const changePassword = () => {
  if (passwordChange.value.newPassword !== passwordChange.value.confirmPassword) {
    console.error('Passwords do not match')
    return
  }
  
  if (passwordChange.value.newPassword.length < 8) {
    console.error('Password must be at least 8 characters long')
    return
  }
  
  console.log('Changing password:', {
    currentPassword: passwordChange.value.currentPassword,
    newPassword: passwordChange.value.newPassword
  })
  
  // Reset password fields
  passwordChange.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }
  
  // Implement password change functionality
}
</script> 