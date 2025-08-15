<template>
  <div v-if="!user" class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Payment History</h1>
        <p class="text-gray-600">View and manage your payment transactions</p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-soft p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select v-model="filters.status" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select v-model="filters.paymentMethod" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">All Methods</option>
              <option value="STRIPE">Credit Card</option>
              <option value="PAYPAL">PayPal</option>
              <option value="ECOCASH">EcoCash</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select v-model="filters.dateRange" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">All Time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button @click="fetchPayments" class="btn-primary">Apply Filters</button>
        </div>
      </div>

      <!-- Payments List -->
      <div class="bg-white rounded-lg shadow-soft overflow-hidden">
        <div v-if="isLoading" class="p-8 text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p class="mt-2 text-gray-500">Loading payments...</p>
        </div>

        <div v-else-if="payments.length === 0" class="p-8 text-center">
          <Icon name="mdi:currency-usd" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
          <p class="text-gray-500">No payment transactions match your current filters.</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div v-for="payment in payments" :key="payment.id" class="p-6 hover:bg-gray-50 transition-colors">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="mdi:currency-usd" class="w-5 h-5 text-green-600" />
                  </div>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2">
                    <p class="text-lg font-semibold text-gray-900">
                      ${{ payment.amount.toFixed(2) }}
                    </p>
                    <span :class="getStatusBadgeClass(payment.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ getStatusText(payment.status) }}
                    </span>
                  </div>

                  <div class="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{{ getPaymentMethodText(payment.paymentMethod) }}</span>
                    <span>•</span>
                    <span>{{ formatDate(payment.createdAt) }}</span>
                    <span v-if="payment.booking">•</span>
                    <span v-if="payment.booking" class="text-green-600 hover:text-green-500 cursor-pointer" @click="viewBooking(payment.booking.id)">
                      Booking #{{ payment.booking.id.slice(-8) }}
                    </span>
                  </div>

                  <div v-if="payment.booking" class="mt-2 text-sm text-gray-600">
                    <span>For: {{ payment.booking.patient.firstName }} {{ payment.booking.patient.lastName }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ getCareTypeText(payment.booking.careType) }}</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center space-x-2">
                <button v-if="payment.status === 'PENDING'" @click="retryPayment(payment.id)" class="text-green-600 hover:text-green-500 text-sm font-medium">
                  Retry
                </button>
                <button @click="downloadReceipt(payment.id)" class="text-gray-600 hover:text-gray-500">
                  <Icon name="mdi:file-download" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination.pages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="changePage(pagination.page - 1)" :disabled="pagination.page <= 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button @click="changePage(pagination.page + 1)" :disabled="pagination.page >= pagination.pages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>
                to <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span>
                of <span class="font-medium">{{ pagination.total }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button @click="changePage(pagination.page - 1)" :disabled="pagination.page <= 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Icon name="mdi:chevron-left" class="w-5 h-5" />
                </button>

                <template v-for="page in getPageNumbers()" :key="page + '-pagination'">
                  <span v-if="page === '...'" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500">...</span>
                  <button v-else @click="changePage(page)" :class="page === pagination.page ? 'bg-green-50 border-green-500 text-green-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'" class="relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    {{ page }}
                  </button>
                </template>

                <button @click="changePage(pagination.page + 1)" :disabled="pagination.page >= pagination.pages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Icon name="mdi:chevron-right" class="w-5 h-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'client' })

const { user, logout } = useAuth()
const router = useRouter()

if (!user.value) {
  await router.push('/login')
}

const payments = ref([])
const isLoading = ref(false)
const filters = ref({ status: '', paymentMethod: '', dateRange: '' })
const pagination = ref({ page: 1, limit: 10, total: 0, pages: 0 })

const fetchPayments = async () => {
  try {
    isLoading.value = true
    const queryParams = new URLSearchParams({
      page: pagination.value.page.toString(),
      limit: pagination.value.limit.toString(),
      ...filters.value
    })
    const response = await $fetch(`/api/payments/list?${queryParams}`)
    if (response.success) {
      payments.value = response.payments
      pagination.value = response.pagination
    }
  } catch (error) {
    console.error('Error fetching payments:', error)
  } finally {
    isLoading.value = false
  }
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.pages) {
    pagination.value.page = page
    fetchPayments()
  }
}

const getPageNumbers = () => {
  const pages = []
  const current = pagination.value.page
  const total = pagination.value.pages
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...', total)
    }
  }
  return pages
}

const getStatusBadgeClass = (status) => {
  const classes = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    CANCELLED: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => ({ PENDING: 'Pending', COMPLETED: 'Completed', FAILED: 'Failed', CANCELLED: 'Cancelled' }[status] || status)
const getPaymentMethodText = (method) => ({ STRIPE: 'Credit Card', PAYPAL: 'PayPal', ECOCASH: 'EcoCash' }[method] || method)
const getCareTypeText = (careType) => ({ NURSING: 'Nursing Care', PHYSIOTHERAPY: 'Physiotherapy', OCCUPATIONAL_THERAPY: 'Occupational Therapy', SPEECH_THERAPY: 'Speech Therapy', PERSONAL_CARE: 'Personal Care', COMPANIONSHIP: 'Companionship' }[careType] || careType)
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
const viewBooking = (id) => router.push(`/client/bookings/${id}`)
const retryPayment = (id) => console.log('Retry payment:', id)
const downloadReceipt = (id) => console.log('Download receipt:', id)
onMounted(() => fetchPayments())
useHead({ title: 'Payment History - Lucerna & Stern Health' })
</script>
