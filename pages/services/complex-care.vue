<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Complex Care</h1>
        <p class="text-2xl text-blue-100">Specialized Medical Support</p>
        <p class="text-lg text-blue-200">Comprehensive care for complex medical conditions</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="text-center mb-16">
        <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:medical-bag" class="text-4xl text-blue-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Complex Care Services</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our Complex Care services provide specialized medical support for individuals with multiple 
          health conditions, chronic illnesses, or complex care needs. We offer comprehensive, 
          coordinated care in the comfort of your home.
        </p>
      </div>

      <!-- What We Offer -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">What We Offer</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:stethoscope" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Medical Monitoring</h4>
            <p class="text-gray-600">Regular health assessments, vital signs monitoring, and medication management.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-multiple" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Care Coordination</h4>
            <p class="text-gray-600">Coordination with doctors, specialists, and other healthcare providers.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:pill" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Medication Management</h4>
            <p class="text-gray-600">Complex medication schedules, administration, and monitoring for side effects.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:clipboard-pulse" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Treatment Support</h4>
            <p class="text-gray-600">Support with medical procedures, wound care, and rehabilitation exercises.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your complex care needs.
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
  title: 'Complex Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Specialized complex care services providing medical monitoring, care coordination, medication management, and treatment support for individuals with complex health needs.' }
  ]
})
</script> 