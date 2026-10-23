FROM node:24-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
COPY .env* ./
RUN npm run build

# Production stage
FROM node:24-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS runner
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