# Créer une app react avec esbuild

# **Introduction**

[Esbuild](https://esbuild.github.io/) est un bundler javascript nouvelle génération. Il est écrit en Go et un de ses intérêts est qu'il est extrêmement rapide. Essayon d'écrire une react app from scratch sans webpack avec esbuild.

Vous pouvez consulter le code de cet article sur ce [repos](https://github.com/simonboisset/react-esbuild-app).

# **Initialisation**

Commencez par créer le dossier de votre projet et initialisez le.

```bash
yarn init
```

Votre package.json ressemble à ceci :

```json
{
  "name": "esbuild-static",
  "version": "1.0.0"
}
```

# **Ajout des dépendance**

```bash
yarn add esbuild dotenv react react-dom styled-components
```

On ajoute aussi les devdependencies.

```bash
yarn add --dev typescript @types/react @types/react-dom @types/styled-components @types/node serve-handler @types/serve-handler
```

# **Config Typescript**

Ajoutez le fichier `tsconfig.json` à la racine du projet.

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

# **Config Esbuild**

Créez le dossier `esbuild` et ajoutez y les fichiers `dev.js` et `prod.js`.

La configuration de développement va écouter les modifications de votre projet et relancer un serveur pour le hot reload et le site statique. Nous pouvons également ajouter une configuration des variables d'environnement.

```jsx
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

```jsx
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

# **Config Eslint**

Ajoutez eslint.

```bash
yarn add --dev eslint eslint-config-react-app @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

Ajoutez le fichier `.eslintrc.js`.

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

# **Scripts**

Dans le `package.json`, ajouter les scripts suivants :

```json
"scripts": {
    "build": "node esbuild/prod",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.ts src/**/*.tsx",
    "start": "nodemon --watch dist --exec 'yarn type-check & yarn lint' & node esbuild/dev"
  },
```

# **React app**

Crée un dossier `src` qui sera votre application react. Ajoutez y le fichier `index.tsx`.

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

## **Hot reload**

Pour écouter les modifications a chaque compilation nous devons créer un hook pour le développement.

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

## **CSS avec styled-components**

On ajoute le css avec `styled-components`

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

## **SVG logo**

Create a react component with svg logo.

```tsx
import React, { FC, SVGProps } from 'react';

const Logo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 841.9 595.3' {...props} className='App-logo'>
    <g fill='#61DAFB'>
      <path d='M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z' />
      <circle cx={420.9} cy={296.5} r={45.7} />
      <path d='M520.5 78.1z' />
    </g>
  </svg>
);

export default Logo;
```

## **App**

Enfin il ne reste plus que le App component.

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

# **Site statique**

Ajoutez les différents fichiers du site statique dans le dossier `dist`.

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

Ajoutez aussi : `favicon.ico`, `manifest.json`, `logo192.png`

# **Run**

Pour lancer le serveur de développement.

```bash
yarn start
```

Pour la production

```bash
yarn build
```