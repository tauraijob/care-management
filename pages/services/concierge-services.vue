<template>
  <div class="min-h-screen">
    <!-- Header -->
    <PublicHeader />
    
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Concierge Services</h1>
        <p class="text-2xl text-blue-100">Premium care coordination for discerning families</p>
        <p class="text-lg text-blue-200">Personalized support that goes beyond traditional home care</p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Introduction -->
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Exceptional Care Coordination</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our Concierge Services provide a premium level of care coordination and support, designed for families who expect the highest standards of service and attention to detail.
        </p>
      </div>

      <!-- Service Features -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Icon name="mdi:account-tie" class="text-2xl text-blue-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Dedicated Care Manager</h3>
          <p class="text-gray-600">Your personal care coordinator who oversees every aspect of your loved one's care plan and ensures seamless service delivery.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Icon name="mdi:calendar-clock" class="text-2xl text-green-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">24/7 Availability</h3>
          <p class="text-gray-600">Round-the-clock access to your care team for urgent needs, questions, or simply peace of mind.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Icon name="mdi:medical-bag" class="text-2xl text-purple-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Medical Coordination</h3>
          <p class="text-gray-600">Seamless coordination with healthcare providers, medication management, and appointment scheduling.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
            <Icon name="mdi:airplane" class="text-2xl text-orange-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Diaspora Support</h3>
          <p class="text-gray-600">Specialized support for families living abroad, including regular updates, video calls, and travel coordination.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <Icon name="mdi:shield-check" class="text-2xl text-red-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Quality Assurance</h3>
          <p class="text-gray-600">Regular quality checks, performance monitoring, and continuous improvement of care standards.</p>
        </div>

        <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
          <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Icon name="mdi:handshake" class="text-2xl text-indigo-600" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">Family Liaison</h3>
          <p class="text-gray-600">Regular communication with family members, detailed reports, and proactive updates on care progress.</p>
        </div>
      </div>

      <!-- What's Included -->
      <div class="bg-gray-50 rounded-xl p-8 mb-16">
        <h3 class="text-3xl font-bold text-gray-900 mb-6 text-center">What's Included in Concierge Services</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <h4 class="text-xl font-bold text-gray-900 mb-4">Care Management</h4>
            <ul class="space-y-3">
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Personalized care plan development and monitoring</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Regular care team supervision and training</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Quality assurance and performance reviews</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Emergency response coordination</span>
              </li>
            </ul>
          </div>
          <div class="space-y-4">
            <h4 class="text-xl font-bold text-gray-900 mb-4">Family Support</h4>
            <ul class="space-y-3">
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Weekly detailed reports and updates</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Scheduled video calls and consultations</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span class="text-gray-700">Travel coordination and support</span>
              </li>
              <li class="flex items-start">
                <Icon name="mdi:check-circle" class="text-green-600 mt-1 mr-3 flex-shrink-0" />
                <span class="text-gray-700">24/7 emergency contact availability</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <h3 class="text-3xl font-bold text-gray-900 mb-4">Ready to Experience Premium Care?</h3>
        <p class="text-xl text-gray-600 mb-8">Contact us to learn more about our Concierge Services and how we can support your family.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn-primary px-8 py-3 text-lg">
            Get Started
          </NuxtLink>
          <a href="tel:+263710708027" class="btn-secondary px-8 py-3 text-lg">
            Call Us Now
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <PublicFooter />
  </div>
</template>

<script setup>
useHead({ title: 'Concierge Services - Lucerna & Stern Health' })
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium;
}

.btn-secondary {
  @apply inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium;
}
</style>
