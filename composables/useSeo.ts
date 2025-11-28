/**
 * SEO Composable for Nuxt 3
 * Provides a convenient way to set SEO meta tags on individual pages
 */
export const useSeo = (options: {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  noindex?: boolean
}) => {
  const config = useRuntimeConfig()
  const route = useRoute()
  
  const baseUrl = 'https://lucernaandsternhealth.co.zw'
  const siteName = 'Lucerna & Stern Health'
  const defaultImage = `${baseUrl}/uploads/logo.png`
  
  const title = options.title 
    ? `${options.title} | ${siteName}`
    : `${siteName} - Premium Healthcare Solutions`
  
  const description = options.description || 
    'Secure, premium healthcare booking platform for diaspora clients managing care for loved ones in Zimbabwe.'
  
  const url = options.url || `${baseUrl}${route.path}`
  const image = options.image || defaultImage
  const type = options.type || 'website'
  
  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      ...(options.keywords ? [{ name: 'keywords', content: options.keywords }] : []),
      { name: 'robots', content: options.noindex ? 'noindex, nofollow' : 'index, follow' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'en_ZW' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image }
    ]
  })
}

