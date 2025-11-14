// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxt/icon', 'reka-ui/nuxt', '@nuxtjs/i18n'],
  
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
      title: 'Greko Stories',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Short stories with music that matches the story' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  }
})
