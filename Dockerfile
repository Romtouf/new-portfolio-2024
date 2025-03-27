# Stage de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du code source
COPY . .

# Build de l'application
RUN npm run build

# Stage de production
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copie des fichiers nécessaires depuis le stage de build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.next/server
COPY --from=builder /app/.next/server.js ./
COPY --from=builder /app/package.json ./package.json

# Exposition du port
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "server.js"] 