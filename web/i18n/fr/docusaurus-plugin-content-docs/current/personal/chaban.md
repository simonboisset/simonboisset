---
sidebar_position: 3
tags:
  - react
  - react-native
  - expo
  - typescript
  - Bordeaux
  - api
  - styled-components
---

# Mon Pont Chaban

Ayant habité à Bordeaux, je me suis déjà retrouvé bloqué lorsque le pont Chaban-Delmas était fermé. J'ai voulu publier une web app et une app mobile pour avoir l'information directement sur l'état du pont en temps réel.

:::info Api
J'utilise l'[api](https://opendata.bordeaux-metropole.fr/explore/dataset/previsions_pont_chaban/information/) de Bordeaux Métropole pour ce projet.
:::

## Web

Pour la version web j'ai fait une app avec `React` et `styled-components` qui vient requêter les données des prochaines fermetures du pont.

:::tip Liens utiles
Vous pouvez retrouver la [web app](https://monpontchaban.simonboisset.com/)
et le [repos](https://github.com/simonboisset/chaban-delmas-bridge)
:::

![opened](/img/chaban/web-opened.png)
![warning](/img/chaban/web-warning.png)

## Mobile

Pour la version mobile on est sur du `react-native` avec [expo](https://docs.expo.dev/).

:::tip Play Store
Pour consulter la page du play store rendez-vous [ici](https://play.google.com/store/apps/details?id=com.simonboisset.monpontchaban)
:::

![mobile](/img/chaban/mobile.png)
