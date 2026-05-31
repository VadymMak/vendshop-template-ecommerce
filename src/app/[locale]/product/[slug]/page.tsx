import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import ProductPage, {
  type ResolvedProduct,
} from '@/components/product/ProductPage/ProductPage';
import type { ProductSpec } from '@/components/product/ProductTabs/ProductTabs';
import { SAMPLE_PRODUCTS } from '@/data/products';

type Localized<T> = Partial<Record<string, T>>;

// Shared sample specs (template data — reused across products). Only uk/en are
// authored; other locales fall back to en.
const SPECS: Localized<ProductSpec[]> = {
  uk: [
    { label: 'Потужність', value: '800 Вт' },
    { label: 'Напруга', value: '12В' },
    { label: 'Тип акумулятора', value: 'Li-Ion' },
    { label: 'Швидкість', value: '0-1500 об/хв' },
    { label: 'Макс. крутний момент', value: '30 Нм' },
    { label: 'Вага', value: '1.5 кг' },
    { label: 'Гарантія', value: '1 рік' },
  ],
  en: [
    { label: 'Power', value: '800 W' },
    { label: 'Voltage', value: '12V' },
    { label: 'Battery type', value: 'Li-Ion' },
    { label: 'Speed', value: '0-1500 rpm' },
    { label: 'Max torque', value: '30 Nm' },
    { label: 'Weight', value: '1.5 kg' },
    { label: 'Warranty', value: '1 year' },
  ],
};

// Detail-only extras keyed by slug; core data (id, price, rating, nameKey…)
// comes from the shared catalog list so ids match the cart.
interface ProductDetail {
  sku: string;
  stockQty: number;
  images?: string[];
  description?: Localized<string>;
}

const DETAILS: Record<string, ProductDetail> = {
  'makita-df333dsae': {
    sku: 'DF333DSAE',
    stockQty: 15,
    description: {
      uk: 'Професійна акумуляторна дриль-шурупокрут Makita DF333DSAE — компактний і потужний інструмент для свердління та закручування. Оснащена двошвидкісним редуктором, світлодіодним підсвічуванням робочої зони та ергономічною прогумованою рукояткою.',
      en: 'The Makita DF333DSAE cordless drill-driver is a compact yet powerful tool for drilling and driving. It features a two-speed gearbox, an LED work light, and an ergonomic rubberized grip.',
      ru: 'Профессиональная аккумуляторная дрель-шуруповёрт Makita DF333DSAE — компактный и мощный инструмент для сверления и закручивания. Оснащена двухскоростным редуктором, светодиодной подсветкой и эргономичной прорезиненной рукояткой.',
      de: 'Der Makita DF333DSAE Akku-Bohrschrauber ist ein kompaktes und zugleich kraftvolles Werkzeug zum Bohren und Schrauben. Mit Zwei-Gang-Getriebe, LED-Arbeitsleuchte und ergonomischem, gummiertem Griff.',
      sk: 'Profesionálny akumulátorový vŕtací skrutkovač Makita DF333DSAE — kompaktný a výkonný nástroj na vŕtanie a skrutkovanie. Vybavený dvojrýchlostnou prevodovkou, LED osvetlením a ergonomickou pogumovanou rukoväťou.',
      cs: 'Profesionální aku vrtací šroubovák Makita DF333DSAE — kompaktní a výkonný nástroj pro vrtání a šroubování. Vybaven dvourychlostní převodovkou, LED osvětlením a ergonomickou pogumovanou rukojetí.',
    },
  },
  'dewalt-dwe4157': { sku: 'DWE4157', stockQty: 8 },
  'bosch-gbh-2-26': { sku: 'GBH226DRE', stockQty: 12 },
  'milwaukee-m18-fiw2f12': { sku: 'FIW2F12', stockQty: 5 },
  'metabo-steb-65': { sku: 'STEB65', stockQty: 20 },
  'makita-hr2470': { sku: 'HR2470', stockQty: 10 },
  'bosch-gex-40-150': { sku: 'GEX40150', stockQty: 7 },
  'dewalt-dwd024': { sku: 'DWD024', stockQty: 25 },
  'milwaukee-m18-fsag125xb': { sku: 'FSAG125XB', stockQty: 6 },
};

function pick<T>(map: Localized<T>, locale: string): T | undefined {
  return map[locale] ?? map.en ?? map.uk;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const seed = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  if (!seed) return {};
  const ts = await getTranslations({ locale, namespace: 'sampleProducts' });
  const tp = await getTranslations({ locale, namespace: 'product' });
  return { title: `${ts(seed.nameKey)} · ${tp('breadcrumbCatalog')}` };
}

export default async function ProductRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const seed = SAMPLE_PRODUCTS.find((p) => p.slug === slug);
  if (!seed) notFound();
  const detail = DETAILS[slug];

  const ts = await getTranslations('sampleProducts');
  const tp = await getTranslations('product');
  const name = ts(seed.nameKey);

  const resolved: ResolvedProduct = {
    id: seed.id,
    slug: seed.slug,
    brand: seed.brand,
    name,
    description: detail?.description?.[locale] ?? detail?.description?.en ?? tp('genericDescription', { name }),
    price: seed.price,
    oldPrice: seed.oldPrice,
    currency: seed.currency ?? 'грн',
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    inStock: seed.inStock,
    stockQty: detail?.stockQty ?? 10,
    sku: detail?.sku ?? seed.slug.toUpperCase(),
    images: detail?.images ?? [seed.image],
    specs: pick(SPECS, locale) ?? [],
  };

  return <ProductPage product={resolved} />;
}
