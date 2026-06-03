import { moderateScale } from "./responsive";


export const spacing = {
  xxs: moderateScale(2),
  xs: moderateScale(4),
  sm: moderateScale(8),
  md: moderateScale(12),
  base: moderateScale(16),
  lg: moderateScale(20),
  xl: moderateScale(24),
  xxl: moderateScale(32),
  xxxl: moderateScale(48),
} as const;

export const radius = {
  sm: moderateScale(6),
  md: moderateScale(10),
  lg: moderateScale(16),
  xl: moderateScale(22),
  pill: 999,
} as const;

export type Spacing = keyof typeof spacing;