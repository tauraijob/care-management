<template>
  <div class="max-w-6xl mx-auto py-10">
    <div class="rounded-lg bg-lucerna-primary text-white px-6 py-4 mb-6">
      <h1 class="text-2xl font-bold">Carer Schedule Management</h1>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Select Carer</label>
          <select v-model="selectedCarerId" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option value="" disabled>Select a carer</option>
            <option v-for="c in carers" :key="c.id" :value="c.id">{{ c.fullName }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input type="date" v-model="startDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input type="date" v-model="endDate" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>

      <div class="flex items-center gap-3 mb-6">
        <button @click="loadSchedule" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-lucerna-primary hover:bg-lucerna-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2">
          <Icon name="mdi:calendar-search" class="mr-2 h-4 w-4" />
          Load Schedule
        </button>
        <button @click="resetFilters" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
          <Icon name="mdi:refresh" class="mr-2 h-4 w-4" />
          Reset
        </button>
      </div>

      <!-- Table -->
      <div v-if="loading" class="text-gray-500">Loading schedule...</div>
      <div v-else>
        <div v-if="events.length === 0" class="text-gray-500">No schedule found for the selected filters.</div>
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Care Type</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="e in events" :key="e.id">
                <td class="px-4 py-2 whitespace-nowrap">{{ formatDate(e.date) }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ formatTimeRange(e) }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ e.patientName }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ e.clientName }}</td>
                <td class="px-4 py-2 whitespace-nowrap">{{ e.careType }}</td>
                <td class="px-4 py-2 whitespace-nowrap"><span :class="statusClass(e.status)" class="px-2 py-1 rounded text-xs">{{ e.status }}</span></td>
                <td class="px-4 py-2 whitespace-nowrap">{{ e.location || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup>
definePageMeta({ layout: 'admin' })

const carers = ref([])
const selectedCarerId = ref('')
const startDate = ref(new Date().toISOString().split('T')[0])
const endDate = ref(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
const events = ref([])
const loading = ref(false)

onMounted(async () => {
  await loadCarers()
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

async function loadSchedule() {
  if (!selectedCarerId.value) return
  loading.value = true
  try {
    const { data, error } = await useFetch('/api/admin/carers/schedule', {
      query: {
        carerId: selectedCarerId.value,
        startDate: startDate.value,
        endDate: endDate.value,
      }
    })
    if (error.value) throw error.value
    events.value = data.value?.data?.events || []
  } catch (e) {
    console.error('Failed to load schedule', e)
  } finally {
    loading.value = false
  }
}

function resetFilters() {
  selectedCarerId.value = ''
  startDate.value = new Date().toISOString().split('T')[0]
  endDate.value = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  events.value = []
}

function formatDate(d) {
  const date = new Date(d)
  return date.toLocaleDateString()
}

function formatTimeRange(e) {
  const s = e.startTime || ''
  const en = e.endTime || ''
  return s && en ? `${s} - ${en}` : (s || en || '-')
}

function statusClass(status) {
  const key = String(status || '').toUpperCase()
  if (key === 'CONFIRMED' || key === 'ASSIGNED' || key === 'IN_PROGRESS') return 'bg-green-100 text-green-700'
  if (key === 'PENDING') return 'bg-yellow-100 text-yellow-800'
  if (key === 'CANCELLED') return 'bg-red-100 text-red-700'
  if (key === 'COMPLETED') return 'bg-blue-100 text-blue-700'
  return 'bg-gray-100 text-gray-700'
}
</script>