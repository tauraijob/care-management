<template>
  <div v-if="items?.length" class="rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-2">
    <div class="flex items-center">
      <Icon name="mdi:alert" class="text-yellow-700 text-base mr-2" />
      <p class="text-sm text-yellow-900 truncate">
        <span class="font-semibold text-yellow-800 mr-1">Attention needed</span>
        {{ items[0] }}
        <span v-if="items.length > 1" class="ml-2 text-yellow-800 font-medium">+{{ items.length - 1 }} more</span>
      </p>
    </div>
  </div>
  
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] }
})
</script>


