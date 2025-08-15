<template>
  <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
  
  <div v-else>
    <div class="max-w-4xl mx-auto">
      <div v-if="loading" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div class="text-center">
          <div class="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4 text-4xl">⏳</div>
          <p class="text-gray-500">Loading patient information...</p>
        </div>
      </div>

      <div v-else-if="error" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div class="text-center">
          <div class="w-16 h-16 text-red-500 mx-auto mb-4 text-4xl">⚠️</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Patient</h3>
          <p class="text-gray-500 mb-6">{{ error }}</p>
          <NuxtLink to="/client/patients" class="btn-primary">
            Back to Patients
          </NuxtLink>
        </div>
      </div>

      <div v-else-if="patient" class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Edit Patient</h1>
          <p class="text-gray-600">Update information for {{ patient.firstName }} {{ patient.lastName }}</p>
        </div>

        <!-- Error/Success Messages -->
        <div v-if="errors.submit" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <span class="text-red-400 text-lg">⚠️</span>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-800">{{ errors.submit }}</p>
            </div>
          </div>
        </div>

        <div v-if="showSuccessMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div class="flex">
            <div class="flex-shrink-0">
              <span class="text-green-400 text-lg">✅</span>
            </div>
            <div class="ml-3">
              <p class="text-sm text-green-800 font-medium">Patient successfully updated!</p>
              <p class="text-xs text-green-600 mt-1">Redirecting to patients list...</p>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="form-label">First Name *</label>
              <input 
                type="text" 
                v-model="form.firstName" 
                class="input-field"
                :class="{ 'border-red-500': errors.firstName }"
                required
              />
              <p v-if="errors.firstName" class="text-red-500 text-sm mt-1">{{ errors.firstName }}</p>
            </div>

            <div>
              <label class="form-label">Last Name *</label>
              <input 
                type="text" 
                v-model="form.lastName" 
                class="input-field"
                :class="{ 'border-red-500': errors.lastName }"
                required
              />
              <p v-if="errors.lastName" class="text-red-500 text-sm mt-1">{{ errors.lastName }}</p>
            </div>
          </div>

          <!-- Date of Birth -->
          <div>
            <label class="form-label">Date of Birth *</label>
            <input 
              type="date" 
              v-model="form.dateOfBirth" 
              class="input-field"
              :class="{ 'border-red-500': errors.dateOfBirth }"
              required
            />
            <p v-if="errors.dateOfBirth" class="text-red-500 text-sm mt-1">{{ errors.dateOfBirth }}</p>
          </div>

          <!-- Address -->
          <div>
            <label class="form-label">Address</label>
            <textarea 
              v-model="form.address" 
              rows="3"
              class="input-field"
              placeholder="Enter patient's address"
            ></textarea>
          </div>

          <!-- Emergency Contact -->
          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">Contact Name</label>
                <input 
                  type="text" 
                  v-model="form.emergencyContact.name" 
                  class="input-field"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label class="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  v-model="form.emergencyContact.phone" 
                  class="input-field"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label class="form-label">Relationship</label>
                <input 
                  type="text" 
                  v-model="form.emergencyContact.relationship" 
                  class="input-field"
                  placeholder="e.g., Son, Daughter, Spouse"
                />
              </div>

              <div>
                <label class="form-label">Email (Optional)</label>
                <input 
                  type="email" 
                  v-model="form.emergencyContact.email" 
                  class="input-field"
                  placeholder="Email address"
                />
              </div>
            </div>
          </div>

          <!-- Medical Conditions -->
          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Medical Information</h3>
            
            <!-- Medical Conditions -->
            <div class="space-y-4">
              <div>
                <label class="form-label">Medical Conditions</label>
                <div class="space-y-2">
                  <div v-for="(condition, index) in form.medicalConditions.conditions" :key="index" class="flex gap-2">
                    <input 
                      type="text" 
                      v-model="form.medicalConditions.conditions[index]" 
                      class="input-field flex-1"
                      :placeholder="`Condition ${index + 1}`"
                    />
                    <input 
                      type="text" 
                      v-model="form.medicalConditions.medications[index]" 
                      class="input-field flex-1"
                      :placeholder="`Medication for condition ${index + 1}`"
                    />
                    <button 
                      type="button" 
                      @click="removeMedicalCondition(index)"
                      class="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      <Icon name="mdi:close" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    @click="addMedicalCondition"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Medical Condition
                  </button>
                </div>
              </div>

              <!-- Allergies -->
              <div>
                <label class="form-label">Allergies</label>
                <div class="space-y-2">
                  <div v-for="(allergy, index) in form.medicalConditions.allergies" :key="index" class="flex gap-2">
                    <input 
                      type="text" 
                      v-model="form.medicalConditions.allergies[index]" 
                      class="input-field flex-1"
                      :placeholder="`Allergy ${index + 1}`"
                    />
                    <button 
                      type="button" 
                      @click="removeAllergy(index)"
                      class="px-3 py-2 text-red-600 hover:text-red-800"
                    >
                      <Icon name="mdi:close" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    @click="addAllergy"
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    + Add Allergy
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-between pt-6 border-t border-gray-200">
            <NuxtLink to="/client/patients" class="btn-secondary">
              Cancel
            </NuxtLink>
            <button type="submit" class="btn-primary" :disabled="loading">
              <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2">
                <Icon name="mdi:loading" />
              </span>
              {{ loading ? 'Updating Patient...' : 'Update Patient' }}
            </button>
          </div>
        </form>
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
const isLoading = ref(false)
const showSuccessMessage = ref(false)

// Form data
const form = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  address: '',
  emergencyContact: {
    name: '',
    phone: '',
    relationship: '',
    email: ''
  },
  medicalConditions: {
    conditions: [''],
    medications: [''],
    allergies: ['']
  }
})

// Form errors
const errors = ref({})

// Fetch patient data
const fetchPatient = async () => {
  try {
    const { data, error: fetchError } = await useFetch(`/api/patients/${patientId}`)
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to fetch patient')
    }
    
    if (data.value && data.value.success) {
      patient.value = data.value.patient
      
      // Populate form with patient data
      form.value = {
        firstName: patient.value.firstName || '',
        lastName: patient.value.lastName || '',
        dateOfBirth: patient.value.dateOfBirth ? new Date(patient.value.dateOfBirth).toISOString().split('T')[0] : '',
        address: patient.value.address || '',
        emergencyContact: {
          name: patient.value.emergencyContact?.name || '',
          phone: patient.value.emergencyContact?.phone || '',
          relationship: patient.value.emergencyContact?.relationship || '',
          email: patient.value.emergencyContact?.email || ''
        },
        medicalConditions: {
          conditions: patient.value.medicalConditions?.conditions || [''],
          medications: patient.value.medicalConditions?.medications || [''],
          allergies: patient.value.medicalConditions?.allergies || ['']
        }
      }
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

// Add medical condition
const addMedicalCondition = () => {
  form.value.medicalConditions.conditions.push('')
  form.value.medicalConditions.medications.push('')
}

// Remove medical condition
const removeMedicalCondition = (index) => {
  form.value.medicalConditions.conditions.splice(index, 1)
  form.value.medicalConditions.medications.splice(index, 1)
}

// Add allergy
const addAllergy = () => {
  form.value.medicalConditions.allergies.push('')
}

// Remove allergy
const removeAllergy = (index) => {
  form.value.medicalConditions.allergies.splice(index, 1)
}

// Form validation
const validateForm = () => {
  errors.value = {}
  
  if (!form.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
  }
  
  if (!form.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
  }
  
  if (!form.value.dateOfBirth) {
    errors.value.dateOfBirth = 'Date of birth is required'
  } else if (new Date(form.value.dateOfBirth) > new Date()) {
    errors.value.dateOfBirth = 'Date of birth cannot be in the future'
  }
  
  return Object.keys(errors.value).length === 0
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return
  
  isLoading.value = true
  
  try {
    // Prepare medical conditions data
    const medicalConditionsData = {}
    form.value.medicalConditions.conditions.forEach((condition, index) => {
      if (condition.trim()) {
        medicalConditionsData[condition.trim()] = form.value.medicalConditions.medications[index] || 'Not specified'
      }
    })
    
    // Prepare emergency contact data
    const emergencyContactData = form.value.emergencyContact.name.trim() ? {
      name: form.value.emergencyContact.name.trim(),
      phone: form.value.emergencyContact.phone.trim() || '',
      relationship: form.value.emergencyContact.relationship.trim() || '',
      email: form.value.emergencyContact.email.trim() || ''
    } : null
    
    const patientData = {
      firstName: form.value.firstName.trim(),
      lastName: form.value.lastName.trim(),
      dateOfBirth: form.value.dateOfBirth,
      address: form.value.address.trim() || null,
      medicalConditions: Object.keys(medicalConditionsData).length > 0 ? medicalConditionsData : null,
      emergencyContact: emergencyContactData
    }
    
    const { data, error: fetchError } = await useFetch(`/api/patients/${patientId}`, {
      method: 'PUT',
      body: patientData
    })
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to update patient')
    }
    
    if (data.value && data.value.success) {
      // Show success message first
      showSuccessMessage.value = true
      errors.value.submit = null // Clear any previous errors
      
      // Wait a moment for user to see the success message, then redirect
      setTimeout(async () => {
        await router.push('/client/patients')
      }, 2000)
    } else {
      throw new Error('Failed to update patient')
    }
  } catch (error) {
    console.error('Error updating patient:', error)
    errors.value.submit = 'Failed to update patient. Please try again.'
  } finally {
    isLoading.value = false
  }
}

// Redirect if not logged in or not a client
onMounted(() => {
  if (!user.value || user.value.role !== 'CLIENT') {
    router.push('/login')
    return
  }
  fetchPatient()
})

useHead({ title: 'Edit Patient - Lucerna & Stern Health' })
</script>

<style scoped>
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}

.input-field {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white text-gray-900;
}

.btn-primary {
  @apply inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium;
}

.btn-secondary {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium;
}
</style> 