<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
          <p class="text-sm text-gray-600 mt-1">Manage all users, carers, and administrators</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportUsers" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export Users
          </button>
          <NuxtLink to="/admin/users/create" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <Icon name="mdi:account-plus" class="mr-2 h-4 w-4" />
            Add User
          </NuxtLink>
        </div>
      </div>
    </div>
      <!-- User Stats (API-driven) -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg" v-for="card in statCards" :key="card.key">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <Icon :name="card.icon" class="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">{{ card.title }}</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ card.value }}</dd>
                  <dd class="text-sm text-gray-600">{{ card.subtext }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- User Management Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- User Management -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">User Management</h3>
            <p class="text-sm text-gray-500 mt-1">Manage all user accounts and profiles</p>
          </div>
          <div class="p-6 space-y-4">
            <NuxtLink to="/admin/users/manage" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:account-group" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">All Users</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/users/create" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:account-plus" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Create User</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/users/import" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:upload" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Bulk Import</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
          </div>
        </div>

        <!-- Carer Management -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Carer Management</h3>
            <p class="text-sm text-gray-500 mt-1">Manage carer accounts and performance</p>
          </div>
          <div class="p-6 space-y-4">
            <NuxtLink to="/admin/carers/performance" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:chart-line" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Performance</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/carers/schedule" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:calendar" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Schedules</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/carers/certifications" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:certificate" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Certifications</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
          </div>
        </div>

        <!-- Access Control -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Access Control</h3>
            <p class="text-sm text-gray-500 mt-1">Manage permissions and roles</p>
          </div>
          <div class="p-6 space-y-4">
            <NuxtLink to="/admin/users/roles" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:shield-account" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Roles & Permissions</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/users/audit" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:clipboard-text" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Audit Log</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
            <NuxtLink to="/admin/users/security" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div class="flex items-center space-x-3">
                <Icon name="mdi:lock" class="h-5 w-5 text-green-600" />
                <span class="text-sm font-medium text-gray-900">Security Settings</span>
              </div>
              <Icon name="mdi:chevron-right" class="h-4 w-4 text-gray-400" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Recent Users (API-driven) -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Users</h3>
          <p class="text-sm text-gray-500 mt-1">Latest user registrations</p>
        </div>
        <div class="overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="u in recentUsers" :key="u.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">{{ initials(u.firstName, u.lastName) }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ u.firstName }} {{ u.lastName }}</div>
                      <div class="text-sm text-gray-500">{{ u.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ u.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(u.createdAt) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  
})

const { user } = useAuth()

// Data
const statCards = ref([
  { key: 'total', title: 'Total Users', icon: 'mdi:account-group', value: 0, subtext: '' },
  { key: 'carers', title: 'Carers', icon: 'mdi:stethoscope', value: 0, subtext: '' },
  { key: 'clients', title: 'Clients', icon: 'mdi:account', value: 0, subtext: '' },
  { key: 'admins', title: 'Admins', icon: 'mdi:shield-crown', value: 0, subtext: '' }
])
const recentUsers = ref([])

// Fetch users for stats and recent list
const fetchUsers = async () => {
  try {
    const { data, error } = await useFetch('/api/admin/users', {
      query: { page: 1, limit: 8 }
    })
    if (error.value) throw error.value
    const payload = data.value?.data
    if (!payload) return

    const stats = payload.statistics || {}
    const total = payload.pagination?.total || 0

    statCards.value = [
      { key: 'total', title: 'Total Users', icon: 'mdi:account-group', value: total, subtext: '' },
      { key: 'carers', title: 'Carers', icon: 'mdi:stethoscope', value: stats.carer || 0, subtext: '' },
      { key: 'clients', title: 'Clients', icon: 'mdi:account', value: stats.client || 0, subtext: '' },
      { key: 'admins', title: 'Admins', icon: 'mdi:shield-crown', value: stats.admin || 0, subtext: '' }
    ]

    recentUsers.value = payload.users || []
  } catch (e) {
    console.error('Failed to load admin users:', e)
  }
}

onMounted(fetchUsers)

// Methods
const getUserTypeClasses = (userType) => {
  const classes = {
    client: 'bg-green-100 text-green-800',
    carer: 'bg-green-100 text-green-800',
    admin: 'bg-green-100 text-green-800'
  }
  return classes[userType] || 'bg-gray-100 text-gray-800'
}

const getStatusClasses = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const exportUsers = () => {
  // Implement user export functionality
  console.log('Export users')
}

const initials = (first, last) => {
  return `${(first?.[0]||'').toUpperCase()}${(last?.[0]||'').toUpperCase()}`
}
</script> 