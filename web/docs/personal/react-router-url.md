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

## Introduction

`react-router-url` is a light react library whose goal is to make easyer router creation and navigation while being strongly typed.

## My first router

To start, we define the names of the routes used and then we create our router with the `useRouter` hook which returns the component corresponding to the active route.

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

## About useRouter

`useRouter` can be used anywhere in the app including inside other routers.

:::info Documentation
For more information the documentation is available [here](https://react-router-url.simonboisset.com/)
:::
