<template>
  <nav class="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end h-16">
        
        <!-- Right Side Actions -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Menu Button -->
          <button 
            @click="$emit('toggleSidebar')" 
            class="lg:hidden p-2 text-gray-600 hover:text-lucerna-primary transition-colors duration-200 hover:bg-lucerna-background rounded-lg"
          >
            <span class="text-xl">☰</span>
          </button>
          
          <!-- Notifications -->
          <button 
            @click="notificationsOpen = !notificationsOpen" 
            class="relative p-2 text-gray-600 hover:text-lucerna-primary transition-colors duration-200 hover:bg-lucerna-background rounded-lg"
          >
            <Icon name="mdi:bell" class="text-xl" />
            <span v-if="unreadNotifications > 0" class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 animate-pulse"></span>
          </button>
          
          <!-- User Menu -->
          <div class="relative">
            <button 
              @click="userMenuOpen = !userMenuOpen" 
              class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50"
            >
              <div class="w-10 h-10 bg-lucerna-primary text-white rounded-full flex items-center justify-center font-semibold shadow-lg">
                {{ userInitials }}
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium">{{ user?.firstName || 'Client' }} {{ user?.lastName || 'User' }}</p>
                <p class="text-xs text-gray-500">Client</p>
              </div>
              <span class="text-lg transition-transform duration-200" :class="{ 'rotate-180': userMenuOpen }">▼</span>
            </button>
            
            <!-- User dropdown -->
            <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 border border-gray-100">
              <div class="py-2">
                <NuxtLink to="/profile" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="mdi:account" class="mr-3" />
                  Profile Settings
                </NuxtLink>
                <NuxtLink to="/settings" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="mdi:cog" class="mr-3" />
                  Settings
                </NuxtLink>
                <NuxtLink to="/support" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="mdi:chat" class="mr-3" />
                  Support
                </NuxtLink>
                <div class="border-t border-gray-100 my-1"></div>
                <button @click="handleLogout" class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
                  <Icon name="mdi:logout" class="mr-3" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const { user, logout } = useAuth()
const router = useRouter()
const route = useRoute()

const userMenuOpen = ref(false)
const notificationsOpen = ref(false)
const unreadNotifications = ref(3) // This would come from your notifications system

const userInitials = computed(() => {
  if (!user.value) return ''
  return `${user.value.firstName?.charAt(0) || ''}${user.value.lastName?.charAt(0) || ''}`.toUpperCase()
})

const handleLogout = async () => {
  try {
    await logout()
    await router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      userMenuOpen.value = false
      notificationsOpen.value = false
    }
  })
})

// Define emits
defineEmits(['toggleSidebar'])
</script> 