<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Post-Stroke Care</h1>
        <p class="text-2xl text-blue-100">Recovery & Rehabilitation</p>
        <p class="text-lg text-blue-200">Specialized care for stroke recovery and rehabilitation</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/uploads/senior-woman-person-with-disability-and-retiremen-2025-04-06-09-29-41-utc-min.jpg" alt="Post-Stroke Care" class="w-full h-80 object-cover rounded-xl shadow" />
          <div>
            <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:heart-pulse" class="text-3xl text-red-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Post-Stroke Care Services</h2>
            <p class="text-xl text-gray-600">
              Our Post-Stroke Care services provide comprehensive support for individuals recovering from stroke. We focus on
              rehabilitation, mobility improvement, and helping individuals regain independence through personalized care plans.
            </p>
          </div>
        </div>
      </div>

      <!-- What We Offer -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">Our Approach</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:walk" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Mobility Rehabilitation</h4>
            <p class="text-gray-600">Gait training, balance exercises, and mobility improvement programs.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:arm-flex" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Physical Therapy</h4>
            <p class="text-gray-600">Strengthening exercises and physical rehabilitation to improve function.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-voice" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Speech Therapy</h4>
            <p class="text-gray-600">Communication and swallowing therapy for stroke-related difficulties.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-heart" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Personal Care</h4>
            <p class="text-gray-600">Assistance with daily activities and personal hygiene during recovery.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your post-stroke care needs.
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
  title: 'Post-Stroke Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Comprehensive post-stroke care services providing mobility rehabilitation, physical therapy, speech therapy, and personal care for stroke recovery and rehabilitation.' }
  ]
})
</script> 