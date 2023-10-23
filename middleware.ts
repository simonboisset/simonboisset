import { NextRequest } from 'next/server';
import { getSafeLocale, localeSchema, locales } from './app/[lang]/dictionaries';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { headers } = request;
  const localeFromPathname = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);
  const pathnameHasLocale = localeSchema.safeParse(localeFromPathname).success;

  if (pathnameHasLocale) return;

  const localeFromRequest = getSafeLocale(
    (headers.get('Accept-Language')?.split(',')[0].split('-')[0] as string) || 'en',
  );

  request.nextUrl.pathname = `/${localeFromRequest}${pathname}`;

  return Response.redirect(request.nextUrl);
}

export const config = {
  // not match for public folder ans sitemap.xml
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml).*)'],
};
