<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Occupational Therapy</h1>
        <p class="text-2xl text-blue-100">Daily Living Skills</p>
        <p class="text-lg text-blue-200">Enhancing independence in daily activities</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/uploads/pic1.png" alt="Occupational Therapy" class="w-full h-80 object-cover rounded-xl shadow" />
          <div>
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:arm-flex" class="text-3xl text-orange-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Occupational Therapy Services</h2>
            <p class="text-xl text-gray-600">
              Our Occupational Therapy services focus on helping individuals regain independence in daily activities. We work to
              improve motor skills, cognitive function, and adaptive techniques to enhance quality of life and maintain independence.
            </p>
          </div>
        </div>
      </div>

      <!-- What We Offer -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">What We Offer</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:silverware" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Activities of Daily Living</h4>
            <p class="text-gray-600">Training for dressing, bathing, eating, and other daily self-care activities.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:home" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Home Modifications</h4>
            <p class="text-gray-600">Assessment and recommendations for home safety and accessibility improvements.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:brain" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Cognitive Rehabilitation</h4>
            <p class="text-gray-600">Exercises and strategies to improve memory, attention, and problem-solving skills.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:wheelchair-accessibility" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Adaptive Equipment</h4>
            <p class="text-gray-600">Assessment and training for assistive devices and adaptive equipment.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your occupational therapy needs.
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
  title: 'Occupational Therapy Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Specialized occupational therapy services providing activities of daily living training, home modifications, cognitive rehabilitation, and adaptive equipment support.' }
  ]
})
</script> 