# 🚀 Guide d'Installation Rapide pour Papa

## Étape 1 : Installer Node.js

### Option A : Via Homebrew (recommandé)

1. Ouvrir le terminal et installer Homebrew :
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. Après l'installation de Homebrew, installer Node.js :
```bash
brew install node
```

### Option B : Téléchargement direct

Aller sur https://nodejs.org et télécharger la version LTS (Long Term Support).

## Étape 2 : Vérifier l'installation

```bash
node --version   # Doit afficher v20.x ou supérieur
npm --version    # Doit afficher 10.x ou supérieur
```

## Étape 3 : Installer les dépendances du projet

```bash
cd /Users/otmaneboulahia/Documents/jeu_adam_avancer
npm install
```

## Étape 4 : Lancer le serveur de développement

```bash
npm run dev
```

## Étape 5 : Voir le résultat !

Ouvrir le navigateur et aller sur : **http://localhost:3000**

Vous devriez voir la page d'accueil de Zine Star ! 🌟

---

## En cas de problème

- Si `npm` n'est pas reconnu, fermer et rouvrir le terminal
- Si Homebrew ne fonctionne pas, utiliser l'option B (téléchargement direct)
- Pour toute autre erreur, noter le message d'erreur et demander de l'aide

## Prochaines étapes

Une fois que le serveur fonctionne :
1. Modifier les fichiers dans `app/`
2. Le navigateur se rafraîchit automatiquement ✨
3. Commiter et push vos changements sur `papa-dev`
4. Adam pourra pull et voir vos modifications !

Bon code ! 🎮
