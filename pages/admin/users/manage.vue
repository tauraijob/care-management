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
          <div class="bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark rounded-2xl p-8 text-white shadow-xl">
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

        <!-- Users are displayed below; filters removed to show all -->

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
                        <button @click="openEdit(user)" class="px-4 py-2 text-green-600 border border-green-300 rounded-lg font-medium hover:bg-green-50 transition-colors">
                          Edit
                        </button>
                        <button @click="openDelete(user)" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
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

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Edit User</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">First name</label>
            <input v-model="editForm.firstName" type="text" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last name</label>
            <input v-model="editForm.lastName" type="text" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input v-model="editForm.email" type="email" class="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <button @click="showEditModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button @click="saveEdit" class="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">Save</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Delete User</h3>
        <p class="text-gray-600">Are you sure you want to delete <strong>{{ deletingUser?.name }}</strong>? This action cannot be undone.</p>
        <div class="flex justify-end space-x-3 mt-6">
          <button @click="showDeleteModal = false" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button @click="performDelete" class="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">Delete</button>
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
const sidebarRef = ref(null)

const toggleSidebar = () => {
  if (sidebarRef.value) {
    sidebarRef.value.openSidebar()
  }
}

// State
const showAddUserModal = ref(false)
const sortBy = ref('name')


// Fetch real users data
const { data: usersData, error, refresh: refreshUsers } = await useFetch('/api/admin/users', {
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
    name: (user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim()) || 'Unknown',
    email: user.email || '',
    role: user.role,
    status: (user.status || 'ACTIVE').toLowerCase(),
    phone: user.phone || '',
    whatsapp: true, // Default value
    location: 'South Africa', // Default value
    joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : '',
    lastActive: 'Recently', // Default value
    verified: true, // Default value
    emailVerified: true, // Default value
    totalBookings: user.stats?.bookings ?? 0,
    completedTasks: user.role === 'CARER' ? (user.stats?.bookings ?? 0) : null,
    rating: user.role === 'CARER' ? 4.5 : null // Default rating
  }))
})

// Computed properties
const filteredUsers = computed(() => {
  const filtered = [...users.value]

  // Sort (default by name)
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

// Edit modal state
const showEditModal = ref(false)
const editingUserId = ref('')
const editForm = ref({ firstName: '', lastName: '', email: '' })

const openEdit = (user) => {
  editingUserId.value = user.id
  const parts = (user.name || '').trim().split(' ')
  editForm.value.firstName = parts.shift() || ''
  editForm.value.lastName = parts.join(' ')
  editForm.value.email = user.email || ''
  showEditModal.value = true
}

const saveEdit = async () => {
  try {
    await $fetch(`/api/admin/users/${editingUserId.value}`, {
      method: 'PUT',
      body: { ...editForm.value },
      headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` }
    })
    await refreshUsers()
    showEditModal.value = false
  } catch (e) {
    console.error(e)
    alert('Failed to update user')
  }
}

// Delete modal state
const showDeleteModal = ref(false)
const deletingUser = ref(null)

const openDelete = (user) => {
  deletingUser.value = user
  showDeleteModal.value = true
}

const performDelete = async () => {
  try {
    await $fetch(`/api/admin/users/${deletingUser.value.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` }
    })
    await refreshUsers()
    showDeleteModal.value = false
  } catch (e) {
    console.error(e)
    alert('Failed to delete user')
  }
}

const exportUsers = () => {
  console.log('Exporting users data...')
  // Implement export functionality
}

useHead({ title: 'User Management - Admin Panel' })
</script>