<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Payment Management</h1>
          <p class="text-sm text-gray-600 mt-1">Manage all payment transactions and financial operations</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportPayments" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export
          </button>
          <button @click="showPaymentModal = true" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Icon name="mdi:plus" class="mr-2 h-4 w-4" />
            New Payment
          </button>
        </div>
      </div>
    </div>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                  <Icon name="mdi:currency-usd" class="h-5 w-5 text-green-600" />
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(totalRevenue) }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <Icon name="mdi:credit-card" class="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">This Month</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(thisMonthRevenue) }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <Icon name="mdi:clock-outline" class="h-5 w-5 text-yellow-600" />
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(pendingAmount) }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                  <Icon name="mdi:alert-circle" class="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Failed</dt>
                  <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(failedAmount) }}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div class="flex-1 max-w-lg">
              <label for="search" class="sr-only">Search payments</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  v-model="searchQuery"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search payments..."
                  type="search"
                />
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <select v-model="statusFilter" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-gray-900">
                <option value="">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              <select v-model="dateFilter" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-gray-900">
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Payments Table -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Payment Transactions</h3>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-for="payment in filteredPayments" :key="payment.id" class="px-6 py-4 hover:bg-gray-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <Icon :name="getPaymentIcon(payment.method)" class="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ payment.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ payment.description }}</div>
                  <div class="text-xs text-gray-400">{{ formatDate(payment.date) }}</div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-right">
                  <div class="text-sm font-medium text-gray-900">${{ payment.amount.toFixed(2) }}</div>
                  <div class="text-sm text-gray-500">{{ payment.method }}</div>
                </div>
                <div class="flex items-center">
                  <span :class="getStatusClasses(payment.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ payment.status }}
                  </span>
                </div>
                <div class="flex items-center space-x-2">
                  <button @click="viewPayment(payment)" class="text-indigo-600 hover:text-indigo-900">
                    <Icon name="mdi:eye" class="h-4 w-4" />
                  </button>
                  <button @click="editPayment(payment)" class="text-gray-600 hover:text-gray-900">
                    <Icon name="mdi:pencil" class="h-4 w-4" />
                  </button>
                  <button @click="refundPayment(payment)" v-if="payment.status === 'completed'" class="text-red-600 hover:text-red-900">
                    <Icon name="mdi:undo" class="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
        
        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">{{ startIndex + 1 }}</span> to <span class="font-medium">{{ endIndex }}</span> of <span class="font-medium">{{ totalPayments }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Icon name="mdi:chevron-left" class="h-5 w-5" />
                </button>
                <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="page === currentPage ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'" class="relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  {{ page }}
                </button>
                <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <Icon name="mdi:chevron-right" class="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Create New Payment</h3>
            <button @click="showPaymentModal = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="mdi:close" class="h-6 w-6" />
            </button>
          </div>
          <form @submit.prevent="createPayment">
            <div class="space-y-6">
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Customer *</label>
                <select v-model="newPayment.customerId" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900">
                  <option value="">Select Customer</option>
                  <option value="1">John Doe</option>
                  <option value="2">Jane Smith</option>
                  <option value="3">Bob Johnson</option>
                </select>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Amount *</label>
                <div class="relative">
                  <span class="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                  <input v-model="newPayment.amount" type="number" step="0.01" required class="block w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" placeholder="0.00" />
                </div>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Payment Method *</label>
                <select v-model="newPayment.method" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900">
                  <option value="credit_card">Credit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="paypal">PayPal</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                <textarea v-model="newPayment.description" rows="3" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" placeholder="Payment description..."></textarea>
              </div>
            </div>
            <div class="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button type="button" @click="showPaymentModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Create Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Payment Modal -->
    <div v-if="showViewModal && selectedPayment" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Payment Details</h3>
            <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="mdi:close" class="h-6 w-6" />
            </button>
          </div>
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-semibold text-gray-800 mb-2">Customer Information</h4>
              <p class="text-sm text-gray-900">{{ selectedPayment.customerName }}</p>
              <p class="text-sm text-gray-600">{{ selectedPayment.description }}</p>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-semibold text-gray-800 mb-2">Payment Information</h4>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-600">Amount:</span>
                  <p class="font-medium text-gray-900">{{ formatCurrency(selectedPayment.amount) }}</p>
                </div>
                <div>
                  <span class="text-gray-600">Method:</span>
                  <p class="font-medium text-gray-900">{{ selectedPayment.method }}</p>
                </div>
                <div>
                  <span class="text-gray-600">Status:</span>
                  <span :class="getStatusClasses(selectedPayment.status)" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                    {{ selectedPayment.status }}
                  </span>
                </div>
                <div>
                  <span class="text-gray-600">Date:</span>
                  <p class="font-medium text-gray-900">{{ formatDate(selectedPayment.date) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button @click="showViewModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Close
            </button>
            <button @click="editPayment(selectedPayment)" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Edit Payment
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Payment Modal -->
    <div v-if="showEditModal && selectedPayment" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Edit Payment</h3>
            <button @click="showEditModal = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="mdi:close" class="h-6 w-6" />
            </button>
          </div>
          <form @submit.prevent="updatePayment">
            <div class="space-y-6">
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Customer</label>
                <input :value="selectedPayment.customerName" disabled class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm text-sm bg-gray-100 text-gray-600" />
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Amount *</label>
                <div class="relative">
                  <span class="absolute left-3 top-2 text-gray-500 text-sm">$</span>
                  <input v-model="selectedPayment.amount" type="number" step="0.01" required class="block w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" />
                </div>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Payment Method *</label>
                <select v-model="selectedPayment.method" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900">
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Status *</label>
                <select v-model="selectedPayment.status" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900">
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
            <div class="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button type="button" @click="showEditModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Update Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Refund Confirmation Modal -->
    <div v-if="showRefundModal && selectedPayment" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Confirm Refund</h3>
            <button @click="showRefundModal = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="mdi:close" class="h-6 w-6" />
            </button>
          </div>
          <div class="space-y-4">
            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div class="flex">
                <Icon name="mdi:alert-triangle" class="h-5 w-5 text-yellow-400" />
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-yellow-800">Refund Warning</h4>
                  <p class="text-sm text-yellow-700 mt-1">This action cannot be undone. The payment will be marked as refunded.</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-sm font-semibold text-gray-800 mb-2">Payment Details</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Customer:</span>
                  <span class="font-medium text-gray-900">{{ selectedPayment.customerName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Amount:</span>
                  <span class="font-medium text-gray-900">{{ formatCurrency(selectedPayment.amount) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Method:</span>
                  <span class="font-medium text-gray-900">{{ selectedPayment.method }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button @click="showRefundModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
            <button @click="confirmRefund" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              Confirm Refund
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  
})

const { user } = useAuth()

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('all')
const showPaymentModal = ref(false)
const showViewModal = ref(false)
const showEditModal = ref(false)
const showRefundModal = ref(false)
const selectedPayment = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10

// Fetch real payment data
const { data: paymentsData, error } = await useFetch('/api/admin/payments', {
  headers: {
    'Authorization': `Bearer ${useCookie('auth-token').value}`
  },
  server: false
})

// Reactive payment data
const payments = computed(() => {
  if (!paymentsData.value?.data?.payments) return []
  const methodLabel = { STRIPE: 'Stripe', PAYPAL: 'PayPal', ECOCASH: 'EcoCash' }
  return paymentsData.value.data.payments.map((payment) => {
    const patientName = (
      payment.booking?.patient?.name ||
      `${payment.booking?.patient?.firstName || ''} ${payment.booking?.patient?.lastName || ''}`
    ).trim()
    const clientName = (
      payment.booking?.client?.name ||
      `${payment.booking?.client?.firstName || ''} ${payment.booking?.client?.lastName || ''}`
    ).trim()
    const displayName = patientName || clientName || 'Unknown'
    const careType = (payment.booking?.careType || '').replace(/_/g, ' ')
    return {
      id: payment.id,
      customerName: displayName,
      description: `${careType}${displayName ? ' - ' + displayName : ''}`.trim(),
      amount: payment.amount,
      method: methodLabel[payment.paymentMethod] || payment.paymentMethod,
      status: (payment.status || '').toLowerCase(),
      date: payment.createdAt
    }
  })
})

const statistics = computed(() => paymentsData.value?.data?.statistics || {})
const totalRevenue = computed(() => paymentsData.value?.data?.totalRevenue || 0)

const thisMonthRevenue = computed(() => {
  const now = new Date()
  return payments.value
    .filter(p => p.status === 'completed' && new Date(p.date).getMonth() === now.getMonth() && new Date(p.date).getFullYear() === now.getFullYear())
    .reduce((sum, p) => sum + p.amount, 0)
})

const pendingAmount = computed(() => statistics.value.pending?.amount || 0)
const failedAmount = computed(() => statistics.value.failed?.amount || 0)

const newPayment = ref({
  customerId: '',
  amount: '',
  method: 'credit_card',
  description: ''
})

// Computed properties
const filteredPayments = computed(() => {
  let filtered = payments.value

  if (searchQuery.value) {
    filtered = filtered.filter(payment => 
      payment.customerName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(payment => payment.status === statusFilter.value)
  }

  return filtered
})

const totalPayments = computed(() => filteredPayments.value.length)
const totalPages = computed(() => Math.ceil(totalPayments.value / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, totalPayments.value))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
const getPaymentIcon = (method) => {
  const icons = {
    'Stripe': 'mdi:credit-card',
    'PayPal': 'mdi:paypal',
    'EcoCash': 'mdi:cellphone',
    'Credit Card': 'mdi:credit-card',
    'Bank Transfer': 'mdi:bank',
    'Cash': 'mdi:cash'
  }
  return icons[method] || 'mdi:currency-usd'
}

const getStatusClasses = (status) => {
  const classes = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800'
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

const formatCurrency = (amount) => {
  return '$' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const viewPayment = (payment) => {
  selectedPayment.value = payment
  showViewModal.value = true
}

const editPayment = (payment) => {
  selectedPayment.value = payment
  showEditModal.value = true
}

const refundPayment = (payment) => {
  selectedPayment.value = payment
  showRefundModal.value = true
}

const createPayment = () => {
  // Implement payment creation
  console.log('Create payment:', newPayment.value)
  showPaymentModal.value = false
  newPayment.value = {
    customerId: '',
    amount: '',
    method: 'credit_card',
    description: ''
  }
}

const updatePayment = () => {
  // Implement payment update
  console.log('Update payment:', selectedPayment.value)
  showEditModal.value = false
  selectedPayment.value = null
}

const confirmRefund = () => {
  // Implement refund logic
  console.log('Refunding payment:', selectedPayment.value)
  // Example: Update payment status to 'refunded'
  // This would require an API call to update the payment in the backend
  // For now, we'll just close the modal and update the local state
  selectedPayment.value.status = 'refunded'
  showRefundModal.value = false
  selectedPayment.value = null
}

const exportPayments = () => {
  // Create CSV content
  const headers = ['Customer', 'Description', 'Amount', 'Method', 'Status', 'Date']
  const csvContent = [
    headers.join(','),
    ...filteredPayments.value.map(payment => [
      payment.customerName,
      payment.description,
      payment.amount.toFixed(2),
      payment.method,
      payment.status,
      formatDate(payment.date)
    ].join(','))
  ].join('\n')

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `payments_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}
</script> 