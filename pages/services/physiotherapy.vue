<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Physiotherapy</h1>
        <p class="text-2xl text-blue-100">Movement & Recovery</p>
        <p class="text-lg text-blue-200">Specialized physical therapy in your home</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="text-center mb-16">
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:human-handsup" class="text-4xl text-green-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Physiotherapy Services</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our Physiotherapy services provide specialized physical therapy in the comfort of your home. 
          We focus on improving mobility, reducing pain, and enhancing overall physical function 
          through evidence-based treatment approaches.
        </p>
      </div>

      <!-- What We Offer -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">What We Offer</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:walk" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Mobility Training</h4>
            <p class="text-gray-600">Gait training, balance exercises, and mobility improvement programs.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:hand-back-right" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Manual Therapy</h4>
            <p class="text-gray-600">Hands-on techniques for pain relief, joint mobilization, and soft tissue work.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:dumbbell" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Exercise Programs</h4>
            <p class="text-gray-600">Customized exercise routines for strength, flexibility, and rehabilitation.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:clipboard-pulse" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Pain Management</h4>
            <p class="text-gray-600">Techniques to reduce pain, improve function, and enhance quality of life.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your physiotherapy needs.
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
  title: 'Physiotherapy Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Specialized physiotherapy services providing mobility training, manual therapy, exercise programs, and pain management in the comfort of your home.' }
  ]
})
</script> 