<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">My Patients</h1>
          <p class="text-sm text-gray-600 mt-1">Manage your assigned patients and their care plans</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportPatients" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors text-brand">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export List
          </button>
          <button @click="showAddPatientModal = true" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            <Icon name="mdi:account-plus" class="mr-2 h-4 w-4" />
            Add Patient
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      <span class="ml-3 text-gray-600">Loading patients...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
      <div class="flex items-center">
        <Icon name="mdi:alert-circle" class="h-5 w-5 text-red-400 mr-2" />
        <span class="text-red-800">{{ error }}</span>
      </div>
    </div>

    <!-- Content -->
    <div v-else>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:account-group" class="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Patients</dt>
                <dd class="text-lg font-medium text-gray-900">{{ totalPatients }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:heart" class="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Patients</dt>
                <dd class="text-lg font-medium text-gray-900">{{ activePatients }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:calendar-clock" class="h-5 w-5 text-yellow-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Today's Visits</dt>
                <dd class="text-lg font-medium text-gray-900">{{ todayVisits }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <Icon name="mdi:star" class="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg. Rating</dt>
                <dd class="text-lg font-medium text-gray-900">4.9/5</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div class="flex-1 max-w-lg">
            <label for="search" class="sr-only">Search patients</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                v-model="searchQuery"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors text-gray-900"
                placeholder="Search patients..."
                type="search"
              />
            </div>
          </div>
          <div class="flex items-center space-x-4">
              <select v-model="statusFilter" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md transition-colors bg-white text-gray-900">
                <option value="" class="text-gray-900">All Status</option>
                <option value="active" class="text-gray-900">Active</option>
                <option value="inactive" class="text-gray-900">Inactive</option>
                <option value="discharged" class="text-gray-900">Discharged</option>
            </select>
              <select v-model="careTypeFilter" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md transition-colors bg-white text-gray-900">
                <option value="" class="text-gray-900">All Care Types</option>
                <option value="elderly" class="text-gray-900">Elderly Care</option>
                <option value="medical" class="text-gray-900">Medical Care</option>
                <option value="physical" class="text-gray-900">Physical Therapy</option>
                <option value="companionship" class="text-gray-900">Companionship</option>
            </select>
            </div>
        </div>
      </div>
    </div>

    <!-- Patients Grid -->
      <div v-if="filteredPatients.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="patient in paginatedPatients" :key="patient.id" class="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                <Icon name="mdi:account" class="h-6 w-6 text-gray-600" />
              </div>
              <div class="ml-3">
                  <h3 class="text-lg font-medium text-gray-900">{{ patient.firstName }} {{ patient.lastName }}</h3>
                  <p class="text-sm text-gray-500">{{ calculateAge(patient.dateOfBirth) }} years old</p>
                </div>
              </div>
              <span :class="getStatusClasses(getPatientStatus(patient))" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                {{ getPatientStatus(patient) }}
              </span>
          </div>
          
          <div class="space-y-3 mb-4">
            <div class="flex items-center text-sm text-gray-600">
              <Icon name="mdi:map-marker" class="h-4 w-4 mr-2 text-gray-400" />
                {{ patient.address || 'Address not provided' }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Icon name="mdi:heart" class="h-4 w-4 mr-2 text-gray-400" />
                {{ getLatestCareType(patient) }}
            </div>
            <div class="flex items-center text-sm text-gray-600">
              <Icon name="mdi:calendar" class="h-4 w-4 mr-2 text-gray-400" />
                {{ getVisitFrequency(patient) }}
              </div>
          </div>
          
          <div class="border-t border-gray-200 pt-4">
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">Last Visit:</span>
                <span class="text-gray-900">{{ formatDate(getLastVisit(patient)) }}</span>
            </div>
            <div class="flex items-center justify-between text-sm mt-1">
              <span class="text-gray-500">Next Visit:</span>
                <span class="text-gray-900">{{ formatDate(getNextVisit(patient)) }}</span>
              </div>
          </div>
          
          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <NuxtLink :to="`/carer/patients/${patient.id}`" class="text-green-600 hover:text-green-900 text-sm font-medium transition-colors">
                View Details
              </NuxtLink>
                <button @click="openEditPatient(patient)" class="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
                Edit
              </button>
            </div>
            <div class="flex items-center space-x-1">
                <NuxtLink :to="`/carer/patients/${patient.id}/care-plan`" class="text-green-600 hover:text-green-900 transition-colors">
                <Icon name="mdi:clipboard-text" class="h-4 w-4" />
              </NuxtLink>
                <NuxtLink :to="`/carer/patients/${patient.id}/history`" class="text-blue-600 hover:text-blue-900 transition-colors">
                <Icon name="mdi:history" class="h-4 w-4" />
              </NuxtLink>
                <button @click="contactPatient(patient)" class="text-purple-600 hover:text-purple-900 transition-colors">
                <Icon name="mdi:phone" class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <Icon name="mdi:account-group" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No patients found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by adding a new patient.</p>
        <div class="mt-6">
          <button @click="showAddPatientModal = true" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            <Icon name="mdi:account-plus" class="mr-2 h-4 w-4" />
            Add Patient
          </button>
        </div>
      </div>

    <!-- Pagination -->
      <div v-if="filteredPatients.length > 0" class="mt-8 bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
      <div class="flex-1 flex justify-between sm:hidden">
          <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Previous
        </button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          Next
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ totalPatients }}</span> results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Icon name="mdi:chevron-left" class="h-5 w-5" />
            </button>
              <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="page === currentPage ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'" class="relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors">
              {{ page }}
            </button>
              <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              <Icon name="mdi:chevron-right" class="h-5 w-5" />
            </button>
          </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Patient Modal -->
    <div v-if="showAddPatientModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Add New Patient</h3>
            <button @click="showAddPatientModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
              <Icon name="mdi:close" class="h-6 w-6" />
            </button>
          </div>
          <form @submit.prevent="addPatient">
            <div class="space-y-6">
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Patient Name *</label>
                <input v-model="newPatient.name" type="text" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors" placeholder="Enter patient name" />
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Age *</label>
                <input v-model="newPatient.age" type="number" min="0" max="120" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors" placeholder="Enter age" />
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Care Type *</label>
                <select v-model="newPatient.careType" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors">
                  <option value="">Select care type</option>
                  <option value="elderly">Elderly Care</option>
                  <option value="medical">Medical Care</option>
                  <option value="physical">Physical Therapy</option>
                  <option value="companionship">Companionship</option>
                </select>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Location</label>
                <input v-model="newPatient.location" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors" placeholder="Enter location" />
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Visit Frequency</label>
                <select v-model="newPatient.frequency" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div class="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button type="button" @click="showAddPatientModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                Add Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Patient Modal -->
  <div v-if="showEditPatientModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
      <div class="mt-3">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Edit Patient</h3>
          <button @click="showEditPatientModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            <Icon name="mdi:close" class="h-6 w-6" />
          </button>
        </div>
        <form @submit.prevent="saveEditPatient">
          <div class="space-y-6">
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">First Name *</label>
              <input v-model="editForm.firstName" type="text" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors" />
            </div>
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Last Name *</label>
              <input v-model="editForm.lastName" type="text" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors" />
            </div>
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Date of Birth *</label>
              <input v-model="editForm.dateOfBirth" type="date" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors" />
            </div>
            <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label class="block text-sm font-semibold text-gray-800 mb-2">Address</label>
              <input v-model="editForm.address" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm bg-white text-gray-900 transition-colors" />
            </div>
          </div>
          <div class="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button type="button" @click="showEditPatientModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">Cancel</button>
            <button type="submit" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'carer',
})

const { user } = useAuth()

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const careTypeFilter = ref('')
const showAddPatientModal = ref(false)
const showEditPatientModal = ref(false)
const selectedPatient = ref(null)
const currentPage = ref(1)
const itemsPerPage = 9
const loading = ref(true)
const error = ref(null)
const patients = ref([])

// Fetch patients from API
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

// Fetch patients on page load
await fetchPatients()

const newPatient = ref({
  name: '',
  age: '',
  careType: '',
  location: '',
  frequency: 'weekly'
})

// Computed properties
const filteredPatients = computed(() => {
  let filtered = patients.value

  if (searchQuery.value) {
    filtered = filtered.filter(patient => 
      `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      getLatestCareType(patient).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(patient => getPatientStatus(patient) === statusFilter.value)
  }

  if (careTypeFilter.value) {
    filtered = filtered.filter(patient => getLatestCareType(patient).toLowerCase().includes(careTypeFilter.value))
  }

  return filtered
})

const paginatedPatients = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPatients.value.slice(start, end)
})

const totalPatients = computed(() => filteredPatients.value.length)
const activePatients = computed(() => patients.value.filter(patient => getPatientStatus(patient) === 'active').length)
const todayVisits = computed(() => {
  const today = new Date().toDateString()
  return patients.value.filter(patient => 
    new Date(getNextVisit(patient)).toDateString() === today
  ).length
})
const totalPages = computed(() => Math.ceil(totalPatients.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalPatients.value))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Helper methods
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

const getPatientStatus = (patient) => {
  if (patient.bookings && patient.bookings.length > 0) {
    const latest = patient.bookings[0]
    if (latest.status === 'CANCELLED') return 'inactive'
    if (latest.status === 'COMPLETED') return 'discharged'
    if (latest.status === 'CONFIRMED' || latest.status === 'IN_PROGRESS' || latest.status === 'ASSIGNED') return 'active'
    return 'active'
  }
  return 'active'
}

const getLatestCareType = (patient) => {
  if (patient.bookings && patient.bookings.length > 0) {
    return patient.bookings[0].careType || 'General Care'
  }
  return 'General Care'
}

const getVisitFrequency = (patient) => {
  if (!patient.bookings || patient.bookings.length < 2) return 'Weekly'
  const [b1, b2] = patient.bookings
  const d1 = new Date(b1.startDate).getTime()
  const d2 = new Date(b2.startDate).getTime()
  const diffDays = Math.abs(d1 - d2) / (1000 * 60 * 60 * 24)
  if (diffDays <= 2) return 'Daily'
  if (diffDays <= 9) return 'Weekly'
  if (diffDays <= 20) return 'Bi-weekly'
  return 'Monthly'
}

const getLastVisit = (patient) => {
  if (patient.bookings && patient.bookings.length > 0) {
    const completedBookings = patient.bookings.filter(b => b.status === 'COMPLETED')
    if (completedBookings.length > 0) {
      return completedBookings[0].startDate
    }
    return patient.bookings[0].startDate
  }
  return null
}

const getNextVisit = (patient) => {
  if (patient.bookings && patient.bookings.length > 0) {
    const upcoming = patient.bookings.filter(b => (b.status === 'CONFIRMED' || b.status === 'ASSIGNED' || b.status === 'IN_PROGRESS') && new Date(b.startDate) > new Date())
    if (upcoming.length > 0) return upcoming[0].startDate
  }
  return null
}

// Methods
const getStatusClasses = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-yellow-100 text-yellow-800',
    discharged: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  if (!dateString) return 'Not scheduled'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const viewPatient = (patient) => {}

const contactPatient = (patient) => {
  // Implement patient contact
  console.log('Contact patient:', patient)
}

const addPatient = () => {
  // Implement patient addition
  console.log('Add patient:', newPatient.value)
  showAddPatientModal.value = false
  newPatient.value = {
    name: '',
    age: '',
    careType: '',
    location: '',
    frequency: 'weekly'
  }
}

// Edit form state
const editForm = ref({ firstName: '', lastName: '', dateOfBirth: '', address: '' })

const openEditPatient = (patient) => {
  selectedPatient.value = patient
  editForm.value.firstName = patient.firstName || ''
  editForm.value.lastName = patient.lastName || ''
  editForm.value.dateOfBirth = patient.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().slice(0,10) : ''
  editForm.value.address = patient.address || ''
  showEditPatientModal.value = true
}

const saveEditPatient = async () => {
  if (!selectedPatient.value) return
  try {
    await $fetch(`/api/patients/${selectedPatient.value.id}`, {
      method: 'PUT',
      body: {
        firstName: editForm.value.firstName,
        lastName: editForm.value.lastName,
        dateOfBirth: editForm.value.dateOfBirth,
        address: editForm.value.address
      },
      headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` }
    })
    showEditPatientModal.value = false
    await fetchPatients()
  } catch (e) {
    console.error('Failed to save patient:', e)
  }
}

const exportPatients = async () => {
  try {
    const res = await $fetch('/api/carer/patients/export', {
      method: 'POST',
      body: { format: 'pdf' },
      responseType: 'arrayBuffer',
      credentials: 'include'
    })
    const blob = new Blob([res], { type: 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `carer-patients-${new Date().toISOString().split('T')[0]}.pdf`
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Failed to export patients:', error)
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}
</script> 