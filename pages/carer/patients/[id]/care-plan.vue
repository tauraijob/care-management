<template>
  <div class="max-w-5xl mx-auto">
    <NuxtLink to="/carer/patients" class="text-gray-600 hover:text-gray-900">← Back to Patients</NuxtLink>
    <h1 class="text-2xl font-bold text-gray-900 mt-2">Care Plan</h1>
    <div class="bg-white shadow rounded-lg p-6 mt-4">
      <p class="text-gray-600">This page can display and edit the patient's care plan.</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'carer' })
</script>


