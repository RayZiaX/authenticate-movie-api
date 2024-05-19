# authenticate-movie-api

# Auteur
Magne Jeremy (RayZiaX)

# Description du projet
Ce projet est une API réaliser avec l'aide de ExpressJS et NodeJS, elle permet de créer, modifier et consulter un compte utilisateur et de réaliser une authentification pour naviguer dans les différentes API qui compose note application.

# Prérequi
1. NodeJS en version <b>LTS 20.12.2</b> ou suppérieur qui est téléchargeable [ici](https://nodejs.org/en/download/package-manager)

# Installation
1. Ouvrez un terminal Git
2. Accédez au dossier souhaitez comme suit: `cd votre/chemin/ici`
3. Clonez le projet git `https://github.com/RayZiaX/authenticate-movie-api.git` avec la commande suivante: `git clone https://github.com/RayZiaX/authenticate-movie-api.git`
4. Ouvir un terminal de commande (bash ou invite de commande <i>sur windows</i>)
5. Suite au clone du projet, accédez au dossier `authenticate-movie-api` avec la commande `cd authenticate-movie-api`
6. Dans le terminal de commande, executer la commande `npm install` pour récupérer les différentes dépendance du projet
7. Avant d'executer le projet, renommer le fichier `.env.example` par `.env` dans le dossier `authenticate-movie-api`
8. Pour lancer le projet, lancer la commande suivante `npm run test`, cette commande lance l'api et créer la base de données en ajoutant les différents rôles: </br> "admin", "user" et "gest" mais aussi un compte administrateur qui est a un login "root" et un mot de passe "root"

# Utilisation
Pour utiliser l'api, l'utilisation de l'outil Postman est recommander afin de réaliser des tests sur les différentes routes que propose l'api.
## Postman
Postman est un logiciel gratuit pour réaliser différentes requête sur une API afin de la testé.</br>
il est disponible sur:  
- [Windows](https://dl.pstmn.io/download/latest/win64)
- [Mac OS X](https://dl.pstmn.io/download/latest/osx_arm64)
- [Linux](https://dl.pstmn.io/download/latest/linux_64)