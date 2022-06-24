import { createCookieSessionStorage, redirect } from '@remix-run/node';
import invariant from 'tiny-invariant';

invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set');
invariant(process.env.ADMIN_USERNAME, 'ADMIN_USERNAME must be set');
invariant(process.env.ADMIN_PASSWORD, 'ADMIN_PASSWORD must be set');
export const USER_SESSION_KEY = process.env.SESSION_SECRET;
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
});

export const requireSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie');
  const session = await sessionStorage.getSession(cookie);
  const username = session.get(USER_SESSION_KEY);
  console.log(username, ADMIN_USERNAME);

  if (username !== ADMIN_USERNAME) {
    throw redirect('/');
  }
};
