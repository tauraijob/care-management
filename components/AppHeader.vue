<template>
  <div>
    <!-- Show loading state while user data is being fetched -->
    <div v-if="!user && isLoading" class="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Icon name="mdi:heart" class="text-white text-lg" />
            </div>
            <div class="ml-3">
              <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-3 w-24 bg-gray-200 rounded animate-pulse mt-1"></div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Public Header for unauthenticated users -->
    <div v-else-if="!user" class="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center">
              <span class="inline-flex items-center justify-center rounded-[10px] bg-lucerna-primary p-1 mr-2">
                <img src="/uploads/logo.png" alt="Lucerna & Stern Health" class="h-12 w-auto rounded-[8px]" />
              </span>
            </NuxtLink>
          </div>

          <!-- Desktop Navigation Menu -->
          <nav class="hidden md:flex items-center space-x-8">
            <NuxtLink to="/" class="text-gray-600 hover:text-lucerna-primary transition-colors">Home</NuxtLink>
            
            <!-- About Us Dropdown -->
            <div class="relative group">
              <button class="text-gray-600 hover:text-lucerna-primary transition-colors flex items-center">
                About Us
                <Icon name="mdi:chevron-down" class="ml-1 text-sm" />
              </button>
              <div class="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/about#story" class="block px-4 py-2 text-gray-700 hover:bg-lucerna-primary hover:text-white">Our Story</NuxtLink>
                  <NuxtLink to="/about#why" class="block px-4 py-2 text-gray-700 hover:bg-lucerna-primary hover:text-white">Why Lucerna & Stern Health</NuxtLink>
                </div>
              </div>
            </div>

            <!-- Services Dropdown -->
            <div class="relative group">
              <button class="text-gray-600 hover:text-lucerna-primary transition-colors flex items-center">
                Services
                <Icon name="mdi:chevron-down" class="ml-1 text-sm" />
              </button>
              <div class="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="py-2">
                  <NuxtLink to="/services?tab=home-health" class="block px-4 py-2 text-gray-700 hover:bg-lucerna-primary hover:text-white">Home Health Aide Services</NuxtLink>
                  <NuxtLink to="/services?tab=concierge" class="block px-4 py-2 text-gray-700 hover:bg-lucerna-primary hover:text-white">Concierge Nursing & Private Duty</NuxtLink>
                  <NuxtLink to="/services?tab=chronic" class="block px-4 py-2 text-gray-700 hover:bg-lucerna-primary hover:text-white">Chronic Conditions</NuxtLink>
                </div>
              </div>
            </div>

            <NuxtLink to="/technology" class="text-gray-600 hover:text-lucerna-primary transition-colors">Technology</NuxtLink>
            <NuxtLink to="/support" class="text-gray-600 hover:text-lucerna-primary transition-colors">FAQs</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-600 hover:text-lucerna-primary transition-colors">Contact</NuxtLink>
          </nav>

          <!-- Desktop Auth Buttons -->
          <div class="hidden md:flex items-center space-x-4">
            <NuxtLink to="/login" class="text-gray-600 hover:text-lucerna-primary transition-colors">Login</NuxtLink>
            <NuxtLink to="/register" class="btn-primary">Get Started</NuxtLink>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-gray-600 hover:text-lucerna-primary">
              <Icon v-if="!mobileMenuOpen" name="mdi:menu" class="w-6 h-6" />
              <Icon v-else name="mdi:close" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            <NuxtLink to="/" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-600 hover:text-lucerna-primary hover:bg-lucerna-background rounded-md">Home</NuxtLink>
            
            <!-- Mobile About Us -->
            <div class="px-3 py-2">
              <div class="text-gray-600 font-medium mb-2">About Us</div>
              <div class="pl-4 space-y-1">
                <NuxtLink to="/about#story" @click="mobileMenuOpen = false" class="block py-1 text-gray-500 hover:text-lucerna-primary">Our Story</NuxtLink>
                <NuxtLink to="/about#why" @click="mobileMenuOpen = false" class="block py-1 text-gray-500 hover:text-lucerna-primary">Why Lucerna & Stern Health</NuxtLink>
              </div>
            </div>

            <!-- Mobile Services -->
            <div class="px-3 py-2">
              <div class="text-gray-600 font-medium mb-2">Services</div>
              <div class="pl-4 space-y-1">
                <NuxtLink to="/services?tab=home-health" @click="mobileMenuOpen = false" class="block py-1 text-gray-500 hover:text-lucerna-primary">Home Health Aide Services</NuxtLink>
                <NuxtLink to="/services?tab=concierge" @click="mobileMenuOpen = false" class="block py-1 text-gray-500 hover:text-lucerna-primary">Concierge Nursing & Private Duty</NuxtLink>
                <NuxtLink to="/services?tab=chronic" @click="mobileMenuOpen = false" class="block py-1 text-gray-500 hover:text-lucerna-primary">Chronic Conditions</NuxtLink>
              </div>
            </div>

            <NuxtLink to="/technology" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-600 hover:text-lucerna-primary hover:bg-lucerna-background rounded-md">Technology</NuxtLink>
            <NuxtLink to="/support" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-600 hover:text-lucerna-primary hover:bg-lucerna-background rounded-md">FAQs</NuxtLink>
            <NuxtLink to="/contact" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-600 hover:text-lucerna-primary hover:bg-lucerna-background rounded-md">Contact</NuxtLink>
            
            <!-- Mobile Auth Buttons -->
            <div class="pt-4 pb-2 space-y-2">
              <NuxtLink to="/login" @click="mobileMenuOpen = false" class="block px-3 py-2 text-gray-600 hover:text-lucerna-primary hover:bg-lucerna-background rounded-md">Login</NuxtLink>
              <NuxtLink to="/register" @click="mobileMenuOpen = false" class="block px-3 py-2 bg-lucerna-primary text-white hover:bg-lucerna-primary-dark rounded-md text-center">Get Started</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Client Header -->
    <ClientHeader v-else-if="user?.role === 'CLIENT'" @toggle-sidebar="$emit('toggleSidebar')" />
    
    <!-- Admin Header -->
    <AdminHeader v-else-if="user?.role === 'ADMIN'" @toggle-sidebar="$emit('toggleSidebar')" />
    
    <!-- Carer Header -->
    <CarerHeader v-else-if="user?.role === 'CARER'" @toggle-sidebar="$emit('toggleSidebar')" />
  </div>
</template>

<script setup>
const { user, isLoading } = useAuth()

// Mobile menu state
const mobileMenuOpen = ref(false)

// Define emits
defineEmits(['toggleSidebar'])
</script> 