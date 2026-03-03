# MyBanks Frontend (Nuxt) - dev helpers

# Path to schema.graphqls in backend repo
BACKEND_SCHEMA ?= ../MyBank-Go-Backend/graph/schema.graphqls

# Where we keep the schema in the frontend repo
LOCAL_SCHEMA ?= ./gql/schema.graphqls

.PHONY: copy-schema codegen codegen-watch clean-generated

copy-schema:
	@echo "📥 Copying GraphQL schema from backend..."
	@cp $(BACKEND_SCHEMA) $(LOCAL_SCHEMA)
	@echo "✅ Copied to $(LOCAL_SCHEMA)"

codegen:
	@echo "⚙️  Generating GraphQL TypeScript types & Vue Apollo composables..."
	@./node_modules/.bin/graphql-codegen --config codegen.ts
	@echo "✅ Generated in ./gql-generated"

codegen-watch:
	@./node_modules/.bin/graphql-codegen --config codegen.ts --watch

clean-generated:
	@rm -rf ./gql-generated