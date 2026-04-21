FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json tsconfig*.json prisma ./prisma/
RUN npm ci
COPY src ./src/
RUN npx prisma generate --schema=./prisma/schema.prisma
# Build SIN strict para Render
RUN tsc --skipLibCheck --strict false -p tsconfig.json

FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache dumb-init
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY prisma ./prisma/
RUN npx prisma generate --schema=./prisma/schema.prisma
RUN mkdir -p logs && chown -R node:node /app
ENV NODE_ENV=production
USER node
EXPOSE 3000
CMD ["dumb-init", "node", "dist/index.js"]
