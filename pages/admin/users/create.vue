<template>
  <div class="max-w-4xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Create New User</h1>
          <p class="text-sm text-gray-600 mt-1">Add a new user to the system with appropriate role and permissions</p>
        </div>
        <NuxtLink to="/admin/users" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <Icon name="mdi:arrow-left" class="mr-2 h-4 w-4" />
          Back to Users
        </NuxtLink>
      </div>
    </div>

    <!-- User Creation Form -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg leading-6 font-medium text-gray-900">User Information</h3>
        <p class="text-sm text-gray-500 mt-1">Fill in the details to create a new user account</p>
      </div>
      
      <form @submit.prevent="createUser" class="p-6 space-y-6">
        <!-- Role Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">User Role *</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              v-for="role in userRoles" 
              :key="role.value"
              @click="form.role = role.value"
              class="relative border-2 rounded-lg p-4 cursor-pointer transition-colors"
              :class="form.role === role.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Icon :name="role.icon" class="h-6 w-6" :class="role.color" />
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-gray-900">{{ role.label }}</h4>
                  <p class="text-xs text-gray-500">{{ role.description }}</p>
                </div>
              </div>
              <div v-if="form.role === role.value" class="absolute top-2 right-2">
                <Icon name="mdi:check-circle" class="h-5 w-5 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

                 <!-- Personal Information -->
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="firstName" class="block text-sm font-semibold text-gray-800 mb-2">First Name *</label>
             <input
               id="firstName"
               v-model="form.firstName"
               type="text"
               required
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Enter first name"
             />
           </div>
           
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="lastName" class="block text-sm font-semibold text-gray-800 mb-2">Last Name *</label>
             <input
               id="lastName"
               v-model="form.lastName"
               type="text"
               required
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Enter last name"
             />
           </div>
         </div>

                 <!-- Contact Information -->
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="email" class="block text-sm font-semibold text-gray-800 mb-2">Email Address *</label>
             <input
               id="email"
               v-model="form.email"
               type="email"
               required
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Enter email address"
             />
           </div>
           
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="phone" class="block text-sm font-semibold text-gray-800 mb-2">Phone Number *</label>
             <input
               id="phone"
               v-model="form.phone"
               type="tel"
               required
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Enter phone number"
             />
           </div>
         </div>

                 <!-- Password -->
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="password" class="block text-sm font-semibold text-gray-800 mb-2">Password *</label>
             <div class="relative">
               <input
                 id="password"
                 v-model="form.password"
                 :type="showPassword ? 'text' : 'password'"
                 required
                 class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900 pr-10"
                 placeholder="Enter password"
               />
               <button
                 type="button"
                 @click="showPassword = !showPassword"
                 class="absolute inset-y-0 right-0 pr-3 flex items-center"
               >
                 <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="h-5 w-5 text-gray-500" />
               </button>
             </div>
             <p class="mt-2 text-xs text-gray-600 font-medium">Minimum 8 characters with uppercase, lowercase, and number</p>
           </div>
           
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="confirmPassword" class="block text-sm font-semibold text-gray-800 mb-2">Confirm Password *</label>
             <input
               id="confirmPassword"
               v-model="form.confirmPassword"
               type="password"
               required
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Confirm password"
             />
           </div>
         </div>

                 <!-- Address Information -->
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="address" class="block text-sm font-semibold text-gray-800 mb-2">Address</label>
             <input
               id="address"
               v-model="form.address"
               type="text"
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Enter address"
             />
           </div>
           
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="city" class="block text-sm font-semibold text-gray-800 mb-2">City</label>
             <input
               id="city"
               v-model="form.city"
               type="text"
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Enter city"
             />
           </div>
         </div>

                 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="state" class="block text-sm font-semibold text-gray-800 mb-2">State/Province</label>
             <input
               id="state"
               v-model="form.state"
               type="text"
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Enter state"
             />
           </div>
           
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="zipCode" class="block text-sm font-semibold text-gray-800 mb-2">ZIP/Postal Code</label>
             <input
               id="zipCode"
               v-model="form.zipCode"
               type="text"
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="Enter ZIP code"
             />
           </div>
           
          <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <label for="countrySearch" class="block text-sm font-semibold text-gray-800 mb-2">Country</label>
            <input
              id="countrySearch"
              v-model="countrySearch"
              @change="onCountryInputChange"
              list="countryOptions"
              type="text"
              class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
              placeholder="Type to search country"
            />
            <datalist id="countryOptions">
              <option v-for="c in countries" :key="c.code" :value="c.name" :label="c.code"></option>
            </datalist>
            <p v-if="form.country" class="mt-2 text-xs text-gray-600">Selected: {{ selectedCountryLabel }}</p>
          </div>
         </div>

                 <!-- Role-Specific Fields -->
         <div v-if="form.role === 'CARER'" class="border-t border-gray-200 pt-6">
           <h4 class="text-lg font-medium text-gray-900 mb-4">Carer Information</h4>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <label for="specialty" class="block text-sm font-semibold text-gray-800 mb-2">Specialty *</label>
               <select
                 id="specialty"
                 v-model="form.specialty"
                 required
                 class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               >
                 <option value="">Select specialty</option>
                 <option value="Elderly Care">Elderly Care</option>
                 <option value="Medical Care">Medical Care</option>
                 <option value="Physical Therapy">Physical Therapy</option>
                 <option value="Companionship">Companionship</option>
                 <option value="Home Care">Home Care</option>
                 <option value="Palliative Care">Palliative Care</option>
               </select>
             </div>
             
             <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <label for="experience" class="block text-sm font-semibold text-gray-800 mb-2">Years of Experience *</label>
               <input
                 id="experience"
                 v-model="form.experience"
                 type="number"
                 min="0"
                 max="50"
                 required
                 class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
                 placeholder="Enter years of experience"
               />
             </div>
           </div>
           
           <div class="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
             <label for="certifications" class="block text-sm font-semibold text-gray-800 mb-2">Certifications</label>
             <textarea
               id="certifications"
               v-model="form.certifications"
               rows="3"
               class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               placeholder="List relevant certifications and qualifications"
             ></textarea>
           </div>
         </div>

                 <div v-if="form.role === 'ADMIN'" class="border-t border-gray-200 pt-6">
           <h4 class="text-lg font-medium text-gray-900 mb-4">Admin Information</h4>
           <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <label for="adminLevel" class="block text-sm font-semibold text-gray-800 mb-2">Admin Level *</label>
               <select
                 id="adminLevel"
                 v-model="form.adminLevel"
                 required
                 class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
               >
                 <option value="">Select admin level</option>
                 <option value="admin">Admin</option>
                 <option value="super_admin">Super Admin</option>
                 <option value="manager">Manager</option>
               </select>
             </div>
             
             <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
               <label for="department" class="block text-sm font-semibold text-gray-800 mb-2">Department</label>
               <input
                 id="department"
                 v-model="form.department"
                 type="text"
                 class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900"
                 placeholder="Enter department"
               />
             </div>
           </div>
         </div>

                 <!-- Account Settings -->
         <div class="border-t border-gray-200 pt-6">
           <h4 class="text-lg font-medium text-gray-900 mb-4">Account Settings</h4>
           <div class="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
             <div class="flex items-center">
               <input
                 id="emailNotifications"
                 v-model="form.emailNotifications"
                 type="checkbox"
                 class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
               />
               <label for="emailNotifications" class="ml-3 block text-sm font-medium text-gray-800">
                 Send email notifications
               </label>
             </div>
             
             <div class="flex items-center">
               <input
                 id="smsNotifications"
                 v-model="form.smsNotifications"
                 type="checkbox"
                 class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
               />
               <label for="smsNotifications" class="ml-3 block text-sm font-medium text-gray-800">
                 Send SMS notifications
               </label>
             </div>
             
             <div class="flex items-center">
               <input
                 id="active"
                 v-model="form.active"
                 type="checkbox"
                 class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
               />
               <label for="active" class="ml-3 block text-sm font-medium text-gray-800">
                 Account is active
               </label>
             </div>
           </div>
         </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset Form
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="loading" name="mdi:loading" class="animate-spin mr-2 h-4 w-4" />
            <span v-else>Create User</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  
})

const { user } = useAuth()
const router = useRouter()

// Reactive data
const loading = ref(false)
const showPassword = ref(false)
const countries = ref([])
const countrySearch = ref('')
const selectedCountryLabel = computed(() => {
  const match = countries.value.find(c => c.code === form.value.country)
  return match ? `${match.name} (${match.code})` : ''
})

// User roles configuration
const userRoles = [
  {
    value: 'CLIENT',
    label: 'Client',
    description: 'Service recipient who books care',
    icon: 'mdi:account',
    color: 'text-blue-600'
  },
  {
    value: 'CARER',
    label: 'Carer',
    description: 'Healthcare provider who delivers services',
    icon: 'mdi:stethoscope',
    color: 'text-green-600'
  },
  {
    value: 'ADMIN',
    label: 'Administrator',
    description: 'System administrator with full access',
    icon: 'mdi:shield-crown',
    color: 'text-purple-600'
  }
]

// Form data
const form = ref({
  role: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  // Carer-specific fields
  specialty: '',
  experience: '',
  certifications: '',
  // Admin-specific fields
  adminLevel: '',
  department: '',
  // Account settings
  emailNotifications: true,
  smsNotifications: false,
  active: true
})

// Methods
const createUser = async () => {
  // Validate form
  if (!validateForm()) {
    return
  }

  loading.value = true
  
  try {
    // Prepare user data based on role
    const userData = {
      role: form.value.role,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      address: form.value.address,
      city: form.value.city,
      state: form.value.state,
      zipCode: form.value.zipCode,
      country: form.value.country,
      emailNotifications: form.value.emailNotifications,
      smsNotifications: form.value.smsNotifications,
      active: form.value.active
    }

    // Add role-specific data
    if (form.value.role === 'CARER') {
      userData.specialty = form.value.specialty
      userData.experience = parseInt(form.value.experience)
      userData.certifications = form.value.certifications
    }

    if (form.value.role === 'ADMIN') {
      userData.adminLevel = form.value.adminLevel
      userData.department = form.value.department
    }

    // Create via API
    await $fetch('/api/admin/users', {
      method: 'POST',
      body: userData,
      headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` }
    })
    
    // Redirect to users list
    await router.push('/admin/users')
    
  } catch (error) {
    console.error('Error creating user:', error)
    alert('Error creating user. Please try again.')
  } finally {
    loading.value = false
  }
}

const validateForm = () => {
  // Basic validation
  if (!form.value.role) {
    alert('Please select a user role')
    return false
  }

  if (!form.value.firstName || !form.value.lastName) {
    alert('Please enter first and last name')
    return false
  }

  if (!form.value.email) {
    alert('Please enter a valid email address')
    return false
  }

  if (!form.value.phone) {
    alert('Please enter a phone number')
    return false
  }

  if (!form.value.password) {
    alert('Please enter a password')
    return false
  }

  if (form.value.password !== form.value.confirmPassword) {
    alert('Passwords do not match')
    return false
  }

  if (form.value.password.length < 8) {
    alert('Password must be at least 8 characters long')
    return false
  }

  // Role-specific validation
  if (form.value.role === 'CARER') {
    if (!form.value.specialty) {
      alert('Please select a specialty for the carer')
      return false
    }
    if (!form.value.experience) {
      alert('Please enter years of experience')
      return false
    }
  }

  if (form.value.role === 'ADMIN') {
    if (!form.value.adminLevel) {
      alert('Please select an admin level')
      return false
    }
  }

  return true
}

const resetForm = () => {
  form.value = {
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    specialty: '',
    experience: '',
    certifications: '',
    adminLevel: '',
    department: '',
    emailNotifications: true,
    smsNotifications: false,
    active: true
  }
}

// Load country list from public JSON on mount
onMounted(async () => {
  try {
    const res = await fetch('/countries.json')
    if (res.ok) {
      countries.value = await res.json()
    }
  } catch (e) {
    console.error('Failed to load countries', e)
  }
})

function onCountryInputChange() {
  const found = countries.value.find(c => c.name.toLowerCase() === countrySearch.value.trim().toLowerCase())
  if (found) {
    form.value.country = found.code
  } else {
    form.value.country = ''
  }
}
</script> 