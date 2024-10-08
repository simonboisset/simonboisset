# Create and publish npm module library with esbuild typescript and react

![esbuild-npm](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/esbuild-npm.webp)

> 02/10/2022

## Introduction

As an open source enthusiast, I like to share my code and give everyone the opportunity to use it. For that npm is my first choice. But there are some conditions to have a good library release on npm.

The first recommendation to follow is to support common js as Matteo Collina said :

<blockquote>Here is my recommendation to all my fellow npm module authors: don’t drop support for CJS and go esm-only. The community is not ready to migrate just yet.
Matteo Collina (@matteocollina) <a href="https://twitter.com/matteocollina/status/1560658851682168834?ref_src=twsrc%5Etfw">August 19, 2022</a></blockquote>

For long time you needed to use js bundler like rollup, webpack and babel.

But that time is over because of a new generation of bundler. esbuild is one of them.

Today we will see how to create and publish a react library on npm with esbuild.

You can go to [this repository](https://github.com/simonboisset/remix-feature-routes) for an example of this post.

## Initialization

Create your folder project and initialize it.

```bash
yarn init
```

Your package.json file should be defined :

```json
{
  "name": "my-react-library",
  "version": "1.0.0"
}
```

Now we will install our dependencies.

## Install dev dependencies

```bash
yarn add -D react react-dom typescript @types/react @types/react-dom
```

> Don't forget to add react as a peer dependency if you are writing a react library with hooks or components.

```json
"peerDependencies": {
   "react": ">=16"
 },
```

## Typescript config

Add `tsconfig.json` file.

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

> we don't need to build file with typescript because we will use esbuild for that. That's why `emitDeclarationOnly` is set to true

## Write your module

Now you can write what you want. For example we will just write a function component to export.

Create src `folder` then `index.tsx` inside it.

```tsx
export const MyComponent = () => {
  return <div>Hello word</div>;
};
```

## Build your library

Now we need to build our package to CJS before publish it to npm.

### Configure esbuild

Add esbuild :

```bash
yarn add -D esbuild esbuild-node-externals
```

Create an esbuild script for the bundle. Add a file `esbuild.js` :

```js
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

### Add a build commande

And finally add a script in your package.json :

```json
 "scripts": {
    "build": "rm -rf dist && node esbuild.js && tsc"
  },
```

Now you can run :

```bash
yarn build
```

## Npm publish

> Before publishing you need to be [authenticated](https://docs.npmjs.com/creating-a-new-npm-user-account)

Add these lines to your package.json :

```json
 "main": "dist/index.js",
  "files": [
    "dist"
  ],
```

Then publish it :

```bash
npm publish
```

Congratulations, you have published your own library.

## Publish package with Github action

Finally we just want to publish package when we trigger a github action. For that we have to add a file to `.github/workflows/publish.yml`:

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
      - name: Checkout main
        uses: actions/checkout@v2
      - name: Use Node
        uses: actions/setup-node@v1
        with:
          node-version: "14"
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

### Add secret npm token

To run your action you need to add NPM_TOKEN environement variable.

Go to you npm account and generate an access token for CI :

![Npm access token](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9icyha61tyima21mtzf5.png)

Copy past this token in Github secret of your repository :
![Github action secret](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/xy2xsmbx8v7e6ka5plex.png)

Now run your github action and take a coffe.

![Trigger github action](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oe3ocya9kr94ft0ukbmv.png)

---

I'm Simon Boisset, freelance fullstack developer. I mainly work with React, React Native and Node.js. I'm available for development or consulting missions. Feel free to contact me on [my website](https://simonboisset.com/).
