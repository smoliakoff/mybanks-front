import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client/core'
import { onError } from '@apollo/client/link/error'

export function createApolloClient(uri: string) {
  const httpLink = new HttpLink({
    uri,
    fetch: (u, options) => fetch(u, options),
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        console.error('[GraphQL error]', err)
      }
    }
    if (networkError) {
      console.error('[Network error]', networkError)
    }
  })

  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    defaultOptions: {
      watchQuery: { fetchPolicy: 'no-cache' },
    },
    devtools: { enabled: true },
  })
}