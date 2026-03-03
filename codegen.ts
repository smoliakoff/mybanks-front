import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  // Берём локальную схему (копируем из бэка через make copy-schema)
  schema: process.env.NUXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/schema.graphql',
  documents: ['gql/operations/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './gql-generated/types.ts': {
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