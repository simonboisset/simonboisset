# Partager son code entre des projets React et React Native sur un monorepo

![esbuild-npm](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/share-react-web-mobile.webp)

> 02/10/2022

## Introduction

Comment lier un package npm `core` entre un projet web React par exemple et un projet `mobile` React Native ?

Dans cet article, j'ai fait le choix d'utiliser `yarn` comme gestionnaire de paquet. Il est certainement possible de le réaliser avec `pnpm` ou même `npm`, mais je n'ai pas fait le test.

## Pourquoi partager des packages en local

Quand on travaille sur des projets qui impliquent plusieurs sous-projets à la fois, il arrive très souvent qu'on ait de la logique à partager entre son api et son front voir son mobile.

Pour limiter la duplication de code, la première solution est de créer un package supplémentaire qu'on appelle `core` par exemple pour le partager en local comme une dépendance partagée entre chaque projet.

Tous les projets vont se retrouver avec cette dépendance dans leur fichier package.json :

```json
"dependencies": {
   "core": "*"
}
```

L'inconvénient c'est qu'il faut publier le package `core` pour l'installer et cela rend le développement local ainsi que la logique de la CI complexe.

## Yarn link

Heureusement, une première solution simple à ce problème existe. La commande `yarn link` permet de créer un lien symbolique en local entre nos différents packages. Pour ça, il suffit d'aller exécuter les commandes suivantes :

```sh
cd core
yarn link
yarn build

cd web
yarn link core

cd server
yarn link core
```

Maintenant vos projets `server` et `web` utiliseront la version locale de votre build de `core`.

## Le cas React Native

On va maintenant complexifier notre projet en ajoutant une application mobile React Native. On fait le choix de créer le projet avec [Expo](https://docs.expo.dev/).

Le problème dans ce cas, c'est que les liens symboliques ne fonctionnent pas. Votre application vous enverra un joli crash au démarrage.

Nous allons voir ensemble comment réussir a partager son code proprement entre tous ces projets.

# Monorepo

C'est sympa de lier ses packages entre eux en local, mais quand on commence à en avoir de nombreux ça peut devenir lourd à mettre en place.

Une des solutions les plus utilisée aujourd'hui est de passer par un monorepo, c'est-à-dire un repo qui centralisera tout notre code. Ça permet de simplifier l'organisation du code et le versionning puisque tous les projets suivent les déploiements au même rythme.

## Yarn workspace

Toujours en utilisant yarn, maintenant que nous avons nos projets sur un monorepo nous allons utiliser une configuration très utile pour un monorepo qu'est le [workspace yarn](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

Pour faire simple au lieu de faire un `yarn install` pour chacun de vos projets vous allez le faire une seule fois à la racine de votre monorepo et yarn va installer tous vos node_modules à la racine.

## Turborepo

Pour mettre en place notre monorepo nous allons utiliser [Turborepo](https://turborepo.org/) qui va s'occuper de nous installer les paramètres de base.

Je ne rentre pas dans les détails de cette configuration, car cela pourrait être le sujet d'un article complet et la doc est très bien faite.

```sh
npx create-turbo@latest
```

# Notre monorepo

C'est parti !
Maintenant, créons nos projets web et mobile :

```sh
cd apps
yarn create react-app web
...

npx create-expo-app mobile
```

Maintenant créons notre package core :

```sh
cd packages
mkdir core
yarn init
...
```

Si vous ne savez pas comment créer un package node réutilisable en dépendance, vous pouvez lire [mon article](https://dev.to/simonboisset/create-and-publish-npm-module-library-with-esbuild-typescript-and-react-1acn) à ce sujet.

Il reste à ajouter dans les dépendance de web et mobile :

```json
"dependencies": {
   "core": "*"
}
```

## Metro config

On se rapproche du but. Vous pouvez déjà build `core` et faire tourner `web` avec.

Pour le mobile, ça ne passe toujours pas, mais rassurez vous, on y est presque.

En réalité maintenant notre build de core est situé à la racine de notre projet. Il suffit de préciser à `metro` d'aller chercher ses `node_module` non pas dans sont dossier mais à la racine.

On va d'abord modifier la propriété main du `package.json` :

```json
"main": "index.js"
```

Maintenant on créer le fichier `index.js` :

```js
import { registerRootComponent } from "expo";

import App from "./App";
registerRootComponent(App);
```

Enfin on créer la configuration `metro` pour le monorepo avec le fichier `metro.config.js` :

```js
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
```

Maintenant refaite un test en faisant un build de `core` et en lançant le mobile et vous êtes bons pour démarrer votre développement.

L'exemple de cet article peut être retrouvé [ici](https://github.com/simonboisset/examples/tree/main/shared-react-native-monorepo).

---

Je suis Simon Boisset, développeur fullstack freelance. Je travaille principalement avec React, React Native et Node.js. Je suis disponible pour des missions de développement ou de conseil. N'hésitez pas à me contacter sur [mon site](https://simonboisset.com/).
