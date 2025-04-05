// ~/plugins/apollo.ts
import { defineNuxtPlugin } from '#app'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from '@/api/apolloClient'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})
