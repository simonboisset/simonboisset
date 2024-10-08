# Share packages between React Native and Web project in monorepo

![esbuild-npm](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/share-react-web-mobile.webp)

> 02/10/2022

## Introduction

How to link an npm `core` package between a `React` web project and a `React Native` mobile project?

In this article, I will use yarn as package manager. You can probably do this with `pnpm` or even `npm`, but I haven't tested it.

## Why sharing packages locally ?

When you work on projects that includes many sub-projects, you should want to share code between your API and your front or your mobile.

To minimize code duplication, the first solution is to create an additional package called `core`, for example, to share it locally as a shared dependency between each project.

All projects will include this dependency in their `package.json` file :

```json
"dependencies": {
   "core": "*"
}
```

The disadvantage is that you have to publish the core package to install it and makes local development and CI logic much complex.

## Yarn link

A simple solution to solve this problem is to use `yarn link` to create a symlink locally between our packages :

```sh
cd core
yarn link
yarn build

cd web
yarn link core

cd server
yarn link core
```

Now your `server` and `web` will use the local version of your `core` build.

## React Native

Now We will make our project more complex by adding a React Native mobile application. We made the choice to create the project with [Expo](https://docs.expo.dev/).

The problem in this case is that the symlinks don't work. Your app will give you a nice crash.

We will see together how to succeed in sharing your code properly between all these projects.

## Monorepo

It's nice to link your packages together locally, but when your project adding many of them, it can be onerous to set up.

One of the most used solutions today is to go through a monorepo. To put it simply, it's a repo that will centralize all our code. This simplifies code organization and versioning since all projects follow deployments at the same time.

## Yarn workspace

Still using yarn, now that we have our projects on a monorepo we are going to use a very useful configuration for a monorepo which is the [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/).

Briefly, instead of doing a yarn install for each of your projects, you will do it once at the root of your monorepo and yarn will install all your `node_modules` at the root.

## Turborepo

To set up our monorepo we will use [Turborepo](https://turborepo.org/) which will take care of installing the basic parameters for us.

I will not explains of this configuration, because it could be the subject of a complete article and the documentation is very good.

```sh
npx create-turbo@latest
```

# Our monorepo

Let's go!
Now, let's create our web and mobile projects :

```sh
cd apps
yarn create react-app web
...

npx create-expo-app mobile
```

Now we create our core package :

```sh
cd packages
mkdir core
yarn init
...
```

If you don't know how to create a dependency reusable node package, you can read [my article](https://dev.to/simonboisset/create-and-publish-npm-module-library-with-esbuild-typescript-and-react-1acn) about it.

It remains to add in the dependencies of web and mobile :

```json
"dependencies": {
   "core": "*"
}
```

# Metro config

We are getting closer to the goal.
You can already build `core` and run `web` with it.

For `mobile`, it still doesn't work, but don't worry, we're almost there.

Now our `core` build is located at the `root` of our project. Just tell `metro` to get its `node_module` not in its folder but in the root.

We will first modify the `main` property of the `package.json` :

```json
"main": "index.js"
```

Now we create the `index.js` file:

```js
import { registerRootComponent } from "expo";

import App from "./App";
registerRootComponent(App);
```

Finally we create the `metro` configuration for the monorepo with the `metro.config.js` file:

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

Now you can retry a core build and launch the mobile and you are able to start your development.

The example of this article can be found [here](https://github.com/simonboisset/examples/tree/main/shared-react-native-monorepo).

---

I'm Simon Boisset, freelance fullstack developer. I mainly work with React, React Native and Node.js. I'm available for development or consulting missions. Feel free to contact me on [my website](https://simonboisset.com/).
