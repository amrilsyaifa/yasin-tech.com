import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { identityToken } from '@constant/token';

const locales = ['en', 'id'];
const defaultLocale = 'en';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: defaultLocale,
});

export async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // Check if there is any supported locale in the pathname
  const pathname = req.nextUrl.pathname;

  // Check if the request is for the apple-app-site-association file
  if (
    pathname === '/.well-known/apple-app-site-association' ||
    pathname === '/.well-known/assetlinks.json'
  ) {
    // Fetch the file from the public directory
    const url = new URL(`/public${pathname}`, req.url);
    const response = NextResponse.rewrite(url);

    // Set the Content-Type header to application/json
    response.headers.set('Content-Type', 'application/json');

    return NextResponse.next();
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale && !pathname.startsWith(`/uploads/`)) {
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/${pathname}`, req.url)
    );
  }

  // check auth route
  if (
    pathname.startsWith(`/${locales[0]}/auth`) ||
    pathname.startsWith(`/${locales[1]}/auth`)
  ) {
    let token: string | undefined;

    if (req.cookies.has(identityToken)) {
      token = req.cookies.get(identityToken)?.value;
    }

    if (token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  //check private route
  if (
    pathname.startsWith(`/${locales[0]}/dashboard`) ||
    pathname.startsWith(`/${locales[1]}/dashboard`)
  ) {
    let token: string | undefined;

    if (req.cookies.has(identityToken)) {
      token = req.cookies.get(identityToken)?.value;
    }

    if (!token) {
      return NextResponse.redirect(new URL('/auth/unauthorize', req.url));
    }
  }
  return response;
}

export const config = {
  matcher: [
    '/.well-known/apple-app-site-association',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
