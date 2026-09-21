FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .
COPY .env* ./
RUN npm run build

# Production stage
FROM node:24-alpine@sha256:ebfe2f90462722a7a4de65e91990e97fe0d401c70e0e762c5b53302f905ec1c1 AS runner
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