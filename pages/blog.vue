<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative h-96 bg-gradient-to-r from-blue-900 to-green-800 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Blog</h1>
        <p class="text-2xl text-blue-100">Insights & Stories</p>
        <p class="text-lg text-blue-200">Thoughts on care, family, and community</p>
      </div>
    </section>

    <!-- Blog Content -->
    <div class="max-w-4xl mx-auto px-4 py-16">
      <!-- Featured Blog Post -->
      <article class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="p-8">
          <!-- Post Header -->
          <div class="mb-8">
            <div class="flex items-center space-x-4 mb-4">
              <span class="text-sm text-gray-500">12 July 2025</span>
              <span class="text-sm text-blue-600 font-medium">Care in Zimbabwe</span>
            </div>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">The New Face of Care in Zimbabwe</h1>
            <p class="text-xl text-blue-600 font-medium">Honouring Tradition, Embracing Change</p>
          </div>

          <!-- Post Content -->
          <div class="prose prose-lg max-w-none">
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              In generations past, care in Zimbabwe was defined by the strong bonds of extended family. 
              But times have changed. And with them, so has the way we care.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">A Shift in Family Dynamics</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Mass migration has altered the shape of Zimbabwean families. Many caregivers now live abroad, 
              and though deeply connected emotionally and financially, they are no longer physically close 
              enough to provide hands-on support. At the same time, urbanisation has led to smaller, busier households.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">From Family Hands to Professional Help</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              Increasingly, families are turning to trusted, trained professionals. Far from being a sign 
              of neglect, professional homecare is now seen by many as a responsible and loving choice. 
              It's about ensuring dignity, safety, and companionship, no matter where the family lives.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Why the Change Matters</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              We're seeing a rise in chronic health conditions in Zimbabwe—diabetes, dementia, stroke, 
              and cancer—that require consistent, trained support. Moreover, many Zimbabweans have 
              experienced health systems abroad and now expect that same level of professionalism for 
              their loved ones back home.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Care That Feels Close, Even From Afar</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              At Lucerna & Stern Health, we believe in bridging the gap between diaspora families and 
              their loved ones. Our caregivers are more than staff; they're companions, advocates, and 
              extended family. We haven't replaced tradition; we've reimagined it for today's world.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Final Thoughts</h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              The face of care in Zimbabwe is changing, but its heart remains the same. If you're 
              supporting a loved one from afar, know this: you're not alone. And with the right partners, 
              distance doesn't have to mean disconnection.
            </p>

            <div class="bg-blue-50 rounded-xl p-6 mt-8">
              <p class="text-lg font-medium text-gray-900">
                Lucerna & Stern Health – Care that's close, even when you're far.
              </p>
            </div>
          </div>

          <!-- Post Footer -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon name="mdi:account" class="text-2xl text-blue-600" />
                </div>
                <div>
                  <p class="font-medium text-gray-900">Lucerna & Stern Health Team</p>
                  <p class="text-sm text-gray-500">Care professionals and writers</p>
                </div>
              </div>
              <div class="flex space-x-4">
                <button class="text-blue-600 hover:text-blue-800">
                  <Icon name="mdi:share" class="text-xl" />
                </button>
                <button class="text-blue-600 hover:text-blue-800">
                  <Icon name="mdi:bookmark" class="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Articles -->
      <div class="mt-16">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:heart" class="text-2xl text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">The Importance of Cultural Sensitivity in Care</h3>
            <p class="text-gray-600 mb-4">How we honour Zimbabwean traditions while delivering modern healthcare standards.</p>
            <span class="text-sm text-blue-600 font-medium">Coming Soon</span>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Icon name="mdi:account-group" class="text-2xl text-purple-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Supporting Families in the Diaspora</h3>
            <p class="text-gray-600 mb-4">Practical strategies for caring for loved ones from afar.</p>
            <span class="text-sm text-blue-600 font-medium">Coming Soon</span>
          </div>
        </div>
      </div>

      <!-- Newsletter Signup -->
      <div class="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white text-center">
        <h3 class="text-2xl font-bold mb-4">Stay Connected</h3>
        <p class="text-lg mb-6">Get the latest insights on care, family, and community delivered to your inbox.</p>
        <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
          />
          <button class="btn-secondary px-6 py-3">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this page
</script> 