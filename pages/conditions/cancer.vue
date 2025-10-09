<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Cancer Care</h1>
        <p class="text-2xl text-blue-100">Compassionate Support</p>
        <p class="text-lg text-blue-200">Specialized care for individuals with cancer</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/uploads/woman-doctor-or-consulting-with-patient-for-healt-2025-04-05-17-20-26-utc-min.jpg" alt="Cancer Care" class="w-full h-80 object-cover rounded-xl shadow" />
          <div>
            <div class="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:heart" class="text-3xl text-pink-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Cancer Care Services</h2>
            <p class="text-xl text-gray-600">
              Our Cancer Care services provide compassionate, specialized support for individuals living with cancer. We focus on comfort,
              symptom management, and maintaining quality of life throughout the cancer journey.
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
              <Icon name="mdi:pill" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Symptom Management</h4>
            <p class="text-gray-600">Comprehensive symptom control and pain management for comfort.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-heart" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Personal Care</h4>
            <p class="text-gray-600">Gentle assistance with daily activities and personal hygiene.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:food" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Nutritional Support</h4>
            <p class="text-gray-600">Specialized meal planning and assistance with eating difficulties.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-group" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Family Support</h4>
            <p class="text-gray-600">Emotional support and guidance for family members and caregivers.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your cancer care needs.
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
  title: 'Cancer Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Compassionate cancer care services providing symptom management, personal care, nutritional support, and family support for individuals living with cancer.' }
  ]
})
</script> 