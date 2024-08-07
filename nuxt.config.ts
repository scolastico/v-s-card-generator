// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      NUXT_APP_BASE_URL: process.env.NUXT_APP_BASE_URL || '/',
    },
  },
})
