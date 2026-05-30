'use client';

import { useTranslations } from 'next-intl';
import styles from './PopularTags.module.css';

export interface PopularTagsProps {
  /** Optional click handler — receives the tag label. */
  onTagClick?: (tag: string) => void;
}

// Search terms / brand names — kept as data (not translated), the same way
// brand wordmarks are handled in BrandsSection. Only the label is localized.
const TAGS = [
  'Makita',
  'Bosch',
  'DeWalt',
  'Milwaukee',
  'Metabo',
  'Перфоратор',
  'Дриль',
  'Болгарка',
  'Шурупокрут',
  'Акумуляторний інструмент',
  'Лазерний рівень',
  'Професійний інструмент',
  'Інструмент для дому',
];

export default function PopularTags({ onTagClick }: PopularTagsProps) {
  const t = useTranslations('tags');

  return (
    <section className={styles.tags}>
      <div className={styles.inner}>
        <span className={styles.label}>{t('popularQueries')}</span>
        <div className={styles.row}>
          {TAGS.map((tag) => (
            <a
              key={tag}
              href="#"
              className={styles.tag}
              onClick={(e) => {
                e.preventDefault();
                onTagClick?.(tag);
              }}
            >
              {tag}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
