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

## Les routes

### General
1. L'api écoute sur l'adresse IP `http://localhost:5002/api/<route>` ou `http://127.0.0.1:5002/api/<route>`</br
2. Le port d'écoute par défaut est `5002`

### /api/account
cette route permet de créer un compte afin d'utiliser les différentes service de Movie.
Cette route possède plusieurs sécurités/vérifications comme:</br>
- Une vérification sur l'attibution des rôles si le rôle Administrateur est attribué au nouveau compte, alors il faut qu'il ait obligatoirement le role "Utilisateur".
- Il faut être obligatoirement connecté pour créer un compte.
- Seulement un compte Administrateur peut créer un nouveau compte.
- Si aucune valeur n'est fourni pour le status du compte, alors la valeur par défaut est "open".
- Il peut y avoir que 2 status "open" ou "closed" (sensible à la casse)

#### Comment utiliser cette route ?
Dans postman:
- Créer une nouvelle requête http avec comme méthode `POST`
- Ajouter votre token fourni par la route `/api/token` dans l'onglet "Authorize" dans le type `Bearer Token` sinon vous ne pouvez rien faire.
- Aller dans l'onglet "Body" > selectionnez raw > type de fichier TEXT basculer à JSON
et ajoutez ceci:
```
{
    "login":"string",
    "password":"string",
    "roles":["string"],
    "status": "string"
}
```
#### Exemple de réponse
Exemple d'une réponse réussi: </br>
```
{
    "idUser": "98882c83-6f14-4355-add4-b8ddf4936786",
    "login": "MSU22",
    "roles": [
        {
            "idRole": 2,
            "nameRole": "User"
        }
    ],
    "createdAt": "2024-05-19T18:05:43.714Z",
    "updatedAt": "2024-05-19T18:05:43.714Z"
}
```

### /api/account/<uid>

Cette route permet de consulter son compte.</br>
Cette route possède plusieurs sécurités/vérifications comme:</br>
- Il faut être obligatoirement connecté pour consulter son compte.
- Seulement un compte Administrateur peut consulter l'ensemble des comptes.
- Si dans au niveau du `uid` la valeur est `me` alors les données de l'utilisateur connecter sera retourné.
- Si l'utilisateur connecté est un `Gest` alors toute tentative de consultation sera annulée

#### Comment utiliser cette route ?
- Créer une nouvelle requête http avec comme méthode `GET`
- Ajouter votre token fourni par la route `/api/token` dans l'onglet "Authorize" dans le type `Bearer Token` sinon vous ne pouvez rien faire.
- Remplacer le `uid` par l'identifiant du compte cible ou par `me` pour récupérer le compte utilisateur de la personne connecté

#### Exemple de réponse
Exemple d'une réponse réussi: </br>
```
{
    "idUser": "32fc8d3a-2bf6-4d54-b54a-7f894bbbc60c",
    "login": "root",
    "roles": [
        {
            "idRole": 2,
            "nameRole": "User"
        },
        {
            "idRole": 1,
            "nameRole": "Admin"
        }
    ],
    "createdAt": "2024-05-19T18:05:14.047Z",
    "updatedAt": "2024-05-19T18:05:14.047Z"
}
```

### /api/account/<uid>

Elle permet de consulter son compte.</br>
Elle possède plusieurs sécurités/vérifications comme:</br>
- Il faut être obligatoirement connecté pour consulter son compte.
- Seulement un compte Administrateur peut consulter l'ensemble des comptes.
- Si dans au niveau du `uid` la valeur est `me` alors les données de l'utilisateur connecter sera retourné.
- Si l'utilisateur connecté est un `Gest` alors toute tentative de consultation sera annulée
- Si l'utilisateur connecté est un administateur alors il peut modifier n'importe quel compte et attribuer un ou plusieurs rôles
- Si l'utilisateur connecté est un simple utilisateur alors il peut uniquement modifier les informations de son compte et ne peut modifier aucun rôles

#### Comment utiliser cette route ?
- Créer une nouvelle requête http avec comme méthode `PUT`
- Ajouter votre token fourni par la route `/api/token` dans l'onglet "Authorize" dans le type `Bearer Token` sinon vous ne pouvez rien faire.
- Remplacer le `uid` par l'identifiant du compte cible ou par `me` pour récupérer le compte utilisateur de la personne connecté
- Aller dans l'onglet "Body" > selectionnez raw > type de fichier TEXT basculer à JSON
et ajoutez ceci: </br>
```
{
    "login":"string",
    "password":"string",
    "roles":["string"],
    "status": "string"
}
```
#### Exemple de réponse
Exemple d'une réponse réussi: </br>
```
{
    "idUser": "98882c83-6f14-4355-add4-b8ddf4936786",
    "login": "MSU22",
    "roles": [
        {
            "idRole": 2,
            "nameRole": "User"
        }
    ],
    "createdAt": "2024-05-19T18:05:43.714Z",
    "updatedAt": "2024-05-19T18:05:43.714Z"
}
```

### /api/token

Cette route permet de se connecter en récupérant un token (jeton) de connexion et de rafraichissement.</br>
Elle possède une sécurité sur le brut force si 3 tentives échoues alors la personne est bloquer pendant 5 minutes si 3 autres tentatives échoues alors alors elle sera bloqué 15 minutes puis après elle sera bloquer toutes les 30 minutes.

#### Comment utiliser cette route ?
- Créer une nouvelle requête http avec comme méthode `POST`
- Aller dans l'onglet "Body" > selectionnez raw > type de fichier TEXT basculer à JSON
et ajoutez ceci: </br>
```
{
    "login":"string",
    "password":"string"
}
```

#### Exemple de réponse
Une réponse si la connexion à bien fonctionnée:</br>
```
{
    "accessToken": "string",
    "accessTokenExpiresAt": "string",
    "refreshToken": "string",
    "refreshTokenExpiresAt": "string"
}
```

### /api/refresh-token/<refreshToken>/token

Cette route permet de récupérer un nouveau token (jeton) de connexion et de rafraichissement afin de ne pas demander à l'utilisateur de s'authentifier de nouveau.</br>

#### Comment utiliser cette route ?
- Créer une nouvelle requête http avec comme méthode `POST`
- Remplacer le `refreshToken` par le token de rafraichissement fourni par la route `/api/token`

#### Exemple de réponse
Une réponse si la connexion à bien fonctionnée:</br>
```
{
    "accessToken": "string",
    "accessTokenExpiresAt": "string",
    "refreshToken": "string",
    "refreshTokenExpiresAt": "string"
}
```

### /api/validate/<token>

Cette route permet de vérifier la validité du token (jeton) passé en paramètre.</br>

#### Comment utiliser cette route ?
- Créer une nouvelle requête http avec comme méthode `POST`
- Remplacer le `token` par le token à vérifier.

#### Exemple de réponse
Une réponse si la connexion à bien fonctionnée:</br>
```
{
    "accessToken": "string",
    "accessTokenExpiresAt": "string"
}
```
