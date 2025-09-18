<template>
  <div class="min-h-screen bg-gray-50">
    <!-- App Header - Show on all pages -->
    <AppHeader />
    
    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-lucerna-primary text-white">
      <div class="max-w-7xl mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <img src="/uploads/logo.png" alt="Lucerna & Stern Health" class="h-16 md:h-20 lg:h-24 w-auto rounded-[10px]" />
            </div>
            <p class="text-gray-300 mb-4">
              Professional care services with Zimbabwean heart. Bridging global standards with local delivery.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="mdi:facebook" class="text-xl" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="mdi:twitter" class="text-xl" />
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <Icon name="mdi:linkedin" class="text-xl" />
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-300 hover:text-white transition-colors">Home</NuxtLink></li>
              <li><NuxtLink to="/about" class="text-gray-300 hover:text-white transition-colors">About Us</NuxtLink></li>
              <li><NuxtLink to="/services" class="text-gray-300 hover:text-white transition-colors">Services</NuxtLink></li>
              <li><NuxtLink to="/contact" class="text-gray-300 hover:text-white transition-colors">Contact</NuxtLink></li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div>
            <h3 class="text-lg font-semibold mb-4">Contact</h3>
            <div class="space-y-2 text-gray-300">
              <p class="flex items-center">
                <Icon name="mdi:phone" class="mr-2" />
                +263 710708027
              </p>
              <p class="flex items-center">
                <Icon name="mdi:email" class="mr-2" />
                info@lucernaandsternhealth.co.zw
              </p>
            </div>
          </div>
        </div>

        <div class="border-t border-white/20 mt-8 pt-8 text-white/80">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <p class="text-center md:text-left">&copy; {{ currentYear }} Lucerna & Stern Health. All rights reserved.</p>
            <p class="text-center md:text-right">Website and System by <a href="https://webdev.co.zw">WebDev</a></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()
// Default layout for most pages
// Uses the AppHeader component and includes footer
</script>