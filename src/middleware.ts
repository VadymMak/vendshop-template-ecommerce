import createMiddleware from 'next-intl/middleware';
import { getActiveLocales, getDefaultLocale } from './config';

// The middleware negotiates only the *active* region bundle's locales. Locales
// that ship in the template but aren't part of the active bundle are simply not
// routed — flipping `REGION_BUNDLE` changes this at runtime, no rebuild needed.
export default createMiddleware({
  locales: getActiveLocales(),
  defaultLocale: getDefaultLocale(),
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals (_next, _vercel)
  // - files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
