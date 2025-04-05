import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error'


const httpLink = new HttpLink({
  uri: 'http://localhost:8080/query',
  fetch: (uri, options) => {
    // console.log('[Apollo FETCH]', uri, options)
    return fetch(uri, options).then(async (res) => {
      const clone = res.clone()
      const text = await clone.text()
      // console.log('[Apollo RESPONSE]', text)
      return res
    })
  }
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors)
    for (let err of graphQLErrors)
      console.error('[GraphQL error]', err)

  if (networkError) console.error('[Network error]', networkError)
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  ssrMode: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  devtools: {
    enabled: true
  }
});
