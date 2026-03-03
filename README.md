# MyBanks Frontend (Nuxt 3)

Фронтенд работает **через GraphQL**.

## Требования

* Node.js 18+ (или 20+)
* Yarn 1.x
* Запущенный MyBanks backend с GraphQL endpoint (по умолчанию ниже)

## Быстрый старт

```bash
yarn
make copy-schema
make codegen
yarn dev
```

Откроется: `http://localhost:3000`

## GraphQL endpoint (env)

По умолчанию фронт ждёт GraphQL тут:

* `http://localhost:8080/query`

Переопределить можно переменной окружения:

```bash
export NUXT_PUBLIC_GRAPHQL_ENDPOINT="http://localhost:8080/query"
```

## Схема и генерация типов

### 1) Скопировать схему из бэкенда

В репозитории фронта схема хранится в:

* `gql/schema.graphqls`

Команда копирования:

```bash
make copy-schema
```

Если путь до схемы в бэкенде  другой:

```bash
BACKEND_SCHEMA=../mybanks-backend/graphql/schema.graphqls make copy-schema
```

### 2) Сгенерировать типы и composables

Операции (запросы/мутации) лежат тут:

* `gql/operations/*.graphql`

Генерация:

```bash
make codegen
```

Результат появится тут:

* `gql-generated/types.ts`

Watch-режим:

```bash
make codegen-watch
```

## Полезные команды

* `make clean-generated` — удалить `gql-generated/`
* `yarn dev` — dev server
* `yarn build` / `yarn preview` — production


Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
