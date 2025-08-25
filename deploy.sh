#!/bin/bash

# Script de déploiement pour Anilaye'O Dashboard
# Serveur VPS: 147.79.117.201

set -e

echo "🚀 Déploiement d'Anilaye'O Dashboard sur le serveur VPS..."

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variables
SERVER_IP="147.79.117.201"
PROJECT_NAME="anilayo-dashboard"
DOCKER_IMAGE="anilayo-frontend"

# Fonction pour afficher les messages
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Vérifier que Docker est installé
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker n'est pas installé. Installation en cours..."
        curl -fsSL https://get.docker.com -o get-docker.sh
        sh get-docker.sh
        sudo usermod -aG docker $USER
        print_warning "Docker installé. Redémarrez votre session ou exécutez: newgrp docker"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose n'est pas installé. Installation en cours..."
        sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
    fi
}

# Arrêter et supprimer les conteneurs existants
cleanup_containers() {
    print_status "Nettoyage des conteneurs existants..."
    docker-compose -f docker-compose.prod.yml down --remove-orphans || true
    docker system prune -f || true
}

# Build et démarrage des conteneurs
build_and_start() {
    print_status "Build de l'image Docker..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    
    print_status "Démarrage des services..."
    docker-compose -f docker-compose.prod.yml up -d
    
    print_status "Attente du démarrage des services..."
    sleep 10
}

# Vérification de la santé des services
health_check() {
    print_status "Vérification de la santé des services..."
    
    # Vérifier que le conteneur est en cours d'exécution
    if docker ps | grep -q $PROJECT_NAME; then
        print_status "✅ Conteneur $PROJECT_NAME est en cours d'exécution"
    else
        print_error "❌ Conteneur $PROJECT_NAME n'est pas en cours d'exécution"
        docker-compose -f docker-compose.prod.yml logs
        exit 1
    fi
    
    # Vérifier que l'application répond
    if curl -f http://localhost > /dev/null 2>&1; then
        print_status "✅ Application accessible sur http://localhost"
    else
        print_warning "⚠️  Application non accessible sur localhost, vérification des logs..."
        docker-compose -f docker-compose.prod.yml logs
    fi
}

# Affichage des informations de déploiement
show_deployment_info() {
    echo ""
    echo "🎉 Déploiement terminé avec succès!"
    echo ""
    echo "📋 Informations de déploiement:"
    echo "   🌐 URL: http://$SERVER_IP"
    echo "   📦 Image Docker: $DOCKER_IMAGE"
    echo "   🐳 Conteneur: $PROJECT_NAME"
    echo ""
    echo "🔧 Commandes utiles:"
    echo "   Voir les logs: docker-compose -f docker-compose.prod.yml logs -f"
    echo "   Arrêter: docker-compose -f docker-compose.prod.yml down"
    echo "   Redémarrer: docker-compose -f docker-compose.prod.yml restart"
    echo "   Mettre à jour: ./deploy.sh"
    echo ""
}

# Fonction principale
main() {
    print_status "Début du déploiement d'Anilaye'O Dashboard"
    
    # Vérifications préalables
    check_docker
    
    # Nettoyage
    cleanup_containers
    
    # Build et démarrage
    build_and_start
    
    # Vérifications
    health_check
    
    # Informations finales
    show_deployment_info
}

# Exécution du script
main "$@"
