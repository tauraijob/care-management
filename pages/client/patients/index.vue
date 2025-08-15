<template>
  <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
  
  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">My Patients</h1>
              <p class="text-gray-600">Manage and view all your registered patients</p>
            </div>
            <NuxtLink to="/client/patients/create" class="btn-primary flex items-center space-x-2">
              <Icon name="mdi:plus" />
              <span>Add Patient</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="bg-white rounded-xl p-6 mb-8 border border-gray-100 shadow-sm">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <div class="relative">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search patients by name, email, or phone..." 
                  class="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Icon name="mdi:magnify" />
                </span>
              </div>
            </div>
            <div class="flex gap-2">
              <select v-model="statusFilter" class="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button @click="refreshPatients" class="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2">
                <Icon name="mdi:refresh" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Patients Grid -->
        <div v-if="loading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Loading patients...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="mdi:close-circle" class="text-2xl text-red-600" />
          </div>
          <p class="text-red-600 mb-4">{{ error }}</p>
          <button @click="fetchPatients" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Try Again
          </button>
        </div>

        <div v-else-if="filteredPatients.length === 0" class="text-center py-12">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="mdi:account-group" class="text-2xl" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
          <p class="text-gray-600 mb-6">{{ searchQuery ? 'Try adjusting your search criteria' : 'Get started by adding your first patient' }}</p>
          <NuxtLink to="/client/patients/create" class="btn-primary inline-flex items-center space-x-2">
            <Icon name="mdi:plus" />
            <span>Add Your First Patient</span>
          </NuxtLink>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="patient in filteredPatients" :key="patient.id" class="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            <!-- Patient Header -->
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-semibold text-lg">
                    {{ patient.firstName.charAt(0) }}{{ patient.lastName.charAt(0) }}
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ patient.firstName }} {{ patient.lastName }}</h3>
                    <p class="text-sm text-gray-500">{{ calculateAge(patient.dateOfBirth) }} years old</p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
              
              <!-- Patient Details -->
              <div class="space-y-2">
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon name="mdi:calendar" />
                  <span>Born: {{ new Date(patient.dateOfBirth).toLocaleDateString() }}</span>
                </div>
                <div class="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon name="mdi:map-marker" />
                  <span class="truncate">{{ patient.address }}</span>
                </div>
                <div v-if="patient.emergencyContact" class="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon name="mdi:phone" />
                  <span>{{ patient.emergencyContact.name }} ({{ patient.emergencyContact.relationship }})</span>
                </div>
              </div>
            </div>

            <!-- Medical Info Preview -->
            <div v-if="patient.medicalConditions" class="p-4 bg-gray-50">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Medical Information</h4>
              <div class="flex flex-wrap gap-1">
                <span v-if="patient.medicalConditions.conditions && patient.medicalConditions.conditions.length > 0" class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  {{ patient.medicalConditions.conditions.length }} conditions
                </span>
                <span v-if="patient.medicalConditions.medications && patient.medicalConditions.medications.length > 0" class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {{ patient.medicalConditions.medications.length }} medications
                </span>
                <span v-if="patient.medicalConditions.allergies && patient.medicalConditions.allergies.length > 0" class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                  {{ patient.medicalConditions.allergies.length }} allergies
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="p-4 bg-white">
              <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                  <NuxtLink :to="`/client/patients/${patient.id}`" class="px-3 py-2 text-sm text-green-600 hover:text-green-700 font-medium hover:bg-green-50 rounded-lg transition-colors duration-200">
                    View Details
                  </NuxtLink>
                  <NuxtLink :to="`/client/patients/${patient.id}/edit`" class="px-3 py-2 text-sm text-gray-600 hover:text-gray-700 font-medium hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    Edit
                  </NuxtLink>
                </div>
                <NuxtLink :to="`/client/bookings/create?patient=${patient.id}`" class="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md">
                  Book Care
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredPatients.length > 0" class="mt-8 flex justify-center">
          <div class="flex items-center space-x-2">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="px-3 py-2 text-sm text-gray-600">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
// Apply client layout
definePageMeta({ 
  
  layout: 'client'
})

const { user } = useAuth()
const sidebarRef = ref(null)

const patients = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const statusFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(9)

// Fetch patients
const fetchPatients = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await $fetch('/api/patients/list', {
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`
      }
    })
    
    if (response.success) {
      patients.value = response.patients || []
    } else {
      error.value = response.message || 'Failed to fetch patients'
    }
  } catch (err) {
    console.error('Error fetching patients:', err)
    error.value = 'Failed to load patients. Please try again.'
  } finally {
    loading.value = false
  }
}

// Computed properties
const filteredPatients = computed(() => {
  let filtered = patients.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(patient => 
      patient.firstName.toLowerCase().includes(query) ||
      patient.lastName.toLowerCase().includes(query) ||
      patient.address?.toLowerCase().includes(query) ||
      patient.emergencyContact?.name?.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value) {
    // For now, all patients are considered active
    // You can add status logic here when needed
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredPatients.value.length / itemsPerPage.value)
})

const paginatedPatients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPatients.value.slice(start, end)
})

// Methods
const calculateAge = (dateOfBirth) => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  
  return age
}

const refreshPatients = () => {
  fetchPatients()
}



// Watch for search changes to reset pagination
watch(searchQuery, () => {
  currentPage.value = 1
})

// Fetch patients on mount
onMounted(() => {
  fetchPatients()
})
</script>