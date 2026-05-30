'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './FilterSidebar.module.css';

export interface FilterSidebarProps {
  /** Called when the user clicks "Apply". Defaults to a console.log placeholder. */
  onApply?: (state: FilterState) => void;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  priceFrom: number;
  priceTo: number;
  inStockOnly: boolean;
}

const PRICE_MIN = 0;
const PRICE_MAX = 25000;

// Category checkbox rows reuse the existing `categories` namespace for labels;
// counts are sample data. Brand names are proper nouns (kept as data).
const CATEGORY_ROWS: { key: string; count: number }[] = [
  { key: 'drills', count: 24 },
  { key: 'grinders', count: 18 },
  { key: 'perforators', count: 15 },
  { key: 'jigsaws', count: 12 },
  { key: 'sanders', count: 18 },
];

const BRAND_ROWS: { name: string; count: number }[] = [
  { name: 'Makita', count: 31 },
  { name: 'Bosch', count: 27 },
  { name: 'DeWalt', count: 14 },
  { name: 'Milwaukee', count: 9 },
  { name: 'Metabo', count: 6 },
];

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  );
}

function CheckMini() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  count: number;
}) {
  return (
    <label className={styles.chk}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.chkBox}>
        <CheckMini />
      </span>
      <span className={styles.chkLabel}>{label}</span>
      <span className={styles.chkNum}>{count}</span>
    </label>
  );
}

export default function FilterSidebar({ onApply }: FilterSidebarProps) {
  const t = useTranslations('catalog');
  const tc = useTranslations('categories');

  const [cats, setCats] = useState<Record<string, boolean>>({ drills: true });
  const [brands, setBrands] = useState<Record<string, boolean>>({ Makita: true });
  const [inStock, setInStock] = useState(true);
  const [lo, setLo] = useState(1500);
  const [hi, setHi] = useState(12000);

  const reset = () => {
    setCats({});
    setBrands({});
    setInStock(false);
    setLo(PRICE_MIN);
    setHi(PRICE_MAX);
  };

  const apply = () => {
    const state: FilterState = {
      categories: Object.keys(cats).filter((k) => cats[k]),
      brands: Object.keys(brands).filter((k) => brands[k]),
      priceFrom: lo,
      priceTo: hi,
      inStockOnly: inStock,
    };
    (onApply ?? ((s: FilterState) => console.log('[filters apply]', s)))(state);
  };

  return (
    <aside className={styles.fil}>
      <div className={styles.head}>
        <span className={styles.title}>
          <FilterIcon />
          {t('filters')}
        </span>
        <button type="button" className={styles.reset} onClick={reset}>
          {t('resetAll')}
        </button>
      </div>

      {/* Category */}
      <div className={styles.group}>
        <h4 className={styles.groupTitle}>{t('category')}</h4>
        {CATEGORY_ROWS.map(({ key, count }) => (
          <Checkbox
            key={key}
            label={tc(key)}
            count={count}
            checked={!!cats[key]}
            onChange={() => setCats((c) => ({ ...c, [key]: !c[key] }))}
          />
        ))}
      </div>

      {/* Brand */}
      <div className={styles.group}>
        <h4 className={styles.groupTitle}>{t('brand')}</h4>
        {BRAND_ROWS.map(({ name, count }) => (
          <Checkbox
            key={name}
            label={name}
            count={count}
            checked={!!brands[name]}
            onChange={() => setBrands((b) => ({ ...b, [name]: !b[name] }))}
          />
        ))}
      </div>

      {/* Price */}
      <div className={styles.group}>
        <h4 className={styles.groupTitle}>{t('price')}</h4>
        <div className={styles.priceInputs}>
          <div className={styles.priceField}>
            <span>{t('priceFrom')}</span>
            <input
              type="number"
              value={lo}
              min={PRICE_MIN}
              max={hi}
              aria-label={t('priceFrom')}
              onChange={(e) => setLo(Math.min(Number(e.target.value), hi))}
            />
          </div>
          <span className={styles.priceDash}>—</span>
          <div className={styles.priceField}>
            <span>{t('priceTo')}</span>
            <input
              type="number"
              value={hi}
              min={lo}
              max={PRICE_MAX}
              aria-label={t('priceTo')}
              onChange={(e) => setHi(Math.max(Number(e.target.value), lo))}
            />
          </div>
        </div>
        <div className={styles.range}>
          <div className={styles.rangeTrack} />
          <div
            className={styles.rangeFill}
            style={{
              left: `${((lo - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
              right: `${100 - ((hi - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
            }}
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500}
            value={lo}
            aria-label={t('priceFrom')}
            onChange={(e) => setLo(Math.min(Number(e.target.value), hi - 500))}
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={500}
            value={hi}
            aria-label={t('priceTo')}
            onChange={(e) => setHi(Math.max(Number(e.target.value), lo + 500))}
          />
        </div>
      </div>

      {/* Availability */}
      <div className={styles.group}>
        <h4 className={styles.groupTitle}>{t('availability')}</h4>
        <label className={styles.toggle}>
          <span className={styles.toggleLabel}>{t('inStockOnly')}</span>
          <input type="checkbox" checked={inStock} onChange={() => setInStock((v) => !v)} />
          <span className={styles.toggleTrack} />
        </label>
      </div>

      <button type="button" className={styles.apply} onClick={apply}>
        {t('apply')}
      </button>
    </aside>
  );
}
