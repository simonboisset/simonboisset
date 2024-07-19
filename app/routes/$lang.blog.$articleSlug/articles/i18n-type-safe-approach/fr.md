# i18n : L'approche typée

![Internationalisation (i18n)](https://lezo-files.s3.fr-par.scw.cloud/simon-blog/esbuild-npm.webp)

> 19/07/2024

L'internationalisation (i18n) est un aspect crucial du développement web moderne. Cet article explore comment implémenter une solution i18n typée en utilisant la bibliothèque typed-locale dans une application React.

## Introduction à typed-locale

typed-locale est une bibliothèque d'internationalisation légère et typée, conçue pour fonctionner avec TypeScript. Elle fournit une API pour gérer les traductions avec une sécurité de type pour les clés et les variables.

## Mise en place du projet

Créons un nouveau projet React en utilisant Vite avec TypeScript :

```bash
npm create vite@latest my-i18n-app -- --template react-ts
cd my-i18n-app
npm install
```

Maintenant, installons typed-locale :

```bash
npm install typed-locale
```

## Définition des traductions

Créez un nouveau fichier appelé `translations.ts` dans le dossier `src` :

```typescript
// src/translations.ts
import { InferTranslation, plural } from 'typed-locale';

export const en = {
  greeting: 'Hello, {{name}}!',
  itemCount: plural({
    none: 'You have no items.',
    one: 'You have one item.',
    other: 'You have {{count}} items.',
  }),
  nav: {
    home: 'Home',
    about: 'About',
    contact: 'Contact',
  },
} as const;

export type Translation = InferTranslation<typeof en>;

export const fr: Translation = {
  greeting: 'Bonjour, {{name}} !',
  itemCount: plural({
    none: 'Vous n'avez aucun article.',
    one: 'Vous avez un article.',
    other: 'Vous avez {{count}} articles.',
  }),
  nav: {
    home: 'Accueil',
    about: 'À propos',
    contact: 'Contact',
  },
};
```

## Création du traducteur

Créons maintenant un hook personnalisé pour utiliser nos traductions. Créez un nouveau fichier appelé `useTranslator.ts` :

```typescript
// src/useTranslator.ts
import { createTranslatorFromDictionary } from "typed-locale";
import { useMemo } from "react";
import { en, fr, Translation } from "./translations";

const dictionary = { en, fr };

export const useTranslator = (locale: keyof typeof dictionary) => {
  return useMemo(
    () =>
      createTranslatorFromDictionary<Translation>({
        dictionary,
        locale,
        defaultLocale: "en",
      }),
    [locale]
  );
};
```

## Utilisation du traducteur dans les composants

Maintenant, utilisons notre traducteur dans un composant React. Mettez à jour votre `App.tsx` :

```tsx
// src/App.tsx
import React, { useState } from "react";
import { useTranslator } from "./useTranslator";

const App: React.FC = () => {
  const [locale, setLocale] = useState<"en" | "fr">("en");
  const [itemCount, setItemCount] = useState(0);
  const translator = useTranslator(locale);

  return (
    <div>
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as "en" | "fr")}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>

      <nav>
        <ul>
          <li>{translator((t) => t.nav.home)}</li>
          <li>{translator((t) => t.nav.about)}</li>
          <li>{translator((t) => t.nav.contact)}</li>
        </ul>
      </nav>

      <h1>{translator((t) => t.greeting, { name: "World" })}</h1>

      <p>{translator((t) => t.itemCount, { count: itemCount })}</p>
      <button onClick={() => setItemCount(itemCount + 1)}>Add Item</button>
      <button onClick={() => setItemCount(Math.max(0, itemCount - 1))}>
        Remove Item
      </button>
    </div>
  );
};

export default App;
```

## Fonctionnalités de sécurité de type

typed-locale offre plusieurs fonctionnalités de sécurité de type :

1. **Auto-complétion pour les clés de traduction** : L'IDE fournit des suggestions d'auto-complétion pour toutes les clés de traduction disponibles.

2. **Vérification de type pour les variables** : TypeScript détecte l'utilisation incorrecte des variables :

   ```typescript
   // Ceci provoquera une erreur TypeScript
   translator((t) => t.greeting, { wrongVariable: "World" });
   ```

3. **Traductions imbriquées** : Le système de types comprend les traductions imbriquées, permettant `translator(t => t.nav.home)`.

4. **Pluralisation** : La traduction `itemCount` démontre comment typed-locale gère la pluralisation, en sélectionnant automatiquement la forme plurielle correcte en fonction de la valeur de `count`.

## Avantages techniques

L'approche typée utilisant typed-locale offre plusieurs avantages techniques :

1. **Détection des erreurs à la compilation** : Les erreurs liées aux traductions sont détectées lors de la compilation plutôt qu'à l'exécution.

2. **Amélioration de l'expérience développeur** : L'auto-complétion pour les clés de traduction améliore la productivité.

3. **Support de refactoring** : Les outils de refactoring de TypeScript fonctionnent parfaitement avec les clés de traduction.

4. **Prévention des fautes de frappe dans les clés** : L'approche par callback élimine les fautes de frappe dans les chaînes de caractères pour les clés de traduction.

5. **Taille de bundle réduite** : Avec seulement 1 Ko, typed-locale a un impact minimal sur la taille de l'application.

6. **Indépendant du framework** : Bien que cet exemple utilise React, typed-locale peut être utilisé avec n'importe quel framework JavaScript ou en JavaScript vanilla.

## Conclusion

L'implémentation de l'i18n avec une approche typée utilisant typed-locale fournit une solution robuste pour gérer les traductions dans les projets TypeScript. En tirant parti du système de types, les développeurs peuvent créer des applications internationalisées plus fiables tout en maintenant la qualité du code et la productivité.
