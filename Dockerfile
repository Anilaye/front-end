# Dockerfile pour Anilaye'O Dashboard
# Multi-stage build pour optimiser la taille de l'image

# Stage 1: Build de l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Stage 2: Serveur de production
FROM nginx:alpine AS production

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Exposer le port 80
EXPOSE 80

# Démarrage de nginx
CMD ["nginx", "-g", "daemon off;"]
