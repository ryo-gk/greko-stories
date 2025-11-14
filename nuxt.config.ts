// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxt/icon', 'reka-ui/nuxt', '@nuxtjs/i18n', 'nuxt-gtag'],
  
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || '',
    enabled: !!process.env.NUXT_PUBLIC_GTAG_ID
  },
  
  i18n: {
    restructureDir: '', 
    langDir: './app/locales',
    locales: [
      {
        code: 'en',
        name: 'English',
        files: ['en.json']
      },
      {
        code: 'ja',
        name: '日本語',
        files: ['ja.json']
      }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
  },
  
  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Greko Stories',
      meta: [
        { name: 'description', content: 'A collection of story fragments that spark imagination' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'og:site_name', content: 'Greko Stories' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg', key: 'favicon' }
      ]
    }
  }
})
