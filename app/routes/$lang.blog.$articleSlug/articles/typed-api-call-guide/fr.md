# Sécuriser les Appels API avec `typed-api-call`

![Sécuriser les Appels API avec `typed-api-call`](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/share-react-web-mobile.webp)

> 21/01/2024

## Introduction

Dans le monde du développement web, effectuer des appels API est une tâche quotidienne. Cependant, le processus n'est pas toujours simple, et des erreurs peuvent facilement se glisser. Pour relever ce défi, la bibliothèque `typed-api-call` essaye d'offrire une manière sûre sur le plan des types et efficace de gérer les appels API.

## Installation Simplifiée

https://github.com/simonboisset/typed-api-call

Commencer avec `typed-api-call` est un jeu d'enfant. Commencez par installer la bibliothèque avec npm :

```bash
npm install typed-api-call
```

Explorons maintenant les fonctionnalités et découvrons comment cette bibliothèque peut améliorer la fiabilité de vos appels API.

## Introduction à `typed-api-call`

L'objectif principal de `typed-api-call` est de créer une enveloppe sûre sur le plan des types autour de l'API fetch. En définissant des appels API et leurs schémas, les développeurs peuvent générer des fonctions qui effectuent ces appels et renvoient des réponses avec les types corrects. Cela rend non seulement les appels API plus sûrs, mais simplifie également le processus de développement.

### Fonctionnalités en un Coup d'Œil

- **Sûreté des Types** : La bibliothèque s'assure que tant les définitions d'appels API que les appels eux-mêmes sont exempts d'erreurs, réduisant ainsi la probabilité d'erreurs d'exécution.
- **Validation de Schéma** : `typed-api-call` vérifie la réponse de chaque appel API par rapport à un schéma défini. Toute déviation déclenche une erreur, fournissant une couche supplémentaire de validation.
- **Extensible** : Bien qu'elle prenne actuellement en charge Zod pour les schémas, la bibliothèque est conçue pour accueillir d'autres bibliothèques de validation à l'avenir.

## Exemple d'Utilisation Pratique

Parcourons un exemple concret pour illustrer comment `typed-api-call` peut être intégré de manière transparente dans votre flux de travail.

```typescript
import { createApiCall } from "typed-api-call";
import { z } from "zod";

// Définir une fonction pour obtenir les en-têtes
export const getHeaders = ({ token }: { token?: string }) => {
  // ... (détails de l'implémentation)
};

// Créer une instance de l'appel API avec l'URL de base et la fonction getHeaders
const myApiCall = createApiCall({ url: "https://my-api.com/", getHeaders });

// Définir un schéma pour les données utilisateur
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

// Créer un appel API pour obtenir des utilisateurs
const getUsers = myApiCall({
  url: "users",
  method: "GET",
  input: z.object({ email: z.array(z.string().email()) }),
  response: z.object({ data: z.array(userSchema) }),
});

// Effectuer l'appel API
const users = await getUsers({
  params: undefined,
  data: { email: ["john.doe@gmail.com"] },
});

// ... (d'autres appels API peuvent être définis et exécutés de manière similaire)
```

## Comprendre l'API

### `createApiCall`

La fonction `createApiCall` établit les bases de vos appels API. Elle prend deux paramètres :

- `url` : L'URL de base de votre API.
- `getHeaders` : Une fonction qui renvoie les en-têtes pour votre appel API. Si la fonction nécessite des paramètres, ils peuvent être passés lors de la définition de l'appel API ou lors de l'appel lui-même.

### Définition d'Appel API

La structure d'une définition d'appel API comprend divers composants tels que l'URL, la méthode, les en-têtes, le schéma d'entrée, le schéma de réponse, et le schéma de paramètres (le cas échéant). Ces composants assurent collectivement une définition complète de l'appel API.

### Effectuer un Appel API

Exécuter un appel API implique de fournir des paramètres, des données et des en-têtes (si nécessaire). La bibliothèque `typed-api-call` se charge du reste, garantissant que l'appel est sûr sur le plan des types et respecte les schémas définis.

## Conclusion

Dans le domaine du développement web, où la précision et la fiabilité sont primordiales, `typed-api-call` s'avère être un outil intéressant. En améliorant la sûreté des types et en fournissant une validation de schéma, la bibliothèque simplifie le processus d'effectuer des appels API, réduisant les erreurs et renforçant la confiance des développeurs.
