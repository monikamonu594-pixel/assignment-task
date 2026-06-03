/**
 * Smoke + unit tests. Avoid rendering <App /> here because it pulls in
 * native modules (NetInfo, AsyncStorage, react-native-screens, etc.) that
 * are not available in the bare Jest environment without extra mocks.
 */
import {getDateLabel, groupProductsByDate} from '../src/utils/dateGroup';
import {clampQuantity, formatPrice} from '../src/utils/formatters';
import type {Product} from '../src/types/product';

const baseProduct = (id: number, createdAt: string): Product => ({
  id,
  title: `Product ${id}`,
  description: '',
  category: 'beauty',
  price: 10,
  discountPercentage: 0,
  rating: 3,
  stock: 1,
  tags: [],
  sku: `SKU-${id}`,
  weight: 1,
  dimensions: {width: 1, height: 1, depth: 1},
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: 'In Stock',
  reviews: [],
  returnPolicy: '',
  minimumOrderQuantity: 1,
  meta: {createdAt, updatedAt: createdAt, barcode: '', qrCode: ''},
  images: [],
  thumbnail: '',
});

describe('formatters', () => {
  test('formatPrice renders peso amounts with two decimals', () => {
    expect(formatPrice(123)).toMatch(/123\.00/);
  });
  test('clampQuantity clamps to min/max', () => {
    expect(clampQuantity(0, 1, 9)).toBe(1);
    expect(clampQuantity(20, 1, 9)).toBe(9);
    expect(clampQuantity(5, 1, 9)).toBe(5);
  });
});

describe('dateGroup', () => {
  const now = new Date(2025, 3, 17, 12, 0, 0); // 17 April 2025

  test('labels today, yesterday, and absolute dates', () => {
    expect(getDateLabel(new Date(2025, 3, 17), now)).toBe('Today');
    expect(getDateLabel(new Date(2025, 3, 16), now)).toBe('Yesterday');
    expect(getDateLabel(new Date(2025, 3, 15), now)).toBe('15 April');
  });

  test('groupProductsByDate groups items by their createdAt day', () => {
    const products: Product[] = [
      baseProduct(1, new Date(2025, 3, 17, 8).toISOString()),
      baseProduct(2, new Date(2025, 3, 16, 8).toISOString()),
      baseProduct(3, new Date(2025, 3, 16, 14).toISOString()),
      baseProduct(4, new Date(2025, 3, 15, 9).toISOString()),
    ];
    jest.useFakeTimers().setSystemTime(now);
    const groups = groupProductsByDate(products);
    expect(groups.map(g => g.label)).toEqual(['Today', 'Yesterday', '15 April']);
    expect(groups[1].data.length).toBe(2);
    jest.useRealTimers();
  });
});
