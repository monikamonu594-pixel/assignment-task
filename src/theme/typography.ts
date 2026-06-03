import {TextStyle} from 'react-native';
import {fonts} from './fonts';
import { RF } from './responsive';


export const typography = {
  display: {
    fontFamily: fonts.bold,
    fontSize: RF(26),
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: RF(32),
  },

  h1: {
    fontFamily: fonts.bold,
    fontSize: RF(22),
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: RF(28),
  },

  h2: {
    fontFamily: fonts.bold,
    fontSize: RF(18),
    fontWeight: '700' as TextStyle['fontWeight'],
    lineHeight: RF(24),
  },

  title: {
    fontFamily: fonts.semiBold,
    fontSize: RF(16),
    fontWeight: '600' as TextStyle['fontWeight'],
    lineHeight: RF(22),
  },

  body: {
    fontFamily: fonts.regular,
    fontSize: RF(14),
    fontWeight: '400' as TextStyle['fontWeight'],
    lineHeight: RF(20),
  },

  caption: {
    fontFamily: fonts.medium,
    fontSize: RF(12),
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: RF(16),
  },

  small: {
    fontFamily: fonts.medium,
    fontSize: RF(11),
    fontWeight: '500' as TextStyle['fontWeight'],
    lineHeight: RF(14),
  },
} as const;

export type TypographyToken = keyof typeof typography;