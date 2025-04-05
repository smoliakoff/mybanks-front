import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  debug: false,

  alias: {
    "@": "./",
    // "@composables": "./composables",
    "~": "./",
    "api": "./api",
    '~/gql/*': fileURLToPath(new URL('./gql/*', import.meta.url)),
    "@/api": "./api",
    "~/api": "./api"
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ]
})