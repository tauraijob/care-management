<template>
  <div class="min-h-screen bg-gradient-to-br from-[#E0F2F7] via-white to-[#E0F2F7]">
    <!-- Header -->
    <PublicHeader />
    
        <!-- Main Content -->
    <div class="flex flex-col justify-center py-16 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-[#1A237E]">
        Create your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/login" class="font-medium text-[#4CAF50] hover:text-[#45a049]">
          sign in to your existing account
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-10 px-6 shadow-soft sm:rounded-xl sm:px-12 border border-gray-100">
        <form @submit.prevent="handleRegister" class="space-y-8">
          <!-- Role Selection -->
          <div>
            <label class="form-label">I am a:</label>
            <div class="mt-2 space-y-3">
              <div class="flex items-center">
                <input
                  id="role-client"
                  v-model="form.role"
                  type="radio"
                  value="CLIENT"
                  class="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300"
                />
                <label for="role-client" class="ml-3 block text-sm font-medium text-gray-700">
                  Client (Need healthcare services)
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="role-carer"
                  v-model="form.role"
                  type="radio"
                  value="CARER"
                  class="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300"
                />
                <label for="role-carer" class="ml-3 block text-sm font-medium text-gray-700">
                  Carer (Provide healthcare services)
                </label>
              </div>
            </div>
            <p v-if="errors.role" class="form-error">{{ errors.role }}</p>
          </div>

          <!-- Name Fields -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="firstName" class="form-label">First Name</label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                class="form-input"
                :class="{ 'border-red-500': errors.firstName }"
                placeholder="Enter your first name"
              />
              <p v-if="errors.firstName" class="form-error">{{ errors.firstName }}</p>
            </div>
            <div>
              <label for="lastName" class="form-label">Last Name</label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                class="form-input"
                :class="{ 'border-red-500': errors.lastName }"
                placeholder="Enter your last name"
              />
              <p v-if="errors.lastName" class="form-error">{{ errors.lastName }}</p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="form-input"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Enter your email address"
            />
            <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="form-label">Phone Number</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="form-input"
              :class="{ 'border-red-500': errors.phone }"
              placeholder="Enter your phone number"
            />
            <p v-if="errors.phone" class="form-error">{{ errors.phone }}</p>
          </div>

          <!-- WhatsApp Opt-in -->
          <div class="flex items-center">
            <input
              id="whatsappOptIn"
              v-model="form.whatsappOptIn"
              type="checkbox"
              class="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300 rounded"
            />
            <label for="whatsappOptIn" class="ml-2 block text-sm text-gray-900">
              I agree to receive WhatsApp notifications for important updates
            </label>
          </div>

          <!-- Password Fields -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                v-model="form.password"
                type="password"
                required
                class="form-input"
                :class="{ 'border-red-500': errors.password }"
                placeholder="Create a password"
              />
              <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
            </div>
            <div>
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                type="password"
                required
                class="form-input"
                :class="{ 'border-red-500': errors.confirmPassword }"
                placeholder="Confirm your password"
              />
              <p v-if="errors.confirmPassword" class="form-error">{{ errors.confirmPassword }}</p>
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              id="agreeTerms"
              v-model="form.agreeTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300 rounded"
            />
            <label for="agreeTerms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <a href="#" class="text-[#4CAF50] hover:text-[#45a049]">Terms and Conditions</a>
              and
              <a href="#" class="text-[#4CAF50] hover:text-[#45a049]">Privacy Policy</a>
            </label>
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex">
              <Icon name="mdi:alert-circle" class="w-5 h-5 text-red-400" />
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ error }}</p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="btn-primary w-full"
            >
              <Icon v-if="isLoading" name="eos-icons:loading" class="w-5 h-5 mr-2 animate-spin" />
              {{ isLoading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    </div>

  </div>
</template>

<script setup>
const { register } = useAuth()
const router = useRouter()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: '',
  whatsappOptIn: false,
  agreeTerms: false
})

const errors = ref({})
const error = ref('')
const isLoading = ref(false)

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.role) {
    errors.value.role = 'Please select your role'
  }
  
  if (!form.value.firstName) {
    errors.value.firstName = 'First name is required'
  }
  
  if (!form.value.lastName) {
    errors.value.lastName = 'Last name is required'
  }
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (form.value.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(form.value.phone.replace(/\s/g, ''))) {
    errors.value.phone = 'Please enter a valid phone number'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }
  
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password'
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
  }
  
  if (!form.value.agreeTerms) {
    errors.value.agreeTerms = 'You must agree to the terms and conditions'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleRegister = async () => {
  error.value = ''
  
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  
  try {
    const userData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone || undefined,
      password: form.value.password,
      role: form.value.role,
      whatsappOptIn: form.value.whatsappOptIn
    }
    
    const result = await register(userData)
    
    if (result.success) {
      // Redirect to dashboard
      await router.push('/client/dashboard')
    } else {
      error.value = result.error || 'Registration failed. Please try again.'
    }
  } catch (err) {
    console.error('Registration error:', err)
    error.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Set page title
useHead({
  title: 'Register - Lucerna & Stern Health'
})
</script>