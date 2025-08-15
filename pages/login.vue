<template>
  <div class="min-h-screen bg-gradient-to-br from-[#E0F2F7] via-white to-[#E0F2F7] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="text-center text-3xl font-extrabold text-[#1A237E]">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <NuxtLink to="/register" class="font-medium text-[#4CAF50] hover:text-[#45a049]">
          create a new account
        </NuxtLink>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow-soft sm:rounded-xl sm:px-10 border border-gray-100">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="form-input"
              :class="{ 'border-red-500': errors.email }"
              placeholder="Enter your email"
            />
            <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="form-input"
              :class="{ 'border-red-500': errors.password }"
              placeholder="Enter your password"
            />
            <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="form.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-[#4CAF50] focus:ring-[#4CAF50] border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-[#4CAF50] hover:text-[#45a049]">
                Forgot your password?
              </a>
            </div>
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
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div class="mt-6">
              <button
                type="button"
                class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
              >
                <Icon name="mdi:google" class="w-5 h-5" />
                <span class="ml-2">Continue with Google</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="mt-8 text-center">
      <p class="text-sm text-gray-600">
        Need help? Contact us at 
        <a href="https://wa.me/263710708027" class="text-[#4CAF50] hover:text-[#45a049] font-medium">
          +263 710708027
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
const { login, isLoading } = useAuth()
const router = useRouter()

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const errors = ref({})
const error = ref('')



const validateForm = () => {
  errors.value = {}
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
    error.value = ''
    
    if (!validateForm()) {
        return
    }
    
    try {
        const result = await login(form.value.email, form.value.password)
        
        if (result.success) {
            // Add a small delay to ensure authentication state is properly set
            await new Promise(resolve => setTimeout(resolve, 500))
            
            // Double-check authentication state
            const { checkAuth } = useAuth()
            const isAuthenticated = await checkAuth()
            
            if (!isAuthenticated) {
                await new Promise(resolve => setTimeout(resolve, 1000))
                const retryAuth = await checkAuth()
            }
            
            // Redirect based on user role
            let redirectPath = ''
            if (result.user?.role === 'ADMIN') {
                redirectPath = '/admin/dashboard'
            } else if (result.user?.role === 'CARER') {
                redirectPath = '/carer/dashboard'
            } else {
                redirectPath = '/client/dashboard'
            }
            
            try {
                await router.push(redirectPath)
            } catch (routerError) {
                // Fallback to window.location
                window.location.href = redirectPath
            }
        } else {
            error.value = result.error || 'Login failed. Please try again.'
        }
    } catch (err) {
        console.error('Login error:', err)
        error.value = 'An unexpected error occurred. Please try again.'
    }
}

// Set page title
useHead({
  title: 'Login - Lucerna & Stern Health'
})
</script>