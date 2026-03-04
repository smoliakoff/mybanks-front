import { defineNuxtPlugin } from '#app'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApolloClient } from '~/api/apolloClient'
import { useRuntimeConfig } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  const config = new useRuntimeConfig()
  const apolloClient = createApolloClient(config.public.graphqlEndpoint)
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient)
})