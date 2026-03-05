import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/schema.graphql',
  documents: ['app/gql/operations/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './app/gql-generated/': {
      preset: 'client',
      config: {
        withHooks: true,
        useTypeImports: true
      },
    },
    './app/gql-generated/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        {
          'typescript-vue-apollo': {
            withCompositionFunctions: true,
            documentMode: 'documentNode'
          }
        }
      ],
      config: {
        // Nuxt 3 / Vue 3 (ключевое!)
        vueCompositionApiImportFrom: 'vue',
        vueApolloComposableImportFrom: '@vue/apollo-composable',

        skipTypename: true,
        defaultScalarType: 'unknown',
        avoidOptionals: true,
        namingConvention: 'keep'
      }
    }
  }
}

export default config