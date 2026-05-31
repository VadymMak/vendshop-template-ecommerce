'use client';

import { useState } from 'react';
import {
  type AdminOrder,
  type OrderStatus,
  STATUS_ORDER,
  STATUS_LABEL,
  PAYMENT_LABEL,
  orderTotal,
  orderCount,
} from '@/components/admin/orderTypes';
import styles from './OrderDetailModal.module.css';

export interface OrderDetailModalProps {
  order: AdminOrder;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onSaveTtn: (id: string, ttn: string) => void;
  onNotify: (id: string) => void;
  onClose: () => void;
}

const fmt = (n: number) => new Intl.NumberFormat('uk-UA').format(n);

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.5 21a1.7 1.7 0 0 1-3 0" />
    </svg>
  );
}

export default function OrderDetailModal({
  order,
  onStatusChange,
  onSaveTtn,
  onNotify,
  onClose,
}: OrderDetailModalProps) {
  const [ttn, setTtn] = useState(order.ttn ?? '');

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className={styles.head}>
          <h2 className={styles.title}>Замовлення #{order.id}</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Закрити">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body}>
          {/* Info grid */}
          <div className={styles.info}>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Дата</span>
              <span className={styles.infoValue}>{order.date}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Покупець</span>
              <span className={styles.infoValue}>{order.customer}</span>
              <span className={styles.infoSub}>{order.phone}</span>
              <span className={styles.infoSub}>{order.email}</span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Доставка</span>
              <span className={styles.infoValue}>{order.delivery.method}</span>
              <span className={styles.infoSub}>
                {order.delivery.city}, {order.delivery.address}
              </span>
            </div>
            <div className={styles.infoBlock}>
              <span className={styles.infoLabel}>Оплата</span>
              <span className={styles.infoValue}>{PAYMENT_LABEL[order.payment]}</span>
              <span className={styles.infoSub}>{STATUS_LABEL[order.status]}</span>
            </div>
          </div>

          {/* Items */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Товари ({orderCount(order)})</h3>
            <ul className={styles.items}>
              {order.items.map((it, i) => (
                <li key={i} className={styles.item}>
                  <span className={styles.itemImg}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt="" />
                  </span>
                  <span className={styles.itemName}>{it.name}</span>
                  <span className={styles.itemQty}>× {it.qty}</span>
                  <span className={styles.itemPrice}>{fmt(it.price * it.qty)} грн</span>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <span>До сплати</span>
              <span className={styles.totalVal}>{fmt(orderTotal(order))} грн</span>
            </div>
          </div>

          {/* Status + TTN */}
          <div className={styles.controls}>
            <label className={styles.control}>
              <span className={styles.controlLabel}>Статус</span>
              <select
                className={styles.select}
                value={order.status}
                onChange={(e) => onStatusChange(order.id, e.target.value as OrderStatus)}
              >
                {STATUS_ORDER.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
            </label>

            <div className={styles.control}>
              <span className={styles.controlLabel}>Номер ТТН</span>
              <div className={styles.ttnRow}>
                <input
                  className={styles.input}
                  type="text"
                  value={ttn}
                  placeholder="Введіть номер ТТН"
                  onChange={(e) => setTtn(e.target.value)}
                />
                <button type="button" className={styles.ttnSave} onClick={() => onSaveTtn(order.id, ttn)}>
                  Зберегти ТТН
                </button>
              </div>
            </div>
          </div>

          <button type="button" className={styles.notify} onClick={() => onNotify(order.id)}>
            <BellIcon />
            Надіслати повідомлення покупцю
          </button>
        </div>
      </div>
    </div>
  );
}
