import { Form } from '@remix-run/react';
import { Button, TextField } from '~/core/layout';
import { loginAction } from './action.server';

export const action = loginAction;

export default function App() {
  return (
    <Form method='post' className='flex flex-col space-y-4 p-24'>
      <TextField name='username' />
      <TextField name='password' />
      <Button type='submit'>Submit</Button>
    </Form>
  );
}
