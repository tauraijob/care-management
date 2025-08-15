<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Palliative Care</h1>
        <p class="text-2xl text-blue-100">Compassionate Support</p>
        <p class="text-lg text-blue-200">Specialized care for comfort and dignity</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="text-center mb-16">
        <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:heart" class="text-4xl text-purple-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Palliative Care Services</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our Palliative Care services provide compassionate, specialized care focused on 
          comfort, dignity, and quality of life. We support individuals and families through 
          challenging times with holistic care approaches.
        </p>
      </div>

      <!-- What We Offer -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">Our Approach</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:pill" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Pain Management</h4>
            <p class="text-gray-600">Specialized pain relief and symptom management for optimal comfort.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-heart" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Emotional Support</h4>
            <p class="text-gray-600">Compassionate emotional support for individuals and family members.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-group" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Family Care</h4>
            <p class="text-gray-600">Support and guidance for family members during difficult times.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:home" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Comfort Care</h4>
            <p class="text-gray-600">Personal care and comfort measures in familiar surroundings.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your palliative care needs.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn-primary text-lg px-8 py-3">
            Contact Us
          </NuxtLink>
          <NuxtLink to="/services" class="btn-secondary text-lg px-8 py-3">
            View All Services
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Palliative Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Compassionate palliative care services providing pain management, emotional support, family care, and comfort care for individuals and families during challenging times.' }
  ]
})
</script> 