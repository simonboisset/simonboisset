# How to configure esbuild to create a react app

![react app esbuild](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/esbuild-react.webp)

> 25/08/2022

## Introduction

[Esbuild](https://esbuild.github.io/) is a new javascript bundler. It's written with Go and is extremely fast. Let's go to use it to create react with hot reload app from scratch without webpack

You can check the code on this [repos](https://github.com/simonboisset/templates/tree/main/templates/react-spa).

> I wrote this article in 2022. It's more a POC than a real production ready app. I use it to test esbuild and create a template for my future projects. Today I would not recommend styled-components instead I would use tailwindcss.

## Initialization

Create your folder project and initialize it.

```bash
yarn init
```

```json
{
  "name": "esbuild-static",
  "version": "1.0.0"
}
```

### Install dependencies

```bash
yarn add esbuild dotenv react react-dom styled-components
```

Then add devdependencies.

```bash
yarn add --dev typescript @types/react @types/react-dom @types/styled-components @types/node serve-handler @types/serve-handler
```

### Typescript config

Add `tsconfig.json` file.

```json
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "module": "commonjs",
    "target": "ESNext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "moduleResolution": "node",
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "jsx": "react"
  },
  "include": ["src"],
  "exclude": ["**/node_modules", "**/.*/"]
}
```

### Esbuild config

Create `esbuild` folder then add `dev.js` and `prod.js` files.

The dev config watch files changes and start a server for hot reload and static files. You can add environment variables too.

```js
const { spawn } = require('child_process');
const esbuild = require('esbuild');
const { createServer, request } = require('http');
require('dotenv').config();
const handler = require('serve-handler');

const clientEnv = { 'process.env.NODE_ENV': `'dev'` };
const clients = [];

Object.keys(process.env).forEach((key) => {
  if (key.indexOf('CLIENT_') === 0) {
    clientEnv[`process.env.${key}`] = `'${process.env[key]}'`;
  }
});

const openBrowser = () => {
  setTimeout(() => {
    const op = { darwin: ['open'], linux: ['xdg-open'], win32: ['cmd', '/c', 'start'] };
    if (clients.length === 0) spawn(op[process.platform][0], ['http://localhost:3000']);
  }, 1000);
};

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    define: clientEnv,
    outfile: 'dist/index.js',
    sourcemap: 'inline',
    watch: {
      onRebuild(error) {
        setTimeout(() => {
          clients.forEach((res) => res.write('data: update\n\n'));
        }, 1000);
        console.log(error || 'client rebuilt');
      },
    },
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

esbuild.serve({ servedir: './' }, {}).then((result) => {
  createServer((req, res) => {
    const { url, method, headers } = req;
    if (req.url === '/esbuild') {
      return clients.push(
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Access-Control-Allow-Origin': '*',
          Connection: 'keep-alive',
        }),
      );
    }

    const path = url.split('/').pop().indexOf('.') ? url : `/index.html`;
    const proxyReq = request({ hostname: '0.0.0.0', port: 8000, path, method, headers }, (prxRes) => {
      res.writeHead(prxRes.statusCode, prxRes.headers);
      prxRes.pipe(res, { end: true });
    });
    req.pipe(proxyReq, { end: true });
    return null;
  }).listen(5010);

  createServer((req, res) => {
    return handler(req, res, { public: 'dist' });
  }).listen(3000);

  openBrowser();
});
```

```js
const esbuild = require('esbuild');
require('dotenv').config();

const clientEnv = { 'process.env.NODE_ENV': `'production'` };
for (const key in process.env) {
  if (key.indexOf('CLIENT_') === 0) {
    clientEnv[`process.env.${key}`] = `'${process.env[key]}'`;
  }
}
esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    minify: true,
    define: clientEnv,
    outfile: 'dist/index.js',
  })
  .catch(() => process.exit(1));
```

### Eslint config

Install eslint.

```bash
yarn add --dev eslint eslint-config-react-app @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Add `.eslintrc.js` file.

```jsx
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
```

### Scripts

Add scripts to package.json

```json
"scripts": {
    "build": "node esbuild/prod",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.ts src/**/*.tsx",
    "start": "nodemon --watch dist --exec 'yarn type-check & yarn lint' & node esbuild/dev"
  },
```

## React app

In `src` folder add `index.tsx` file.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './globalStyle';

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root'),
);
```

### Hot reload tools

For listening esbuild dev server reload we must add a hook for development.

```tsx
import { useEffect } from 'react';

const useHMR = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      new EventSource('http://localhost:5010/esbuild').onmessage = () => window.location.reload();
    }
  }, []);
};
export default useHMR;
```

### CSS with styled-components

Add global style with `styled-components`

```css
import { createGlobalStyle } from 'styled-components';

 const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
.App {
  text-align: center;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

@media (prefers-reduced-motion: no-preference) {
  .App-logo {
    animation: App-logo-spin infinite 20s linear;
  }
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;
export default GlobalStyle
```

### App

Fanaly create the App component.

```tsx
import React, { FC } from 'react';
import useHMR from './useHMR';
import Logo from './Logo';

const App: FC = () => {
  useHMR();
  return (
    <div className='App'>
      <header className='App-header'>
        <Logo />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
```

## **Static files**

Add static files in `dist` folder.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="React App" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
<script src="/index.js"></script>
```

Then create other files : `favicon.ico`, `manifest.json`, `logo192.png`

## Run

Start dev server.

```bash
yarn start
```

Build for production

```bash
yarn build
```

> Now let's go to code

---

I'm Simon Boisset, freelance fullstack developer. I mainly work with React, React Native and Node.js. I'm available for development or consulting missions. Feel free to contact me on [my website](https://simonboisset.com/).
