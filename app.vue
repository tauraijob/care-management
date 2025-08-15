<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const { init } = useAuth()

// Initialize authentication state when app loads
onMounted(async () => {
  await init()
})
</script> 