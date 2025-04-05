import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8080/schema.graphql',
  documents: [
    'gql/operations/banks.graphql',
    'gql/operations/bank.graphql'
  ],
  watch: true,
  ignoreNoDocuments: true,
  generates: {
    './gql-generated/': {
      preset: 'client',
      config: {
        withHooks: true,
        useTypeImports: true
      },
    },
    './gql-generated/types.ts': {
      plugins: [
        // Генерация типов для схемы
        'typescript',
        // Генерация типов для операций (запросов, мутаций)
        'typescript-operations',
        // Генерация функций-композиций для Vue Apollo
        {
          'typescript-vue-apollo': {
            withCompositionFunctions: true, // включаем генерацию функций-композиций
            documentMode: 'documentNode'
          }
        }
      ],
      config: {
        enumsAsTypes: false,
        futureProofEnums: true,
        skipTypename: true,
        defaultScalarType: "unknown",
        avoidOptionals: true,
        namingConvention: "keep",
      },
    }
  }
}
export default config