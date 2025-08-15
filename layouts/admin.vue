<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Admin Sidebar - Fixed position, full height -->
    <div class="fixed left-0 top-0 h-screen w-64 z-40">
      <AdminSidebar />
    </div>
    
    <!-- Right side content area - with left margin to account for fixed sidebar -->
    <div class="flex-1 flex flex-col min-w-0 ml-64">
      <!-- Admin Header - Fixed position -->
      <div class="fixed top-0 right-0 left-64 h-16 bg-white border-b border-gray-200 z-30">
        <AdminHeader />
      </div>
      
      <!-- Main Content - Scrollable area with top margin for fixed header -->
      <main class="flex-1 p-6 mt-16 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// This layout is specifically for admin pages
// It includes the AdminHeader and AdminSidebar components
</script> 