# Comment configurer esbuild pour créer une application React avec Typescript

![react app esbuild](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/esbuild-react.webp)

> 25/08/2022

## Introduction

[esbuild](https://esbuild.github.io/) est un compilateur JavaScript rapide et simple qui prend en charge JSX et TypeScript. Dans cet article, nous allons configurer esbuild pour créer une application React avec Typescript.

Vous pouvez vérifier le code sur ce [repos](https://github.com/simonboisset/templates/tree/main/templates/react-spa).

> J'ai écrit cet article en 2022. C'est plus un POC qu'une véritable application prête pour la production. Je l'utilise pour tester esbuild et créer un modèle pour mes futurs projets. Aujourd'hui, je ne recommanderais pas styled-components, mais j'utiliserais plutôt tailwindcss.

## Initialisation

Créez votre dossier de projet et initialisez-le.

```bash
yarn init
```

```json
{
  "name": "esbuild-static",
  "version": "1.0.0"
}
```

## Installer les dépendances

```bash
yarn add esbuild dotenv react react-dom styled-components
```

Ensuite, ajoutez les devdependencies.

```bash
yarn add --dev typescript @types/react @types/react-dom @types/styled-components @types/node serve-handler @types/serve-handler
```

## Configuration Typescript

Ajoutez le fichier `tsconfig.json`.

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

## Configuration Esbuild

Créez le dossier `esbuild` puis ajoutez les fichiers `dev.js` et `prod.js`.

La configuration dev surveille les modifications des fichiers et démarre un serveur pour le rechargement à chaud et les fichiers statiques. Vous pouvez également ajouter des variables d'environnement.

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

## Ajouter des scripts

```json
"scripts": {
    "build": "node esbuild/prod",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.ts src/**/*.tsx",
    "start": "nodemon --watch dist --exec 'yarn type-check & yarn lint' & node esbuild/dev"
  },
```

## React app

Créez le fichier `src/index.tsx`.

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

## Hot reload

Pour écouter le rechargement du serveur esbuild dev, nous devons ajouter un hook pour le développement.

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

## Global style

Ajoutez le fichier `src/globalStyle.ts`.

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

## App

Créez le fichier `src/App.tsx`.

```tsx
import React from 'react';
import useHMR from './useHMR';

const App: React.FC = () => {
  useHMR();
  return (
    <div className='App'>
      <header className='App-header'>
        <img src='/logo.svg' className='App-logo' alt='logo' />
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

## Fichiers statiques

Pour ajouter des fichiers statiques, créez le dossier `public` et ajoutez le fichier `logo.svg`.

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

Puis ajoutez les autres fichiers statiques comme `favicon.ico`, `logo192.png` et `manifest.json`.

## Lancer le serveur

```bash
yarn start
```

## Build

```bash
yarn build
```

## Conclusion

Vous pouvez maintenant créer une application React avec Typescript et esbuild.

---

Je suis Simon Boisset, développeur fullstack freelance. Je travaille principalement avec React, React Native et Node.js. Je suis disponible pour des missions de développement ou de conseil. N'hésitez pas à me contacter sur [mon site](https://simonboisset.com/).
