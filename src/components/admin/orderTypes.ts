export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'wayforpay' | 'liqpay' | 'cod';

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
  image: string;
}

export interface AdminOrder {
  id: string;
  customer: string;
  phone: string;
  email: string;
  payment: PaymentMethod;
  status: OrderStatus;
  date: string;
  delivery: { method: string; city: string; address: string };
  items: OrderItem[];
  ttn?: string;
}

export const STATUS_ORDER: OrderStatus[] = [
  'new',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
];

export const STATUS_LABEL: Record<OrderStatus, string> = {
  new: 'Новий',
  processing: 'Обробляється',
  shipped: 'Відправлено',
  delivered: 'Доставлено',
  cancelled: 'Скасовано',
};

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  wayforpay: 'WayForPay',
  liqpay: 'LiqPay',
  cod: 'Наложений',
};

export const orderTotal = (o: AdminOrder) => o.items.reduce((s, i) => s + i.price * i.qty, 0);
export const orderCount = (o: AdminOrder) => o.items.reduce((s, i) => s + i.qty, 0);
