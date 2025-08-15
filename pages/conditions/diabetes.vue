<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Diabetes Care</h1>
        <p class="text-2xl text-blue-100">Management & Support</p>
        <p class="text-lg text-blue-200">Specialized care for diabetes management</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="text-center mb-16">
        <div class="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:needle" class="text-4xl text-yellow-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Diabetes Care Services</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our Diabetes Care services provide specialized support for individuals managing diabetes. 
          We focus on blood sugar monitoring, medication management, lifestyle support, and 
          preventing complications through comprehensive care approaches.
        </p>
      </div>

      <!-- What We Offer -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">Our Approach</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:clipboard-pulse" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Blood Sugar Monitoring</h4>
            <p class="text-gray-600">Regular blood glucose monitoring and tracking for optimal management.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:pill" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Medication Management</h4>
            <p class="text-gray-600">Insulin administration, medication reminders, and dosage monitoring.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:food" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Nutritional Support</h4>
            <p class="text-gray-600">Diabetes-friendly meal planning and dietary guidance.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:walk" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Lifestyle Support</h4>
            <p class="text-gray-600">Exercise encouragement and lifestyle modification guidance.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your diabetes care needs.
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
  title: 'Diabetes Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Specialized diabetes care services providing blood sugar monitoring, medication management, nutritional support, and lifestyle guidance for diabetes management.' }
  ]
})
</script> 