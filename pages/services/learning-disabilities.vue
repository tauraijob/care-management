<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Learning Disabilities Care</h1>
        <p class="text-2xl text-blue-100">Specialized Support</p>
        <p class="text-lg text-blue-200">Compassionate care for individuals with learning disabilities</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/uploads/top-view-of-autism-puzzle-lettering-and-special-ki-2024-11-10-17-13-58-utc-min_11zon.jpg" alt="Learning Disabilities Care" class="w-full h-80 object-cover rounded-xl shadow" />
          <div>
            <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:lightbulb" class="text-3xl text-indigo-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Learning Disabilities Care Services</h2>
            <p class="text-xl text-gray-600">
              Our Learning Disabilities Care services provide specialized support for individuals 
              with learning disabilities. We focus on promoting independence, building life skills, 
              and creating meaningful opportunities for personal growth and development.
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
              <Icon name="mdi:account-heart" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Personal Care Support</h4>
            <p class="text-gray-600">Assistance with daily living activities tailored to individual abilities and needs.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:school" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Life Skills Development</h4>
            <p class="text-gray-600">Teaching practical skills for independent living and community participation.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-group" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Social Skills Support</h4>
            <p class="text-gray-600">Building communication skills and fostering meaningful social connections.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:calendar" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Activity Planning</h4>
            <p class="text-gray-600">Organizing engaging activities that promote learning, creativity, and enjoyment.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your learning disabilities care needs.
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
  title: 'Learning Disabilities Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Specialized learning disabilities care services providing personal care support, life skills development, social skills support, and activity planning for individuals with learning disabilities.' }
  ]
})
</script> 