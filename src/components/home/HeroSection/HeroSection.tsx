'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './HeroSection.module.css';

interface DailySpecial {
  name: string;
  price: number;
  currency: string;
}

interface HeroSectionProps {
  storeName: string;
  heroImage?: string;
  dailySpecial?: DailySpecial;
}

export default function HeroSection({ storeName, heroImage, dailySpecial }: HeroSectionProps) {
  const t = useTranslations('hero');

  return (
    <section className={styles.hero} aria-label={storeName}>
      {/* Left — text content */}
      <div className={styles.content}>
        <p className={styles.tagline}>
          <span className={styles.taglineLine} />
          {t('tagline')}
        </p>

        <h1 className={styles.title}>
          {t('title')}{' '}
          <em className={styles.titleAccent}>{t('titleAccent')}</em>{' '}
          {t('titleEnd')}
        </h1>

        <p className={styles.subtitle}>{t('subtitle')}</p>

        <div className={styles.buttons}>
          <Link href="/reservations" className={styles.btnPrimary}>
            {t('bookTable')}
          </Link>
          <Link href="/catalog" className={styles.btnSecondary}>
            {t('viewMenu')}
          </Link>
        </div>

        <p className={styles.trustLine}>
          ⭐ {t('googleRating')} &nbsp;·&nbsp; 🕐 {t('openUntil')} &nbsp;·&nbsp; 📍 Rome, Italy
        </p>
      </div>

      {/* Right — image */}
      <div className={styles.imageWrap}>
        <Image
          src={heroImage ?? '/placeholder-product.svg'}
          alt={storeName}
          fill
          className={styles.image}
          priority
        />
        <div className={styles.imageOverlay} />
      </div>

      {/* Promo card */}
      {dailySpecial && (
        <div className={styles.promoCard}>
          <p className={styles.promoTitle}>{t('todaysSpecial')}</p>
          <p className={styles.promoName}>{dailySpecial.name}</p>
          <p className={styles.promoPrice}>
            {dailySpecial.currency}{dailySpecial.price}
          </p>
          <Link href="/catalog" className={styles.promoBtn}>
            {t('orderNow')}
          </Link>
        </div>
      )}
    </section>
  );
}
