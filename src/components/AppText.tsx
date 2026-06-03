import React from 'react';
import {Text, TextProps, TextStyle} from 'react-native';
import {colors, fontFamilyForWeight, typography} from '../theme';

type Variant = keyof typeof typography;

interface AppTextProps extends TextProps {
  variant?: Variant;
  color?: string;
  align?: TextStyle['textAlign'];
  weight?: TextStyle['fontWeight'];
}

const AppText: React.FC<AppTextProps> = ({
  variant = 'body',
  color = colors.textPrimary,
  align,
  weight,
  style,
  children,
  ...rest
}) => {
  const base = typography[variant];
  const fontFamily = weight ? fontFamilyForWeight(weight) : base.fontFamily;
  const fontWeight = weight ?? base.fontWeight;

  return (
    <Text
      {...rest}
      style={[
        base,
        {
          color,
          textAlign: align,
          fontFamily,
          fontWeight,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default AppText;
