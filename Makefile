# Путь до сгенерированного OpenAPI YAML из backend
BACKEND_OPENAPI=../MyBank-Go-Backend/docs/openapi.generated.yaml

# Куда скопируем во фронте
LOCAL_OPENAPI=openapi.yaml

# Куда генерируем API-клиент
TS_API_DIR=api
MOCK_PORT ?= 3001

.PHONY: copy-openapi generate-api

# Шаг 1: копируем актуальный YAML из backend
copy-openapi:
	@echo "📥 Copying OpenAPI spec from backend..."
	cp $(BACKEND_OPENAPI) $(LOCAL_OPENAPI)
	@echo "✅ Copied to $(LOCAL_OPENAPI)"

# Шаг 2: генерируем TS-клиент
generate-api: copy-openapi
	@echo "⚙️  Generating TypeScript API client..."
	./node_modules/.bin/tsx ./node_modules/.bin/openapi-generator-cli  generate \
		-i $(LOCAL_OPENAPI) \
		-g typescript-axios \
		-o $(TS_API_DIR) \
		--enable-post-process-file \
		--additional-properties=supportsES6=true,modelPropertyNaming=original,withSeparateModelsAndApi=true,apiPackage=api,modelPackage=models
	@echo "✅ TypeScript API client generated in $(TS_API_DIR)"
mock:
	@echo "🚀 Starting mockserver"
	@prism mock openapi.yaml \
    		--port $(MOCK_PORT) \
    		--host 127.0.0.1