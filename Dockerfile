# Etapa de build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY next-i18next.config.js ./
COPY public ./public
COPY src ./src

RUN npm install
RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
