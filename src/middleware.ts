// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const host = request.headers.get('host') || '';

  let locale: 'es' | 'pt' | 'en' = 'en'; // fallback

  if (host.includes('mercadolivre.com.br')) {
    locale = 'pt';
  } else if (host.includes('mercadolibre.com.ar')) {
    locale = 'es';

  } else if (host.includes('mercadolibre.com')) {
    locale = 'en';

  }

  response.cookies.set('next-locale', locale, { path: '/' });
  return response;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api|.*\\..*).*)'],
};
