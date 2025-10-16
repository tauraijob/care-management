<template>
  <nav class="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg relative z-[100]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-end h-16 relative">
        
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
          <div ref="notificationsRef" class="relative">
            <button 
              @click="toggleNotifications" 
              class="p-0 rounded-full focus:outline-none"
              aria-label="Notifications"
            >
              <div class="w-9 h-9 rounded-full bg-lucerna-primary hover:bg-lucerna-primary-dark transition-colors duration-200 shadow-sm flex items-center justify-center">
                <Icon name="mdi:bell" class="text-white text-base" />
              </div>
              <span v-if="unreadNotifications > 0" class="absolute -top-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white animate-pulse"></span>
            </button>

            <!-- Notifications dropdown -->
            <div v-if="notificationsOpen" class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-50 border border-gray-100">
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-semibold text-gray-900">Notifications</p>
              </div>
              <div v-if="notifications.length === 0" class="p-4 text-sm text-gray-500">No notifications</div>
              <ul v-else class="max-h-80 overflow-auto divide-y divide-gray-100">
                <li v-for="n in notifications" :key="n.id" class="p-3 hover:bg-gray-50 flex space-x-3">
                  <div class="w-8 h-8 rounded-full bg-[#0034b3] flex items-center justify-center flex-shrink-0">
                    <Icon :name="notificationIcon(n.type)" class="text-white text-sm" style="color:#ffffff !important; fill:currentColor" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ n.title || 'Notification' }}</p>
                    <p class="text-xs text-gray-500 line-clamp-2">{{ stripHtml(n.message) }}</p>
                    <p class="text-[11px] text-gray-400 mt-1">{{ timeAgo(n.createdAt) }}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <!-- User Menu -->
          <div ref="userMenuRef" class="relative">
            <button 
              @click="userMenuOpen = !userMenuOpen; console.log('User menu toggled:', userMenuOpen)" 
              class="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50"
            >
              <div class="w-10 h-10 bg-lucerna-primary rounded-full flex items-center justify-center font-semibold shadow-lg">
                <Icon name="mdi:account" class="text-white" />
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium">{{ user?.firstName || 'Carer' }} {{ user?.lastName || 'User' }}</p>
                <p class="text-xs text-gray-500">Healthcare Carer</p>
              </div>
              <Icon name="mdi:chevron-down" class="text-lg text-gray-600" :class="{ 'rotate-180': userMenuOpen }" />
            </button>
            
            <!-- User dropdown -->
            <div v-if="userMenuOpen" class="fixed top-16 right-4 w-56 bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 z-[99999] border border-gray-100" style="background-color: white !important; border: 2px solid red !important;">
              <div class="py-2">
                <div class="px-4 py-2 text-xs text-red-600 bg-yellow-100">DEBUG: Menu is open!</div>
                <NuxtLink to="/carer/profile" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="mdi:account" class="mr-3" />
                  Profile Settings
                </NuxtLink>
                <NuxtLink to="/carer/settings" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
                  <Icon name="mdi:cog" class="mr-3" />
                  Settings
                </NuxtLink>
                <NuxtLink to="/carer/support" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150">
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
const unreadNotifications = ref(0)
const notifications = ref([])

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
const userMenuRef = ref(null)
const notificationsRef = ref(null)

const handleClickOutside = (e) => {
  // Close user menu if clicking outside
  if (userMenuRef.value && !userMenuRef.value.contains(e.target)) {
    userMenuOpen.value = false
  }
  // Close notifications if clicking outside
  if (notificationsRef.value && !notificationsRef.value.contains(e.target)) {
    notificationsOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  loadNotifications()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Define emits
defineEmits(['toggleSidebar'])

const loadNotifications = async () => {
  try {
    const res = await $fetch('/api/notifications/list', { credentials: 'include' })
    notifications.value = res.notifications || []
    unreadNotifications.value = notifications.value.filter((n) => !n.isRead).length
  } catch (e) {
    console.error('Failed to load notifications', e)
  }
}

const toggleNotifications = async () => {
  notificationsOpen.value = !notificationsOpen.value
  if (notificationsOpen.value && unreadNotifications.value > 0) {
    try {
      const ids = notifications.value.filter((n) => !n.isRead).map((n) => n.id)
      await $fetch('/api/notifications/mark-read', { method: 'POST', body: { ids }, credentials: 'include' })
      notifications.value = notifications.value.map((n) => ({ ...n, isRead: true }))
      unreadNotifications.value = 0
    } catch (e) {
      console.error('Failed to mark notifications read', e)
    }
  }
}

const stripHtml = (html) => {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

const notificationIcon = (type) => {
  const t = (type || '').toString().toLowerCase()
  if (t.includes('email')) return 'mdi:email'
  if (t.includes('sms')) return 'mdi:message-text'
  if (t.includes('push')) return 'mdi:bell'
  if (t.includes('whatsapp')) return 'mdi:whatsapp'
  return 'mdi:bell'
}

const timeAgo = (date) => {
  const d = new Date(date)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`
  return d.toLocaleDateString()
}
</script> 