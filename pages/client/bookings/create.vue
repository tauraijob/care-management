<template>
  <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
  
  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Create New Booking</h1>
          <p class="text-gray-600">Schedule healthcare services for your loved ones</p>
        </div>
          
                  <!-- Error Message -->
          <div v-if="errors.form" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <Icon name="mdi:alert-circle" class="text-red-400 text-lg" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ errors.form }}</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Step 1: Patient Selection -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 flex items-center">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span class="text-sm font-semibold text-green-600">1</span>
              </div>
              Select Patient
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="form-label">Patient</label>
                <select v-model="form.patientId" @change="loadPatientDetails" class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="" class="text-gray-900">Select a patient</option>
                  <option v-for="patient in patients" :key="patient.id" :value="patient.id" class="text-gray-900">
                    {{ patient.firstName }} {{ patient.lastName }}
                  </option>
                </select>
                <p v-if="errors.patientId" class="mt-1 text-sm text-red-600">{{ errors.patientId }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Or Add New Patient</label>
                <NuxtLink to="/client/patients/create" class="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  <Icon name="mdi:account" class="mr-2" />
                  Add New Patient
                </NuxtLink>
              </div>
            </div>

            <!-- Patient Details Preview -->
            <div v-if="selectedPatient" class="rounded-xl overflow-hidden">
              <div class="px-4 py-2 bg-lucerna-primary text-white text-on-primary">
                <h4 class="text-sm font-semibold">Patient Information</h4>
              </div>
              <div class="p-4 bg-white">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-500">Name:</span>
                  <span class="ml-2 font-medium text-gray-900">{{ selectedPatient.firstName }} {{ selectedPatient.lastName }}</span>
                </div>
                <div>
                  <span class="text-gray-500">Age:</span>
                  <span class="ml-2 font-medium text-gray-900">{{ selectedPatient.dateOfBirth ? calculateAge(selectedPatient.dateOfBirth) : 'N/A' }} years</span>
                </div>
                <div>
                  <span class="text-gray-500">Medical Conditions:</span>
                  <span class="ml-2 font-medium text-gray-900">
                    {{ selectedPatient.medicalConditions ? (typeof selectedPatient.medicalConditions === 'object' ? Object.keys(selectedPatient.medicalConditions).length : 0) : 0 }} conditions
                  </span>
                </div>
                <div>
                  <span class="text-gray-500">Emergency Contact:</span>
                  <span class="ml-2 font-medium text-gray-900">
                    {{ selectedPatient.emergencyContact ? `${selectedPatient.emergencyContact.name} - ${selectedPatient.emergencyContact.phone}` : 'Not specified' }}
                  </span>
                </div>
              </div>
              </div>
            </div>
          </div>

          <!-- Step 2: Care Type Selection -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 flex items-center">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span class="text-sm font-semibold text-green-600">2</span>
              </div>
              Select Care Type
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="careType in careTypes" :key="careType.value" 
                   @click="form.careType = careType.value"
                   :class="[
                     'p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
                     form.careType === careType.value 
                       ? 'border-green-500 bg-green-50' 
                       : 'border-gray-200 hover:border-gray-300'
                   ]">
                <div class="flex items-center space-x-3">
                  <div :class="[
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    form.careType === careType.value ? 'bg-green-100' : 'bg-gray-100'
                  ]">
                    <Icon :name="careType.icon" class="text-xl" :class="form.careType === careType.value ? 'text-green-600' : 'text-gray-600'" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-900">{{ careType.label }}</h4>
                    <p class="text-sm text-gray-500">{{ careType.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

                     <!-- Step 3: Frequency Selection -->
           <div class="space-y-4">
             <h3 class="text-lg font-medium text-gray-900 flex items-center">
               <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                 <span class="text-sm font-semibold text-green-600">3</span>
               </div>
               Select Frequency
             </h3>
             
             <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div v-for="frequency in frequencies" :key="frequency.value" 
                    @click="form.frequency = frequency.value"
                    :class="[
                      'p-4 border-2 rounded-xl cursor-pointer transition-all duration-200',
                      form.frequency === frequency.value 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    ]">
                 <div class="flex items-center space-x-3">
                   <div :class="[
                     'w-10 h-10 rounded-lg flex items-center justify-center',
                     form.frequency === frequency.value ? 'bg-green-100' : 'bg-gray-100'
                   ]">
                     <Icon :name="frequency.icon" class="text-xl" :class="form.frequency === frequency.value ? 'text-green-600' : 'text-gray-600'" />
                   </div>
                   <div>
                     <h4 class="font-medium text-gray-900">{{ frequency.label }}</h4>
                     <p class="text-sm text-gray-500">{{ frequency.description }}</p>
                   </div>
                 </div>
               </div>
             </div>
             <p v-if="errors.frequency" class="text-sm text-red-600">{{ errors.frequency }}</p>
           </div>

           <!-- Step 4: Schedule Details -->
           <div class="space-y-4">
             <h3 class="text-lg font-medium text-gray-900 flex items-center">
               <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                 <span class="text-sm font-semibold text-green-600">4</span>
               </div>
               Schedule Details
             </h3>
            
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="form-label">Start Date</label>
                  <input type="date" v-model="form.startDate" :min="minDate" class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <p v-if="errors.startDate" class="mt-1 text-sm text-red-600">{{ errors.startDate }}</p>
                </div>
                
                <div>
                  <label class="form-label">End Date</label>
                  <input type="date" v-model="form.endDate" :min="form.startDate" class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <p v-if="errors.endDate" class="mt-1 text-sm text-red-600">{{ errors.endDate }}</p>
                </div>
              </div>
              
              <div v-if="form.frequency === 'ONCE'">
                <label class="form-label">Preferred Time</label>
                <select v-model="form.preferredTime" class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="" class="text-gray-900">Select preferred time</option>
                  <option value="MORNING" class="text-gray-900">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="AFTERNOON" class="text-gray-900">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="EVENING" class="text-gray-900">Evening (4:00 PM - 8:00 PM)</option>
                  <option value="NIGHT" class="text-gray-900">Night (8:00 PM - 12:00 AM)</option>
                </select>
              </div>
            </div>
          </div>

                     <!-- Step 5: Additional Information -->
           <div class="space-y-4">
             <h3 class="text-lg font-medium text-gray-900 flex items-center">
               <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                 <span class="text-sm font-semibold text-green-600">5</span>
               </div>
               Additional Information
             </h3>
            
            <div>
              <label class="form-label">Special Requirements or Notes</label>
              <textarea v-model="form.notes" rows="4" placeholder="Any special instructions, medical requirements, or additional information..." class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"></textarea>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-200">
            <NuxtLink to="/client/bookings" class="inline-flex items-center px-4 py-2 bg-gray-700 text-white text-on-primary rounded-lg hover:bg-gray-800 transition-colors font-medium">
              Cancel
            </NuxtLink>
            
            <button type="submit" :disabled="isSubmitting" class="inline-flex items-center px-4 py-2 bg-[#0034b3] text-white text-on-primary rounded-lg hover:brightness-90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              <span v-if="isSubmitting" class="mr-2 animate-spin">
                <Icon name="mdi:loading" />
              </span>
              <Icon v-else name="mdi:calendar" class="mr-2" />
              {{ isSubmitting ? 'Creating Booking...' : 'Create Booking' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="mdi:check-circle" class="text-green-600 text-3xl" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Booking Created Successfully!</h3>
        <p class="text-gray-600 mb-6">Your healthcare booking has been scheduled. We'll notify you once a carer is assigned.</p>
        <div class="flex space-x-3">
          <button @click="showSuccessModal = false" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Create Another
          </button>
          <NuxtLink to="/client/bookings" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            View Bookings
          </NuxtLink>
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

const router = useRouter()
const route = useRoute()
const { user } = useAuth()
const sidebarRef = ref(null)



// Form data
const form = ref({
  patientId: '',
  careType: '',
  frequency: '',
  startDate: '',
  endDate: '',
  preferredTime: '',
  notes: ''
})

// Form state
const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const errors = ref({})

const { $fetch } = useNuxtApp()

// Patients data
const patients = ref([])
const loadingPatients = ref(true)
const patientError = ref(null)

// Fetch patients from API
const fetchPatients = async () => {
  try {
    loadingPatients.value = true
    patientError.value = null
    
    const { data, error: fetchError } = await useFetch('/api/patients/list')
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to fetch patients')
    }
    
    if (data.value && data.value.success) {
      patients.value = data.value.patients || []
    } else {
      patients.value = []
    }
  } catch (err) {
    console.error('Error fetching patients:', err)
    patientError.value = err.message || 'Failed to load patients'
    patients.value = []
  } finally {
    loadingPatients.value = false
  }
}

onMounted(async () => {
  await fetchPatients()
  
  // Check if patient ID is provided in URL query
  if (route.query.patient) {
    form.value.patientId = route.query.patient
    // Load patient details if patient is selected
    if (patients.value.length > 0) {
      loadPatientDetails()
    }
  }
})

// Watch for patients to be loaded and set patient if provided in URL
watch(patients, (newPatients) => {
  if (route.query.patient && newPatients.length > 0 && !form.value.patientId) {
    form.value.patientId = route.query.patient
    loadPatientDetails()
  }
}, { immediate: true })

// Care types with emoji icons
const careTypes = ref([
  {
    value: 'ELDERLY_CARE',
    label: 'Elderly Care',
    description: 'Comprehensive care for seniors',
            icon: 'mdi:account-group'
  },
  {
    value: 'DISABILITY_CARE',
    label: 'Disability Care',
    description: 'Specialized care for disabilities',
            icon: 'mdi:heart'
  },
  {
    value: 'POST_SURGERY_CARE',
    label: 'Post-Surgery Care',
    description: 'Recovery and rehabilitation support',
            icon: 'mdi:bandage'
  },
  {
    value: 'PALLIATIVE_CARE',
    label: 'Palliative Care',
    description: 'Comfort and quality of life care',
    icon: 'mdi:hand-heart'
  }
])

// Frequency options with emoji icons
const frequencies = ref([
  {
    value: 'ONCE',
    label: 'One-time Visit',
    description: 'Single appointment',
    icon: 'mdi:calendar'
  },
  {
    value: 'DAILY',
    label: 'Daily Care',
    description: 'Every day care service',
    icon: 'mdi:calendar'
  },
  {
    value: 'WEEKLY',
    label: 'Weekly Care',
    description: 'Once per week',
    icon: 'mdi:calendar'
  },
  {
    value: 'MONTHLY',
    label: 'Monthly Care',
    description: 'Once per month',
    icon: 'mdi:calendar'
  }
])

// Computed properties
const selectedPatient = computed(() => {
  if (!form.value.patientId) return null
  return patients.value.find(patient => patient.id === form.value.patientId)
})

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

// Methods
const loadPatientDetails = () => {
  // Patient details are loaded via computed property
  console.log('Loading patient details for:', form.value.patientId)
}

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

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.patientId) {
    errors.value.patientId = 'Please select a patient'
  }
  
  if (!form.value.careType) {
    errors.value.careType = 'Please select a care type'
  }
  
  if (!form.value.frequency) {
    errors.value.frequency = 'Please select frequency'
  }
  
  if (!form.value.startDate) {
    errors.value.startDate = 'Please select start date'
  }
  
  if (!form.value.endDate) {
    errors.value.endDate = 'Please select end date'
  }
  
  if (form.value.startDate && form.value.endDate && form.value.startDate > form.value.endDate) {
    errors.value.endDate = 'End date must be after start date'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  console.log('Form submission started')
  console.log('Form data:', form.value)
  
  if (!validateForm()) {
    console.log('Form validation failed:', errors.value)
    return
  }
  
  console.log('Form validation passed')
  isSubmitting.value = true
  try {
    const { data, error: fetchError } = await useFetch('/api/bookings/create', {
      method: 'POST',
      body: {
        patientId: form.value.patientId,
        careType: form.value.careType,
        frequency: form.value.frequency,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        preferredTime: form.value.preferredTime,
        notes: form.value.notes
      }
    })
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to create booking')
    }
    
    if (data.value && data.value.success) {
      showSuccessModal.value = true
      form.value = {
        patientId: '',
        careType: '',
        frequency: '',
        startDate: '',
        endDate: '',
        preferredTime: '',
        notes: ''
      }
    } else {
      throw new Error('Failed to create booking')
    }
  } catch (error) {
    console.error('Error creating booking:', error)
    errors.value.form = error.message || 'Failed to create booking. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

useHead({ title: 'Create Booking - Lucerna & Stern Health' })
</script>

<style scoped>
.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors bg-white text-gray-900;
}

.btn-primary {
  @apply inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium;
}

.btn-secondary {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium;
}
</style>