# Publier une librairie avec plusieurs packages à l'aide de Turborepo

![esbuild-npm](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/trubo-npm.webp)

> 02/10/2022

## Plusieurs packages ?

Maintenant que nous savons publier un package sur npm, nous allons voir comment gérer une librairie qui comporte plusieurs packages.

Vous pouvez consulter [cet exemple](https://github.com/simonboisset/validest) pour voir une application concrète.

## Configuration

Pour gérer plusieurs modules ensemble nous allons utiliser Turborepo que vous avez déjà pu voir dans d'un article précédent.

```bash
npx create-turbo@latest
```

Vous pouvez supprimer les différents exemples de packages de base, nous allons créer les nôtres par la suite.

## Builder

On va commencer par créer un package pour gérer les builds de nos librairies. Celui-ci ne sera pas publié mais uniquement partagé dans notre monorepo.

Créez un dossier `builder` dans `packages` puis créez les fichiers suivants :

`package.json`

```json
{
  "name": "builder",
  "private": true,
  "version": "0.1.0",
  "bin": "index.js",
  "dependencies": { "esbuild": "^0.14.42", "esbuild-node-externals": "^1.4.1" }
}
```

`index.js`

```js
#!/usr/bin/env node

const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");
esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: "node",
    format: "cjs",
    target: "node14",
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
```

## Nos packages

Maintenant nous pouvons créer nos différents packages. Pour l'exemple nous allons en créer deux.

### Core

Toujours dans le dossier `packages` on va créer un dossier `core` et les fichiers suivants :

`package.json`

```json
{
  "name": "@example/core",
  "version": "0.1.0",
  "description": "A description",
  "main": "dist/index.js",
  "typings": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "rm -rf dist && builder && tsc"
  },
  "author": "Your name",
  "license": "MIT",
  "devDependencies": {
    "builder": "*",
    "typescript": "^4.7.4"
  }
}
```

> Vous remarquerez que nous avons utilisé un scope pour notre nom de package `@example`. Pour utiliser le votre vous devez créer une organisation du même nom sur npm.

`src/index.ts`

```ts
export const hello = (name: string) => {
  return "Hello " + name;
};
```

`tsconfig.json`

```json
{
  "extends": "builder/ts.json",
  "include": ["src"],
  "exclude": ["src/**/*.test.ts"],
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "module": "esnext",
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "declaration": true,
    "strict": true,
    "moduleResolution": "node",
    "jsx": "react",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "emitDeclarationOnly": true
  }
}
```

## Age

Même chose pour notre deuxième package `@example/age`

`package.json`

On ajoute une dependance à core :

```json
"dependencies": { "@example/core": "0.1.0" },
```

`index.ts`

```ts
import { hello } from "@example/core";

export const age = (name: string, age: number) => {
  return hello(name) + " you are " + age;
};
```

## Turbo build

Nos deux packages sont prêts, il ne reste plus qu'à les builder ensemble. Il faut tout de même paramétrer Turborepo pour builder `core` avant `age`.

A la racine du repo :

`turbo.json`

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}
```

`package.json`

```json
{
  "name": "example",
  "version": "0.1.0",
  "private": true,
  "workspaces": ["packages/*"],
  "scripts": {
    "build": "turbo run build --filter=@example/*"
  },
  "devDependencies": {
    "prettier": "latest",
    "turbo": "latest"
  },
  "engines": {
    "npm": ">=7.0.0",
    "node": ">=14.0.0"
  },
  "prettier": {
    "singleQuote": true,
    "tabWidth": 2,
    "printWidth": 120
  },
  "packageManager": "yarn@1.22.5"
}
```

On peut déjà exécuter les commandes suivantes pour un premier build :

```bash
yarn
yarn build
```

## Test

Si vous souhaitez ajouter des tests je vous conseille [Vitest](https://vitest.dev/). Vous pouvez suivre la docs de [Turborepo](https://turbo.build/repo/docs/handbook/testing) à ce sujet.

## Versionning

Une étape un peu complexe est de gérer les bonnes versions des dépendances. Le plus simple est de considérer que tous nos packages possèdent le même numéro de version. On va tout de même devoir utiliser un script pour incrémenter notre numéro de versions sur toutes nos dépendances avant chaque publication.

Pour ça on utilise `turboversion` :

```bash
yarn add -W -D turboversion
```

Le script sera exécuté avant chaque publication dans notre CI. Pour expliquer rapidement ce qu'il fait, il va scanner tout notre monorepo et incrémenter le numéro de version (patch, minor ou major) des dépendances et packages de notre scope `example`.

## Publication

On va reprendre notre Github Action de l'article précédent pour l'adapter à notre monorepo :

`.github/workflows/publish.yml`

```yml
name: Publish
on:
  workflow_dispatch:
    inputs:
      release:
        description: "major | minor | patch"
        required: true
        default: "patch"
        type: choice
        options:
          - major
          - minor
          - patch
jobs:
  publish-new-version:
    runs-on: ubuntu-latest
    steps:
      - name: 🔌 Checkout
        uses: actions/checkout@v3
      - name: 🏗 Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 16.x
          cache: "yarn"
          registry-url: https://registry.npmjs.org/
          scope: "@example"
      - name: ⏳ Yarn install
        run: yarn
      - name: 🚀 Publish New Version
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
        run: |
          git config --local user.email "youremail"
          git config --local user.name "yourname"
          yarn turboversion example ${{github.event.inputs.release}}
          yarn publish:lib
          PACKAGE_VERSION=$(node -p "require('./package.json').version")
          git commit -a -m "v${PACKAGE_VERSION}"
          git push
```

Voilà, vous pouvez maintenant publier votre librairie et l'ensemble de ses packages avec un numéro de version cohérent.

---

Je suis Simon Boisset, développeur fullstack freelance. Je travaille principalement avec React, React Native et Node.js. Je suis disponible pour des missions de développement ou de conseil. N'hésitez pas à me contacter sur [mon site](https://simonboisset.com/).
