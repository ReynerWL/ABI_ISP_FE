# ==========================================
# Stage 1: Install Dependencies (All)
# ==========================================
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --network-concurrency 1 --registry https://registry.npmjs.org

# ==========================================
# Stage 2: Install Dependencies (Prod only)
# ==========================================
FROM node:20-alpine AS deps-prod
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production --network-concurrency 1 --registry https://registry.npmjs.org

# ==========================================
# Stage 3: Builder
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
# Copy ALL dependencies so build succeeds
COPY --from=deps /app/node_modules ./node_modules
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
RUN yarn build

# ==========================================
# Stage 4: Runner
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/public ./public
# Copy the built application
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# Copy production node_modules
COPY --from=deps-prod /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
