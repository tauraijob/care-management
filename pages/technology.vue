<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center on-dark" style="background-image: url('/uploads/pic3.png'); background-size: cover; background-position: center 25%; background-repeat: no-repeat;">
      <div class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 text-center px-4">
        <h1 class="text-5xl font-bold mb-4">Technology</h1>
        <p class="text-2xl">Connecting Care Across Distances</p>
        <p class="text-lg">Innovative solutions for modern healthcare</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <div class="text-center">
        <div class="w-24 h-24 bg-lucerna-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <Icon name="mdi:cellphone-cog" class="text-4xl text-white" />
        </div>
        
        <h2 class="text-3xl font-bold text-gray-900 mb-6">Technology Integration Coming Soon</h2>
        
        <div class="bg-white rounded-xl p-8 mb-8">
          <p class="text-lg text-gray-800 leading-relaxed mb-6">
            At Lucerna & Stern Health, we are in the process of integrating secure, real-time technology 
            to improve communication between our care teams and families—especially those supporting 
            loved ones from abroad.
          </p>
          
          <p class="text-lg text-gray-800 leading-relaxed mb-6">
            We believe technology should enhance care, not complicate it. This page will be updated 
            soon with details about the tools and systems we are introducing to keep you connected, 
            informed, and reassured at every stage of care.
          </p>
          
          <p class="text-lg text-gray-800 leading-relaxed">
            Thank you for your patience as we build this important feature.
          </p>
        </div>

        <!-- Features Preview -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-lucerna-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="mdi:message-text" class="text-2xl text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Real-time Updates</h3>
            <p class="text-gray-600">Stay connected with your loved one's care through instant messaging and updates.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-lucerna-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="mdi:video" class="text-2xl text-white" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Video Calls</h3>
            <p class="text-gray-600">Connect face-to-face with your loved one and care team from anywhere in the world.</p>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-lg">
            <div class="w-12 h-12 bg-lucerna-primary rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Icon name="mdi:chart-line" class="text-2xl text-white" />
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
          <NuxtLink to="/contact" class="btn-primary text-lg px-8 py-4">
            Contact Us Today
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this page
</script> 