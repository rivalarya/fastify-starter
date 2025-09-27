FROM node:22-alpine@sha256:cb3143549582cc5f74f26f0992cdef4a422b22128cb517f94173a5f910fa4ee7 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
COPY .env* ./
RUN npm run build

# Production stage
FROM node:22-alpine@sha256:cb3143549582cc5f74f26f0992cdef4a422b22128cb517f94173a5f910fa4ee7 AS runner
WORKDIR /app
ENV NODE_ENV=production

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