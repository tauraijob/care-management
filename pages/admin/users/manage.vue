<template>
  <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
  
  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">

    <!-- Sidebar -->
    <!-- Main Content -->
    <div class="transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Header -->
        <div class="mb-8">
          <div class="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold mb-2">User Management</h1>
                <p class="text-green-100 text-lg">Manage clients, carers, and platform users</p>
                <div class="flex items-center mt-4 space-x-6">
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:account-group" class="text-lg" />
                    <span class="text-sm">{{ users.length }} total users</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <Icon name="mdi:chart-line" class="text-lg" />
                    <span class="text-sm">{{ activeUsers }} active users</span>
                  </div>
                </div>
              </div>
              <div class="hidden lg:block">
                <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="mdi:account-group" class="text-white text-4xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- User Statistics -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Total Users</p>
                <p class="text-2xl font-bold text-gray-900">{{ users.length }}</p>
                <p class="text-xs text-green-600 mt-2">+5 this month</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:account-group" class="text-2xl" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Clients</p>
                <p class="text-2xl font-bold text-gray-900">{{ clientCount }}</p>
                <p class="text-xs text-blue-600 mt-2">{{ activeClients }} active</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:account" class="text-2xl" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Carers</p>
                <p class="text-2xl font-bold text-gray-900">{{ carerCount }}</p>
                <p class="text-xs text-purple-600 mt-2">{{ activeCarers }} active</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:stethoscope" class="text-purple-600 text-2xl" />
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-gray-600">Admins</p>
                <p class="text-2xl font-bold text-gray-900">{{ adminCount }}</p>
                <p class="text-xs text-indigo-600 mt-2">All active</p>
              </div>
              <div class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Icon name="mdi:shield-crown" class="text-indigo-600 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <!-- Filters and Actions -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div class="p-6 border-b border-gray-100">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <h2 class="text-lg font-semibold text-gray-900">Filters & Actions</h2>
              <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button @click="showAddUserModal = true" class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                  <span class="mr-2">➕</span>
                  Add New User
                </button>
                <button @click="exportUsers" class="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  <Icon name="mdi:chart-line" class="mr-2" />
                  Export Data
                </button>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
                <input 
                  v-model="filters.search" 
                  type="text" 
                  placeholder="Search by name or email..."
                  class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">User Role</label>
                <select v-model="filters.role" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  <option value="">All Roles</option>
                  <option value="CLIENT">Clients</option>
                  <option value="CARER">Carers</option>
                  <option value="ADMIN">Admins</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select v-model="filters.status" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select v-model="sortBy" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  <option value="name">Name (A-Z)</option>
                  <option value="date">Join Date</option>
                  <option value="role">Role</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Users List -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100">
          <div class="p-6 border-b border-gray-100">
            <h2 class="text-lg font-semibold text-gray-900">Users ({{ filteredUsers.length }})</h2>
          </div>
          
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="user in filteredUsers" :key="user.id" class="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div class="flex items-start space-x-4">
                  <!-- User Avatar -->
                  <div class="flex-shrink-0">
                    <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {{ user.name.charAt(0) }}
                    </div>
                    <div class="mt-2 text-center">
                      <span :class="getStatusClass(user.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                        {{ user.status }}
                      </span>
                    </div>
                  </div>
                  
                  <!-- User Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <h3 class="text-xl font-semibold text-gray-900">{{ user.name }}</h3>
                        <p class="text-sm text-gray-600">{{ user.email }}</p>
                        <p class="text-sm text-gray-500">Member since {{ user.joinDate }}</p>
                        <div class="flex items-center space-x-2 mt-2">
                          <span :class="getRoleClass(user.role)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ user.role }}
                          </span>
                          <span v-if="user.verified" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✅ Verified
                          </span>
                        </div>
                      </div>
                      <div class="text-right">
                        <p class="text-sm text-gray-500">Last active</p>
                        <p class="text-sm font-medium text-gray-900">{{ user.lastActive }}</p>
                      </div>
                    </div>
                    
                    <!-- User Details -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div class="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 class="font-medium text-gray-900 mb-2">Contact Information</h4>
                        <div class="space-y-1 text-sm">
                          <p><span class="text-gray-500">Phone:</span> {{ user.phone }}</p>
                          <p><span class="text-gray-500">WhatsApp:</span> {{ user.whatsapp ? '✅ Enabled' : '❌ Disabled' }}</p>
                          <p><span class="text-gray-500">Location:</span> {{ user.location }}</p>
                        </div>
                      </div>
                      <div class="bg-white rounded-lg p-4 border border-gray-200">
                        <h4 class="font-medium text-gray-900 mb-2">Account Details</h4>
                        <div class="space-y-1 text-sm">
                          <p><span class="text-gray-500">Total bookings:</span> {{ user.totalBookings }}</p>
                          <p><span class="text-gray-500">Completed tasks:</span> {{ user.completedTasks || 'N/A' }}</p>
                          <p><span class="text-gray-500">Rating:</span> {{ user.rating ? `${user.rating}/5` : 'N/A' }}</p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div class="flex items-center space-x-4">
                        <span class="text-sm text-gray-500">ID: {{ user.id }}</span>
                        <span class="text-sm text-gray-500">•</span>
                        <span class="text-sm text-gray-500">{{ user.emailVerified ? 'Email verified' : 'Email not verified' }}</span>
                      </div>
                      <div class="flex space-x-3">
                        <button @click="viewProfile(user)" class="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                          View Profile
                        </button>
                        <button @click="editUser(user)" class="px-4 py-2 text-green-600 border border-green-300 rounded-lg font-medium hover:bg-green-50 transition-colors">
                          Edit
                        </button>
                        <button @click="toggleUserStatus(user)" :class="getToggleButtonClass(user.status)" class="px-4 py-2 rounded-lg font-medium transition-colors">
                          {{ user.status === 'active' ? 'Suspend' : 'Activate' }}
                        </button>
                        <button @click="deleteUser(user)" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
                          Delete
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

    <!-- Add User Modal -->
    <div v-if="showAddUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-8 max-w-md mx-4 w-full">
        <div class="text-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900">Add New User</h3>
          <p class="text-gray-600">Create a new user account</p>
        </div>
        
        <form @submit.prevent="addUser" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input v-model="newUser.name" type="text" required class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input v-model="newUser.email" type="email" required class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select v-model="newUser.role" required class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
              <option value="">Select Role</option>
              <option value="CLIENT">Client</option>
              <option value="CARER">Carer</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input v-model="newUser.phone" type="tel" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          </div>
          
          <div class="flex space-x-3 pt-4">
            <button type="button" @click="showAddUserModal = false" class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
              Add User
            </button>
          </div>
        </form>
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
const sidebarRef = ref(null)

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.openSidebar()
  }
}

// State
const showAddUserModal = ref(false)
const sortBy = ref('name')

// Filters
const filters = ref({
  search: '',
  role: '',
  status: ''
})

// New user form
const newUser = ref({
  name: '',
  email: '',
  role: '',
  phone: ''
})

// Fetch real users data
const { data: usersData, error } = await useFetch('/api/admin/users', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Reactive users data
const users = computed(() => {
  if (!usersData.value?.data?.users) return []
  
  return usersData.value.data.users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status.toLowerCase(),
    phone: user.phone,
    whatsapp: true, // Default value
    location: 'South Africa', // Default value
    joinDate: new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    lastActive: 'Recently', // Default value
    verified: true, // Default value
    emailVerified: true, // Default value
    totalBookings: user.stats.bookings,
    completedTasks: user.role === 'CARER' ? user.stats.bookings : null,
    rating: user.role === 'CARER' ? 4.5 : null // Default rating
  }))
})

// Computed properties
const filteredUsers = computed(() => {
  let filtered = [...users.value]
  
  if (filters.value.search) {
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      user.email.toLowerCase().includes(filters.value.search.toLowerCase())
    )
  }
  
  if (filters.value.role) {
    filtered = filtered.filter(user => user.role === filters.value.role)
  }
  
  if (filters.value.status) {
    filtered = filtered.filter(user => user.status === filters.value.status)
  }
  
  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date':
        return new Date(b.joinDate) - new Date(a.joinDate)
      case 'role':
        return a.role.localeCompare(b.role)
      case 'status':
        return a.status.localeCompare(b.status)
      default:
        return a.name.localeCompare(b.name)
    }
  })
  
  return filtered
})

const activeUsers = computed(() => {
  return users.value.filter(user => user.status === 'active').length
})

const clientCount = computed(() => {
  return users.value.filter(user => user.role === 'CLIENT').length
})

const carerCount = computed(() => {
  return users.value.filter(user => user.role === 'CARER').length
})

const adminCount = computed(() => {
  return users.value.filter(user => user.role === 'ADMIN').length
})

const activeClients = computed(() => {
  return users.value.filter(user => user.role === 'CLIENT' && user.status === 'active').length
})

const activeCarers = computed(() => {
  return users.value.filter(user => user.role === 'CARER' && user.status === 'active').length
})

// Methods
const getStatusClass = (status) => {
  const classes = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    busy: 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getRoleClass = (role) => {
  const classes = {
    CLIENT: 'bg-blue-100 text-blue-800',
    CARER: 'bg-purple-100 text-purple-800',
    ADMIN: 'bg-indigo-100 text-indigo-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const getToggleButtonClass = (status) => {
  return status === 'active' 
    ? 'text-yellow-600 border border-yellow-300 hover:bg-yellow-50'
    : 'text-green-600 border border-green-300 hover:bg-green-50'
}

const viewProfile = (user) => {
  console.log('View profile for:', user.name)
  // Navigate to user profile
}

const editUser = (user) => {
  console.log('Edit user:', user.name)
  // Open edit modal
}

const toggleUserStatus = (user) => {
  user.status = user.status === 'active' ? 'suspended' : 'active'
  console.log(`${user.name} status changed to ${user.status}`)
}

const deleteUser = (user) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    users.value = users.value.filter(u => u.id !== user.id)
    console.log(`User ${user.name} deleted`)
  }
}

const addUser = () => {
  const user = {
    id: Date.now(),
    name: newUser.value.name,
    email: newUser.value.email,
    role: newUser.value.role,
    status: 'active',
    phone: newUser.value.phone,
    whatsapp: false,
    location: 'Not specified',
    joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' }),
    lastActive: 'Just now',
    verified: false,
    emailVerified: false,
    totalBookings: 0,
    completedTasks: null,
    rating: null
  }
  
  users.value.push(user)
  showAddUserModal.value = false
  
  // Reset form
  newUser.value = {
    name: '',
    email: '',
    role: '',
    phone: ''
  }
  
  console.log('New user added:', user.name)
}

const exportUsers = () => {
  console.log('Exporting users data...')
  // Implement export functionality
}

useHead({ title: 'User Management - Admin Panel' })
</script>