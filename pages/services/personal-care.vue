<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-lucerna-primary to-lucerna-primary-dark flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Personal Care</h1>
        <p class="text-2xl text-blue-100">Dignified, Hands-on Support</p>
        <p class="text-lg text-blue-200">Promoting comfort and independence through compassionate care</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img src="/uploads/pic5.png" alt="Personal Care" class="w-full h-80 object-cover rounded-xl shadow" />
          <div>
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Icon name="mdi:account-heart" class="text-3xl text-blue-600" />
            </div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Personal Care Services</h2>
            <p class="text-xl text-gray-600">
              Our Personal Care services provide dignified, hands-on support with bathing, grooming, toileting, and mobility
              to promote comfort and independence. Our trained Nursing Aides treat every client with respect, compassion, and
              professionalism.
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
              <Icon name="mdi:shower" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Bathing & Hygiene</h4>
            <p class="text-gray-600">Assistance with bathing, showering, and personal hygiene to maintain dignity and comfort.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:scissors-cutting" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Grooming & Dressing</h4>
            <p class="text-gray-600">Help with hair care, nail care, shaving, and dressing to maintain personal appearance.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:toilet" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Toileting Assistance</h4>
            <p class="text-gray-600">Support with bathroom needs, including transfers and continence care.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:walk" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Mobility Support</h4>
            <p class="text-gray-600">Assistance with walking, transfers, and positioning to promote safety and independence.</p>
          </div>
        </div>
      </div>

      <!-- Why Choose Our Personal Care -->
      <div class="bg-gray-50 rounded-xl p-8 mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Personal Care</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:account-check" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-lg font-bold text-gray-900 mb-2">Trained Professionals</h4>
            <p class="text-gray-600">Our Nursing Aides are fully trained and certified in personal care techniques.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:heart" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-lg font-bold text-gray-900 mb-2">Compassionate Approach</h4>
            <p class="text-gray-600">We treat every client with dignity, respect, and genuine care.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="mdi:home-heart" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-lg font-bold text-gray-900 mb-2">Home-Based Care</h4>
            <p class="text-gray-600">Receive care in the comfort and familiarity of your own home.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your personal care needs and learn how we can help.
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
// Set page metadata
useHead({
  title: 'Personal Care Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Professional personal care services including bathing, grooming, toileting, and mobility support. Dignified, compassionate care in the comfort of your home.' }
  ]
})
</script> 