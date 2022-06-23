import { Form } from '@remix-run/react';
import { Button, TextField } from '~/core/layout';
import { newBlogAction } from './action.server';
import { newBlogLoader } from './loader.server';

export const loader = newBlogLoader;
export const action = newBlogAction;
export default function NewPost() {
  return (
    <Form method='post' className='flex flex-col space-y-4 p-24'>
      <TextField name='language' />
      <TextField name='slug' />
      <TextField name='name' />
      <Button type='submit'>Submit</Button>
    </Form>
  );
}
