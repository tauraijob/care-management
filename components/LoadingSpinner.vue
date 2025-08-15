<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">{{ message || 'Loading...' }}</p>
      <p v-if="subMessage" class="text-sm text-gray-500 mt-2">{{ subMessage }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  },
  subMessage: {
    type: String,
    default: ''
  }
})
</script> 