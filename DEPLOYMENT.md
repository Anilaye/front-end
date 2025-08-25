# 🚀 Guide de Déploiement - Anilaye'O Dashboard

Ce guide vous explique comment déployer l'application Anilaye'O Dashboard sur votre serveur VPS (147.79.117.201).

## 📋 Prérequis

- Serveur VPS avec Ubuntu/Debian
- Accès SSH au serveur
- Docker et Docker Compose (installés automatiquement par le script)

## 🛠️ Installation et Déploiement

### 1. Connexion au serveur VPS

```bash
ssh root@147.79.117.201
```

### 2. Cloner le repository

```bash
git clone https://github.com/Anilaye/front-end.git
cd front-end
```

### 3. Déploiement automatique

```bash
./deploy.sh
```

Le script va automatiquement :
- ✅ Vérifier/installer Docker et Docker Compose
- ✅ Nettoyer les conteneurs existants
- ✅ Builder l'image Docker
- ✅ Démarrer les services
- ✅ Vérifier la santé de l'application

## 🌐 Accès à l'application

Une fois le déploiement terminé, votre application sera accessible à :
- **URL principale** : http://147.79.117.201
- **Port** : 80 (HTTP)

## 🔧 Commandes de gestion

### Voir les logs
```bash
docker-compose logs -f
```

### Arrêter l'application
```bash
docker-compose down
```

### Redémarrer l'application
```bash
docker-compose restart
```

### Mettre à jour l'application
```bash
git pull
./deploy.sh
```

### Voir les conteneurs en cours d'exécution
```bash
docker ps
```

## 📁 Structure des fichiers Docker

```
front-anilayo/
├── Dockerfile          # Configuration de l'image Docker
├── docker-compose.yml  # Orchestration des services
├── nginx.conf         # Configuration Nginx
├── .dockerignore      # Fichiers exclus du build
├── deploy.sh          # Script de déploiement automatisé
└── DEPLOYMENT.md      # Ce guide
```

## 🔒 Sécurité

L'application inclut :
- Headers de sécurité HTTP
- Compression Gzip
- Cache optimisé pour les assets statiques
- Configuration Nginx sécurisée

## 📊 Monitoring

### Logs Nginx
```bash
docker exec anilayo-dashboard tail -f /var/log/nginx/access.log
docker exec anilayo-dashboard tail -f /var/log/nginx/error.log
```

### Statistiques des conteneurs
```bash
docker stats
```

## 🚨 Dépannage

### Problème de port déjà utilisé
```bash
sudo netstat -tulpn | grep :80
sudo kill -9 <PID>
```

### Problème de permissions Docker
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Rebuild complet
```bash
docker-compose down
docker system prune -a
./deploy.sh
```

## 🔄 Mise à jour automatique

Pour configurer des mises à jour automatiques, vous pouvez utiliser un cron job :

```bash
# Éditer le crontab
crontab -e

# Ajouter cette ligne pour une mise à jour quotidienne à 2h du matin
0 2 * * * cd /path/to/front-end && git pull && ./deploy.sh >> /var/log/anilayo-update.log 2>&1
```

## 📞 Support

En cas de problème :
1. Vérifiez les logs : `docker-compose logs`
2. Vérifiez l'état des conteneurs : `docker ps`
3. Redémarrez : `docker-compose restart`
4. Rebuild complet : `./deploy.sh`

---

**Anilaye'O Dashboard** - Déploiement VPS automatisé 🎯
