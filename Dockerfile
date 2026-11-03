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
FROM node:18-alpine AS production

WORKDIR /app

# Installation de serve - un serveur statique léger
RUN npm install -g serve

# Copier les fichiers de build depuis le stage builder
COPY --from=builder /app/build ./build

# Exposition du port
EXPOSE 3000

# Démarrage du serveur
CMD ["serve", "-s", "build", "-l", "3000"] 