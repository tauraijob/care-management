  <template>
  <div>
    <!-- Loading Screen -->
    <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Add New Patient</h1>
            <p class="text-gray-600">Add a family member or dependent to your account</p>
          </div>

          <!-- Error Message -->
          <div v-if="errors.submit" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <Icon name="mdi:alert-circle" class="text-red-400 text-lg" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ errors.submit }}</p>
              </div>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="showSuccessMessage" class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <Icon name="mdi:check-circle" class="text-green-400 text-lg" />
              </div>
              <div class="ml-3">
                <p class="text-sm text-green-800 font-medium">Patient successfully added!</p>
                <p class="text-xs text-green-600 mt-1">Redirecting to patients list...</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">First Name *</label>
                <input 
                  type="text" 
                  v-model="form.firstName" 
                  class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                  class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.dateOfBirth }"
                :max="today"
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
                class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter patient's address"
              ></textarea>
            </div>

            <!-- Emergency Contact -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="form-label">Contact Name</label>
                  <input 
                    type="text" 
                    v-model="form.emergencyContact.name" 
                    class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label class="form-label">Relationship</label>
                  <input 
                    type="text" 
                    v-model="form.emergencyContact.relationship" 
                    class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Spouse, Child, Parent"
                  />
                </div>
                <div>
                  <label class="form-label">Phone Number</label>
                  <input 
                    type="tel" 
                    v-model="form.emergencyContact.phone" 
                    class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="+27611234567"
                  />
                </div>
                <div>
                  <label class="form-label">Email</label>
                  <input 
                    type="email" 
                    v-model="form.emergencyContact.email" 
                    class="input-field focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            <!-- Medical Information -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>

              <!-- Medical Conditions -->
              <div class="mb-6">
                <label class="form-label">Medical Conditions</label>
                <div class="space-y-2">
                  <div v-for="(condition, index) in form.medicalConditions.conditions" :key="index" class="flex items-center space-x-2">
                    <input 
                      type="text" 
                      v-model="form.medicalConditions.conditions[index]" 
                      class="input-field flex-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Diabetes, Hypertension"
                    />
                    <button 
                      type="button" 
                      @click="removeCondition(index)" 
                      class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icon name="mdi:delete" class="text-lg" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    @click="addCondition" 
                    class="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Icon name="mdi:plus" />
                    <span>Add Condition</span>
                  </button>
                </div>
              </div>

              <!-- Medications -->
              <div class="mb-6">
                <label class="form-label">Current Medications</label>
                <div class="space-y-2">
                  <div v-for="(medication, index) in form.medicalConditions.medications" :key="index" class="flex items-center space-x-2">
                    <input 
                      type="text" 
                      v-model="form.medicalConditions.medications[index]" 
                      class="input-field flex-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Metformin, Lisinopril"
                    />
                    <button 
                      type="button" 
                      @click="removeMedication(index)" 
                      class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icon name="mdi:delete" class="text-lg" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    @click="addMedication" 
                    class="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Icon name="mdi:plus" />
                    <span>Add Medication</span>
                  </button>
                </div>
              </div>

              <!-- Allergies -->
              <div>
                <label class="form-label">Allergies</label>
                <div class="space-y-2">
                  <div v-for="(allergy, index) in form.medicalConditions.allergies" :key="index" class="flex items-center space-x-2">
                    <input 
                      type="text" 
                      v-model="form.medicalConditions.allergies[index]" 
                      class="input-field flex-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Penicillin, Latex"
                    />
                    <button 
                      type="button" 
                      @click="removeAllergy(index)" 
                      class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Icon name="mdi:delete" class="text-lg" />
                    </button>
                  </div>
                  <button 
                    type="button" 
                    @click="addAllergy" 
                    class="text-green-600 hover:text-green-700 text-sm font-medium flex items-center space-x-1"
                  >
                    <Icon name="mdi:plus" />
                    <span>Add Allergy</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between pt-6 border-t border-gray-200">
              <NuxtLink to="/client/patients" class="btn-secondary">
                Cancel
              </NuxtLink>
              <button type="submit" class="btn-primary" :disabled="loading">
                <span v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                {{ loading ? 'Adding Patient...' : 'Add Patient' }}
              </button>
            </div>
          </form>

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
const sidebarRef = ref(null)

// Redirect if not logged in or not a client
onMounted(() => {
  if (!user.value || user.value.role !== 'CLIENT') {
    router.push('/login')
  }
})

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
    conditions: [],
    medications: [],
    allergies: []
  }
})

const errors = ref({})
const loading = ref(false)
const showSuccessMessage = ref(false)

// Get today's date for max date validation
const today = computed(() => {
  const date = new Date()
  return date.toISOString().split('T')[0]
})

// Add medical condition
const addCondition = () => {
  form.value.medicalConditions.conditions.push('')
}

// Remove medical condition
const removeCondition = (index) => {
  form.value.medicalConditions.conditions.splice(index, 1)
}

// Add medication
const addMedication = () => {
  form.value.medicalConditions.medications.push('')
}

// Remove medication
const removeMedication = (index) => {
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
  
  loading.value = true
  
  try {
    // Prepare medical conditions data
    const medicalConditionsData = {}
    form.value.medicalConditions.conditions.forEach(condition => {
      if (condition.trim()) {
        medicalConditionsData[condition.trim()] = 'Not specified' // Assuming details are not collected here
      }
    })
    
    // Prepare medications data
    const medicationsData = form.value.medicalConditions.medications.filter(med => med.trim()).map(med => med.trim())
    
    // Prepare allergies data
    const allergiesData = form.value.medicalConditions.allergies.filter(allergy => allergy.trim()).map(allergy => allergy.trim())
    
    const patientData = {
      firstName: form.value.firstName.trim(),
      lastName: form.value.lastName.trim(),
      dateOfBirth: form.value.dateOfBirth,
      address: form.value.address.trim() || null,
      emergencyContact: form.value.emergencyContact.name.trim() ? {
        name: form.value.emergencyContact.name.trim(),
        phone: form.value.emergencyContact.phone.trim() || '',
        relationship: form.value.emergencyContact.relationship.trim() || '',
        email: form.value.emergencyContact.email.trim() || ''
      } : null,
      medicalConditions: Object.keys(medicalConditionsData).length > 0 ? medicalConditionsData : null,
      medications: medicationsData.length > 0 ? medicationsData : null,
      allergies: allergiesData.length > 0 ? allergiesData : null
    }
    
    const { data, error: fetchError } = await useFetch('/api/patients/create', {
      method: 'POST',
      body: patientData
    })
    
    if (fetchError.value) {
      throw new Error(fetchError.value.message || 'Failed to create patient')
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
      throw new Error('Failed to create patient')
    }
  } catch (error) {
    console.error('Error creating patient:', error)
    errors.value.submit = 'Failed to create patient. Please try again.'
  } finally {
    loading.value = false
  }
}



useHead({ title: 'Add Patient - Lucerna & Stern Health' })
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