export function formatPrice(price: number): string {
  if (price == null || Number.isNaN(price)) return '\u20B1 0.00';
  return `\u20B1 ${price.toFixed(2)}`;
}

export function clampQuantity(value: number, min = 1, max = 99): number {
  if (Number.isNaN(value)) return min;
  return Math.max(min, Math.min(max, Math.floor(value)));
}
