import { defineRouting } from 'next-intl/routing';

/**
 * Every locale the template ships with. This is intentionally the *full* set —
 * all six message files are bundled so a single build can serve any region.
 *
 * Which of these are actually exposed to users is decided at runtime by the
 * active region bundle in `src/config.ts` (driven by the `REGION_BUNDLE` env
 * var), not at build time. That is what lets one repo serve UA and EU without
 * a rebuild.
 */
export const routing = defineRouting({
  locales: ['uk', 'ru', 'en', 'de', 'sk', 'cs'],
  defaultLocale: 'uk',
});

export type Locale = (typeof routing.locales)[number];
