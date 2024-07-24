# Comment créer sa propre librairie TypeScript en 2024 : Un guide pas à pas

![esbuild-react](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/esbuild-react.webp)

> 24/07/2024

Dans ce tutoriel, nous allons voir comment créer une librairie TypeScript à partir de zéro. Nous couvrirons la configuration du projet, la compilation, les tests et la publication. Ce guide est conçu pour être accessible aux développeurs ayant une connaissance de base de TypeScript et de npm.

## Étape 1 : Initialisation du projet

Commençons par créer un nouveau dossier pour notre projet et initialiser un projet npm.

```bash
mkdir ma-librairie-ts
cd ma-librairie-ts
npm init -y
```

Cette commande crée un fichier `package.json` de base. Nous le modifierons plus tard.

## Étape 2 : Installation des dépendances

Installons TypeScript et les outils nécessaires pour notre projet :

```bash
npm install --save-dev typescript tsup vitest @types/node
```

- `typescript` : Le compilateur TypeScript
- `tsup` : Un outil de build pour TypeScript
- `vitest` : Un framework de test rapide
- `@types/node` : Les types TypeScript pour Node.js

## Étape 3 : Configuration de TypeScript

Créons un fichier `tsconfig.json` à la racine du projet :

```json
{
  "include": ["src"],
  "exclude": ["**/*.test.ts"],
  "compilerOptions": {
    "module": "esnext",
    "target": "esnext",
    "lib": ["esnext"],
    "declaration": true,
    "strict": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

Cette configuration indique à TypeScript comment compiler notre code.

## Étape 4 : Configuration de tsup

Créons un fichier `tsup.config.ts` pour configurer notre build :

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
});
```

Cette configuration permet de générer des builds CommonJS et ES modules, ainsi que les fichiers de déclaration TypeScript.

## Étape 5 : Configuration de Vitest

Créons un fichier `vitest.config.ts` pour configurer nos tests :

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
});
```

## Étape 6 : Mise à jour du package.json

Mettons à jour notre `package.json` avec les informations nécessaires :

```json
{
  "name": "ma-librairie-ts",
  "version": "0.1.0",
  "description": "Ma librairie TypeScript",
  "main": "dist/index.js",
  "module": "dist/index.mjs",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "keywords": ["typescript", "library"],
  "author": "Votre Nom",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/votre-nom-utilisateur/ma-librairie-ts"
  },
  "bugs": {
    "url": "https://github.com/votre-nom-utilisateur/ma-librairie-ts/issues"
  },
  "homepage": "https://github.com/votre-nom-utilisateur/ma-librairie-ts#readme"
}
```

## Étape 7 : Écriture du code de la librairie

Créons un dossier `src` et un fichier `index.ts` à l'intérieur :

```bash
mkdir src
touch src/index.ts
```

Dans `src/index.ts`, écrivons une fonction simple :

```typescript
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Étape 8 : Écriture des tests

Créons un fichier de test `src/index.test.ts` :

```typescript
import { expect, test } from "vitest";
import { greet } from "./index";

test("greet function", () => {
  expect(greet("World")).toBe("Hello, World!");
});
```

## Étape 9 : Build et test

Exécutons nos scripts pour construire et tester notre librairie :

```bash
npm run build
npm test
```

Si tout se passe bien, vous devriez voir que le test passe et que les fichiers de build sont générés dans le dossier `dist`.

## Étape 10 : Préparation pour la publication

Avant de publier, assurez-vous que votre `package.json` est à jour avec la bonne version, description, et autres métadonnées.

## Étape 11 : Publication sur npm

Si vous êtes prêt à publier votre librairie sur npm, suivez ces étapes :

1. Créez un compte sur npmjs.com si vous n'en avez pas déjà un.
2. Connectez-vous à npm via le terminal :

```bash
npm login
```

3. Publiez votre package :

```bash
npm publish
```

Félicitations ! Vous avez maintenant créé et publié votre propre librairie TypeScript !

## Conclusion

Ce tutoriel vous a guidé à travers les étapes de création d'une librairie TypeScript de base. N'oubliez pas d'ajouter de la documentation, des exemples d'utilisation, et de maintenir votre librairie à jour. Bonne chance dans vos futurs projets !
