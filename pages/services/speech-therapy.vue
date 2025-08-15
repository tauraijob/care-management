<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Speech Therapy</h1>
        <p class="text-2xl text-blue-100">Communication & Swallowing</p>
        <p class="text-lg text-blue-200">Specialized speech and language therapy at home</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Service Overview -->
      <div class="text-center mb-16">
        <div class="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:account-voice" class="text-4xl text-purple-600" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Speech Therapy Services</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Our Speech Therapy services provide specialized assessment and treatment for communication 
          disorders, speech difficulties, and swallowing problems. We help improve communication 
          skills and enhance quality of life through personalized therapy programs.
        </p>
      </div>

      <!-- What We Offer -->
      <div class="mb-16">
        <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center">What We Offer</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:chat" class="text-2xl text-blue-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Communication Therapy</h4>
            <p class="text-gray-600">Improving speech clarity, language skills, and communication abilities.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:food" class="text-2xl text-green-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Swallowing Therapy</h4>
            <p class="text-gray-600">Assessment and treatment for swallowing difficulties and dysphagia.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:brain" class="text-2xl text-purple-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Cognitive Communication</h4>
            <p class="text-gray-600">Addressing communication challenges related to cognitive impairments.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-group" class="text-2xl text-orange-600" />
            </div>
            <h4 class="text-xl font-bold text-gray-900 mb-3">Family Training</h4>
            <p class="text-gray-600">Educating family members on communication strategies and support techniques.</p>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
        <p class="text-lg text-gray-600 mb-8">
          Contact us today to discuss your speech therapy needs.
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
  title: 'Speech Therapy Services - Lucerna & Stern Health',
  meta: [
    { name: 'description', content: 'Specialized speech therapy services providing communication therapy, swallowing therapy, cognitive communication support, and family training in your home.' }
  ]
})
</script> 