<template>
  <!-- Desktop Sidebar -->
  <div class="hidden lg:block relative h-screen w-64 bg-white/95 backdrop-blur-md border-r border-gray-200 shadow-lg z-40">
    <div class="flex flex-col h-full">
      <!-- Sidebar Header -->
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-lucerna-primary rounded-lg flex items-center justify-center">
            <Icon name="mdi:lightning-bolt" class="text-white text-sm" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Admin Portal</h2>
            <p class="text-xs text-gray-500">{{ user?.firstName }} {{ user?.lastName }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <NuxtLink 
          to="/admin/dashboard" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path === '/admin/dashboard' }"
        >
          <Icon name="mdi:view-dashboard" class="text-lg" />
          <span>Dashboard</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/users" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/admin/users') }"
        >
          <Icon name="mdi:account-group" class="text-lg" />
          <span>Users</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/bookings" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/admin/bookings') }"
        >
          <Icon name="mdi:calendar" class="text-lg" />
          <span>Bookings</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/payments" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/admin/payments') }"
        >
          <Icon name="mdi:currency-usd" class="text-lg" />
          <span>Payments</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/reports" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/admin/reports') }"
        >
          <Icon name="mdi:chart-line" class="text-lg" />
          <span>Reports</span>
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/settings" 
          class="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-white hover:bg-lucerna-primary rounded-xl transition-all duration-200 font-medium"
          :class="{ 'bg-lucerna-primary text-white border-r-2 border-lucerna-primary': $route.path.startsWith('/admin/settings') }"
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
            to="/admin/users/create" 
            class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-white hover:bg-lucerna-primary rounded-lg transition-all duration-200"
          >
            <Icon name="mdi:account-plus" class="text-sm" />
            <span>Add User</span>
          </NuxtLink>
          <NuxtLink 
            to="/admin/reports/analytics" 
            class="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-white hover:bg-lucerna-primary rounded-lg transition-all duration-200"
          >
            <Icon name="mdi:chart-bar" class="text-sm" />
            <span>Analytics</span>
          </NuxtLink>
        </div>
      </div>

      <!-- User Info -->
      <div class="p-4 border-t border-gray-100">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-lucerna-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
            {{ userInitials }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{{ user?.firstName }} {{ user?.lastName }}</p>
            <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Sidebar -->
  <div v-if="sidebarOpen" class="lg:hidden fixed inset-0 z-50">
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75" @click="sidebarOpen = false"></div>
    <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
      <div class="absolute top-0 right-0 -mr-12 pt-2">
        <button 
          @click="sidebarOpen = false"
          class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        >
          <Icon name="mdi:close" class="text-white text-xl" />
        </button>
      </div>
      
      <!-- Mobile Sidebar Content -->
      <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
        <div class="flex-shrink-0 flex items-center px-4">
          <div class="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <Icon name="mdi:lightning-bolt" class="text-white text-sm" />
          </div>
          <h2 class="ml-3 text-lg font-semibold text-gray-900">Admin Portal</h2>
        </div>
        <nav class="mt-5 px-2 space-y-1">
          <NuxtLink 
            to="/admin/dashboard" 
            @click="sidebarOpen = false"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="$route.path === '/admin/dashboard' ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'"
          >
            <Icon name="mdi:view-dashboard" class="mr-4 text-lg" />
            Dashboard
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/users" 
            @click="sidebarOpen = false"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="$route.path.startsWith('/admin/users') ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'"
          >
            <Icon name="mdi:account-group" class="mr-4 text-lg" />
            Users
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/bookings" 
            @click="sidebarOpen = false"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="$route.path.startsWith('/admin/bookings') ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'"
          >
            <Icon name="mdi:calendar" class="mr-4 text-lg" />
            Bookings
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/payments" 
            @click="sidebarOpen = false"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="$route.path.startsWith('/admin/payments') ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'"
          >
            <Icon name="mdi:currency-usd" class="mr-4 text-lg" />
            Payments
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/reports" 
            @click="sidebarOpen = false"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="$route.path.startsWith('/admin/reports') ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'"
          >
            <Icon name="mdi:chart-line" class="mr-4 text-lg" />
            Reports
          </NuxtLink>
          
          <NuxtLink 
            to="/admin/settings" 
            @click="sidebarOpen = false"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="$route.path.startsWith('/admin/settings') ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:text-green-600 hover:bg-green-50'"
          >
            <Icon name="mdi:cog" class="mr-4 text-lg" />
            Settings
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
const { user } = useAuth()

const userInitials = computed(() => {
  if (!user.value) return ''
  return `${user.value.firstName?.charAt(0) || ''}${user.value.lastName?.charAt(0) || ''}`.toUpperCase()
})

// Mobile sidebar state
const sidebarOpen = ref(false)

// Expose sidebar state to parent
defineExpose({
  sidebarOpen
})
</script> 