<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold mb-2">Training & Development</h1>
              <p class="text-green-100 text-lg">Enhance your skills and stay certified in healthcare</p>
              <div class="flex items-center mt-4 space-x-6">
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:school" class="text-lg" />
                  <span class="text-sm">{{ completedModules }} modules completed</span>
                </div>
                <div class="flex items-center space-x-2">
                  <Icon name="mdi:certificate" class="text-lg" />
                  <span class="text-sm">{{ activeCertifications }} active certifications</span>
                </div>
              </div>
            </div>
            <div class="hidden lg:block">
              <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <Icon name="mdi:school" class="text-white text-4xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Training Progress Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Overall Progress</p>
              <p class="text-2xl font-bold text-gray-900">{{ overallProgress }}%</p>
              <p class="text-xs text-green-600 mt-2">+5% this month</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:chart-line" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Completed Modules</p>
              <p class="text-2xl font-bold text-gray-900">{{ completedModules }}</p>
              <p class="text-xs text-blue-600 mt-2">Out of {{ totalModules }}</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:check-circle" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Certifications</p>
              <p class="text-2xl font-bold text-gray-900">{{ activeCertifications }}</p>
              <p class="text-xs text-purple-600 mt-2">{{ expiringSoon }} expiring soon</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:certificate" class="text-2xl" />
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Study Hours</p>
              <p class="text-2xl font-bold text-gray-900">{{ studyHours }}</p>
              <p class="text-xs text-orange-600 mt-2">This month</p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Icon name="mdi:clock" class="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- Training Categories -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Available Modules -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Available Training Modules</h2>
            <div class="flex space-x-2">
              <button @click="filterModules('all')" :class="[
                selectedFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600',
                'px-3 py-1 rounded-lg text-sm font-medium transition-colors'
              ]">
                All
              </button>
              <button @click="filterModules('required')" :class="[
                selectedFilter === 'required' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600',
                'px-3 py-1 rounded-lg text-sm font-medium transition-colors'
              ]">
                Required
              </button>
              <button @click="filterModules('elective')" :class="[
                selectedFilter === 'elective' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600',
                'px-3 py-1 rounded-lg text-sm font-medium transition-colors'
              ]">
                Elective
              </button>
            </div>
          </div>
          
          <div class="space-y-4">
            <div v-for="module in filteredModules" :key="module.id" class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon :name="module.icon" class="text-green-600 text-lg" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">{{ module.title }}</h3>
                      <p class="text-sm text-gray-500">{{ module.duration }} • {{ module.level }}</p>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mb-3">{{ module.description }}</p>
                  <div class="flex items-center space-x-4">
                    <span :class="[
                      module.type === 'Required' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800',
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
                    ]">
                      {{ module.type }}
                    </span>
                    <span class="text-xs text-gray-500">{{ module.credits }} credits</span>
                    <span v-if="module.deadline" class="text-xs text-orange-600">
                      Due: {{ module.deadline }}
                    </span>
                  </div>
                </div>
                <div class="flex flex-col items-end space-y-2">
                  <div v-if="module.progress > 0" class="w-20 bg-gray-200 rounded-full h-2">
                    <div class="bg-green-600 h-2 rounded-full" :style="{ width: module.progress + '%' }"></div>
                  </div>
                  <button @click="startModule(module.id)" :class="[
                    module.progress > 0 ? 'btn-secondary' : 'btn-primary',
                    'text-sm'
                  ]">
                    <Icon :name="module.progress > 0 ? 'mdi:play' : 'mdi:play'" class="mr-1" />
                    {{ module.progress > 0 ? 'Continue' : 'Start' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Certifications & Achievements -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Certifications</h2>
          <div class="space-y-4">
            <div v-for="cert in certifications" :key="cert.id" class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center space-x-3 mb-2">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="mdi:certificate" class="text-green-600 text-sm" />
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ cert.name }}</h3>
                  <p class="text-xs text-gray-500">Issued: {{ cert.issuedDate }}</p>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-xs text-gray-500">Expires: {{ cert.expiryDate }}</span>
                <span :class="[
                  cert.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium'
                ]">
                  {{ cert.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Current Learning Path -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Current Learning Path</h2>
        <div class="relative">
          <div class="flex items-center space-x-4 mb-4">
            <div class="flex-1 bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full" :style="{ width: learningPathProgress + '%' }"></div>
            </div>
            <span class="text-sm font-medium text-gray-700">{{ learningPathProgress }}% Complete</span>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(step, index) in learningPath" :key="index" class="relative">
              <div class="flex items-center space-x-3">
                <div :class="[
                  step.completed ? 'bg-green-500' : step.current ? 'bg-blue-500' : 'bg-gray-300',
                  'w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium'
                ]">
                  <Icon v-if="step.completed" name="mdi:check" class="text-sm" />
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div>
                  <h3 class="font-medium text-gray-900">{{ step.title }}</h3>
                  <p class="text-sm text-gray-500">{{ step.description }}</p>
                </div>
              </div>
              <div v-if="index < learningPath.length - 1" class="absolute top-4 left-4 w-0.5 h-8 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Learning Resources -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Learning Resources</h2>
          <div class="space-y-4">
            <div v-for="resource in learningResources" :key="resource.id" class="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Icon :name="resource.icon" class="text-blue-600 text-lg" />
              </div>
              <div class="flex-1">
                <h3 class="font-medium text-gray-900">{{ resource.title }}</h3>
                <p class="text-sm text-gray-500">{{ resource.type }} • {{ resource.duration }}</p>
              </div>
              <button @click="accessResource(resource.id)" class="text-blue-600 hover:text-blue-800">
                <Icon name="mdi:open-in-new" class="text-lg" />
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div class="space-y-4">
            <div v-for="achievement in recentAchievements" :key="achievement.id" class="flex items-start space-x-3">
              <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="achievement.color">
                <Icon :name="achievement.icon" class="text-white text-sm" />
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ achievement.title }}</p>
                <p class="text-xs text-gray-500">{{ achievement.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'carer'
})

const { user } = useAuth()

// Reactive data
const selectedFilter = ref('all')

// Mock data
const overallProgress = ref(75)
const completedModules = ref(12)
const totalModules = ref(16)
const activeCertifications = ref(4)
const expiringSoon = ref(1)
const studyHours = ref(28)
const learningPathProgress = ref(60)

const modules = ref([
  {
    id: 1,
    title: 'Patient Safety & Infection Control',
    description: 'Learn essential safety protocols and infection control measures for healthcare settings.',
    duration: '2 hours',
    level: 'Beginner',
    type: 'Required',
    credits: 2,
    icon: 'mdi:shield-check',
    progress: 0,
    deadline: '2024-01-30'
  },
  {
    id: 2,
    title: 'Medication Management',
    description: 'Comprehensive training on safe medication administration and documentation.',
    duration: '3 hours',
    level: 'Intermediate',
    type: 'Required',
    credits: 3,
    icon: 'mdi:pill',
    progress: 75,
    deadline: '2024-02-15'
  },
  {
    id: 3,
    title: 'Elderly Care Best Practices',
    description: 'Advanced techniques for providing compassionate care to elderly patients.',
    duration: '4 hours',
    level: 'Advanced',
    type: 'Elective',
    credits: 4,
    icon: 'mdi:account-heart',
    progress: 0
  },
  {
    id: 4,
    title: 'Emergency Response Training',
    description: 'Learn how to respond to medical emergencies and provide first aid.',
    duration: '2.5 hours',
    level: 'Intermediate',
    type: 'Required',
    credits: 2.5,
    icon: 'mdi:ambulance',
    progress: 100,
    deadline: '2024-01-20'
  }
])

const certifications = ref([
  {
    id: 1,
    name: 'Basic Life Support (BLS)',
    issuedDate: '2023-06-15',
    expiryDate: '2024-06-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'First Aid Certification',
    issuedDate: '2023-08-20',
    expiryDate: '2024-08-20',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Infection Control',
    issuedDate: '2023-12-01',
    expiryDate: '2024-03-01',
    status: 'Expiring Soon'
  },
  {
    id: 4,
    name: 'Patient Care Specialist',
    issuedDate: '2023-09-10',
    expiryDate: '2025-09-10',
    status: 'Active'
  }
])

const learningPath = ref([
  {
    title: 'Foundation Skills',
    description: 'Complete basic healthcare training',
    completed: true,
    current: false
  },
  {
    title: 'Specialized Care',
    description: 'Learn patient-specific care techniques',
    completed: false,
    current: true
  },
  {
    title: 'Advanced Certification',
    description: 'Obtain advanced healthcare certifications',
    completed: false,
    current: false
  }
])

const learningResources = ref([
  {
    id: 1,
    title: 'Healthcare Procedures Manual',
    type: 'PDF Guide',
    duration: '45 min read',
    icon: 'mdi:file-document'
  },
  {
    id: 2,
    title: 'Patient Care Video Series',
    type: 'Video Course',
    duration: '2 hours',
    icon: 'mdi:video'
  },
  {
    id: 3,
    title: 'Interactive Case Studies',
    type: 'Simulation',
    duration: '1 hour',
    icon: 'mdi:gamepad-variant'
  },
  {
    id: 4,
    title: 'Best Practices Webinar',
    type: 'Live Session',
    duration: '90 min',
    icon: 'mdi:web'
  }
])

const recentAchievements = ref([
  {
    id: 1,
    title: 'Completed Medication Management Module',
    date: '2 days ago',
    icon: 'mdi:trophy',
    color: 'bg-yellow-500'
  },
  {
    id: 2,
    title: 'Earned Patient Safety Badge',
    date: '1 week ago',
    icon: 'mdi:shield-star',
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'Achieved 100% Quiz Score',
    date: '2 weeks ago',
    icon: 'mdi:star',
    color: 'bg-blue-500'
  }
])

// Computed properties
const filteredModules = computed(() => {
  if (selectedFilter.value === 'all') {
    return modules.value
  }
  return modules.value.filter(module => 
    module.type.toLowerCase() === selectedFilter.value
  )
})

// Methods
const filterModules = (filter) => {
  selectedFilter.value = filter
}

const startModule = (moduleId) => {
  console.log('Starting module:', moduleId)
  // Navigate to module or open module interface
}

const accessResource = (resourceId) => {
  console.log('Accessing resource:', resourceId)
  // Open resource or navigate to resource page
}

// Fetch data on component mount
onMounted(async () => {
  // Fetch training data from API
  try {
    // const response = await $fetch('/api/carer/training', {
    //   headers: {
    //     'Authorization': `Bearer ${useCookie('auth-token').value}`
    //   }
    // })
    // Update reactive data with API response
  } catch (error) {
    console.error('Failed to fetch training data:', error)
  }
})
</script> 