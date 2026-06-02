import { db } from '@/lib/db';
import { DEFAULT_THEME, type ThemeConfig } from '@/lib/theme';
import { getVerticalConfig, type VerticalConfig } from '@/lib/verticals';

const STORE_SLUG = process.env.STORE_SLUG ?? 'electromarket';

export interface StoreConfig {
  id: string;
  name: string;
  slug: string;
  theme: ThemeConfig;
  vertical: VerticalConfig;
}

/** Fetch merged store config (theme + vertical). Call from server components only. */
export async function getStoreConfig(): Promise<StoreConfig> {
  const store = await db.store.findUniqueOrThrow({
    where: { slug: STORE_SLUG },
    select: { id: true, name: true, slug: true, vertical: true, themeConfig: true },
  });

  const dbTheme = store.themeConfig as Partial<ThemeConfig> | null;
  const theme: ThemeConfig = {
    colors: { ...DEFAULT_THEME.colors, ...(dbTheme?.colors ?? {}) },
    layout: { ...DEFAULT_THEME.layout, ...(dbTheme?.layout ?? {}) },
  };

  return {
    id: store.id,
    name: store.name,
    slug: store.slug,
    theme,
    vertical: getVerticalConfig(store.vertical),
  };
}
