'use client';

import CategoriesGrid from '@/components/home/CategoriesGrid/CategoriesGrid';
import BestSellers from '@/components/home/BestSellers/BestSellers';
import ProductOfDay from '@/components/home/ProductOfDay/ProductOfDay';
import BrandsSection from '@/components/home/BrandsSection/BrandsSection';
import type { ProductCardProps } from '@/components/catalog/ProductCard/ProductCard';
import styles from './page.module.css';

// Placeholder handlers — swap for real cart/compare/wishlist/navigation later.
const onAddToCart = (id: string) => console.log('[addToCart]', id);
const onCompare = (id: string) => console.log('[compare]', id);
const onFavorite = (id: string) => console.log('[favorite]', id);
const onViewAll = () => console.log('[viewAll] best sellers');
const onCategoryClick = (category: string) => console.log('[category]', category);
const onBrandClick = (brand: string) => console.log('[brand]', brand);

// Sample data (data only — interaction callbacks are attached at render).
type ProductData = Omit<ProductCardProps, 'onAddToCart' | 'onCompare' | 'onFavorite'>;

const PRODUCTS: ProductData[] = [
  { id: '1', slug: 'makita-df333dsae', brand: 'MAKITA', name: 'Дриль-шурупокрут Makita DF333DSAE 12V', image: '/next.svg', price: 2990, oldPrice: 3499, currency: 'грн', rating: 4.5, reviewCount: 127, inStock: true, isHit: true },
  { id: '2', slug: 'dewalt-dwe4157', brand: 'DEWALT', name: 'Кутова шліфмашина DeWalt DWE4157 900 Вт', image: '/next.svg', price: 3199, oldPrice: 4099, currency: 'грн', rating: 4, reviewCount: 56, inStock: true, isHit: true },
  { id: '3', slug: 'metabo-steb-65', brand: 'METABO', name: 'Лобзик Metabo STEB 65 Quick 450 Вт', image: '/next.svg', price: 4290, currency: 'грн', rating: 5, reviewCount: 38, inStock: true, isNew: true },
  { id: '4', slug: 'milwaukee-m18-fiw2f12', brand: 'MILWAUKEE', name: 'Гайковерт ударний Milwaukee M18 FIW2F12', image: '/next.svg', price: 8999, oldPrice: 10999, currency: 'грн', rating: 4.5, reviewCount: 91, inStock: true, isHit: true },
];

const PRODUCT_OF_DAY = {
  id: 'pod-bosch-gbh',
  brand: 'BOSCH',
  name: 'Перфоратор Bosch GBH 2-26 DRE Professional',
  image: '/next.svg',
  price: 2490,
  oldPrice: 5499,
  currency: 'грн',
  stockLeft: 7,
  endsAt: new Date(Date.now() + ((2 * 24 + 14) * 3600 + 37 * 60 + 22) * 1000),
};

export default function HomePage() {
  const products: ProductCardProps[] = PRODUCTS.map((product) => ({
    ...product,
    onAddToCart,
    onCompare,
    onFavorite,
  }));

  return (
    <>
      {/* 1 — Categories */}
      <CategoriesGrid onCategoryClick={onCategoryClick} />

      {/* 2 — Best Sellers (70%) + Product of the Day (30%) */}
      <section className={styles.bestSellersSection}>
        <div className={styles.bestSellersWrap}>
          <BestSellers products={products} onViewAll={onViewAll} />
          <ProductOfDay product={PRODUCT_OF_DAY} onAddToCart={onAddToCart} />
        </div>
      </section>

      {/* 3 — Brands */}
      <BrandsSection onBrandClick={onBrandClick} />
    </>
  );
}
