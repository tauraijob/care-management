<template>
  <div class="min-h-screen">
    <!-- Header -->
    <PublicHeader />

    <!-- Hero Section -->
    <section class="relative h-96 flex items-center justify-center" style="background-image: url('/uploads/our-services-page.jpg'); background-size: cover; background-position: top center; background-repeat: no-repeat;">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Our Services</h1>
        <p class="text-2xl text-white/90">Comprehensive care solutions tailored to your needs</p>
        <p class="text-lg text-white/80">Professional, compassionate care that feels like family</p>
      </div>
    </section>

    <!-- Service Category Tabs -->
    <section class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4">
        <nav class="flex flex-wrap justify-center gap-6 py-6">
          <NuxtLink
            v-for="tab in serviceTabs"
            :key="tab.id"
            :to="{ path: '/services', query: { tab: tab.id } }"
            :class="[
              'px-1 py-2 text-lg font-medium transition-colors focus:outline-none',
              activeTab === tab.id
                ? 'text-lucerna-primary border-b-2 border-lucerna-primary'
                : 'text-gray-700 hover:text-lucerna-primary focus:text-lucerna-primary',
            ]"
          >
            <span class="inline-block pb-1">
              {{ tab.title }}
            </span>
          </NuxtLink>
        </nav>
      </div>
    </section>

    <!-- Service Content -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Home Health Aide Services -->
      <div v-if="activeTab === 'home-health'" class="space-y-12">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Home Health Aide Services</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            From just a few hours a day to full 24/7 care, Lucerna & Stern Health offers flexible, high-quality in-home support tailored to your exact needs. Our services are delivered by dedicated, trained Nursing Aides who treat every client like family.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink to="/services/personal-care" class="block h-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lucerna-primary">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-heart" class="text-2xl text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Personal Care</h3>
            <p class="text-gray-600 mb-4">Dignified, hands-on support with bathing, grooming, toileting, and mobility to promote comfort and independence.</p>
            <span class="text-lucerna-primary font-medium hover:text-lucerna-primary-dark mt-auto inline-block">Learn More →</span>
          </NuxtLink>

          <NuxtLink to="/services/companion-care" class="block h-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lucerna-primary">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-group" class="text-2xl text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Companion Care</h3>
            <p class="text-gray-600 mb-4">A warm, reliable presence offering social connection, light housekeeping, errands, and support with daily routines.</p>
            <span class="text-lucerna-primary font-medium hover:text-lucerna-primary-dark mt-auto inline-block">Learn More →</span>
          </NuxtLink>

          <NuxtLink to="/services/respite-care" class="block h-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lucerna-primary">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:heart-pulse" class="text-2xl text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Respite Care</h3>
            <p class="text-gray-600 mb-4">Short-term, compassionate care that gives long-distance families time to rest, travel, or manage life's demands.</p>
            <span class="text-lucerna-primary font-medium hover:text-lucerna-primary-dark mt-auto inline-block">Learn More →</span>
          </NuxtLink>

          <NuxtLink to="/services/complex-care" class="block h-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lucerna-primary">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:clock" class="text-2xl text-orange-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">24/7 Complex Care</h3>
            <p class="text-gray-600 mb-4">Specialist, round-the-clock support for loved ones with serious illness or high-dependency needs.</p>
            <span class="text-lucerna-primary font-medium hover:text-lucerna-primary-dark mt-auto inline-block">Learn More →</span>
          </NuxtLink>

          <NuxtLink to="/services/live-in-care" class="block h-full bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-lucerna-primary">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:home-heart" class="text-2xl text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Live-In Care</h3>
            <p class="text-gray-600 mb-4">Round-the-clock, in-home support for loved ones with complex or evolving needs.</p>
            <span class="text-lucerna-primary font-medium hover:text-lucerna-primary-dark mt-auto inline-block">Learn More →</span>
          </NuxtLink>
        </div>
      </div>

      <!-- Concierge Services -->
      <div v-if="activeTab === 'concierge'" class="space-y-12 mt-12">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Concierge Nursing & Private Duty Services</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            When care needs become more complex, Lucerna & Stern Health offers Concierge Services with enhanced privacy, flexibility, and clinical oversight.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:medical-bag" class="text-2xl text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Skilled Nursing Care</h3>
            <p class="text-gray-600 mb-4">Advanced nursing care, delivered at home. Wound care, chronic condition support, palliative care & more led by licensed nurses.</p>
            <NuxtLink to="/services/skilled-nursing" class="text-blue-600 font-medium hover:text-blue-700 mt-auto">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:walk" class="text-2xl text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Physiotherapy</h3>
            <p class="text-gray-600 mb-4">Regain strength, balance, and confidence at home. Therapy plans tailored to stroke recovery, surgery rehab, falls prevention & more.</p>
            <NuxtLink to="/services/physiotherapy" class="text-green-600 font-medium hover:text-green-700 mt-auto">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:microphone" class="text-2xl text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Speech Therapy</h3>
            <p class="text-gray-600 mb-4">Rebuild confidence, speech, and connection at home. We support clients with stroke recovery, swallowing issues, and voice disorders.</p>
            <NuxtLink to="/services/speech-therapy" class="text-purple-600 font-medium hover:text-purple-700 mt-auto">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:hand-front" class="text-2xl text-orange-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Occupational Therapy</h3>
            <p class="text-gray-600 mb-4">Regain confidence, independence, and control right at home. We help clients with daily tasks like bathing, dressing, and cooking.</p>
            <NuxtLink to="/services/occupational-therapy" class="text-orange-600 font-medium hover:text-orange-700 mt-auto">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full flex flex-col">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:brain" class="text-2xl text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Learning Disabilities & Autism Support</h3>
            <p class="text-gray-600 mb-4">Tailored, respectful care that honours individual needs, routines, and communication styles.</p>
            <NuxtLink to="/services/learning-disabilities" class="text-red-600 font-medium hover:text-red-700 mt-auto">
              Learn More →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Concierge Services -->
      <div v-if="activeTab === 'concierge'" class="space-y-12 mt-16 md:mt-24">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Concierge Services</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
            Premium care coordination for discerning families who expect the highest standards of service and attention to detail.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-tie" class="text-2xl text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Dedicated Care Manager</h3>
            <p class="text-gray-600 mb-4">Your personal care coordinator who oversees every aspect of your loved one's care plan and ensures seamless service delivery.</p>
            <NuxtLink to="/services/concierge-services" class="text-blue-600 font-medium hover:text-blue-700">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:calendar-clock" class="text-2xl text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">24/7 Availability</h3>
            <p class="text-gray-600 mb-4">Round-the-clock access to your care team for urgent needs, questions, or simply peace of mind.</p>
            <NuxtLink to="/services/concierge-services" class="text-green-600 font-medium hover:text-green-700">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:medical-bag" class="text-2xl text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Medical Coordination</h3>
            <p class="text-gray-600 mb-4">Seamless coordination with healthcare providers, medication management, and appointment scheduling.</p>
            <NuxtLink to="/services/concierge-services" class="text-purple-600 font-medium hover:text-purple-700">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:airplane" class="text-2xl text-orange-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Diaspora Support</h3>
            <p class="text-gray-600 mb-4">Specialized support for families living abroad, including regular updates, video calls, and travel coordination.</p>
            <NuxtLink to="/services/concierge-services" class="text-orange-600 font-medium hover:text-orange-700">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:shield-check" class="text-2xl text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
            <p class="text-gray-600 mb-4">Regular quality checks, performance monitoring, and continuous improvement of care standards.</p>
            <NuxtLink to="/services/concierge-services" class="text-red-600 font-medium hover:text-red-700">
              Learn More →
            </NuxtLink>
          </div>

          <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:handshake" class="text-2xl text-indigo-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Family Liaison</h3>
            <p class="text-gray-600 mb-4">Regular communication with family members, detailed reports, and proactive updates on care progress.</p>
            <NuxtLink to="/services/concierge-services" class="text-indigo-600 font-medium hover:text-indigo-700">
              Learn More →
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Chronic Conditions -->
      <div v-if="activeTab === 'chronic'" class="space-y-12">
        <div class="text-center">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Chronic Conditions</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Living with a chronic condition can be overwhelming—but you don't have to face it alone. At Lucerna & Stern Health, we provide personalised, research-backed home care that empowers you to manage your health with confidence.
          </p>
        </div>

        <div class="bg-gray-50 rounded-xl p-8 max-w-5xl mx-auto">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Conditions We Support</h3>
          <p class="text-center text-gray-600 mb-8">Click below to learn more about how we care for specific chronic health conditions:</p>
          
          <div class="flex flex-wrap justify-center gap-4 md:gap-6">
            <NuxtLink to="/conditions/alzheimers-dementia" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
              Alzheimer's & Dementia Disease →
            </NuxtLink>
            <NuxtLink to="/conditions/parkinsons" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
              Parkinson's Disease →
            </NuxtLink>
            <NuxtLink to="/conditions/palliative-care" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
              End of life & Palliative Care →
            </NuxtLink>
            <NuxtLink to="/conditions/fall-prevention" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
              Fall Prevention & Safer Mobility →
            </NuxtLink>
            <NuxtLink to="/conditions/post-stroke" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
              Post-Stroke Care →
            </NuxtLink>
            <NuxtLink to="/conditions/cancer" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
              Cancer →
            </NuxtLink>
            <NuxtLink to="/conditions/diabetes" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
              Diabetes →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <PublicFooter />
  </div>
</template>

<script setup>
// Service tabs data
const route = useRoute()
const validTabs = ['home-health', 'concierge', 'chronic']
const initialTab = Array.isArray(route.query.tab) ? route.query.tab[0] : route.query.tab
const activeTab = ref(initialTab && validTabs.includes(initialTab) ? initialTab : 'home-health')

// Keep URL and UI in sync
watch(() => route.query.tab, (newVal) => {
  const tab = Array.isArray(newVal) ? newVal[0] : newVal
  if (tab && validTabs.includes(tab)) {
    activeTab.value = tab
  }
})

const serviceTabs = ref([
  { id: 'home-health', title: 'Home Health Aide Services' },
  { id: 'concierge', title: 'Concierge Services' },
  { id: 'chronic', title: 'Chronic Conditions' }
])
</script>


