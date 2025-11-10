FROM node:22-alpine@sha256:b2358485e3e33bc3a33114d2b1bdb18cdbe4df01bd2b257198eb51beb1f026c5 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
COPY .env* ./
RUN npm run build

# Production stage
FROM node:22-alpine@sha256:b2358485e3e33bc3a33114d2b1bdb18cdbe4df01bd2b257198eb51beb1f026c5 AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache curl

RUN addgroup --system --gid 1001 fastify-starter
RUN adduser --system --uid 1001 user

RUN chown -R user:fastify-starter /app
RUN chmod -R 755 /app

COPY --chown=user:fastify-starter package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --chown=user:fastify-starter --from=builder /app/dist ./
COPY --chown=user:fastify-starter --from=builder /app/.env* ./
COPY --chown=user:fastify-starter --from=builder /app/*.json ./

USER user

EXPOSE 4000
ENV PORT 4000
CMD ["npm", "start"]