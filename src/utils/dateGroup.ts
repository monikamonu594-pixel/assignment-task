import { Product } from '../types/product';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function getDateLabel(date: Date, now: Date = new Date()): string {
  const today = startOfDay(now);
  const target = startOfDay(date);
  const diffDays = Math.round(
    (today.getTime() - target.getTime()) / (24 * 60 * 60 * 1000),
  );

  if (isSameDay(date, now)) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  return `${day} ${month}`;
}

export interface ProductGroup {
  label: string;
  sortKey: number;
  data: Product[];
}

export function groupProductsByDate(products: Product[]): ProductGroup[] {
  const now = new Date();
  const map = new Map<string, ProductGroup>();

  products.forEach((p, index) => {
    const daysAgo = Math.floor(index / 4);

    const date = new Date(
      now.getTime() - daysAgo * 24 * 60 * 60 * 1000,
    );

    const label = getDateLabel(date, now);
    const sortKey = startOfDay(date).getTime();

    if (!map.has(label)) {
      map.set(label, {
        label,
        sortKey,
        data: [],
      });
    }

    map.get(label)!.data.push(p);
  });

  return Array.from(map.values()).sort(
    (a, b) => b.sortKey - a.sortKey,
  );
}
