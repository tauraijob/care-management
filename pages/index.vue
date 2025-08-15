<template>
  <div class="min-h-screen">
    <!-- Hero Banner -->
    <section class="relative flex items-center justify-center py-[1em]" style="background-image: url('/uploads/hero.jpg'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      <div class="absolute inset-0 bg-black/60"></div>
      <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div class="mb-[5em]"></div>
        <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
          Care That Feels Like Home
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-white">
          Powered by Diaspora Insight, Delivered with Zimbabwean Heart
        </p>
        <p class="text-lg mb-12 text-white">Professional. Personal. Present.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="btn-primary">
            Get Started
          </button>
          <button class="btn-secondary">
            Speak to a Care Coordinator
          </button>
        </div>
        <div class="mt-[5em]"></div>
      </div>
    </section>

    <!-- Introductory Text -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <p class="text-xl text-gray-700 leading-relaxed">
          At Lucerna & Stern Health, we bridge the gap between global care standards and local delivery. 
          Whether you're caring for a loved one from afar or seeking trusted support at home, our trained 
          team is here to provide dignified, professional, and culturally-sensitive care that never 
          compromises on compassion.
        </p>
      </div>
    </section>

    <!-- Three Pillars -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="mdi:home" class="text-3xl text-blue-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Care Rooted in Family</h3>
            <p class="text-gray-600">
              Inspired by Zimbabwean family values and diaspora commitment, we deliver home-based 
              support with the same warmth and respect you would offer a parent or grandparent.
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="mdi:earth" class="text-3xl text-green-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Global Standards, Local Delivery</h3>
            <p class="text-gray-600">
              Our team blends UK, US, and Zimbabwean training to offer clinical precision, safety, 
              and cultural fluency, without losing the human touch.
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="mdi:handshake" class="text-3xl text-purple-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Trustworthy Partnerships</h3>
            <p class="text-gray-600">
              We are your bridge between worlds. Whether you're arranging care from Harare or 
              Hertfordshire, we keep you involved, informed, and at peace.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Highlight Sections -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Home Health Aide Services -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Home Health Aide Services</h2>
            <p class="text-xl text-gray-600">Personalised daily support from trained Nursing Aides to maintain dignity, comfort, and independence at home.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:account-heart" class="text-2xl text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Personal Care</h3>
              <p class="text-gray-600 mb-4">Dignified, hands-on support with bathing, grooming, toileting, and mobility to promote comfort and independence.</p>
              <NuxtLink to="/services/personal-care" class="text-blue-600 font-medium hover:text-blue-700">
                Learn More →
              </NuxtLink>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:account-group" class="text-2xl text-green-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Companion Care</h3>
              <p class="text-gray-600 mb-4">A warm, reliable presence offering social connection, light housekeeping, errands, and support with daily routines.</p>
              <NuxtLink to="/services/companion-care" class="text-green-600 font-medium hover:text-green-700">
                Learn More →
              </NuxtLink>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:heart-pulse" class="text-2xl text-purple-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Respite Care</h3>
              <p class="text-gray-600 mb-4">Short-term, compassionate care that gives long-distance families time to rest, travel, or manage life's demands.</p>
              <NuxtLink to="/services/respite-care" class="text-purple-600 font-medium hover:text-purple-700">
                Learn More →
              </NuxtLink>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:clock" class="text-2xl text-orange-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">24/7 Complex Care</h3>
              <p class="text-gray-600 mb-4">Specialist, round-the-clock support for loved ones with serious illness or high-dependency needs.</p>
              <NuxtLink to="/services/complex-care" class="text-orange-600 font-medium hover:text-orange-700">
                Learn More →
              </NuxtLink>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:home-heart" class="text-2xl text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Live-In Care</h3>
              <p class="text-gray-600 mb-4">Round-the-clock, in-home support for loved ones with complex or evolving needs.</p>
              <NuxtLink to="/services/live-in-care" class="text-red-600 font-medium hover:text-red-700">
                Learn More →
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Concierge Services -->
        <div class="mb-16">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Concierge Nursing & Private Duty Services</h2>
            <p class="text-xl text-gray-600">When care needs become more complex, Lucerna & Stern Health offers Concierge Services with enhanced privacy, flexibility, and clinical oversight.</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:medical-bag" class="text-2xl text-blue-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Skilled Nursing Care</h3>
              <p class="text-gray-600 mb-4">Advanced nursing care, delivered at home. Wound care, chronic condition support, palliative care & more led by licensed nurses.</p>
              <NuxtLink to="/services/skilled-nursing" class="text-blue-600 font-medium hover:text-blue-700">
                Learn More →
              </NuxtLink>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:walk" class="text-2xl text-green-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Physiotherapy</h3>
              <p class="text-gray-600 mb-4">Regain strength, balance, and confidence at home. Therapy plans tailored to stroke recovery, surgery rehab, falls prevention & more.</p>
              <NuxtLink to="/services/physiotherapy" class="text-green-600 font-medium hover:text-green-700">
                Learn More →
              </NuxtLink>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:microphone" class="text-2xl text-purple-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Speech Therapy</h3>
              <p class="text-gray-600 mb-4">Rebuild confidence, speech, and connection at home. We support clients with stroke recovery, swallowing issues, and voice disorders.</p>
              <NuxtLink to="/services/speech-therapy" class="text-purple-600 font-medium hover:text-purple-700">
                Learn More →
              </NuxtLink>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:hand-front" class="text-2xl text-orange-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Occupational Therapy</h3>
              <p class="text-gray-600 mb-4">Regain confidence, independence, and control right at home. We help clients with daily tasks like bathing, dressing, and cooking.</p>
              <NuxtLink to="/services/occupational-therapy" class="text-orange-600 font-medium hover:text-orange-700">
                Learn More →
              </NuxtLink>
            </div>

            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="mdi:brain" class="text-2xl text-red-600" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Learning Disabilities & Autism Support</h3>
              <p class="text-gray-600 mb-4">Tailored, respectful care that honours individual needs, routines, and communication styles.</p>
              <NuxtLink to="/services/learning-disabilities" class="text-red-600 font-medium hover:text-red-700">
                Learn More →
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Chronic Conditions -->
        <div>
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">Chronic Conditions</h2>
            <p class="text-xl text-gray-600">Living with a chronic condition can be overwhelming—but you don't have to face it alone. At Lucerna & Stern Health, we provide personalised, research-backed home care that empowers you to manage your health with confidence.</p>
          </div>
          
          <div class="bg-gray-50 rounded-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Conditions We Support</h3>
            <p class="text-center text-gray-600 mb-8">Click below to learn more about how we care for specific chronic health conditions:</p>
            
            <div class="flex flex-wrap justify-center gap-4 md:gap-6">
              <NuxtLink to="/conditions/alzheimers-dementia" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
                Alzheimer's & Dementia Disease →
              </NuxtLink>
              <NuxtLink to="/conditions/parkinsons" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
                Parkinson's Disease →
              </NuxtLink>
              <NuxtLink to="/conditions/palliative-care" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
                End of life & Palliative Care →
              </NuxtLink>
              <NuxtLink to="/conditions/fall-prevention" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
                Fall Prevention & Safer Mobility →
              </NuxtLink>
              <NuxtLink to="/conditions/post-stroke" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
                Post-Stroke Care →
              </NuxtLink>
              <NuxtLink to="/conditions/cancer" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
                Cancer →
              </NuxtLink>
              <NuxtLink to="/conditions/diabetes" class="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
                Diabetes →
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Homepage with hero banner, three pillars, and services sections
</script>

<style scoped>
.service-content {
  min-height: 400px;
}
</style>