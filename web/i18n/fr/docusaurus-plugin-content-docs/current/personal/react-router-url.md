---
sidebar_position: 1
tags:
  - react
  - typescript
  - hooks
  - URL
  - library
---

# react-router-url

## Présentation

`react-router-url` est une librairie react légère dont l'objectif est de faciliter la création de routeur et la navigation tout en étant fortement typée.

## Mon premier routeur

Pour commencer on définit les noms des routes utilisées puis on crée son routeur à l'aide du hook `useRouter` qui retourne le composant correspondant à la route active.

```tsx
type NestedRouteName = '/account' | '/account/settings' | '/account/contact';
const Account: React.FC = () => {
  return useRouter<RouteName>([
    { path: '/account/settings', component: <Settings /> },
    { path: '/account/contact', component: <Contact /> },
    { path: '/account', component: <AccountMenu /> },
  ]);
};

type RouteName = '/' | '/home' | '/account';

const Router: React.FC = () => {
  return useRouter<RouteName>([
    { path: '/', component: <Hello />, exact: true },
    { path: '/home', component: <Home /> },
    { path: '/account', component: <Account /> },
  ]);
};
```

## A propos de useRouter

`useRouter` peut être utilisée partout dans l'app y compris à l'intérieur d'autres routeurs.

:::info Documentation
Pour plus d'informations la documentation est disponible [ici](https://react-router-url.simonboisset.com/)
:::
