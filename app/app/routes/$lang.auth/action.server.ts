import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { object } from '@ts-v/core';
import { string } from '@ts-v/kit';
import { validateRequest } from '@ts-v/remix/dist/node';
import bcrypt from 'bcryptjs';
import { ADMIN_PASSWORD, ADMIN_USERNAME, sessionStorage, USER_SESSION_KEY } from '../../core/sessionStorage';

export const loginAction: ActionFunction = async ({ request }) => {
  const { password, username } = await validateRequest(
    request,
    object({
      username: string(),
      password: string(),
    }),
  );

  const isValid = await bcrypt.compare(password, await bcrypt.hash(ADMIN_PASSWORD, 10));
  if (username !== ADMIN_USERNAME || !isValid) {
    return null;
  }

  const cookie = request.headers.get('Cookie');
  const session = await sessionStorage.getSession(cookie);
  session.set(USER_SESSION_KEY, username);
  return redirect('/fr/edition', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        maxAge: 60 * 60 * 24 * 7,
      }),
    },
  });
};
