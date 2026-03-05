# MyBanks Frontend (Nuxt) - dev helpers

.PHONY: codegen codegen-watch clean-generated


codegen:
	@echo "⚙️  Generating GraphQL TypeScript types & Vue Apollo composables..."
	@./node_modules/.bin/graphql-codegen --config codegen.ts
	@echo "✅ Generated in ./app/gql-generated"

codegen-watch:
	@./node_modules/.bin/graphql-codegen --config codegen.ts --watch

clean-generated:
	@rm -rf ./app/gql-generated