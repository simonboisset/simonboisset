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

# My Chaban Bridge

I lived in Bordeaux during many years and I've already been stuck when the Chaban-Delmas bridge was closed. I wanted to publish a web app and a mobile app to have direct information on the state of the bridge in real time.

:::info Api
I use the [api](https://opendata.bordeaux-metropole.fr/explore/dataset/previsions_pont_chaban/information/) of Bordeaux Métropole for this project.
:::

## Web

For the web version I made an app with `React` and `styled-components` that requests the data of the next bridge closures.

:::tip Useful links
You can find the [web app](https://monpontchaban.simonboisset.com/)
and the [repos](https://github.com/simonboisset/chaban-delmas-bridge)
:::

![opened](/img/chaban/web-opened.png)
![warning](/img/chaban/web-warning.png)

## Mobile

For the mobile version we are on `react-native` with [expo](https://docs.expo.dev/).

:::tip Play Store
To consult the play store page go [here](https://play.google.com/store/apps/details?id=com.simonboisset.monpontchaban)
:::

![mobile](/img/chaban/mobile.png)
