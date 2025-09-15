<template>
  <div class="max-w-5xl mx-auto">
    <div class="mb-6">
      <NuxtLink to="/carer/patients" class="text-gray-600 hover:text-gray-900">← Back to Patients</NuxtLink>
      <h1 class="text-2xl font-bold text-gray-900 mt-2">Patient Details</h1>
    </div>
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700">{{ error }}</div>
    <div v-else-if="loading" class="py-8">Loading...</div>
    <div v-else class="space-y-6">
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">{{ patient.firstName }} {{ patient.lastName }}</h2>
            <p class="text-sm text-gray-600">DOB: {{ formatDate(patient.dateOfBirth) }}</p>
          </div>
        </div>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><span class="text-gray-500">Client:</span> {{ patient.client?.firstName }} {{ patient.client?.lastName }}</div>
          <div><span class="text-gray-500">Address:</span> {{ patient.address || 'N/A' }}</div>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Recent Bookings</h3>
        <div v-if="patient.bookings.length === 0" class="text-gray-500 text-sm">No bookings</div>
        <table v-else class="min-w-full divide-y divide-gray-200 text-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left font-medium text-gray-500">Start</th>
              <th class="px-4 py-2 text-left font-medium text-gray-500">Status</th>
              <th class="px-4 py-2 text-left font-medium text-gray-500">Care Type</th>
              <th class="px-4 py-2 text-left font-medium text-gray-500">Amount</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="b in patient.bookings" :key="b.id">
              <td class="px-4 py-2">{{ formatDate(b.startDate) }}</td>
              <td class="px-4 py-2">{{ b.status }}</td>
              <td class="px-4 py-2">{{ b.careType }}</td>
              <td class="px-4 py-2">{{ b.payments?.[0]?.amount ? `$${b.payments[0].amount.toFixed(2)}` : '—' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-4">Recent Logs</h3>
        <div v-if="logs.length === 0" class="text-gray-500 text-sm">No logs</div>
        <ul v-else class="space-y-2 text-sm">
          <li v-for="l in logs" :key="l.id" class="flex justify-between">
            <span>{{ formatDate(l.createdAt) }}</span>
            <span>{{ (l.notes || '').toString().slice(0, 60) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'carer' })
const route = useRoute()
const loading = ref(true)
const error = ref(null)
const patient = ref({ bookings: [], client: null })
const logs = ref([])

const fetchDetails = async () => {
  try {
    loading.value = true
    error.value = null
    const { data } = await useFetch(`/api/carer/patients/${route.params.id}`, { credentials: 'include' })
    if (!data.value?.success) throw new Error('Failed to load')
    patient.value = data.value.patient
    logs.value = data.value.logs || []
  } catch (e) {
    error.value = 'Failed to load patient details'
  } finally {
    loading.value = false
  }
}

const formatDate = (d) => new Date(d).toLocaleString()

onMounted(fetchDetails)
</script>


