<template>
  <div class="max-w-6xl mx-auto py-10">
    <div class="rounded-lg bg-lucerna-primary text-white px-6 py-4 mb-6">
      <h1 class="text-2xl font-bold">Carer Certifications</h1>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Carer</label>
          <select v-model="filters.carerId" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="">All carers</option>
            <option v-for="c in carers" :key="c.id" :value="c.id">{{ c.fullName }}</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input v-model="filters.q" type="text" placeholder="Search by title or file name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>
      <div class="flex items-center gap-3 mb-6">
        <button @click="loadCerts(1)" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-lucerna-primary hover:bg-lucerna-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2">
          <Icon name="mdi:magnify" class="mr-2 h-4 w-4" />
          Apply Filters
        </button>
        <button @click="resetFilters" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Icon name="mdi:refresh" class="mr-2 h-4 w-4" />
          Reset
        </button>
      </div>

      <!-- Table -->
      <div v-if="loading" class="text-gray-500">Loading certifications...</div>
      <div v-else>
        <div v-if="items.length === 0" class="text-gray-500">No certifications found.</div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carer</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="c in items" :key="c.id">
                <td class="px-4 py-2 whitespace-nowrap"><span class="text-lucerna-primary">{{ c.carer?.name || 'Unknown' }}</span></td>
                <td class="px-4 py-2 whitespace-nowrap"><span class="text-lucerna-primary">{{ titleFor(c) }}</span></td>
                <td class="px-4 py-2 whitespace-nowrap">
                  <NuxtLink :href="c.fileUrl" target="_blank" class="text-lucerna-primary hover:text-lucerna-primary-dark">{{ c.fileName }}</NuxtLink>
                </td>
                <td class="px-4 py-2 whitespace-nowrap"><span class="text-lucerna-primary">{{ formatDate(c.issuedAt) }}</span></td>
                <td class="px-4 py-2 whitespace-nowrap"><span class="text-lucerna-primary">{{ formatDate(c.expiresAt) }}</span></td>
                <td class="px-4 py-2 whitespace-nowrap">
                  <button @click="download(c)" class="text-sm text-gray-700 hover:text-gray-900 inline-flex items-center">
                    <Icon name="mdi:download" class="mr-1 h-4 w-4" /> Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="mt-6 flex items-center justify-between">
          <button :disabled="pagination.page === 1" @click="loadCerts(pagination.page - 1)" class="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
          <div class="text-sm text-gray-600">Page {{ pagination.page }} of {{ pagination.pages }}</div>
          <button :disabled="pagination.page === pagination.pages" @click="loadCerts(pagination.page + 1)" class="px-3 py-1 border rounded disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
definePageMeta({ layout: 'admin' })

const carers = ref([])
const loading = ref(false)
const items = ref([])
const pagination = ref({ page: 1, limit: 20, pages: 1, total: 0 })
const filters = ref({ carerId: '', q: '' })

onMounted(async () => {
  await Promise.all([loadCarers(), loadCerts(1)])
})

async function loadCarers() {
  try {
    const { data, error } = await useFetch('/api/admin/carers')
    if (error.value) throw error.value
    carers.value = data.value?.data || data.value || []
  } catch (e) {
    console.error('Failed to load carers', e)
  }
}

async function loadCerts(page = 1) {
  loading.value = true
  try {
    const { data, error } = await useFetch('/api/admin/carers/certificates', {
      query: { page, limit: pagination.value.limit, carerId: filters.value.carerId || undefined, q: filters.value.q || undefined }
    })
    if (error.value) throw error.value
    items.value = data.value?.data?.items || []
    const p = data.value?.data?.pagination || { page: 1, limit: 20, total: 0, pages: 1 }
    pagination.value = p
  } catch (e) {
    console.error('Failed to load certificates', e)
  } finally {
    loading.value = false
  }
}

function resetFilters() {
  filters.value = { carerId: '', q: '' }
  loadCerts(1)
}

function formatDate(d) {
  if (!d) return '-'
  const dt = new Date(d)
  if (isNaN(dt.getTime())) return '-'
  return dt.toLocaleDateString()
}

function download(c) {
  const a = document.createElement('a')
  a.href = c.fileUrl
  a.download = c.fileName || 'certificate'
  a.target = '_blank'
  a.click()
}

function titleFor(c) {
  if (c && c.title) return c.title
  const base = (c && c.fileName) ? String(c.fileName).replace(/\.[^.]+$/, '') : 'Certificate'
  if (c && c.carer && c.carer.name) return `${base} - ${c.carer.name}`
  return base
}
</script>