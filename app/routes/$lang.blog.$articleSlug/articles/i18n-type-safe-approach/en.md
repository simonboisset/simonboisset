# i18n: The Type-Safe Approach

> 19/07/2024

Internationalization (i18n) is a crucial aspect of modern web development. This article explores how to implement a type-safe i18n solution using the typed-locale library in a React application.

## Introduction to typed-locale

typed-locale is a lightweight, type-safe internationalization library designed to work with TypeScript. It provides an API for managing translations with type safety for both keys and variables.

## Setting Up the Project

Let's create a new React project using Vite with TypeScript:

```bash
npm create vite@latest my-i18n-app -- --template react-ts
cd my-i18n-app
npm install
```

Now, install typed-locale:

```bash
npm install typed-locale
```

## Defining Translations

Create a new file called `translations.ts` in the `src` folder:

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

## Creating the Translator

Now, let's create a custom hook to use our translations. Create a new file called `useTranslator.ts`:

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

## Using the Translator in Components

Now, let's use our translator in a React component. Update your `App.tsx`:

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

## Type Safety Features

typed-locale provides several type safety features:

1. **Autocomplete for translation keys**: The IDE provides autocomplete suggestions for all available translation keys.

2. **Type checking for variables**: TypeScript catches incorrect variable usage:

   ```typescript
   // This will cause a TypeScript error
   translator((t) => t.greeting, { wrongVariable: "World" });
   ```

3. **Nested translations**: The type system understands nested translations, allowing `translator(t => t.nav.home)`.

4. **Pluralization**: The `itemCount` translation demonstrates how typed-locale handles pluralization, automatically selecting the correct plural form based on the `count` value.

## Technical Advantages

The type-safe approach using typed-locale offers several technical advantages:

1. **Compile-time error detection**: Translation-related errors are caught during compilation rather than at runtime.

2. **Improved developer experience**: Autocomplete for translation keys enhances productivity.

3. **Refactoring support**: TypeScript's refactoring tools work seamlessly with the translation keys.

4. **Prevents key typos**: The callback approach eliminates string typos in translation keys.

5. **Small bundle size**: At 1kB, typed-locale has minimal impact on application size.

6. **Framework agnostic**: While this example uses React, typed-locale can be used with any JavaScript framework or vanilla JS.

## Conclusion

Implementing i18n with a type-safe approach using typed-locale provides a robust solution for managing translations in TypeScript projects. By leveraging the type system, developers can create more reliable internationalized applications while maintaining code quality and productivity.
