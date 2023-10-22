# Publier un package avec esbuild

![esbuild npm](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/esbuild-npm.webp)

> 02/10/2022

## Introduction

Personnellement j'apprécie pouvoir partager mon code avec la communauté open source. Publier des packages npm pour cela est une des principales options. Mais pour s'assurer que son code soit exécutable sur n'importe quel environnement il faut certains prérequis.

La règle numéro 1 à suivre est de supporter le common js.

Pendant longtemps il fallait utiliser un bundler comme rollup, webpack ou babel.

Mais aujourd'hui une nouvelle génération de bundler arrivent, plus performants et plus faciles à paramétrer. esbuild est l'un d'eux et nous allons l'utiliser pour publier notre premier module npm.

## Initialisation

Créez un projet et initialisez le.

```bash
yarn init
```

Votre fichier package.json doit être comme ceci :

```json
{
  "name": "my-react-library",
  "version": "1.0.0"
}
```

Maintenant, installons nos librairies.

## Les dev dependencies

```bash
yarn add -D react react-dom typescript @types/react @types/react-dom
```

> Pensez à ajouter react comme peer dependency si vous souhaitez écrire une librairie react avec des hooks ou des composants.

```json
"peerDependencies": {
   "react": ">=16"
 },
```

## Typescript config

Ajoutez le fichier `tsconfig.json`.

```json
{
  "include": ["src"],
  "compilerOptions": {
    "module": "esnext",
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "declaration": true,
    "strict": true,
    "moduleResolution": "node",
    "jsx": "react",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "emitDeclarationOnly": true,
    "outDir": "dist",
    "rootDir": "src"
  }
}
```

> On n'utilise pas le compilateur typescript car nous allons utiliser esbuild pour cela. C'est pour ça que `emitDeclarationOnly` est à true

## Notre module

Maintenant, on peut écrire le module de nos envies. Voici un exemple basique.

Créez un dossier `src` puis un fichier `index.tsx`.

```tsx
export const MyComponent = () => {
  return <div>Hello word</div>;
};
```

## Build de notre librairie

On souhaite maintenant builder notre package en CJS avant de le publier.

### Configuration esbuild

Ajoutez esbuild :

```bash
yarn add -D esbuild esbuild-node-externals
```

Créez un script esbuild dans un fichier `esbuild.js` :

```js
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format: 'cjs',
    target: 'node14',
    plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
```

### Ajoutez la commande de build

Enfin, ajoutez le script dans le fichier package.json :

```json
 "scripts": {
    "build": "rm -rf dist && node esbuild.js && tsc"
  },
```

Maintenant, vous pouvez lancer le script :

```bash
yarn build
```

## Npm publish

> Avant de publier sur npm vous devez vous [authentifier](https://docs.npmjs.com/creating-a-new-npm-user-account)

Ajoutez ces lignes à votre package.json :

```json
 "main": "dist/index.js",
  "files": [
    "dist"
  ],
```

Puis publiez votre package :

```bash
npm publish
```

Félicitations, venez de publier votre propre librairie Typescript.

## Automatiser la publication avec les Github actions

Finalement on veut juste publier une nouvelle version quand on déclenche une action sur Github. On va donc ajouter un fichier
`.github/workflows/publish.yml`:

```yml
name: Publish
on:
  workflow_dispatch:
    inputs:
      release:
        description: 'major | minor | patch'
        required: true
        default: 'patch'
        type: choice
        options:
          - major
          - minor
          - patch
jobs:
  publish-new-version:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout main
        uses: actions/checkout@v2
      - name: Use Node
        uses: actions/setup-node@v1
        with:
          node-version: '14'
          registry-url: https://registry.npmjs.org/
      - name: Install dependencies
        run: yarn
      - name: Build
        run: yarn build
      - name: Publish New Version
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
        run: |
          git config --local user.email "myEmail"
          git config --local user.name "myUsername"
          yarn version --new-version ${{github.event.inputs.release}} --no-git-tag-version
          yarn publish --access public
          PACKAGE_VERSION=$(node -p "require('./package.json').version")
          git commit -a -m "v${PACKAGE_VERSION}"
          git push
```

### Ajoutez votre npm token

Pour faire fonctionner les actions on doit enregistrer un secret NPM_TOKEN.

Il faut générer un access token sur npm :

![Npm access token](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9icyha61tyima21mtzf5.png)

Copiez le token dans les secrets Github :
![Github action secret](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xy2xsmbx8v7e6ka5plex.png)

Maintenant tout fonctionne, votre publication se fera toute seule.

![Trigger github action](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oe3ocya9kr94ft0ukbmv.png)

---

Je suis Simon Boisset, développeur fullstack freelance. Je travaille principalement avec React, React Native et Node.js. Je suis disponible pour des missions de développement ou de conseil. N'hésitez pas à me contacter sur [mon site](https://simonboisset.com/).
