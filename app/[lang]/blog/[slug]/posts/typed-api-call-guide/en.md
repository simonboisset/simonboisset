# Secure and Typesafe API Calls with `typed-api-call`

> 21/01/2024

In the world of web development, making API calls is a routine task. However, the process is not always straightforward, and errors can easily slip through the cracks. To address this challenge, the `typed-api-call` library try to make API calls more robust by enhancing typesafety and providing schema validation.

## Installation Made Simple

Getting started with `typed-api-call` is a breeze. Begin by installing the library using npm:

```bash
npm install typed-api-call
```

Now, let's delve into the functionality and explore how this library can enhance the reliability of your API calls.

## Introduction to `typed-api-call`

The primary goal of `typed-api-call` is to create a typesafe wrapper around the fetch API. By defining API calls and their schemas, developers can generate functions that execute these calls and return responses with the correct types. This not only makes API calls safer but also simplifies the development process.

### Features at a Glance

- **Typesafety**: The library ensures that both API call definitions and the calls themselves are free from mistakes, reducing the likelihood of runtime errors.
- **Schema Validation**: `typed-api-call` checks the response of each API call against a defined schema. Any deviation triggers an error, providing an extra layer of validation.
- **Customizable**: The library is highly customizable, allowing developers to define their own schemas and headers.

## Practical Usage Example

Let's walk through a practical example to demonstrate how `typed-api-call` can be seamlessly integrated into your workflow.

```typescript
import { createApiCall } from 'typed-api-call';
import { z } from 'zod';

// Define a function to get headers
export const getHeaders = ({ token }: { token?: string }) => {
  // ... (implementation details)
};

// Create an instance of the API call with base URL and getHeaders function
const myApiCall = createApiCall({ url: 'https://my-api.com/', getHeaders });

// Define a schema for user data
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

// Create an API call for fetching users
const getUsers = myApiCall({
  url: 'users',
  method: 'GET',
  input: z.object({ email: z.array(z.string().email()) }),
  response: z.object({ data: z.array(userSchema) }),
});

// Make the API call
const users = await getUsers({ params: undefined, data: { email: ['john.doe@gmail.com'] } });

// ... (further API calls can be defined and executed similarly)
```

## Understanding the API

### `createApiCall`

The `createApiCall` function sets up the foundation for your API calls. It takes two parameters:

- `url`: The base URL of your API.
- `getHeaders`: A function that returns the headers for your API call. If the function requires parameters, they can be passed when defining the API call or when making the call itself.

### API Call Definition

The structure of an API call definition includes various components such as URL, method, headers, input schema, response schema, and parameter schema (if applicable). These components collectively ensure a comprehensive definition of the API call.

### Making an API Call

Executing an API call involves providing parameters, data, and headers (if needed). The `typed-api-call` library takes care of the rest, ensuring that the call is typesafe and adheres to the defined schemas.

## Conclusion

In the realm of web development, where precision and reliability are paramount, `typed-api-call` proves to be an invaluable tool. By enhancing typesafety and providing schema validation, the library streamlines the process of making API calls, minimizing errors and boosting developer confidence.
