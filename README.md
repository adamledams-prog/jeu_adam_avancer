# 🌟 ZINE STAR - Le Jeu

Projet de jeu web collaboratif entre Adam et Papa !

## 🎮 Description

**Zine Star** est un jeu web interactif moderne créé avec les meilleures technologies 2025 :
- ⚛️ **Next.js 14** - Framework React ultra-performant
- 🎨 **Tailwind CSS** - Style moderne et responsive
- 📘 **TypeScript** - Code robuste et maintenable

## 🚀 Installation & Configuration

### Prérequis

1. **Installer Homebrew** (gestionnaire de paquets pour macOS) :
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. **Installer Node.js** :
```bash
brew install node
```

3. **Vérifier l'installation** :
```bash
node --version  # Doit afficher v20.x ou supérieur
npm --version   # Doit afficher 10.x ou supérieur
```

### Installation du projet

```bash
# Cloner le repository
git clone https://github.com/adamledams-prog/jeu_adam_avancer.git
cd jeu_adam_avancer

# Installer les dépendances
npm install
```

## 💻 Développement

### Lancer le serveur de développement

```bash
npm run dev
```

Puis ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur ! 🎉

### Commandes disponibles

- `npm run dev` - Lancer le serveur de développement
- `npm run build` - Compiler le projet pour production
- `npm start` - Lancer le serveur en mode production
- `npm run lint` - Vérifier la qualité du code

## 🌿 Structure de collaboration Git

### Branches
- `main` : Branche principale stable ✅
- `adam-dev` : Branche de développement d'Adam 👦
- `papa-dev` : Branche de développement de Papa 👨
- `feature/[nom]` : Branches temporaires pour des fonctionnalités spécifiques

### Workflow recommandé

1. **Chacun travaille sur sa branche** :
```bash
# Pour Adam
git checkout adam-dev

# Pour Papa
git checkout papa-dev
```

2. **Faire des modifications et commiter** :
```bash
git add .
git commit -m "✨ Description claire du changement"
```

3. **Push vers GitHub** :
```bash
git push origin nom-de-votre-branche
```

4. **Créer une Pull Request sur GitHub** pour merger vers `main`

5. **Review du code** avant le merge 👀

### Emojis pour les commits (optionnel mais fun !)

- ✨ `:sparkles:` - Nouvelle fonctionnalité
- 🐛 `:bug:` - Correction de bug
- 💄 `:lipstick:` - Amélioration UI/style
- 🎨 `:art:` - Amélioration structure du code
- 📝 `:memo:` - Documentation
- 🚀 `:rocket:` - Performance

## 📁 Structure du projet

```
jeu_adam_avancer/
├── app/
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Page d'accueil (Zine Star)
│   ├── globals.css       # Styles globaux
│   └── trophees/
│       └── page.tsx      # Page des trophées
├── public/               # Fichiers statiques (images, etc.)
├── package.json          # Dépendances du projet
├── tsconfig.json         # Configuration TypeScript
├── tailwind.config.ts    # Configuration Tailwind CSS
└── next.config.js        # Configuration Next.js
```

## 🎯 Fonctionnalités actuelles

- ✅ Page d'accueil stylée avec fond bleu
- ✅ Bouton "Trophées" en haut à droite 🏆
- ✅ Personnage animé à gauche 🎮
- ✅ Titre "ZINE STAR" au centre avec animations
- ✅ Page trophées avec système de progression

## 📚 Ressources pour apprendre

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contribuer

1. Créer une branche feature : `git checkout -b feature/ma-nouvelle-fonctionnalite`
2. Faire ses modifications
3. Commit : `git commit -m "✨ Description des changements"`
4. Push : `git push origin feature/ma-nouvelle-fonctionnalite`
5. Créer une Pull Request sur GitHub

---

Fait avec ❤️ par Adam et Papa
