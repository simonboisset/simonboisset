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

## Introduction

`react-hook-input` is a react library that make easyer form validation using `yup` schema.

## Installation

```sh
yarn add react-hook-input yup
```

## Create an InputComponent

The library provides a generic type InputProps :

```ts
type InputProps<T> = {
  value: T;
  error: T extends { [k: string]: any } ? SchemaError<T> : string | null;
  onChange: (value: T) => void;
};
```

You can use it to create custom InputComponent :

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

## My first form

Once you have your InputComponent, you can use it in a form. To do this you need to create a yup schema corresponding to the data returned by the form.

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
For more information the documentation is available [here](https://react-hook-input.simonboisset.com/)
:::
