<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Live-In Care</h1>
        <p class="text-2xl text-blue-100">24/7 Support at Home</p>
        <p class="text-lg text-blue-200">Round-the-clock care in the comfort of your own home</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="text-center mb-16">
        <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:home-heart" class="text-4xl text-green-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Live-In Care Services</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our Live-In Care services provide 24/7 support in the comfort of your own home. 
          Our dedicated caregivers live with you, offering continuous care, companionship, 
          and support while maintaining your independence and familiar surroundings.
        </p>
      </div>

      <!-- What We Offer -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">What We Offer</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:clock-outline" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">24/7 Care</h4>
            <p class="text-gray-600">Round-the-clock support, monitoring, and assistance whenever needed.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-heart" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Personal Care</h4>
            <p class="text-gray-600">Assistance with bathing, dressing, grooming, and personal hygiene.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:food" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Meal Preparation</h4>
            <p class="text-gray-600">Nutritious meal planning, preparation, and assistance with eating.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:home" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Home Management</h4>
            <p class="text-gray-600">Light housekeeping, laundry, and maintaining a safe living environment.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your live-in care needs.
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
  title: 'Live-In Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: '24/7 live-in care services providing round-the-clock support, personal care, meal preparation, and home management in the comfort of your own home.' }
  ]
})
</script> 