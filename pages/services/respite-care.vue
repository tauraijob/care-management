<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Respite Care</h1>
        <p class="text-2xl text-blue-100">Short-term, Compassionate Care</p>
        <p class="text-lg text-blue-200">Giving families time to rest, travel, or manage life's demands</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/uploads/respite-care.jpg" alt="Respite Care" class="w-full h-80 object-cover rounded-xl shadow" />
          <div>
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:heart-pulse" class="text-3xl text-purple-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Respite Care Services</h2>
            <p class="text-xl text-gray-600">
              Our Respite Care services provide short-term, compassionate care that gives long-distance families time to rest,
              travel, or manage life's demands. We step in to provide the same high-quality care your loved one deserves while
              you take care of yourself.
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
              <Icon name="mdi:calendar-clock" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Flexible Scheduling</h4>
            <p class="text-gray-600">Short-term care from a few hours to several days, scheduled when you need it most.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:airplane" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Travel Support</h4>
            <p class="text-gray-600">Care coverage while you travel for work, family events, or much-needed vacations.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-multiple" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Family Relief</h4>
            <p class="text-gray-600">Give family caregivers time to rest, recharge, and attend to their own needs.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:medical-bag" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Continuity of Care</h4>
            <p class="text-gray-600">Seamless care transition with detailed handoffs and ongoing communication.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your respite care needs.
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
  title: 'Respite Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Short-term respite care services providing compassionate care while families rest, travel, or manage life demands. Flexible scheduling with continuity of care.' }
  ]
})
</script> 