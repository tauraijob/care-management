<template>
  <div class="max-w-7xl mx-auto">
    <!-- Page Header -->
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">My Schedule</h1>
          <p class="text-sm text-gray-600 mt-1">View and manage your care appointments and availability</p>
        </div>
        <div class="flex items-center space-x-3">
          <button @click="exportSchedule" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Icon name="mdi:download" class="mr-2 h-4 w-4" />
            Export Schedule
          </button>
          <button @click="showAddEventModal = true" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Icon name="mdi:calendar-plus" class="mr-2 h-4 w-4" />
            Add Event
          </button>
        </div>
      </div>
    </div>

    <!-- Schedule Controls -->
    <div class="bg-white shadow rounded-lg mb-6">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div class="flex items-center space-x-4">
            <button @click="previousPeriod" class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Icon name="mdi:chevron-left" class="h-4 w-4" />
            </button>
            <h2 class="text-lg font-medium text-gray-900">{{ currentPeriodTitle }}</h2>
            <button @click="nextPeriod" class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Icon name="mdi:chevron-right" class="h-4 w-4" />
            </button>
            <button @click="goToToday" class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Today
            </button>
          </div>
          <div class="flex items-center space-x-2">
            <button @click="viewMode = 'day'" :class="viewMode === 'day' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'" class="px-3 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
              Day
            </button>
            <button @click="viewMode = 'week'" :class="viewMode === 'week' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'" class="px-3 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
              Week
            </button>
            <button @click="viewMode = 'month'" :class="viewMode === 'month' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-gray-700'" class="px-3 py-2 text-sm font-medium rounded-md border border-gray-300 hover:bg-gray-50">
              Month
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Schedule View -->
    <div v-if="viewMode === 'day'" class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">{{ formatDate(currentDate) }}</h3>
      </div>
      <div class="p-6">
        <div v-if="isLoading" class="flex justify-center items-center py-8">
          <div class="text-gray-500">Loading schedule...</div>
        </div>
        <div v-else-if="events.length === 0" class="flex justify-center items-center py-8">
          <div class="text-center">
            <Icon name="mdi:calendar-blank" class="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 mb-2">No events scheduled</h3>
            <p class="text-gray-500">You don't have any events scheduled for this period.</p>
            <button @click="showAddEventModal = true" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <Icon name="mdi:calendar-plus" class="mr-2 h-4 w-4" />
              Add Event
            </button>
          </div>
        </div>
        <div v-else class="space-y-4">
          <div v-for="hour in 24" :key="hour" class="flex">
            <div class="w-16 text-sm text-gray-500 pt-2">
              {{ formatHour(hour - 1) }}
            </div>
            <div class="flex-1 border-l border-gray-200 pl-4 min-h-[60px] relative">
              <div v-for="event in getEventsForHour(hour - 1)" :key="event.id" 
                   :class="getEventClasses(event.type)"
                   class="absolute left-4 right-4 p-2 rounded-md text-xs font-medium text-white cursor-pointer hover:opacity-90"
                   :style="{ top: `${(event.startMinute / 60) * 60}px`, height: `${Math.max((event.duration / 60) * 60, 20)}px` }"
                   @click="viewEvent(event)">
                <div class="font-semibold">{{ event.title }}</div>
                <div class="opacity-90">{{ event.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Schedule View -->
    <div v-if="viewMode === 'week'" class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Week of {{ formatWeekRange() }}</h3>
      </div>
      <div class="overflow-x-auto">
        <div class="min-w-full">
          <!-- Week Header -->
          <div class="grid grid-cols-8 border-b border-gray-200">
            <div class="p-3 text-sm font-medium text-gray-500"></div>
            <div v-for="day in weekDays" :key="day.date" class="p-3 text-sm font-medium text-gray-900 text-center">
              <div>{{ day.name }}</div>
              <div class="text-xs text-gray-500">{{ formatDay(day.date) }}</div>
            </div>
          </div>
          <!-- Time Slots -->
          <div v-for="hour in 12" :key="hour" class="grid grid-cols-8 border-b border-gray-100">
            <div class="p-2 text-xs text-gray-500 text-right pr-3">
              {{ formatHour((hour - 1) * 2) }}
            </div>
            <div v-for="day in weekDays" :key="day.date" class="p-2 border-l border-gray-100 min-h-[80px] relative">
              <div v-for="event in getEventsForDayAndHour(day.date, (hour - 1) * 2)" :key="event.id"
                   :class="getEventClasses(event.type)"
                   class="p-1 rounded text-xs font-medium text-white cursor-pointer hover:opacity-90"
                   @click="viewEvent(event)">
                <div class="font-semibold truncate">{{ event.title }}</div>
                <div class="opacity-90 truncate">{{ event.location }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Monthly Calendar View -->
    <div v-if="viewMode === 'month'" class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">{{ formatMonth(currentDate) }}</h3>
      </div>
      <div class="p-6">
        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-px bg-gray-200">
          <!-- Day Headers -->
          <div v-for="dayName in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="dayName" 
               class="bg-gray-50 p-3 text-center text-sm font-medium text-gray-900">
            {{ dayName }}
          </div>
          <!-- Calendar Days -->
          <div v-for="day in calendarDays" :key="day.date" 
               :class="day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'"
               class="min-h-[120px] p-2 relative">
            <div class="text-sm font-medium text-gray-900 mb-1">{{ day.dayNumber }}</div>
            <div class="space-y-1">
              <div v-for="event in getEventsForDate(day.date)" :key="event.id"
                   :class="getEventClasses(event.type)"
                   class="p-1 rounded text-xs font-medium text-white cursor-pointer hover:opacity-90 truncate"
                   @click="viewEvent(event)">
                {{ event.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Events -->
    <div class="mt-8 bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Upcoming Events</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div v-for="event in upcomingEvents" :key="event.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div class="flex items-center space-x-4">
              <div :class="getEventIconClasses(event.type)" class="w-10 h-10 rounded-full flex items-center justify-center">
                <Icon :name="getEventIcon(event.type)" class="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-900">{{ event.title }}</h4>
                <p class="text-sm text-gray-500">{{ event.location }}</p>
                <p class="text-xs text-gray-400">{{ formatEventTime(event) }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <button @click="viewEvent(event)" class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                View
              </button>
              <button @click="editEvent(event)" class="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Event Modal -->
    <div v-if="showAddEventModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-6 border w-96 shadow-xl rounded-lg bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-semibold text-gray-900">Add New Event</h3>
            <button @click="showAddEventModal = false" class="text-gray-400 hover:text-gray-600">
              <Icon name="mdi:close" class="h-6 w-6" />
            </button>
          </div>
          <form @submit.prevent="addEvent">
            <div class="space-y-6">
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Event Title *</label>
                <input v-model="newEvent.title" type="text" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" placeholder="Enter event title" />
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Event Type *</label>
                <select v-model="newEvent.type" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900">
                  <option value="">Select event type</option>
                  <option value="appointment">Patient Appointment</option>
                  <option value="meeting">Meeting</option>
                  <option value="break">Break</option>
                  <option value="training">Training</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Date *</label>
                <input v-model="newEvent.date" type="date" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label class="block text-sm font-semibold text-gray-800 mb-2">Start Time *</label>
                  <input v-model="newEvent.startTime" type="time" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" />
                </div>
                <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <label class="block text-sm font-semibold text-gray-800 mb-2">End Time *</label>
                  <input v-model="newEvent.endTime" type="time" required class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" />
                </div>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Location</label>
                <input v-model="newEvent.location" type="text" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" placeholder="Enter location" />
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label class="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                <textarea v-model="newEvent.description" rows="3" class="block w-full px-3 py-2 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-white text-gray-900" placeholder="Enter event description"></textarea>
              </div>
            </div>
            <div class="mt-8 flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button type="button" @click="showAddEventModal = false" class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Event Details Modal -->
    <div v-if="showEventModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-lucerna-primary">{{ activeEvent?.title }}</h3>
          <button @click="closeEventModal" class="text-gray-500 hover:text-gray-700">
            <Icon name="mdi:close" class="h-5 w-5" />
          </button>
        </div>
        <div class="space-y-3 text-sm">
          <div class="flex items-start">
            <Icon name="mdi:calendar" class="h-4 w-4 text-lucerna-primary mt-0.5 mr-2" />
            <div>
              <div class="text-gray-500">Date</div>
              <div class="font-medium text-gray-900">{{ formatEventDate(activeEvent) }}</div>
            </div>
          </div>
          <div class="flex items-start">
            <Icon name="mdi:clock" class="h-4 w-4 text-lucerna-primary mt-0.5 mr-2" />
            <div>
              <div class="text-gray-500">Time</div>
              <div class="font-medium text-gray-900">{{ activeEvent?.startTime }} - {{ activeEvent?.endTime }}</div>
            </div>
          </div>
          <div v-if="activeEvent?.location" class="flex items-start">
            <Icon name="mdi:map-marker" class="h-4 w-4 text-lucerna-primary mt-0.5 mr-2" />
            <div>
              <div class="text-gray-500">Location</div>
              <div class="font-medium text-gray-900">{{ activeEvent.location }}</div>
            </div>
          </div>
          <div class="flex items-start">
            <Icon name="mdi:label" class="h-4 w-4 text-lucerna-primary mt-0.5 mr-2" />
            <div>
              <div class="text-gray-500">Type</div>
              <div class="font-medium text-gray-900 capitalize">{{ activeEvent?.type }}</div>
            </div>
          </div>
          <div v-if="activeEvent?.description" class="flex items-start">
            <Icon name="mdi:text" class="h-4 w-4 text-lucerna-primary mt-0.5 mr-2" />
            <div>
              <div class="text-gray-500">Description</div>
              <div class="text-gray-900">{{ activeEvent.description }}</div>
            </div>
          </div>
        </div>
        <div class="mt-6 flex justify-end space-x-3">
          <button @click="closeEventModal" class="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Close</button>
          <button @click="openEditEvent()" class="px-4 py-2 rounded bg-lucerna-primary text-white hover:bg-lucerna-primary-dark">Edit</button>
        </div>
      </div>
    </div>

    <!-- Edit Event Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold">Edit Event</h3>
          <button @click="closeEditModal" class="text-gray-500 hover:text-gray-700">
            <Icon name="mdi:close" class="h-5 w-5" />
          </button>
        </div>
        <form @submit.prevent="saveEvent">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input v-model="editForm.date" type="date" class="w-full rounded-md border-gray-300 focus:ring-lucerna-primary focus:border-lucerna-primary" required />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input v-model="editForm.startTime" type="time" class="w-full rounded-md border-gray-300 focus:ring-lucerna-primary focus:border-lucerna-primary" required />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <input v-model="editForm.endTime" type="time" class="w-full rounded-md border-gray-300 focus:ring-lucerna-primary focus:border-lucerna-primary" required />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input v-model="editForm.location" type="text" class="w-full rounded-md border-gray-300 focus:ring-lucerna-primary focus:border-lucerna-primary" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="editForm.description" rows="3" class="w-full rounded-md border-gray-300 focus:ring-lucerna-primary focus:border-lucerna-primary"></textarea>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button type="button" @click="closeEditModal" class="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
            <button type="submit" class="px-4 py-2 rounded bg-lucerna-primary text-white hover:bg-lucerna-primary-dark" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Debug Section (remove in production) -->
    <div v-if="isDev" class="mt-8 bg-gray-100 p-4 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Debug Info</h3>
      <div class="text-sm text-gray-700">
        <p><strong>Total Events:</strong> {{ events.length }}</p>
        <p><strong>Loading:</strong> {{ isLoading }}</p>
        <p><strong>Current Date:</strong> {{ formatDateForComparison(currentDate) }}</p>
        <div v-if="events.length > 0" class="mt-4">
          <p><strong>Events:</strong></p>
          <ul class="list-disc list-inside">
            <li v-for="event in events.slice(0, 5)" :key="event.id">
              {{ event.title }} - {{ event.date }} {{ event.startTime }}-{{ event.endTime }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'carer',
  
})

import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()

// Check if in development mode
const isDev = process.dev

// Reactive data
const viewMode = ref('week')
const currentDate = ref(new Date())
const showAddEventModal = ref(false)

// Event details modal
const showEventModal = ref(false)
const activeEvent = ref(null)

// Fetch real events for the carer
const events = ref([])
const isLoading = ref(true)

const fetchEvents = async () => {
  isLoading.value = true
  try {
    const today = new Date()
    const startDate = today.toISOString().split('T')[0]
    const endDate = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    console.log('Fetching events from:', startDate, 'to:', endDate)
    
    const { data } = await $fetch('/api/carer/schedule', {
      headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` },
      query: { startDate, endDate }
    })
    
    console.log('Fetched events:', data.events)
    events.value = data.events || []
  } catch (e) {
    console.error('Error fetching events:', e)
    events.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchEvents)

// Compute free slots for a given day (assuming 8am-6pm working hours, 1-hour slots)
const getFreeSlotsForDate = (date) => {
  const slots = []
  for (let hour = 8; hour < 18; hour++) {
    const slotStart = `${hour.toString().padStart(2, '0')}:00`
    const slotEnd = `${(hour + 1).toString().padStart(2, '0')}:00`
    const hasBooking = events.value.some(event => event.date === date && (
      (event.startTime <= slotStart && event.endTime > slotStart) ||
      (event.startTime < slotEnd && event.endTime >= slotEnd) ||
      (event.startTime >= slotStart && event.endTime <= slotEnd)
    ))
    if (!hasBooking) {
      slots.push({
        date,
        startTime: slotStart,
        endTime: slotEnd
      })
    }
  }
  return slots
}

const newEvent = ref({
  title: '',
  type: '',
  date: '',
  startTime: '',
  endTime: '',
  location: '',
  description: ''
})

// Computed properties
const currentPeriodTitle = computed(() => {
  if (viewMode.value === 'day') {
    return formatDate(currentDate.value)
  } else if (viewMode.value === 'week') {
    return formatWeekRange()
  } else {
    return formatMonth(currentDate.value)
  }
})

const weekDays = computed(() => {
  const days = []
  const startOfWeek = new Date(currentDate.value)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(date.getDate() + i)
    days.push({
      date: formatDateForComparison(date),
      name: date.toLocaleDateString('en-US', { weekday: 'short' })
    })
  }
  return days
})

const calendarDays = computed(() => {
  const days = []
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    days.push({
      date: formatDateForComparison(date),
      dayNumber: date.getDate(),
      isCurrentMonth: date.getMonth() === month
    })
  }
  return days
})

const upcomingEvents = computed(() => {
  const today = formatDateForComparison(new Date())
  return events.value
    .filter(event => event.date >= today)
    .sort((a, b) => new Date(`${a.date} ${a.startTime}`) - new Date(`${b.date} ${b.startTime}`))
    .slice(0, 5)
})

// Methods
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateForComparison = (date) => {
  return date.toISOString().split('T')[0]
}

const formatHour = (hour) => {
  return `${hour.toString().padStart(2, '0')}:00`
}

const formatDay = (dateString) => {
  const date = new Date(dateString)
  return date.getDate()
}

const formatWeekRange = () => {
  const startOfWeek = new Date(currentDate.value)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(endOfWeek.getDate() + 6)
  
  return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
}

const formatMonth = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

const formatEventTime = (event) => {
  return `${event.startTime} - ${event.endTime}`
}

const formatEventDate = (event) => {
  if (!event) return ''
  const d = new Date(event.date)
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const getEventsForHour = (hour) => {
  const dateString = formatDateForComparison(currentDate.value)
  return events.value.filter(event => {
    if (event.date !== dateString) return false
    const eventHour = parseInt(event.startTime.split(':')[0])
    return eventHour === hour
  })
}

const getEventsForDayAndHour = (date, hour) => {
  return events.value.filter(event => {
    if (event.date !== date) return false
    const eventHour = parseInt(event.startTime.split(':')[0])
    return eventHour === hour
  })
}

const getEventsForDate = (date) => {
  return events.value.filter(event => event.date === date)
}

const getEventClasses = (type) => {
  const classes = {
    appointment: 'bg-blue-500',
    meeting: 'bg-green-500',
    break: 'bg-yellow-500',
    training: 'bg-purple-500',
    other: 'bg-gray-500'
  }
  return classes[type] || 'bg-gray-500'
}

const getEventIconClasses = (type) => {
  const classes = {
    appointment: 'bg-blue-500',
    meeting: 'bg-green-500',
    break: 'bg-yellow-500',
    training: 'bg-purple-500',
    other: 'bg-gray-500'
  }
  return classes[type] || 'bg-gray-500'
}

const getEventIcon = (type) => {
  const icons = {
    appointment: 'mdi:account-heart',
    meeting: 'mdi:account-group',
    break: 'mdi:coffee',
    training: 'mdi:school',
    other: 'mdi:calendar'
  }
  return icons[type] || 'mdi:calendar'
}

const previousPeriod = () => {
  if (viewMode.value === 'day') {
    currentDate.value.setDate(currentDate.value.getDate() - 1)
  } else if (viewMode.value === 'week') {
    currentDate.value.setDate(currentDate.value.getDate() - 7)
  } else {
    currentDate.value.setMonth(currentDate.value.getMonth() - 1)
  }
}

const nextPeriod = () => {
  if (viewMode.value === 'day') {
    currentDate.value.setDate(currentDate.value.getDate() + 1)
  } else if (viewMode.value === 'week') {
    currentDate.value.setDate(currentDate.value.getDate() + 7)
  } else {
    currentDate.value.setMonth(currentDate.value.getMonth() + 1)
  }
}

const goToToday = () => {
  currentDate.value = new Date()
}

const viewEvent = (event) => {
  activeEvent.value = event
  showEventModal.value = true
}

const closeEventModal = () => {
  showEventModal.value = false
  activeEvent.value = null
}

// Edit modal state
const showEditModal = ref(false)
const editForm = ref({ id: '', title: '', type: '', date: '', startTime: '', endTime: '', location: '', description: '' })

function openEditEvent() {
  if (!activeEvent.value) return
  editForm.value = { ...activeEvent.value }
  showEditModal.value = true
}

const addEvent = async () => {
  try {
    console.log('Adding event:', newEvent.value)
    
    const response = await $fetch('/api/carer/events', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` },
      body: newEvent.value
    })
    
    if (response.success) {
      // Refresh events after adding new one
      await fetchEvents()
      showAddEventModal.value = false
      newEvent.value = {
        title: '',
        type: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        description: ''
      }
    }
  } catch (error) {
    console.error('Error adding event:', error)
    
    // Extract error message from the response
    let errorMessage = 'Failed to add event. Please try again.'
    
    if (error.data?.statusMessage) {
      errorMessage = error.data.statusMessage
    } else if (error.statusMessage) {
      errorMessage = error.statusMessage
    } else if (error.message) {
      errorMessage = error.message
    }
    
    alert(errorMessage)
  }
}

function closeEditModal() {
  showEditModal.value = false
}

const saving = ref(false)
async function saveEvent() {
  if (!editForm.value.id) return
  saving.value = true
  try {
    await $fetch('/api/carer/events', {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${useCookie('auth-token').value}` },
      body: { ...editForm.value }
    })
    closeEditModal()
    showEventModal.value = false
    await fetchEvents()
  } catch (e) {
    console.error('Save event failed', e)
    alert(e?.data?.statusMessage || 'Failed to save event')
  } finally {
    saving.value = false
  }
}

const exportSchedule = () => {
  console.log('Export schedule')
}
</script> 