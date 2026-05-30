import { setRequestLocale, getTranslations } from 'next-intl/server';
import CatalogPage, {
  type CatalogProduct,
} from '@/components/catalog/CatalogPage/CatalogPage';

// Sample data — same shape as the home page. Names are localized at render via
// `sampleProducts.*` keys; everything else is locale-independent data.
type ProductSeed = Omit<CatalogProduct, 'name'> & { nameKey: string };

const PRODUCT_SEEDS: ProductSeed[] = [
  { id: 'c1', slug: 'makita-df333dsae', brand: 'MAKITA', nameKey: 'makitaDrill', image: '/placeholder-product.svg', price: 2990, oldPrice: 3499, currency: 'грн', rating: 4.5, reviewCount: 127, inStock: true, isHit: true },
  { id: 'c2', slug: 'dewalt-dwe4157', brand: 'DEWALT', nameKey: 'dewaltGrinder', image: '/placeholder-product.svg', price: 3199, oldPrice: 4099, currency: 'грн', rating: 4, reviewCount: 56, inStock: true, isHit: true },
  { id: 'c3', slug: 'bosch-gbh-2-26', brand: 'BOSCH', nameKey: 'boschPerforator', image: '/placeholder-product.svg', price: 5749, currency: 'грн', rating: 5, reviewCount: 84, inStock: true, isNew: true },
  { id: 'c4', slug: 'milwaukee-m18-fiw2f12', brand: 'MILWAUKEE', nameKey: 'milwaukeeImpact', image: '/placeholder-product.svg', price: 8999, oldPrice: 10999, currency: 'грн', rating: 4.5, reviewCount: 91, inStock: true, isHit: true },
  { id: 'c5', slug: 'metabo-steb-65', brand: 'METABO', nameKey: 'metaboJigsaw', image: '/placeholder-product.svg', price: 4290, currency: 'грн', rating: 5, reviewCount: 38, inStock: true, isNew: true },
  { id: 'c6', slug: 'makita-hr2470', brand: 'MAKITA', nameKey: 'makitaPerforator', image: '/placeholder-product.svg', price: 4599, oldPrice: 5250, currency: 'грн', rating: 4.5, reviewCount: 203, inStock: true, isHit: true },
  { id: 'c7', slug: 'bosch-gex-40-150', brand: 'BOSCH', nameKey: 'boschSander', image: '/placeholder-product.svg', price: 6290, oldPrice: 8990, currency: 'грн', rating: 4, reviewCount: 42, inStock: true },
  { id: 'c8', slug: 'dewalt-dwd024', brand: 'DEWALT', nameKey: 'dewaltDrill', image: '/placeholder-product.svg', price: 2450, currency: 'грн', rating: 4.5, reviewCount: 67, inStock: true, isHit: true },
  { id: 'c9', slug: 'milwaukee-m18-fsag125xb', brand: 'MILWAUKEE', nameKey: 'milwaukeeGrinder', image: '/placeholder-product.svg', price: 7990, oldPrice: 10650, currency: 'грн', rating: 5, reviewCount: 19, inStock: true, isNew: true },
];

export default async function CatalogRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('sampleProducts');
  const products: CatalogProduct[] = PRODUCT_SEEDS.map(({ nameKey, ...seed }) => ({
    ...seed,
    name: t(nameKey),
  }));

  return <CatalogPage products={products} />;
}
