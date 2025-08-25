// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // Performance optimizations
  experimental: {
    payloadExtraction: false
  },

  // Security and compliance
  nitro: {
    compressPublicAssets: true,
    minify: true,
    compatibilityDate: '2025-08-20',
    externals: {
      external: ['@prisma/client', 'prisma']
    },
    security: {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
      }
    }
  },

  // App configuration
  app: {
    head: {
      title: 'Lucerna & Stern Health - Premium Healthcare Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Secure, premium healthcare booking platform for diaspora clients managing care for loved ones in Zimbabwe.' },
        { name: 'keywords', content: 'healthcare, home care, Zimbabwe, diaspora, medical care, elderly care' },
        { name: 'author', content: 'Lucerna & Stern Health' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#0A2342' },
        { name: 'msapplication-TileColor', content: '#0A2342' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Lucerna Health' },
        { name: 'format-detection', content: 'telephone=no' },
        // GDPR compliance
        { name: 'privacy-policy', content: '/privacy-policy' },
        { name: 'terms-of-service', content: '/terms-of-service' },
        // Security
        { name: 'referrer', content: 'strict-origin-when-cross-origin' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ],
      script: [
        // Structured data for SEO
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalOrganization',
            name: 'Lucerna & Stern Health',
            description: 'Premium healthcare booking platform for diaspora clients',
            url: 'https://lucernahealth.com',
            telephone: '+27611234567',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'ZW',
              addressRegion: 'Zimbabwe'
            },
            sameAs: [
              'https://wa.me/27611234567'
            ]
          })
        }
      ]
    }
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-icon',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  // Router configuration
  router: {
    options: {
      strict: false
    }
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.js',
    exposeConfig: false,
    injectPosition: 0,
    viewer: true
  },

  // Color mode configuration
  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // Robots configuration
  robots: {
    rules: {
      UserAgent: '*',
      Allow: '/',
      Disallow: ['/admin/', '/client/', '/carer/', '/api/'],
      Sitemap: 'https://lucernahealth.com/sitemap.xml'
    }
  },

  // Sitemap configuration
  sitemap: {
    siteUrl: 'https://lucernahealth.com',
    exclude: [
      '/admin/**',
      '/client/**',
      '/carer/**',
      '/api/**',
      '/login',
      '/register'
    ]
  },

  // Runtime configuration
  runtimeConfig: {
    // Private keys (only available on server-side)
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    paypalClientId: process.env.PAYPAL_CLIENT_ID,
    paypalSecret: process.env.PAYPAL_SECRET,
    ecoCashApiKey: process.env.ECOCASH_API_KEY,
    emailServiceKey: process.env.EMAIL_SERVICE_KEY,
    smsServiceKey: process.env.SMS_SERVICE_KEY,

    // Public keys (exposed to client-side)
    public: {
      appName: 'Lucerna & Stern Health',
      appVersion: '1.0.0',
      contactPhone: '+263 710708027',
      contactEmail: 'info@lucernaandsternhealth.co.zw',
      whatsappNumber: '+263 710708027',
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
      facebookPixelId: process.env.FACEBOOK_PIXEL_ID
    }
  },

  // Build configuration
  build: {
    transpile: ['@headlessui/vue', '@heroicons/vue', '@prisma/client']
  },

  // Vite configuration
  vite: {
    optimizeDeps: {
      include: ['@headlessui/vue', '@heroicons/vue']
    },
    ssr: {
      external: ['@prisma/client', 'prisma']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            ui: ['@headlessui/vue', '@heroicons/vue']
          }
        }
      }
    }
  },

  // CSS
  css: [
    '~/assets/css/main.css'
  ],

  // Plugins
  plugins: [
    '~/plugins/primevue.client.ts'
  ],

  // Auto-imports
  imports: {
    dirs: ['composables/**', 'utils/**']
  },

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false
  },

  // Vue configuration
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('nuxt-')
    }
  },

  // PWA configuration (for future mobile app)
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    client: {
      installPrompt: true
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module'
    }
  }
})
