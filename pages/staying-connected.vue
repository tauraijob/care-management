<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Staying Connected</h1>
        <p class="text-2xl text-blue-100">Wherever You Are</p>
        <p class="text-lg text-blue-200">Bridging the distance between families and care</p>
      </div>
    </section>

    <!-- Content Section -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Staying Connected – Wherever You Are</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          We understand that many of our clients' families live abroad. Lucerna & Stern Health has developed 
          simple, effective ways to keep you informed and engaged, no matter where you are in the world.
        </p>
      </div>

      <div class="space-y-12">
        <!-- Connection Methods -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <Icon name="mdi:whatsapp" class="text-3xl text-green-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Dedicated WhatsApp & Email Updates</h3>
            <p class="text-gray-700 leading-relaxed">
              We assign a Care Coordinator who provides regular updates, including weekly summaries, 
              visit notes, and photos or brief videos (with consent).
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <Icon name="mdi:video" class="text-3xl text-blue-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Scheduled Video Check-Ins</h3>
            <p class="text-gray-700 leading-relaxed">
              Families can book monthly Zoom or WhatsApp video calls with the carer and client, 
              as well as virtual care plan reviews with our management team.
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <Icon name="mdi:calendar-clock" class="text-3xl text-purple-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Shared Digital Care Timeline</h3>
            <p class="text-gray-700 leading-relaxed">
              Upon request, we offer access to a simple online log with updates on medication changes, 
              appointments, or concerns.
            </p>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-8">
            <div class="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <Icon name="mdi:account-voice" class="text-3xl text-orange-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Your Voice in the Care Plan</h3>
            <p class="text-gray-700 leading-relaxed">
              We actively involve you in goal-setting and care planning. You'll approve support changes 
              and receive alerts for significant updates.
            </p>
          </div>
        </div>

        <!-- Zimbabwean Context -->
        <div class="bg-blue-50 rounded-xl p-8">
          <div class="flex items-start space-x-4">
            <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon name="mdi:flag" class="text-3xl text-blue-600" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-4">Tailored for Zimbabwean Context</h3>
              <p class="text-lg text-gray-700 leading-relaxed">
                We work with both urban and rural families using platforms that work best, from WhatsApp 
                to SMS, and are sensitive to the challenges of time zones and network issues.
              </p>
            </div>
          </div>
        </div>

        <!-- Communication Features -->
        <div class="space-y-8">
          <h3 class="text-3xl font-bold text-gray-900 text-center mb-8">How We Keep You Connected</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="mdi:message-text" class="text-3xl text-green-600" />
              </div>
              <h4 class="text-xl font-bold text-gray-900 mb-2">Regular Updates</h4>
              <p class="text-gray-600">Weekly summaries and daily check-ins via your preferred platform</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="mdi:camera" class="text-3xl text-blue-600" />
              </div>
              <h4 class="text-xl font-bold text-gray-900 mb-2">Photo & Video Updates</h4>
              <p class="text-gray-600">Visual updates of your loved one's daily activities and progress</p>
            </div>

            <div class="text-center">
              <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="mdi:bell" class="text-3xl text-purple-600" />
              </div>
              <h4 class="text-xl font-bold text-gray-900 mb-2">Instant Alerts</h4>
              <p class="text-gray-600">Immediate notifications for important events or changes</p>
            </div>
          </div>
        </div>

        <!-- Benefits Section -->
        <div class="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white">
          <h3 class="text-3xl font-bold mb-6 text-center">Benefits of Our Connection Platform</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-start space-x-3">
              <Icon name="mdi:check-circle" class="text-green-300 mt-1 flex-shrink-0" />
              <div>
                <h4 class="font-semibold mb-1">Peace of Mind</h4>
                <p class="text-blue-100">Stay informed about your loved one's care without being physically present</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <Icon name="mdi:check-circle" class="text-green-300 mt-1 flex-shrink-0" />
              <div>
                <h4 class="font-semibold mb-1">Active Involvement</h4>
                <p class="text-blue-100">Participate in care decisions and planning from anywhere in the world</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <Icon name="mdi:check-circle" class="text-green-300 mt-1 flex-shrink-0" />
              <div>
                <h4 class="font-semibold mb-1">Cultural Sensitivity</h4>
                <p class="text-blue-100">Communication methods that respect Zimbabwean family dynamics</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <Icon name="mdi:check-circle" class="text-green-300 mt-1 flex-shrink-0" />
              <div>
                <h4 class="font-semibold mb-1">Flexible Communication</h4>
                <p class="text-blue-100">Choose the communication method that works best for your situation</p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Ready to Stay Connected?</h3>
          <p class="text-lg text-gray-600 mb-8">
            Start your care journey with Lucerna & Stern Health and experience the difference 
            that thoughtful communication makes.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="btn-primary text-lg px-8 py-4">
              Contact Us Today
            </button>
            <button class="btn-secondary text-lg px-8 py-4">
              Learn More About Our Services
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this page
</script> 