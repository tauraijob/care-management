<template>
  <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
    <NuxtLink to="/admin/bookings/create" class="btn-primary flex items-center justify-center gap-2 whitespace-nowrap">
      <Icon name="mdi:plus" class="text-lg" /> New Booking
    </NuxtLink>
    <NuxtLink to="/admin/users/create" class="btn-secondary flex items-center justify-center gap-2 whitespace-nowrap">
      <Icon name="mdi:account-plus" class="text-lg" /> Add User
    </NuxtLink>
    <NuxtLink to="/admin/reports/analytics" class="btn-outline flex items-center justify-center gap-2 whitespace-nowrap">
      <Icon name="mdi:chart-line" class="text-lg" /> Analytics
    </NuxtLink>
  </div>
</template>

<script setup>
// Stateless quick actions group
</script>


