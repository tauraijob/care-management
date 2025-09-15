<template>
  <!-- Desktop Sidebar -->
  <div class="hidden lg:block relative h-screen w-64 bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-lg z-40">
    <div class="flex flex-col h-full">
      <!-- Sidebar Header -->
      <div class="p-6 border-b border-gray-100">
        <NuxtLink to="/carer/dashboard" class="flex items-center">
          <span class="inline-flex items-center justify-center rounded-[10px] bg-lucerna-primary p-1">
            <img src="/uploads/logo.png" alt="Lucerna & Stern Health" class="h-12 w-auto rounded-[8px]" />
          </span>
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <NuxtLink 
          to="/carer/dashboard" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path === '/carer/dashboard' }"
        >
          <Icon name="mdi:view-dashboard" class="text-lg" />
          <span>Dashboard</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/bookings" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/bookings') }"
        >
          <Icon name="mdi:calendar" class="text-lg" />
          <span>My Bookings</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/patients" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/patients') }"
        >
          <Icon name="mdi:account-group" class="text-lg" />
          <span>Patients</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/schedule" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/schedule') }"
        >
          <Icon name="mdi:clock" class="text-lg" />
          <span>Schedule</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/profile" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/profile') }"
        >
          <Icon name="mdi:account" class="text-lg" />
          <span>Profile</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/settings" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/settings') }"
        >
          <Icon name="mdi:cog" class="text-lg" />
          <span>Settings</span>
        </NuxtLink>
      </nav>

      <!-- Quick Actions -->
      <div class="p-4 border-t border-gray-100">
        <h3 class="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
        <div class="space-y-2">
          <NuxtLink 
            to="/carer/bookings/available" 
            class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-white hover:bg-lucerna-primary rounded-lg transition-all duration-200"
          >
            <Icon name="mdi:calendar-search" class="text-sm" />
            <span>Available Jobs</span>
          </NuxtLink>
          <NuxtLink 
            to="/carer/reports" 
            class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-white hover:bg-lucerna-primary rounded-lg transition-all duration-200"
          >
            <Icon name="mdi:chart-line" class="text-sm" />
            <span>Reports</span>
          </NuxtLink>
        </div>
      </div>

      <!-- User Info -->
      <div class="p-4 border-t border-gray-100">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ user?.firstName }} {{ user?.lastName }}</p>
            <p class="text-xs text-gray-500">Carer</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Sidebar -->
  <div v-if="isOpen" class="fixed left-0 top-0 h-screen w-64 bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-lg z-40 transform transition-transform duration-300 lg:hidden" :class="{ '-translate-x-full': !isOpen }">
    <div class="flex flex-col h-full">
      <!-- Sidebar Header -->
      <div class="p-6 border-b border-gray-100">
        <NuxtLink to="/carer/dashboard" class="flex items-center">
          <span class="inline-flex items-center justify-center rounded-[10px] bg-lucerna-primary p-1">
            <img src="/uploads/logo.png" alt="Lucerna & Stern Health" class="h-10 w-auto rounded-[6px]" />
          </span>
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <NuxtLink 
          to="/carer/dashboard" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path === '/carer/dashboard' }"
          @click="closeSidebar"
        >
          <Icon name="mdi:view-dashboard" class="text-lg" />
          <span>Dashboard</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/bookings" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/bookings') }"
          @click="closeSidebar"
        >
          <Icon name="mdi:calendar" class="text-lg" />
          <span>My Bookings</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/patients" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/patients') }"
          @click="closeSidebar"
        >
          <Icon name="mdi:account-group" class="text-lg" />
          <span>Patients</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/schedule" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/schedule') }"
          @click="closeSidebar"
        >
          <Icon name="mdi:clock" class="text-lg" />
          <span>Schedule</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/profile" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/profile') }"
          @click="closeSidebar"
        >
          <Icon name="mdi:account" class="text-lg" />
          <span>Profile</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/carer/settings" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/carer/settings') }"
          @click="closeSidebar"
        >
          <Icon name="mdi:cog" class="text-lg" />
          <span>Settings</span>
        </NuxtLink>
      </nav>

      <!-- Quick Actions -->
      <div class="p-4 border-t border-gray-100">
        <h3 class="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
        <div class="space-y-2">
          <NuxtLink 
            to="/carer/bookings/available" 
            class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-white hover:bg-lucerna-primary rounded-lg transition-all duration-200"
            @click="closeSidebar"
          >
            <Icon name="mdi:calendar-search" class="text-sm" />
            <span>Available Jobs</span>
          </NuxtLink>
          <NuxtLink 
            to="/carer/reports" 
            class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-white hover:bg-lucerna-primary rounded-lg transition-all duration-200"
            @click="closeSidebar"
          >
            <Icon name="mdi:chart-line" class="text-sm" />
            <span>Reports</span>
          </NuxtLink>
        </div>
      </div>

      <!-- User Info -->
      <div class="p-4 border-t border-gray-100">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ user?.firstName }} {{ user?.lastName }}</p>
            <p class="text-xs text-gray-500">Carer</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Overlay -->
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" @click="closeSidebar"></div>
</template>

<script setup>
const { user } = useAuth()
const route = useRoute()

const isOpen = ref(false)

const userInitials = computed(() => {
  if (!user.value) return ''
  return `${user.value.firstName?.charAt(0) || ''}${user.value.lastName?.charAt(0) || ''}`.toUpperCase()
})

const closeSidebar = () => {
  isOpen.value = false
}

// Expose methods for parent components
defineExpose({
  openSidebar: () => { isOpen.value = true },
  closeSidebar
})
</script> 