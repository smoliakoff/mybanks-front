FROM node:22-bookworm AS builder

WORKDIR /app

RUN corepack enable

COPY package.json yarn.lock ./
COPY .yarnrc.yml* ./
COPY .yarn/ ./.yarn/

RUN yarn install --immutable

COPY . .
RUN yarn build

FROM node:22-bookworm-slim AS runner

WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]