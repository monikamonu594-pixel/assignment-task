export const colors = {
  background: '#BAC3C3',
  screenBg: '#BAC3C3',
  surface: '#FFFFFF',
  cardBackground: '#FFFFFF',
  surfaceMuted: '#EFEFEF',
  border: '#E6E6E6',
  divider: '#EAEAEA',

  textPrimary: '#1F2024',
  textSecondary: '#514C4C',
  textMuted: '#9A9A9F',

  primary: '#AABB5D',
  primaryDark: '#8FA049',
  accent: '#F4C022',
  accentDark: '#E0AE0E',

  star: '#F59E0B',
  starInactive: '#9CA3AF',
  black:'#000000',

  heart: '#E04F4F',
  success: '#3BB273',
  danger: '#E04F4F',
  offline: '#1F2024',

  heroBg: '#BAC3C3',
  tabInactive: '#9CA3AF',
  bagCircle: '#E8EBE4',

  overlay: 'rgba(0,0,0,0.35)',
} as const;

export type ColorToken = keyof typeof colors;
