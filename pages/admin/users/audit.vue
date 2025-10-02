<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Audit Log</h1>
        <p class="text-gray-600">Recorded administrative actions across the system</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-100">
        <div class="p-4 border-b border-gray-100 flex items-center justify-between">
          <div class="text-sm text-gray-600">Page {{ data?.page }} of {{ data?.totalPages }} • {{ data?.total }} records</div>
          <div class="space-x-2">
            <button @click="prev" :disabled="page===1" class="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
            <button @click="next" :disabled="page>=data?.totalPages" class="px-3 py-1 border rounded disabled:opacity-50">Next</button>
          </div>
        </div>
        <div class="divide-y">
          <div v-for="item in items" :key="item.id" class="p-4 flex items-start gap-4">
            <div class="w-10 h-10 rounded-full bg-lucerna-primary text-white flex items-center justify-center">
              <Icon name="mdi:clipboard-text" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between">
                <div class="font-medium text-gray-900">{{ item.action }}</div>
                <div class="text-sm text-gray-500">{{ new Date(item.timestamp).toLocaleString() }}</div>
              </div>
              <div class="text-sm text-gray-700 mt-1">
                <span class="text-gray-500">Actor:</span> {{ item.actorEmail || 'System' }} ({{ item.actorRole || 'N/A' }})
                <span class="mx-2">•</span>
                <span class="text-gray-500">Target:</span> {{ item.targetType }} {{ item.targetId }}
              </div>
              <pre v-if="item.details" class="mt-2 bg-gray-50 rounded p-2 text-xs overflow-x-auto">{{ item.details }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'admin' })
const page = ref(1)
const { data: auditData, refresh } = await useFetch(() => `/api/admin/audit?page=${page.value}&limit=50`, {
  headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` },
  server: false
})
const data = computed(() => auditData.value?.data)
const items = computed(() => data.value?.items || [])
function next(){ if (page.value < (data.value?.totalPages || 1)) { page.value++; refresh() } }
function prev(){ if (page.value > 1) { page.value--; refresh() } }
</script>