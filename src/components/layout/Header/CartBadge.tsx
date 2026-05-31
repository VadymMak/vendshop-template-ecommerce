'use client';

import styles from './Header.module.css';

export interface CartBadgeProps {
  /** Number of items in the cart. The badge is hidden when this is 0. */
  count?: number;
}

// Standalone so it can later read from a cart context/store without touching Header.
export default function CartBadge({ count = 0 }: CartBadgeProps) {
  if (count === 0) return null;
  return <span className={`${styles.badge} ${styles.badgeRed}`}>{count}</span>;
}
