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
          <button class="btn-secondary text-white border-white hover:bg-transpare hover:text-white">
            Speak to a Care Coordinator
          </button>
        </div>
        <div class="mt-[5em]"></div>
      </div>
    </section>

    <!-- Introductory Text (with visual background) -->
    <section class="relative py-16 bg-white">
      <img src="/uploads/pic4.png" alt="Lucerna & Stern Health" class="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none" />
      <div class="relative max-w-4xl mx-auto px-4 text-center">
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
          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow relative overflow-hidden">
            <img src="/uploads/pic1.png" alt="Family care" class="absolute inset-0 w-full h-full object-cover opacity-5" />
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="mdi:home" class="text-3xl text-blue-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Care Rooted in Family</h3>
            <p class="text-gray-600">
              Inspired by Zimbabwean family values and diaspora commitment, we deliver home-based 
              support with the same warmth and respect you would offer a parent or grandparent.
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow relative overflow-hidden">
            <img src="/uploads/pic2.png" alt="Global standards" class="absolute inset-0 w-full h-full object-cover opacity-5" />
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="mdi:earth" class="text-3xl text-green-600" />
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Global Standards, Local Delivery</h3>
            <p class="text-gray-600">
              Our team blends UK, US, and Zimbabwean training to offer clinical precision, safety, 
              and cultural fluency, without losing the human touch.
            </p>
          </div>

          <div class="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow relative overflow-hidden">
            <img src="/uploads/pic3.png" alt="Trustworthy partnerships" class="absolute inset-0 w-full h-full object-cover opacity-5" />
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

    <!-- Services Highlight: image + tabbed slider (no new section added, replaces original content) -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <!-- Visual -->
          <div class="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
            <Transition name="fade" mode="out-in">
              <img :key="currentSlide.id" :src="currentSlide.image" :alt="currentSlide.title" class="w-full h-full object-cover block" />
            </Transition>
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <!-- Tabs + content -->
          <div class="min-h-[360px] md:min-h-[420px] flex flex-col justify-center">
            <div class="flex flex-wrap gap-2 mb-6">
              <button
                v-for="s in slides"
                :key="s.id"
                @click="activeSlide = s.id"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  activeSlide === s.id ? 'bg-lucerna-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                ]"
              >
                {{ s.tab }}
              </button>
            </div>

            <Transition name="fade" mode="out-in">
              <div :key="currentSlide.id">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ currentSlide.title }}</h2>
                <p class="text-lg text-gray-700 mb-6">{{ currentSlide.description }}</p>
                <div class="flex gap-3">
                  <NuxtLink :to="currentSlide.link" class="btn-primary">Learn More</NuxtLink>
                  <button class="btn-outline" @click="nextSlide">Next</button>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Homepage with hero banner, three pillars, and services sections
const slides = [
  {
    id: 'home-health',
    tab: 'Home Health Aide Services',
    title: 'Home Health Aide Services',
    description:
      'Personalised daily support from trained Nursing Aides to maintain dignity, comfort, and independence at home.',
    image: '/uploads/pic1.png',
    link: '/services/personal-care'
  },
  {
    id: 'concierge',
    tab: 'Concierge Nursing & Private Duty',
    title: 'Concierge Nursing & Private Duty Services',
    description:
      'When care needs become more complex, we offer Concierge Services with enhanced privacy, flexibility, and clinical oversight.',
    image: '/uploads/pic2.png',
    link: '/services/concierge-services'
  },
  {
    id: 'chronic',
    tab: 'Chronic Conditions',
    title: 'Chronic Conditions',
    description:
      "Living with a chronic condition can be overwhelming—but you don't have to face it alone. We provide personalised, research-backed home care that empowers you to manage your health with confidence.",
    image: '/uploads/pic3.png',
    link: '/services?tab=chronic'
  }
]

const activeSlide = ref(slides[0].id)
const currentSlide = computed(() => slides.find(s => s.id === activeSlide.value) || slides[0])
const nextSlide = () => {
  const idx = slides.findIndex(s => s.id === activeSlide.value)
  activeSlide.value = slides[(idx + 1) % slides.length].id
}
</script>

<style scoped>
.service-content {
  min-height: 400px;
}

.fade-enter-active, .fade-leave-active { transition: opacity .25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>