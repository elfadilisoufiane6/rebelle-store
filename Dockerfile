# syntax=docker/dockerfile:1.7
# ────────────────────────────────────────────
#  Rebelle Store — Next.js 14 production image
#  Multi-stage: deps → builder → runner
#  Final image ~ 180 MB on node:18-alpine
# ────────────────────────────────────────────

# ── 1. Install dependencies ──────────────────
FROM node:18-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

# ── 2. Build the app ─────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

# NEXT_PUBLIC_* values are baked at build time — declare them as ARGs
# so Easypanel (or any caller) can pass them via --build-arg.
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_FB_PIXEL_ID
ARG NEXT_PUBLIC_TT_PIXEL_ID
ARG NEXT_PUBLIC_SC_PIXEL_ID

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_FB_PIXEL_ID=$NEXT_PUBLIC_FB_PIXEL_ID \
    NEXT_PUBLIC_TT_PIXEL_ID=$NEXT_PUBLIC_TT_PIXEL_ID \
    NEXT_PUBLIC_SC_PIXEL_ID=$NEXT_PUBLIC_SC_PIXEL_ID \
    NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ── 3. Runtime ───────────────────────────────
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    NEXT_TELEMETRY_DISABLED=1

# dumb-init = clean SIGTERM forwarding on container stop
RUN apk add --no-cache dumb-init && \
    addgroup -S nextjs && adduser -S nextjs -G nextjs

# Standalone output: minimal server.js + traced node_modules
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nextjs /app/public ./public

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
