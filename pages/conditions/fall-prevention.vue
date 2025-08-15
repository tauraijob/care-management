<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Fall Prevention</h1>
        <p class="text-2xl text-blue-100">Safety & Prevention</p>
        <p class="text-lg text-blue-200">Specialized care to prevent falls and maintain safety</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="text-center mb-16">
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:shield-check" class="text-4xl text-green-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Fall Prevention Services</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our Fall Prevention services focus on creating a safe environment and implementing 
          strategies to reduce fall risk. We provide comprehensive assessments, safety modifications, 
          and ongoing monitoring to maintain independence safely.
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
            <h4 class="text-xl font-bold text-gray-900 mb-3">Risk Assessment</h4>
            <p class="text-gray-600">Comprehensive evaluation of fall risk factors and safety concerns.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:home" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Home Safety</h4>
            <p class="text-gray-600">Home modifications and safety improvements to prevent falls.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:walk" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Mobility Training</h4>
            <p class="text-gray-600">Balance exercises and mobility training to improve stability.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:eye" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Ongoing Monitoring</h4>
            <p class="text-gray-600">Regular monitoring and adjustment of safety measures as needed.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your fall prevention needs.
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
  title: 'Fall Prevention Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Specialized fall prevention services providing risk assessment, home safety modifications, mobility training, and ongoing monitoring to prevent falls and maintain safety.' }
  ]
})
</script> 