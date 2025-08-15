<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">My Bookings</h1>
          <p class="text-sm text-gray-600 mt-1">Manage your assigned patient bookings</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="refreshBookings" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            <Icon name="mdi:refresh" class="mr-2 h-4 w-4" />
            Refresh
          </button>
          <NuxtLink to="/carer/bookings/available" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            <Icon name="mdi:plus" class="mr-2 h-4 w-4" />
            Find New Jobs
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:calendar-check" class="h-6 w-6 text-green-600" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                <dd class="text-lg font-medium text-gray-900">{{ myBookings.length }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:clock-outline" class="h-6 w-6 text-blue-600" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Today's Bookings</dt>
                <dd class="text-lg font-medium text-gray-900">{{ todaysBookingsCount }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:star" class="h-6 w-6 text-yellow-600" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg. Rating</dt>
                <dd class="text-lg font-medium text-gray-900">{{ averageRating }}/5</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Icon name="mdi:currency-usd" class="h-6 w-6 text-green-600" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">This Month</dt>
                <dd class="text-lg font-medium text-gray-900">${{ monthlyEarnings }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Notification Banner for Assigned Bookings -->
    <div v-if="assignedBookingsCount > 0" class="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <Icon name="mdi:bell-ring" class="h-5 w-5 text-orange-400" />
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-orange-800">
            You have {{ assignedBookingsCount }} new booking assignment{{ assignedBookingsCount > 1 ? 's' : '' }} to review
          </h3>
          <div class="mt-2 text-sm text-orange-700">
            <p>Please review and accept these assignments to confirm your availability.</p>
          </div>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button @click="scrollToAssignedBookings" class="rounded-md bg-orange-50 px-2 py-1.5 text-sm font-medium text-orange-800 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-orange-50">
              View Assignments
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="p-6">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="mdi:magnify" class="h-5 w-5 text-gray-400" />
              </div>
              <input v-model="searchQuery" type="text" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm text-gray-900 transition-colors" placeholder="Search by patient name, location, or service type..." />
            </div>
          </div>
          <div class="flex gap-3">
            <select v-model="statusFilter" class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white text-gray-900 transition-colors">
              <option value="" class="text-gray-900">All Status</option>
              <option value="assigned" class="text-gray-900">Assigned</option>
              <option value="upcoming" class="text-gray-900">Upcoming</option>
              <option value="in-progress" class="text-gray-900">In Progress</option>
              <option value="completed" class="text-gray-900">Completed</option>
              <option value="cancelled" class="text-gray-900">Cancelled</option>
            </select>
            <select v-model="dateFilter" class="block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm bg-white text-gray-900 transition-colors">
              <option value="" class="text-gray-900">All Dates</option>
              <option value="today" class="text-gray-900">Today</option>
              <option value="tomorrow" class="text-gray-900">Tomorrow</option>
              <option value="week" class="text-gray-900">This Week</option>
              <option value="next-week" class="text-gray-900">Next Week</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Bookings Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">My Bookings</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="booking in filteredBookings" :key="booking.id" class="hover:bg-gray-50" :data-status="booking.status">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <Icon name="mdi:account" class="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ booking.patientName }}</div>
                    <div class="text-sm text-gray-500">{{ booking.age }} years old</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getServiceTypeClasses(booking.serviceType)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ booking.serviceType }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(booking.date) }}</div>
                <div class="text-sm text-gray-500">{{ booking.startTime }} - {{ booking.endTime }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ booking.duration }} hours
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ booking.location }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span class="font-semibold text-green-600">${{ (booking.hourlyRate * booking.duration).toFixed(2) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClasses(booking.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ booking.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-1">
                  <button @click="viewBookingDetails(booking)" class="text-indigo-600 hover:text-indigo-900">
                    <Icon name="mdi:eye" class="h-3 w-3" />
                  </button>
                  <button v-if="booking.status === 'assigned'" @click="acceptBooking(booking)" class="text-green-600 hover:text-green-900">
                    <Icon name="mdi:check-circle" class="h-3 w-3" />
                  </button>
                  <button v-if="booking.status === 'upcoming'" @click="startBooking(booking)" class="text-green-600 hover:text-green-900">
                    <Icon name="mdi:play" class="h-3 w-3" />
                  </button>
                  <button v-if="booking.status === 'in-progress'" @click="completeBooking(booking)" class="text-green-600 hover:text-green-900">
                    <Icon name="mdi:check" class="h-3 w-3" />
                  </button>
                  <button v-if="booking.status === 'upcoming'" @click="cancelBooking(booking)" class="text-red-600 hover:text-red-900">
                    <Icon name="mdi:close" class="h-3 w-3" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredBookings.length === 0" class="text-center py-12">
        <Icon name="mdi:calendar-blank" class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
        <p class="mt-1 text-sm text-gray-500">You don't have any bookings matching your criteria.</p>
        <div class="mt-6">
          <NuxtLink to="/carer/bookings/available" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
            <Icon name="mdi:plus" class="mr-2 h-4 w-4" />
            Find Available Jobs
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Booking Details Modal -->
    <div v-if="showBookingModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Booking Details</h3>
            <button @click="showBookingModal = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="mdi:close" class="h-6 w-6" />
            </button>
          </div>
          
          <div v-if="selectedBooking" class="space-y-4">
            <div>
              <h4 class="text-lg font-medium text-gray-900">{{ selectedBooking.patientName }}</h4>
              <p class="text-sm text-gray-500">{{ selectedBooking.age }} years old</p>
            </div>
            
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Service Type:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedBooking.serviceType }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Date:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDate(selectedBooking.date) }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Time:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedBooking.startTime }} - {{ selectedBooking.endTime }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Duration:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedBooking.duration }} hours</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Location:</span>
                <span class="text-sm font-medium text-gray-900">{{ selectedBooking.location }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Hourly Rate:</span>
                <span class="text-sm font-medium text-green-600">${{ selectedBooking.hourlyRate }}/hour</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total Amount:</span>
                <span class="text-sm font-bold text-green-600">${{ (selectedBooking.hourlyRate * selectedBooking.duration).toFixed(2) }}</span>
              </div>
              
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Status:</span>
                <span :class="getStatusClasses(selectedBooking.status)" class="text-sm font-semibold px-2 py-1 rounded-full">
                  {{ selectedBooking.status }}
                </span>
              </div>
            </div>
            
            <div v-if="selectedBooking.requirements" class="pt-4 border-t border-gray-200">
              <h5 class="text-sm font-medium text-gray-900 mb-2">Special Requirements:</h5>
              <p class="text-sm text-gray-600">{{ selectedBooking.requirements }}</p>
            </div>
            
            <div v-if="selectedBooking.notes" class="pt-4 border-t border-gray-200">
              <h5 class="text-sm font-medium text-gray-900 mb-2">Additional Notes:</h5>
              <p class="text-sm text-gray-600">{{ selectedBooking.notes }}</p>
            </div>
          </div>
          
          <div class="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button @click="showBookingModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
              Close
            </button>
            <button v-if="selectedBooking && selectedBooking.status === 'assigned'" @click="acceptBooking(selectedBooking)" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Accept Assignment
            </button>
            <button v-if="selectedBooking && selectedBooking.status === 'upcoming'" @click="startBooking(selectedBooking)" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Start Booking
            </button>
            <button v-if="selectedBooking && selectedBooking.status === 'in-progress'" @click="completeBooking(selectedBooking)" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Complete Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'carer',
  
})

const { user } = useAuth()

// Reactive data
const showBookingModal = ref(false)
const selectedBooking = ref(null)
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')

// Sample my bookings data (carer's assigned bookings)
const myBookings = ref([
  {
    id: 1,
    patientName: 'Margaret Wilson',
    age: 78,
    serviceType: 'Elderly Care',
    date: '2024-01-20',
    startTime: '09:00',
    endTime: '17:00',
    duration: 8,
    location: '123 Oak Street, Downtown',
    hourlyRate: 35,
    status: 'upcoming',
    requirements: 'Experience with dementia patients preferred',
    notes: 'Patient requires assistance with daily activities and medication management.'
  },
  {
    id: 2,
    patientName: 'Robert Chen',
    age: 65,
    serviceType: 'Medical Care',
    date: '2024-01-21',
    startTime: '14:00',
    endTime: '18:00',
    duration: 4,
    location: '456 Pine Avenue, Westside',
    hourlyRate: 45,
    status: 'in-progress',
    requirements: 'RN or LPN certification required',
    notes: 'Post-surgery care and wound dressing changes needed.'
  },
  {
    id: 3,
    patientName: 'Dorothy Martinez',
    age: 82,
    serviceType: 'Companionship',
    date: '2024-01-19',
    startTime: '10:00',
    endTime: '14:00',
    duration: 4,
    location: '789 Elm Road, Northside',
    hourlyRate: 25,
    status: 'completed',
    requirements: 'Bilingual Spanish/English preferred',
    notes: 'Light housekeeping and conversation. Patient enjoys reading and gardening.'
  },
  {
    id: 4,
    patientName: 'James Thompson',
    age: 70,
    serviceType: 'Physical Therapy',
    date: '2024-01-22',
    startTime: '08:00',
    endTime: '12:00',
    duration: 4,
    location: '321 Maple Drive, Eastside',
    hourlyRate: 50,
    status: 'upcoming',
    requirements: 'Licensed physical therapist required',
    notes: 'Stroke recovery exercises and mobility assistance needed.'
  },
  {
    id: 5,
    patientName: 'Helen Davis',
    age: 75,
    serviceType: 'Respite Care',
    date: '2024-01-18',
    startTime: '16:00',
    endTime: '20:00',
    duration: 4,
    location: '654 Birch Lane, Southside',
    hourlyRate: 30,
    status: 'completed',
    requirements: 'Experience with Alzheimer\'s patients',
    notes: 'Family caregiver needs respite. Patient is generally calm but may become confused.'
  }
])

// Computed properties
const todaysBookingsCount = computed(() => {
  if (!myBookings.value) return 0
  const today = new Date().toDateString()
  return myBookings.value.filter(booking => 
    new Date(booking.date).toDateString() === today
  ).length
})

const averageRating = computed(() => {
  // This would come from actual ratings data
  return 4.8
})

const monthlyEarnings = computed(() => {
  if (!myBookings.value) return 0
  const completedBookings = myBookings.value.filter(booking => 
    booking.status === 'completed'
  )
  const total = completedBookings.reduce((sum, booking) => 
    sum + (booking.hourlyRate * booking.duration), 0
  )
  return total.toFixed(0)
})

const assignedBookingsCount = computed(() => {
  if (!myBookings.value) return 0
  return myBookings.value.filter(booking => 
    booking.status === 'assigned'
  ).length
})

const filteredBookings = computed(() => {
  if (!myBookings.value) return []
  
  let filtered = myBookings.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(booking =>
      booking.patientName.toLowerCase().includes(query) ||
      booking.location.toLowerCase().includes(query) ||
      booking.serviceType.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter(booking =>
      booking.status === statusFilter.value
    )
  }

  // Date filter
  if (dateFilter.value) {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    filtered = filtered.filter(booking => {
      const bookingDate = new Date(booking.date)
      switch (dateFilter.value) {
        case 'today':
          return bookingDate.toDateString() === today.toDateString()
        case 'tomorrow':
          return bookingDate.toDateString() === tomorrow.toDateString()
        case 'week':
          const weekFromNow = new Date(today)
          weekFromNow.setDate(weekFromNow.getDate() + 7)
          return bookingDate >= today && bookingDate <= weekFromNow
        case 'next-week':
          const nextWeekStart = new Date(today)
          nextWeekStart.setDate(nextWeekStart.getDate() + 7)
          const nextWeekEnd = new Date(nextWeekStart)
          nextWeekEnd.setDate(nextWeekEnd.getDate() + 7)
          return bookingDate >= nextWeekStart && bookingDate <= nextWeekEnd
        default:
          return true
      }
    })
  }

  return filtered
})

// Methods
const formatDate = (dateString) => {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return dateString
  }
}

const getServiceTypeClasses = (serviceType) => {
  if (!serviceType) return 'bg-gray-100 text-gray-800'
  
  const classes = {
    'Elderly Care': 'bg-blue-100 text-blue-800',
    'Medical Care': 'bg-purple-100 text-purple-800',
    'Companionship': 'bg-green-100 text-green-800',
    'Physical Therapy': 'bg-orange-100 text-orange-800',
    'Respite Care': 'bg-pink-100 text-pink-800'
  }
  return classes[serviceType] || 'bg-gray-100 text-gray-800'
}

const getStatusClasses = (status) => {
  if (!status) return 'bg-gray-100 text-gray-800'
  
  const classes = {
    'upcoming': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'assigned': 'bg-orange-100 text-orange-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const viewBookingDetails = (booking) => {
  if (!booking) return
  selectedBooking.value = booking
  showBookingModal.value = true
}

const startBooking = (booking) => {
  if (!booking) return
  
  console.log('Starting booking:', booking)
  booking.status = 'in-progress'
  
  // Close modal if open
  if (showBookingModal.value) {
    showBookingModal.value = false
    selectedBooking.value = null
  }
  
  // Implement actual booking start logic
}

const completeBooking = (booking) => {
  if (!booking) return
  
  console.log('Completing booking:', booking)
  booking.status = 'completed'
  
  // Close modal if open
  if (showBookingModal.value) {
    showBookingModal.value = false
    selectedBooking.value = null
  }
  
  // Implement actual booking completion logic
}

const cancelBooking = (booking) => {
  if (!booking) return
  
  console.log('Cancelling booking:', booking)
  booking.status = 'cancelled'
  
  // Implement actual booking cancellation logic
}

const acceptBooking = async (booking) => {
  if (!booking) return
  
  try {
    console.log('Accepting booking:', booking)
    
    // Call API to accept the booking
    const response = await $fetch(`/api/bookings/${booking.id}/accept`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${useCookie('auth-token').value}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.success) {
      // Update the booking status locally
      booking.status = 'confirmed'
      
      // Close modal if open
      if (showBookingModal.value) {
        showBookingModal.value = false
        selectedBooking.value = null
      }
      
      // Show success notification
      showNotification('Booking accepted successfully!', 'success')
      
      // Refresh the bookings list
      await refreshBookings()
    } else {
      showNotification('Failed to accept booking', 'error')
    }
  } catch (error) {
    console.error('Error accepting booking:', error)
    showNotification('Failed to accept booking. Please try again.', 'error')
  }
}

const showNotification = (message, type = 'info') => {
  // Create notification element
  const notification = document.createElement('div')
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`
  notification.textContent = message
  
  // Add to page
  document.body.appendChild(notification)
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification)
    }
  }, 3000)
}

const scrollToAssignedBookings = () => {
  // Scroll to the first assigned booking in the list
  const assignedBookingElement = document.querySelector('[data-status="assigned"]')
  if (assignedBookingElement) {
    assignedBookingElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const refreshBookings = async () => {
  console.log('Refreshing my bookings')
  // Refresh the bookings data
  await refresh()
}
</script> 