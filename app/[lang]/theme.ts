'use server';

import { cookies } from 'next/headers';
import z from 'zod';
const themeSchema = z.enum(['light', 'dark']);

export async function getTheme() {
  const cookieStore = cookies();
  const themeFromCookie = cookieStore.get('theme');

  const themeValidated = themeSchema.safeParse(themeFromCookie?.value);
  const theme = themeValidated.success ? themeValidated.data : 'light';
  return theme;
}

export async function toggleTheme() {
  const theme = await getTheme();
  const newTheme = theme === 'light' ? 'dark' : 'light';
  const cookieStore = cookies();

  cookieStore.set('theme', newTheme, { secure: true, sameSite: 'strict', httpOnly: true });
}
