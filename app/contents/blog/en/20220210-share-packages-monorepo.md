# Publish a library with multiple packages using Turborepo

![esbuild-npm](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/trubo-npm.webp)

> 02/10/2022

## Multiple packages?

Now that we know how to publish a package on npm, we will see how to manage a library that has multiple packages.

You can check out [this example](https://github.com/simonboisset/validest) to see a concrete application.

## Configuration

To manage multiple modules together we will use Turborepo that you have already seen in a previous article.

```bash
npx create-turbo@latest
```

You can delete the different examples of base packages, we will create our own later.

## Builder

We will start by creating a package to manage the builds of our libraries. This one will not be published but only shared in our monorepo.

Create a `builder` folder in `packages` then create the following files:

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

## Our packages

Now we can create our different packages. For the example we will create two.

## Core

Still in the `packages` folder we will create a `core` folder and the following files:

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

> You will notice that we used a scope for our package name `@example`. To use your own you must create an organization with the same name on npm.

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

Same thing for our second package `@example/age`

`package.json`

We add a dependency to core:

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

Our two packages are ready, we just have to build them together. We will still have to set up Turborepo to build `core` before `age`.

At the root of the repo:

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

We can already run the following commands for a first build:

```bash
yarn
yarn build
```

## Test

If you want to add tests I recommend [Vitest](https://vitest.dev/). You can follow the docs of [Turborepo](https://turbo.build/repo/docs/handbook/testing) about it.

## Versioning

A somewhat complex step is to manage the correct versions of dependencies. The simplest thing is to consider that all our packages have the same version number. We will still have to use a script to increment our version number (patch, minor or major) of dependencies and packages before each publication.

For this we use `turboversion`:

```bash
yarn add -W -D turboversion
```

The script will be executed before each publication in our CI. To explain quickly what it does, it will scan our entire monorepo and increment the version number (patch, minor or major) of the dependencies and packages of our scope `example`.

## Publication

We will take back our Github Action from the previous article to adapt it to our monorepo:

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

There you go, you can now publish your library and all its packages with a consistent version number.

---

I'm Simon Boisset, freelance fullstack developer. I mainly work with React, React Native and Node.js. I'm available for development or consulting missions. Feel free to contact me on [my website](https://simonboisset.com/).
