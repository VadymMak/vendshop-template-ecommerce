'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ProductCard, {
  type ProductCardProps,
} from '@/components/catalog/ProductCard/ProductCard';
import FilterSidebar from '@/components/catalog/FilterSidebar/FilterSidebar';
import styles from './CatalogPage.module.css';

/** Product data with names already localized server-side (no callbacks). */
export type CatalogProduct = Omit<
  ProductCardProps,
  'onAddToCart' | 'onCompare' | 'onFavorite'
>;

export interface CatalogPageProps {
  products: CatalogProduct[];
  /** Sample total result count (drives the "found" label + pagination). */
  totalFound?: number;
  totalPages?: number;
}

const SORT_KEYS = ['sortPopular', 'sortPriceAsc', 'sortPriceDesc', 'sortNew'] as const;
type SortKey = (typeof SORT_KEYS)[number];

// Placeholder handlers — swap for real cart/compare/wishlist later.
const onAddToCart = (id: string) => console.log('[addToCart]', id);
const onCompare = (id: string) => console.log('[compare]', id);
const onFavorite = (id: string) => console.log('[favorite]', id);

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowL() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowR() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

export default function CatalogPage({
  products,
  totalFound = 87,
  totalPages = 9,
}: CatalogPageProps) {
  const t = useTranslations('catalog');

  const [sortOpen, setSortOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>('sortPopular');
  const [page, setPage] = useState(1);

  const pageButtons = [1, 2, 3, 4, 5];

  return (
    <div className={styles.cat}>
      <h1 className={styles.h1}>{t('title')}</h1>

      <div className={styles.body}>
        <FilterSidebar />

        <div>
          {/* Top bar: found count + sort */}
          <div className={styles.top}>
            <span className={styles.found}>{t('found', { count: totalFound })}</span>

            <div className={`${styles.sort} ${sortOpen ? styles.sortOpen : ''}`}>
              <button
                type="button"
                className={styles.sortBtn}
                onClick={() => setSortOpen((v) => !v)}
                aria-expanded={sortOpen}
              >
                {t('sort')}: <span className={styles.sortCur}>{t(sort)}</span>
                <ChevronDown />
              </button>
              {sortOpen && (
                <div className={styles.sortMenu}>
                  {SORT_KEYS.map((key) => (
                    <button
                      key={key}
                      type="button"
                      className={`${styles.sortOpt} ${key === sort ? styles.sortOptSel : ''}`}
                      onClick={() => {
                        setSort(key);
                        setSortOpen(false);
                      }}
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product grid */}
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={onAddToCart}
                onCompare={onCompare}
                onFavorite={onFavorite}
              />
            ))}
          </div>

          {/* Pagination */}
          <nav className={styles.pag} aria-label={t('pagination', { current: page, total: totalPages })}>
            <button
              type="button"
              className={styles.pagBtn}
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ArrowL />
              {t('prev')}
            </button>

            {pageButtons.map((p) => (
              <button
                key={p}
                type="button"
                className={`${styles.pagBtn} ${p === page ? styles.pagBtnActive : ''}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}

            <span className={styles.pagDots}>…</span>

            <button
              type="button"
              className={`${styles.pagBtn} ${page === totalPages ? styles.pagBtnActive : ''}`}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </button>

            <button
              type="button"
              className={styles.pagBtn}
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              {t('next')}
              <ArrowR />
            </button>
          </nav>

          <p className={styles.pagStatus}>{t('pagination', { current: page, total: totalPages })}</p>
        </div>
      </div>
    </div>
  );
}
