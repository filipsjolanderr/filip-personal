# Stage 0: Base with shared libraries
FROM node:22-bookworm-slim AS base
RUN apt-get update && apt-get install -y \
    libc6 \
    libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Stage 1: Install dependencies
# Using full bookworm here for better compatibility during native module installation
FROM node:22-bookworm AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Stage 2: Build the app
FROM node:22-bookworm AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js build can be memory intensive
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# Stage 3: Production runner
FROM node:22-bookworm-slim AS runner
WORKDIR /app

# Re-install runtime libs for canvas
RUN apt-get update && apt-get install -y \
    libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV production

# Use UID 999 to avoid SYS_UID_MAX warning in some environments
RUN groupadd --system --gid 999 nodejs
RUN useradd --system --uid 999 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
