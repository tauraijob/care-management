<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 flex items-center justify-center" style="background-image: url('/uploads/nurse-senior-man-and-tablet-for-telehealth-daily-2025-04-05-19-09-26-utc.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 px-4">
        <div class="max-w-3xl mx-auto bg-white/95 rounded-2xl shadow-lg p-6 md:p-8 text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Skilled Nursing</h1>
          <p class="text-xl text-gray-700">Professional Medical Care</p>
          <p class="text-base md:text-lg text-gray-600">Licensed nursing care in the comfort of your home</p>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/uploads/skilled-nursing.jpg" alt="Skilled Nursing" class="w-full h-80 object-cover rounded-xl shadow" />
          <div>
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:stethoscope" class="text-3xl text-blue-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Skilled Nursing Services</h2>
            <p class="text-xl text-gray-600">
              Our Skilled Nursing services provide professional medical care delivered by licensed nurses in the comfort of your home.
              We offer comprehensive clinical care, medication management, and health monitoring for complex medical needs.
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
              <Icon name="mdi:needle" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">IV Therapy</h4>
            <p class="text-gray-600">Intravenous medication administration, hydration therapy, and IV line management.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:bandage" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Wound Care</h4>
            <p class="text-gray-600">Advanced wound assessment, treatment, and dressing changes for complex wounds.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:clipboard-pulse" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Health Monitoring</h4>
            <p class="text-gray-600">Vital signs monitoring, health assessments, and clinical evaluations.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:pill" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Medication Management</h4>
            <p class="text-gray-600">Complex medication administration, monitoring, and side effect management.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your skilled nursing needs.
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
  title: 'Skilled Nursing Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Professional skilled nursing services providing IV therapy, wound care, health monitoring, and medication management by licensed nurses in your home.' }
  ]
})
</script> 