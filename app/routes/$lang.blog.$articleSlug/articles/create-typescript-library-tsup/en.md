# How to Create Your Own TypeScript Library in 2024: A Step-by-Step Guide

![esbuild-react](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/esbuild-react.webp)

> 24/07/2024

In this tutorial, we'll walk through the process of creating a TypeScript library from scratch. We'll cover project setup, compilation, testing, and publishing. This guide is designed to be accessible for developers with basic knowledge of TypeScript and npm.

## Step 1: Project Initialization

Let's start by creating a new folder for our project and initializing an npm project.

```bash
mkdir my-ts-library
cd my-ts-library
npm init -y
```

This command creates a basic `package.json` file. We'll modify it later.

## Step 2: Installing Dependencies

Let's install TypeScript and the necessary tools for our project:

```bash
npm install --save-dev typescript tsup vitest
```

- `typescript`: The TypeScript compiler
- `tsup`: A build tool for TypeScript
- `vitest`: A fast test framework

## Step 3: TypeScript Configuration

Create a `tsconfig.json` file in the project root:

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

This configuration tells TypeScript how to compile our code.

## Step 4: tsup Configuration

Create a `tsup.config.ts` file to configure our build:

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  clean: true,
  format: ["cjs", "esm"],
  dts: true,
});
```

This configuration generates CommonJS and ES module builds, as well as TypeScript declaration files.

## Step 5: Vitest Configuration

Create a `vitest.config.ts` file to configure our tests:

```typescript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
});
```

## Step 6: Updating package.json

Let's update our `package.json` with the necessary information:

```json
{
  "name": "my-ts-library",
  "version": "0.1.0",
  "description": "My TypeScript Library",
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
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/my-ts-library"
  },
  "bugs": {
    "url": "https://github.com/your-username/my-ts-library/issues"
  },
  "homepage": "https://github.com/your-username/my-ts-library#readme"
}
```

## Step 7: Writing Library Code

Create a `src` folder and an `index.ts` file inside it:

```bash
mkdir src
touch src/index.ts
```

In `src/index.ts`, let's write a simple function:

```typescript
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

## Step 8: Writing Tests

Create a test file `src/index.test.ts`:

```typescript
import { expect, test } from "vitest";
import { greet } from "./index";

test("greet function", () => {
  expect(greet("World")).toBe("Hello, World!");
});
```

## Step 9: Build and Test

Let's run our scripts to build and test our library:

```bash
npm run build
npm test
```

If everything goes well, you should see that the test passes and the build files are generated in the `dist` folder.

## Step 10: Preparing for Publication

Before publishing, make sure your `package.json` is up to date with the correct version, description, and other metadata.

## Step 11: Publishing to npm

If you're ready to publish your library to npm, follow these steps:

1. Create an account on npmjs.com if you don't already have one.
2. Log in to npm via the terminal:

```bash
npm login
```

3. Publish your package:

```bash
npm publish
```

Congratulations! You have now created and published your own TypeScript library!

## Conclusion

This tutorial has guided you through the steps of creating a basic TypeScript library. Remember to add documentation, usage examples, and keep your library up to date. Good luck with your future projects!
