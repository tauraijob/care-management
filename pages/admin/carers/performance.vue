<template>
  <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
  
  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">

    <!-- Main Content -->
    <div class="transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark rounded-2xl p-8 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold mb-2">Carer Performance Analytics</h1>
                <p class="text-green-100 text-lg">Comprehensive performance monitoring and analytics dashboard</p>
                <div class="flex items-center mt-4 space-x-6">
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:account-group" class="text-lg" />
                    <span class="text-sm">{{ carers.length }} active carers</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:star" class="text-lg" />
                    <span class="text-sm">Average rating: {{ averageRating }}</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:trending-up" class="text-lg" />
                    <span class="text-sm">Performance up {{ performanceGrowth }}% this month</span>
                  </div>
                </div>
              </div>
              <div class="hidden lg:block">
                <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="mdi:chart-line" class="text-white text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Overview Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Carers</p>
                <p class="text-2xl font-bold text-gray-900">{{ carers.length }}</p>
                <p class="text-xs text-green-600 mt-2">+3 this month</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:account-group" class="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Avg. Rating</p>
                <p class="text-2xl font-bold text-gray-900">{{ averageRating }}</p>
                <div class="flex items-center mt-2">
                  <Icon v-for="i in 5" :key="i" name="mdi:star" class="text-sm text-yellow-500" />
                  <span class="text-xs text-gray-500 ml-1">({{ totalReviews }} reviews)</span>
                </div>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:star" class="text-yellow-600 text-2xl" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Completed Tasks</p>
                <p class="text-2xl font-bold text-gray-900">{{ totalCompletedTasks }}</p>
                <p class="text-xs text-green-600 mt-2">+15% this week</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:check-circle" class="text-green-600 text-2xl" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Active Assignments</p>
                <p class="text-2xl font-bold text-gray-900">{{ activeAssignments }}</p>
                <p class="text-xs text-green-600 mt-2">{{ busyCarers }} carers busy</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:calendar-clock" class="text-green-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Analytics Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Performance Trends Chart -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900">Performance Trends</h2>
              <p class="text-sm text-gray-600">Monthly performance metrics over the last 6 months</p>
            </div>
            <div class="p-6">
              <div class="h-64 flex items-center justify-center">
                <div class="text-center">
                  <Icon name="mdi:chart-line" class="text-gray-400 text-4xl mx-auto mb-4" />
                  <p class="text-gray-500">Performance chart will be displayed here</p>
                  <p class="text-sm text-gray-400">Integration with chart library needed</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Rating Distribution -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-100">
            <div class="p-6 border-b border-gray-100">
              <h2 class="text-lg font-semibold text-gray-900">Rating Distribution</h2>
              <p class="text-sm text-gray-600">Distribution of carer ratings</p>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div v-for="rating in ratingDistribution" :key="rating.stars" class="flex items-center">
                  <div class="w-16 text-sm text-gray-600">{{ rating.stars }} stars</div>
                  <div class="flex-1 mx-4">
                    <div class="bg-gray-200 rounded-full h-2">
                      <div 
                        class="bg-yellow-400 h-2 rounded-full" 
                        :style="{ width: `${rating.percentage}%` }"
                      ></div>
                    </div>
                  </div>
                  <div class="w-12 text-sm text-gray-600 text-right">{{ rating.count }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Specialization Performance -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">Specialization Performance</h2>
            <p class="text-sm text-gray-600">Performance metrics by care specialization</p>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="spec in specializationPerformance" :key="spec.name" class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between mb-3">
                  <h3 class="font-medium text-gray-900">{{ spec.name }}</h3>
                  <span class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">{{ spec.carers }} carers</span>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Avg. Rating:</span>
                    <span class="font-medium">{{ spec.avgRating }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Tasks Completed:</span>
                    <span class="font-medium">{{ spec.tasksCompleted }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Success Rate:</span>
                    <span class="font-medium text-green-600">{{ spec.successRate }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Search -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">Filters & Search</h2>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search Carer</label>
                <input 
                  v-model="filters.search" 
                  type="text" 
                  placeholder="Search by name..."
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Rating Filter</label>
                <select v-model="filters.rating" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">All Ratings</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select v-model="filters.status" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="busy">Busy</option>
                  <option value="available">Available</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select v-model="sortBy" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <option value="rating">Rating (High to Low)</option>
                  <option value="tasks">Tasks Completed</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="recent">Recently Active</option>
                  <option value="earnings">Earnings</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Carers Performance List -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Carer Performance ({{ filteredCarers.length }})</h2>
              <div class="flex items-center space-x-4">
                <button @click="exportData" class="btn-outline">
                  <Icon name="mdi:download" class="inline mr-2" />
                  Export Data
                </button>
                <button @click="refreshData" class="btn-primary">
                  <Icon name="mdi:refresh" class="inline mr-2" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            <div class="space-y-6">
              <div v-for="carer in filteredCarers" :key="carer.id" class="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div class="flex items-start space-x-4">
                  <!-- Carer Avatar -->
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {{ carer.name.charAt(0) }}
                    </div>
                    <div class="mt-2 text-center">
                      <span :class="getStatusClass(carer.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                        {{ carer.status }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- Carer Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <h3 class="text-xl font-semibold text-gray-900">{{ carer.name }}</h3>
                        <p class="text-sm text-gray-600">{{ carer.email }}</p>
                        <p class="text-sm text-gray-500">Member since {{ carer.joinDate }}</p>
                      </div>
                      <div class="text-right">
                        <div class="flex items-center space-x-1 mb-1">
                          <Icon v-for="i in 5" :key="i" name="mdi:star" class="text-sm" :class="i <= carer.rating ? 'text-yellow-400' : 'text-gray-300'" />
                          <span class="text-sm font-medium text-gray-900 ml-1">{{ carer.rating }}</span>
                        </div>
                        <p class="text-sm text-gray-500">({{ carer.totalReviews }} reviews)</p>
                      </div>
                    </div>
                    
                    <!-- Performance Metrics -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div class="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 class="font-medium text-gray-900 mb-2">Tasks Completed</h4>
                        <div class="space-y-2">
                          <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Total:</span>
                            <span class="font-medium">{{ carer.completedTasks }}</span>
                          </div>
                          <div class="flex justify-between text-sm">
                            <span class="text-gray-500">This month:</span>
                            <span class="font-medium text-green-600">{{ carer.thisMonth }}</span>
                          </div>
                          <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Success rate:</span>
                            <span class="font-medium text-green-600">{{ carer.successRate }}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 class="font-medium text-gray-900 mb-2">Earnings</h4>
                        <div class="space-y-2">
                          <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Total earned:</span>
                            <span class="font-medium">${{ carer.totalEarnings.toLocaleString() }}</span>
                          </div>
                          <div class="flex justify-between text-sm">
                            <span class="text-gray-500">This month:</span>
                            <span class="font-medium text-green-600">${{ carer.thisMonthEarnings.toLocaleString() }}</span>
                          </div>
                          <div class="flex justify-between text-sm">
                            <span class="text-gray-500">Avg. per task:</span>
                            <span class="font-medium text-green-600">${{ carer.avgPerTask }}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 class="font-medium text-gray-900 mb-2">Specializations</h4>
                        <div class="space-y-2">
                          <div v-for="specialization in carer.specializations" :key="specialization" class="flex items-center justify-between">
                            <span class="text-sm text-gray-600">{{ specialization }}</span>
                            <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Certified</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Recent Activity -->
                    <div class="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                      <h4 class="font-medium text-gray-900 mb-3">Recent Activity</h4>
                      <div class="space-y-2">
                        <div v-for="activity in carer.recentActivity" :key="activity.id" class="flex items-center space-x-3 text-sm">
                          <Icon :name="activity.icon" class="text-gray-400 text-sm" />
                          <span class="text-gray-600">{{ activity.description }}</span>
                          <span class="text-gray-400 ml-auto">{{ activity.time }}</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-500">Last active: {{ carer.lastActive }}</span>
                        <span class="text-sm text-gray-500">•</span>
                        <span class="text-sm text-gray-500">{{ carer.activeAssignments }} active assignments</span>
                      </div>
                      <div class="flex space-x-3">
                        <button @click="viewProfile(carer)" class="px-4 py-2 text-green-600 border border-green-300 rounded-lg font-medium hover:bg-green-50 transition-colors">
                          View Profile
                        </button>
                        <button @click="viewSchedule(carer)" class="px-4 py-2 text-green-600 border border-green-300 rounded-lg font-medium hover:bg-green-50 transition-colors">
                          View Schedule
                        </button>
                        <button @click="sendMessage(carer)" class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Apply admin layout
definePageMeta({ 
  layout: 'admin'
})

const { user } = useAuth()

// State
const sortBy = ref('rating')
const loading = ref(false)

// Filters
const filters = ref({
  search: '',
  rating: '',
  status: ''
})

// Performance growth data
const performanceGrowth = ref(12.5)

// Rating distribution data
const ratingDistribution = ref([
  { stars: 5, count: 45, percentage: 60 },
  { stars: 4, count: 25, percentage: 33 },
  { stars: 3, count: 4, percentage: 5 },
  { stars: 2, count: 1, percentage: 1 },
  { stars: 1, count: 0, percentage: 0 }
])

// Specialization performance data
const specializationPerformance = ref([
  { name: 'Elderly Care', carers: 12, avgRating: 4.8, tasksCompleted: 156, successRate: 97 },
  { name: 'Post-Surgery Care', carers: 8, avgRating: 4.9, tasksCompleted: 89, successRate: 98 },
  { name: 'Disability Care', carers: 6, avgRating: 4.7, tasksCompleted: 67, successRate: 95 },
  { name: 'Palliative Care', carers: 4, avgRating: 4.9, tasksCompleted: 45, successRate: 99 },
  { name: 'Nursing Care', carers: 10, avgRating: 4.8, tasksCompleted: 123, successRate: 96 },
  { name: 'Companionship', carers: 7, avgRating: 4.6, tasksCompleted: 78, successRate: 94 }
])

// Fetch real carers performance data
const { data: carersData, error } = await useFetch('/api/admin/carers/performance', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Reactive carers data
const carers = computed(() => {
  if (!carersData.value?.data?.carers) return []
  
  return carersData.value.data.carers.map(carer => ({
    id: carer.id,
    name: carer.name,
    email: carer.email,
    rating: carer.rating || 0,
    totalReviews: carer.totalReviews || 0,
    completedTasks: carer.completedTasks || 0,
    thisMonth: carer.thisMonth || 0,
    successRate: carer.successRate || 0,
    totalEarnings: carer.totalEarnings || 0,
    thisMonthEarnings: carer.thisMonthEarnings || 0,
    avgPerTask: carer.avgPerTask || 0,
    specializations: carer.specializations || [],
    status: carer.status || 'active',
    joinDate: new Date(carer.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    lastActive: carer.lastActive || 'Recently',
    activeAssignments: carer.activeAssignments || 0,
    recentActivity: carer.recentActivity || []
  }))
})

// Computed properties
const filteredCarers = computed(() => {
  let filtered = [...carers.value]
  
  if (filters.value.search) {
    filtered = filtered.filter(carer => 
      carer.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      carer.email.toLowerCase().includes(filters.value.search.toLowerCase())
    )
  }
  
  if (filters.value.rating) {
    filtered = filtered.filter(carer => carer.rating >= parseInt(filters.value.rating))
  }
  
  if (filters.value.status) {
    filtered = filtered.filter(carer => carer.status === filters.value.status)
  }
  
  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'tasks':
        return b.completedTasks - a.completedTasks
      case 'name':
        return a.name.localeCompare(b.name)
      case 'recent':
        return new Date(b.lastActive) - new Date(a.lastActive)
      case 'earnings':
        return b.totalEarnings - a.totalEarnings
      default:
        return b.rating - a.rating
    }
  })
  
  return filtered
})

const averageRating = computed(() => {
  const ratings = carers.value.map(carer => carer.rating)
  if (ratings.length === 0) return '0.0'
  const average = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
  return average.toFixed(1)
})

const totalReviews = computed(() => {
  return carers.value.reduce((sum, carer) => sum + carer.totalReviews, 0)
})

const totalCompletedTasks = computed(() => {
  return carers.value.reduce((sum, carer) => sum + carer.completedTasks, 0)
})

const activeAssignments = computed(() => {
  return carers.value.reduce((sum, carer) => sum + carer.activeAssignments, 0)
})

const busyCarers = computed(() => {
  return carers.value.filter(carer => carer.status === 'busy').length
})

// Methods
const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    busy: 'bg-yellow-100 text-yellow-800',
    available: 'bg-blue-100 text-blue-800',
    inactive: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const viewProfile = (carer) => {
  console.log('View profile for:', carer.name)
  // Navigate to detailed carer profile
}

const viewSchedule = (carer) => {
  console.log('View schedule for:', carer.name)
  // Navigate to carer schedule
}

const sendMessage = (carer) => {
  console.log('Send message to:', carer.name)
  // Open messaging interface
}

const exportData = () => {
  console.log('Exporting carer performance data...')
  // Implement data export functionality
}

const refreshData = async () => {
  loading.value = true
  try {
    // Simulate API call to refresh data
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Data refreshed successfully')
  } catch (error) {
    console.error('Error refreshing data:', error)
  } finally {
    loading.value = false
  }
}

useHead({ title: 'Carer Performance Analytics - Admin Panel' })
</script>