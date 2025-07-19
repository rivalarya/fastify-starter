FROM node:22-alpine AS builder
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm ci
# Copy source code and env files
COPY . .
COPY .env* ./
RUN npm run build

# Production stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user DULU
RUN addgroup --system --gid 1001 fastify-starter
RUN adduser --system --uid 1001 user

# Set ownership dan permission untuk seluruh direktori /app
RUN chown -R user:fastify-starter /app
RUN chmod -R 755 /app

# Copy package files dengan ownership langsung
COPY --chown=user:fastify-starter package*.json ./

# Install dependencies sebagai root (lebih cepat)
RUN npm ci --only=production && npm cache clean --force

# Copy semua file sekaligus dengan ownership yang benar
COPY --chown=user:fastify-starter --from=builder /app/dist ./
COPY --chown=user:fastify-starter --from=builder /app/.env* ./
COPY --chown=user:fastify-starter --from=builder /app/*.json ./

USER user

EXPOSE 4000
ENV PORT 4000
CMD ["npm", "start"]