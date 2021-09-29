---
sidebar_position: 2
tags:
  - react
  - typescript
  - hooks
  - yup
  - library
  - form-validation
---

# react-hook-input

## Présentation

`react-hook-input` est une librairie react qui permet de faciliter la validation des formulaires à l'aide de la validation de schémas de `yup`

## Installation

```sh
yarn add react-hook-input yup
```

## Créer un InputComponent

La librairie fournie un type générique InputProps :

```ts
type InputProps<T> = {
  value: T;
  error: T extends { [k: string]: any } ? SchemaError<T> : string | null;
  onChange: (value: T) => void;
};
```

Vous pouvez l'utiliser pour créer des InputComponent custom :

```tsx
import { InputProps } from 'react-hook-input';

const MyInputText: React.FC<InputProps<string>> = ({ value, error, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <>
      <input type='text' onChange={handleChange} value={value} />
      {!!error && <span>{error}</span>}
    </>
  );
};
```

## Mon premier formulaire

Une fois que vous avez votre InputComponent, vous pouvez l'utiliser dans un formulaire. Pour cela vous devez créer un schémas yup correspondant à la data retournée par le formulaire.

```tsx
import { useForm, useInput, Form } from 'react-hook-input';

type MyData = {
  email: string;
  password: string;
};

const MySchema: Yup.SchemaOf<MyData> = Yup.object().shape({
  email: Yup.string().default('').required(),
  password: Yup.string().default('').required(),
});

const MyForm: React.FC = () => {
  const form = useForm(MySchema, (data: MyData) => mySubmitFct(data));
  const email = useInput(form, 'email');
  const password = useInput(form, 'password');

  return (
    <Form form={form}>
      <MyInputText {...email} />
      <MyInputText {...password} />
      <button type='submit'>submit</button>
    </Form>
  );
};
```

:::info Documentation
Pour plus d'informations la documentation est disponible [ici](https://react-hook-input.simonboisset.com/)
:::
