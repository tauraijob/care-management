/**
 * SEO Plugin - Automatically adds canonical URLs and improves SEO
 * Runs on client-side to ensure all pages have proper canonical links
 */
export default defineNuxtPlugin(() => {
  const route = useRoute()
  const baseUrl = 'https://lucernahealth.co.zw'
  
  // Only run on client side
  if (process.server) return

  // Watch for route changes and update canonical URL
  watch(() => route.path, (newPath) => {
    const canonicalUrl = `${baseUrl}${newPath}`
    
    // Update or add canonical link
    useHead({
      link: [
        { rel: 'canonical', href: canonicalUrl }
      ]
    })
  }, { immediate: true })
})

