export const fonts = {
  regular: 'Inter_18pt-Regular',
  medium: 'Inter_18pt-Medium',
  semiBold: 'Inter_18pt-SemiBold',
  bold: 'Inter_18pt-Bold',
} as const;

export type FontWeightKey = keyof typeof fonts;

export const fontFamilyForWeight = (
  weight?: string | number,
): string => {
  const w = String(weight ?? '');

  switch (w) {
    case '700':
    case 'bold':
      return fonts.bold;

    case '600':
      return fonts.semiBold;

    case '500':
      return fonts.medium;

    default:
      return fonts.regular;
  }
};