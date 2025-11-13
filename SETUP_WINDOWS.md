# 🪟 Guide d'installation pour Windows (Adam)

## ⚠️ Problème avec PowerShell ?

PowerShell peut causer des problèmes avec Node.js et npm. Voici les meilleures solutions :

---

## ✅ Solution 1 : Git Bash (RECOMMANDÉ - Simple et rapide)

### Pourquoi Git Bash ?
- ✅ Même commandes que Papa (sur Mac)
- ✅ Pas de problèmes avec npm
- ✅ Facile à installer
- ✅ Intégré dans VS Code

### Installation

1. **Télécharger Git pour Windows** :
   - Aller sur : https://git-scm.com/download/win
   - Télécharger la version 64-bit

2. **Installer avec ces options** :
   - ☑️ Git Bash Here
   - ☑️ Use Git from Git Bash only (ou "from the command line")
   - ☑️ Checkout Windows-style, commit Unix-style line endings

3. **Dans VS Code, changer le terminal par défaut** :
   - Ouvrir VS Code
   - Appuyer sur `Ctrl + Shift + P`
   - Taper : "Terminal: Select Default Profile"
   - Choisir : **Git Bash**

4. **Vérifier que ça marche** :
   ```bash
   git --version
   node --version
   npm --version
   ```

---

## ✅ Solution 2 : WSL2 (Windows Subsystem for Linux) - Pour les pros

### Pourquoi WSL2 ?
- ✅ Linux complet sous Windows
- ✅ Exactement comme sur Mac
- ✅ Performance excellente
- ✅ Utilisé par les pros

### Installation

1. **Ouvrir PowerShell en Administrateur** :
   - Clic droit sur le menu Démarrer
   - Choisir "Windows PowerShell (Administrateur)"

2. **Installer WSL2** :
   ```powershell
   wsl --install
   ```

3. **Redémarrer l'ordinateur**

4. **Après redémarrage, créer un compte Linux** :
   - Choisir un nom d'utilisateur
   - Choisir un mot de passe

5. **Installer Node.js dans WSL** :
   ```bash
   # Mettre à jour les paquets
   sudo apt update && sudo apt upgrade -y

   # Installer Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Vérifier l'installation
   node --version
   npm --version
   ```

6. **Ouvrir VS Code avec WSL** :
   - Installer l'extension "WSL" dans VS Code
   - Cliquer sur le bouton vert en bas à gauche
   - Choisir "Connect to WSL"

---

## 🚀 Une fois le terminal configuré :

### Cloner le projet
```bash
cd ~
git clone https://github.com/adamledams-prog/jeu_adam_avancer.git
cd jeu_adam_avancer
```

### Installer Node.js (si pas déjà fait)
**Sur Git Bash :**
- Télécharger depuis https://nodejs.org (version LTS)
- Installer normalement
- Redémarrer Git Bash

**Sur WSL :**
- Utiliser les commandes ci-dessus

### Lancer le projet
```bash
git checkout adam-dev      # Ta branche de travail
npm install               # Installer les dépendances
npm run dev              # Lancer le serveur
```

### Ouvrir dans le navigateur
http://localhost:3000

---

## 🆘 En cas de problème

### Erreur "npm not found" ou "node not found"
- Fermer et rouvrir le terminal
- Vérifier que Node.js est installé : `node --version`
- Réinstaller Node.js si besoin

### Erreur de droits/permissions dans PowerShell
- C'est pour ça qu'on recommande Git Bash ou WSL ! 😉

### Le site ne s'affiche pas
- Vérifier que le serveur tourne : tu dois voir "Ready in X.Xs"
- Essayer http://127.0.0.1:3000 au lieu de localhost

---

## 💡 Conseil de Papa

**Git Bash est plus simple pour commencer. WSL2 est plus puissant mais demande plus de setup.**

Commence avec Git Bash, et si tu veux passer à WSL2 plus tard, on pourra le faire ensemble ! 🚀

Bon code ! 🎮
