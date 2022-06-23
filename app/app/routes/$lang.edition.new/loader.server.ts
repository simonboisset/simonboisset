import { LoaderFunction, redirect } from '@remix-run/node';
import { sessionStorage, USER_SESSION_KEY } from '~/core/sessionStorage';

export const newBlogLoader: LoaderFunction = async ({ params, request }) => {
  const cookie = request.headers.get('Cookie');
  const session = await sessionStorage.getSession(cookie);

  const username = session?.get(USER_SESSION_KEY);

  if (username !== 'sbDev') {
    return redirect('/');
  }

  return null;
};
