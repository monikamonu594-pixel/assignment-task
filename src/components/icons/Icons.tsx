import React from 'react';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

export const SearchIcon: React.FC<IconProps> = ({ size = 20, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth={2} />
    <Line x1="16.5" y1="16.5" x2="21" y2="21" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({
  size = 18,
  color = '#1F2024',
  filled = false,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path
      d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0112 6.5a5.5 5.5 0 019.5 5.5c-2.5 4.65-9.5 9-9.5 9z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PlusIcon: React.FC<IconProps> = ({ size = 18, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);

export const MinusIcon: React.FC<IconProps> = ({ size = 18, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
  </Svg>
);

export const GridIcon: React.FC<IconProps> = ({ size = 20, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="4" y="4" width="7" height="7" rx="1.5" stroke={color} strokeWidth={1.8} />
    <Rect x="13" y="4" width="7" height="7" rx="1.5" stroke={color} strokeWidth={1.8} />
    <Rect x="4" y="13" width="7" height="7" rx="1.5" stroke={color} strokeWidth={1.8} />
    <Rect x="13" y="13" width="7" height="7" rx="1.5" stroke={color} strokeWidth={1.8} />
  </Svg>
);

export const ListIcon: React.FC<IconProps> = ({ size = 20, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Line x1="4" y1="18" x2="20" y2="18" stroke={color} strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

export const BackIcon: React.FC<IconProps> = ({ size = 22, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const BagIcon: React.FC<IconProps & { filled?: boolean }> = ({
  size = 22,
  color = '#FFFFFF',
  filled = false,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
    <Path
      d="M5 8h14l-1 12H6L5 8z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 8V6a3 3 0 016 0v2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const TrashIcon: React.FC<IconProps> = ({ size = 20, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 20, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6l6 6-6 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 22, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 11l9-7 9 7v9a2 2 0 01-2 2h-3v-7h-8v7H5a2 2 0 01-2-2v-9z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const ProfileIcon: React.FC<IconProps> = ({ size = 22, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={1.8} />
    <Path
      d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
    />
  </Svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 22, color = '#1F2024' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={1.8} />
    <Path
      d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinejoin="round"
    />
  </Svg>


);

export const AddBagIcon: React.FC<IconProps> = ({
  size = 46,
  color = '#AABB5D',
}) => (
  <Svg
    width={size}
    height={(size * 50) / 46}
    viewBox="0 0 36 40"
    fill="none">
    <Path
      d="M18.0099 0C23.3698 0 27.7763 4.21182 28 9.54865H27.9477C27.954 9.70378 27.9242 9.85825 27.8606 10H28.1729C30.6069 10 33.1557 11.687 34.1777 15.7596L34.2887 16.2401L35.8265 28.6295C36.9332 36.5315 32.6099 39.8546 26.7124 39.9953L26.3169 40H9.73706C3.74355 40 -0.874911 37.8159 0.140562 29.1671L0.209809 28.6295L1.76528 16.2401C2.53228 11.8544 5.10722 10.1245 7.58824 10.0065L7.86343 10H8.01978C7.99341 9.8507 7.99341 9.69795 8.01978 9.54865C8.24344 4.21182 12.65 0 18.0099 0ZM12.194 16.6586C11.2178 16.6586 10.4264 17.4731 10.4264 18.4779C10.4264 19.4826 11.2178 20.2971 12.194 20.2971C13.1702 20.2971 13.9616 19.4826 13.9616 18.4779L13.9478 18.2497C13.8387 17.3526 13.0951 16.6586 12.194 16.6586ZM23.7716 16.6586C22.7954 16.6586 22.0041 17.4731 22.0041 18.4779C22.0041 19.4826 22.7954 20.2971 23.7716 20.2971C24.7478 20.2971 25.5392 19.4826 25.5392 18.4779C25.5392 17.4731 24.7478 16.6586 23.7716 16.6586ZM17.9315 2.60477C14.0833 2.60477 10.9637 5.71365 10.9637 9.54865C10.99 9.69795 10.99 9.8507 10.9637 10H24.9864C24.9308 9.85589 24.9013 9.70306 24.8993 9.54865C24.8993 5.71365 21.7797 2.60477 17.9315 2.60477Z"
      fill={color}
    />
  </Svg>
);