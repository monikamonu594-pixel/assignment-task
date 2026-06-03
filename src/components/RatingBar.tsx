import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../theme';

const STAR_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

interface RatingBarProps {
  rating: number;
  maxStars?: number;
  size?: number;
  spacing?: number;
  mode?: 'single' | 'stars';
  style?: ViewStyle;
}

export const StarIcon: React.FC<{
  size?: number;
  color?: string;
}> = ({size = 14, color = colors.star}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d={STAR_PATH} fill={color} />
  </Svg>
);

const RatingBar: React.FC<RatingBarProps> = ({
  rating,
  maxStars = 5,
  size = 14,
  spacing = 3,
  mode = 'stars',
  style,
}) => {
  const safe = Math.max(0, Math.min(maxStars, rating || 0));

  if (mode === 'single') {
    return (
      <View style={[styles.row, style]}>
        <StarIcon size={size} color={colors.star} />
      </View>
    );
  }

  const filledCount = Math.round(safe);

  return (
    <View
      style={[styles.row, style]}
      accessibilityRole="image"
      accessibilityLabel={`Rating ${safe.toFixed(1)} of ${maxStars}`}>
      {Array.from({length: maxStars}).map((_, idx) => (
        <View
          key={idx}
          style={{marginRight: idx === maxStars - 1 ? 0 : spacing}}>
          <Svg width={size} height={size} viewBox="0 0 24 24">
            <Path
              d={STAR_PATH}
              fill={idx < filledCount ? colors.star : colors.starInactive}
            />
          </Svg>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
});

export default memo(RatingBar);
