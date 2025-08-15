<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Technology</h1>
        <p class="text-2xl text-blue-100">Connecting Care Across Distances</p>
        <p class="text-lg text-blue-200">Innovative solutions for modern healthcare</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <div class="text-center">
        <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:cellphone-cog" class="text-4xl text-blue-600" />
        </div>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Technology Integration Coming Soon</h2>
        
        <div class="bg-blue-50 rounded-xl p-8 mb-8">
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            At Lucerna & Stern Health, we are in the process of integrating secure, real-time technology 
            to improve communication between our care teams and families—especially those supporting 
            loved ones from abroad.
          </p>
          
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            We believe technology should enhance care, not complicate it. This page will be updated 
            soon with details about the tools and systems we are introducing to keep you connected, 
            informed, and reassured at every stage of care.
          </p>
          
          <p class="text-lg text-gray-700 leading-relaxed">
            Thank you for your patience as we build this important feature.
          </p>
        </div>

        <!-- Features Preview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="mdi:message-text" class="text-2xl text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Real-time Updates</h3>
            <p class="text-gray-600">Stay connected with your loved one's care through instant messaging and updates.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="mdi:video" class="text-2xl text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Video Calls</h3>
            <p class="text-gray-600">Connect face-to-face with your loved one and care team from anywhere in the world.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="mdi:chart-line" class="text-2xl text-orange-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Care Monitoring</h3>
            <p class="text-gray-600">Track progress and receive detailed reports on your loved one's care journey.</p>
          </div>
        </div>

        <!-- Contact CTA -->
        <div class="mt-12">
          <p class="text-lg text-gray-600 mb-6">
            In the meantime, our team is available through traditional channels to provide the same 
            high-quality care and support.
          </p>
          <button class="btn-primary text-lg px-8 py-4">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this page
</script> 