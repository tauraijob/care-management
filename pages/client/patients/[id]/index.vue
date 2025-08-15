<template>
  <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
  
  <div v-else>
    <div class="max-w-7xl mx-auto">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin">
          <div class="w-12 h-12 bg-white rounded-full"></div>
        </div>
        <p class="mt-6 text-lg text-gray-600 font-medium">Loading patient details...</p>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
          <span class="text-4xl">⚠️</span>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">Error Loading Patient</h3>
        <p class="text-gray-600 mb-8">{{ error }}</p>
        <NuxtLink to="/client/patients" class="btn-primary inline-flex items-center">
          Back to Patients
        </NuxtLink>
      </div>

      <div v-else-if="patient" class="space-y-8">
        <!-- Patient Header -->
        <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <div class="flex items-center space-x-6">
            <div class="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {{ patient.firstName.charAt(0) }}{{ patient.lastName.charAt(0) }}
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ patient.firstName }} {{ patient.lastName }}</h1>
              <div class="flex items-center space-x-4">
                <span class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  <span class="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Age: {{ calculateAge(patient.dateOfBirth) }} years
                </span>
                <span class="text-gray-500">
                  <Icon name="mdi:calendar" class="inline mr-1" /> Born {{ formatDate(patient.dateOfBirth) }}
                </span>
              </div>
            </div>
            <div class="flex space-x-3">
              <NuxtLink v-if="user?.role === 'CLIENT'" :to="`/client/patients/${patientId}/edit`" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <span class="mr-2">✏️</span>
                Edit
              </NuxtLink>
              <NuxtLink v-if="user?.role === 'CLIENT'" :to="`/client/bookings/create?patient=${patientId}`" class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                <Icon name="mdi:calendar" class="mr-2" />
                Book Care
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Patient Information Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Personal Information -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="p-3 bg-blue-100 rounded-lg mr-4">
                <Icon name="mdi:account" class="text-2xl" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Personal Information</h2>
            </div>
            
            <div class="space-y-4">
              <div class="flex items-center p-4 bg-gray-50/50 rounded-lg">
                <Icon name="mdi:calendar" class="text-gray-500 mr-3" />
                <div>
                  <p class="text-sm font-medium text-gray-600">Date of Birth</p>
                  <p class="text-gray-900">{{ formatDate(patient.dateOfBirth) }}</p>
                </div>
              </div>
              
              <div v-if="patient.address" class="flex items-start p-4 bg-gray-50/50 rounded-lg">
                <span class="text-gray-500 mr-3 mt-1">📍</span>
                <div>
                  <p class="text-sm font-medium text-gray-600">Address</p>
                  <p class="text-gray-900">{{ patient.address }}</p>
                </div>
              </div>
              
              <div v-if="patient.emergencyContact" class="flex items-start p-4 bg-gray-50/50 rounded-lg">
                <span class="text-gray-500 mr-3 mt-1">📞</span>
                <div>
                  <p class="text-sm font-medium text-gray-600">Emergency Contact</p>
                  <p class="text-gray-900">{{ patient.emergencyContact.name }}</p>
                  <p class="text-gray-600">{{ patient.emergencyContact.phone }}</p>
                  <p class="text-gray-600">{{ patient.emergencyContact.relationship }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Medical Information -->
          <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div class="flex items-center mb-6">
              <div class="p-3 bg-green-100 rounded-lg mr-4">
                <Icon name="mdi:stethoscope" class="text-2xl" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900">Medical Information</h2>
            </div>
            
            <div class="space-y-4">
              <div v-if="patient.medicalConditions?.conditions?.length > 0" class="space-y-2">
                <div class="flex items-center">
                  <span class="text-gray-500 mr-2">⚠️</span>
                  <p class="text-sm font-medium text-gray-600">Medical Conditions</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="condition in patient.medicalConditions.conditions" :key="condition" class="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                    {{ condition }}
                  </span>
                </div>
              </div>
              
              <div v-if="patient.medicalConditions?.medications?.length > 0" class="space-y-2">
                <div class="flex items-center">
                  <span class="text-gray-500 mr-2">💊</span>
                  <p class="text-sm font-medium text-gray-600">Current Medications</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="medication in patient.medicalConditions.medications" :key="medication" class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {{ medication }}
                  </span>
                </div>
              </div>
              
              <div v-if="patient.medicalConditions?.allergies?.length > 0" class="space-y-2">
                <div class="flex items-center">
                  <span class="text-gray-500 mr-2">🔔</span>
                  <p class="text-sm font-medium text-gray-600">Allergies</p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span v-for="allergy in patient.medicalConditions.allergies" :key="allergy" class="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                    {{ allergy }}
                  </span>
                </div>
              </div>
              
              <div v-if="!patient.medicalConditions?.conditions?.length && !patient.medicalConditions?.medications?.length && !patient.medicalConditions?.allergies?.length" class="text-center py-8 text-gray-500">
                <Icon name="mdi:information" class="text-4xl mb-2" />
                <p>No medical information available</p>
              </div>
            </div>
          </div>
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
const router = useRouter()
const route = useRoute()

const patientId = route.params.id
const patient = ref(null)
const loading = ref(true)
const error = ref(null)

// Fetch patient data
const fetchPatient = async () => {
  try {
    const { data, error: fetchError } = await useFetch(`/api/patients/${patientId}`)
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to fetch patient')
    }
    
    if (data.value && data.value.success) {
      patient.value = data.value.patient
    } else {
      throw new Error('Patient not found')
    }
  } catch (err) {
    console.error('Error fetching patient:', err)
    error.value = err.message || 'Failed to load patient information'
  } finally {
    loading.value = false
  }
}

// Utility functions
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

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getCareTypeText = (careType) => {
  const texts = {
    ELDERLY_CARE: 'Elderly Care',
    DISABILITY_CARE: 'Disability Care',
    POST_SURGERY_CARE: 'Post-Surgery Care',
    PALLIATIVE_CARE: 'Palliative Care'
  }
  return texts[careType] || careType
}

const getStatusText = (status) => {
  const texts = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled'
  }
  return texts[status] || status
}

// Redirect if not logged in
onMounted(() => {
  if (!user.value) {
    router.push('/login')
    return
  }
  fetchPatient()
})

useHead({ title: 'Patient Details - Lucerna & Stern Health' })
</script> 