# Jeu Adam Avancer

## Description
Projet de jeu collaboratif entre Adam et son père.

## Structure de collaboration

### Branches
- `main` : Branche principale stable
- `adam-dev` : Branche de développement d'Adam  
- `papa-dev` : Branche de développement de Papa
- `feature/[nom-feature]` : Branches temporaires pour des fonctionnalités spécifiques

### Workflow
1. Chacun travaille sur sa branche personnelle
2. Faire des commits réguliers
3. Push vers GitHub fréquemment
4. Créer des Pull Requests pour merger vers `main`
5. Review du code avant merge

## Installation
```bash
git clone https://github.com/adamledams-prog/jeu_adam_avancer.git
cd jeu_adam_avancer
```

## Développement
```bash
# Pour Adam
git checkout adam-dev

# Pour Papa  
git checkout papa-dev
```

## Contribuer
1. Créer une branche feature : `git checkout -b feature/ma-nouvelle-fonctionnalite`
2. Faire ses modifications
3. Commit : `git commit -m "Description des changements"`
4. Push : `git push origin feature/ma-nouvelle-fonctionnalite`
5. Créer une Pull Request sur GitHub