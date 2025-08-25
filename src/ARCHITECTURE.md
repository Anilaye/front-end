# Architecture du Projet - Dashboard Interne pour Employé

## Vue d'ensemble

Ce projet a été réorganisé selon les bonnes pratiques React.js pour améliorer la maintenabilité, la scalabilité et la lisibilité du code.

## Structure des dossiers

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (shadcn/ui)
│   └── ...             # Composants métier
├── pages/              # Pages de l'application
│   ├── auth/           # Pages d'authentification
│   ├── supervision/    # Pages pour admin supervision
│   └── paiements/      # Pages pour admin paiements
├── layouts/            # Layouts réutilisables
├── contexts/           # Contextes React pour la gestion d'état
├── hooks/              # Hooks personnalisés
├── types/              # Types TypeScript
├── utils/              # Fonctions utilitaires
├── constants/          # Constantes de l'application
├── services/           # Services API (à implémenter)
└── features/           # Fonctionnalités métier (à organiser)
```

## Principes architecturaux

### 1. Séparation des préoccupations
- **Composants** : Responsables uniquement de l'affichage
- **Hooks** : Logique métier et gestion d'état
- **Contextes** : État global de l'application
- **Pages** : Organisation des routes et layouts

### 2. Gestion d'état centralisée
- **AuthContext** : Gestion de l'authentification
- **NavigationContext** : Gestion de la navigation
- **Hooks personnalisés** : Logique métier spécifique

### 3. Types TypeScript stricts
- Types définis dans `/types/index.ts`
- Interfaces pour toutes les données métier
- Props typées pour tous les composants

### 4. Constantes centralisées
- Navigation, rôles, statuts dans `/constants/index.ts`
- Évite la duplication et facilite la maintenance

## Composants clés

### Contextes
- **AuthContext** : Gère l'état d'authentification (user, login/logout)
- **NavigationContext** : Gère la navigation entre les pages

### Hooks personnalisés
- **useDistributors** : Gestion des distributeurs
- **useInterventions** : Gestion des interventions
- **useTransactions** : Gestion des transactions
- **useAlerts** : Gestion des alertes
- **useTechnicians** : Gestion des techniciens

### Layouts
- **AuthLayout** : Layout pour les pages d'authentification
- **DashboardLayout** : Layout pour les pages du dashboard

## Bonnes pratiques implémentées

### 1. Composition over Inheritance
- Utilisation de composants composables
- Props drilling évité grâce aux contextes

### 2. Single Responsibility Principle
- Chaque composant a une responsabilité unique
- Hooks séparés pour chaque domaine métier

### 3. DRY (Don't Repeat Yourself)
- Utilitaires réutilisables
- Constantes centralisées
- Types partagés

### 4. Type Safety
- TypeScript strict
- Types pour toutes les données
- Props typées

### 5. Performance
- Hooks optimisés avec useCallback/useMemo (à implémenter)
- Chargement lazy des composants (à implémenter)

## Flux de données

```
User Action → Context → Hook → Component → UI Update
```

1. L'utilisateur interagit avec un composant
2. Le composant utilise un hook ou contexte
3. Le hook met à jour l'état
4. Le contexte propage les changements
5. Les composants se re-rendent

## Extensions futures

### 1. Services API
- Implémenter des services pour les appels API
- Gestion des erreurs centralisée
- Cache et optimisation

### 2. Tests
- Tests unitaires pour les hooks
- Tests d'intégration pour les composants
- Tests E2E pour les flux critiques

### 3. Performance
- React.memo pour les composants
- useMemo/useCallback pour les calculs coûteux
- Lazy loading des pages

### 4. Gestion d'erreurs
- Boundary d'erreurs
- Toast notifications
- Retry mechanisms

## Migration depuis l'ancienne architecture

L'ancien fichier `App.tsx` contenait toute la logique. Maintenant :

1. **État global** → Contextes React
2. **Logique métier** → Hooks personnalisés
3. **Navigation** → AppRouter + NavigationContext
4. **Types** → Fichiers TypeScript dédiés
5. **Constantes** → Fichiers de constantes

Cette architecture facilite :
- Le développement en équipe
- Les tests unitaires
- La maintenance
- L'évolution du code
- La réutilisabilité
