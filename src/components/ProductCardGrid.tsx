import React, {memo} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {colors, radius, spacing} from '../theme';
import AppText from './AppText';
import RatingBar from './RatingBar';
import {HeartIcon, PlusIcon} from './icons/Icons';
import {Product} from '../types/product';
import {formatPrice} from '../utils/formatters';
import { moderateScale } from '../theme/responsive';

interface ProductCardGridProps {
  product: Product;
  width: number;
  onPress: (product: Product) => void;
  onLike?: (product: Product) => void;
  onAdd?: (product: Product) => void;
  liked?: boolean;
}

const ProductCardGrid: React.FC<ProductCardGridProps> = ({
  product,
  width,
  onPress,
  onLike,
  onAdd,
  liked,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${product.title}`}
      onPress={() => onPress(product)}
      style={({pressed}) => [styles.card, {width}, pressed && styles.pressed]}>
      <View style={styles.topRow}>
        <View style={styles.ratingPill}>
          <RatingBar mode="single" rating={product.rating} size={moderateScale(18)} />
          <AppText variant="small" style={styles.ratingValue}>
            {product.rating.toFixed(1)}
          </AppText>
        </View>
        <Pressable
          onPress={e => {
            e.stopPropagation?.();
            onLike?.(product);
          }}
          accessibilityLabel="Toggle favourite"
          hitSlop={8}>
          <HeartIcon
            size={18}
            color={liked ? colors.heart : colors.textSecondary}
            filled={liked}
          />
        </Pressable>
      </View>

      <View style={styles.imageWrap}>
        <Image
          source={{uri: product.thumbnail}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <AppText variant="caption" numberOfLines={1} style={styles.title}>
        {product.title}
      </AppText>

      <View style={styles.footer}>
        <AppText variant="small" color={colors.textSecondary}>
          {formatPrice(product.price)}
        </AppText>
        <Pressable
          onPress={e => {
            e.stopPropagation?.();
            onAdd?.(product);
          }}
          accessibilityLabel="Add to bag"
          style={styles.addBtn}
          hitSlop={6}>
          <PlusIcon size={14} color="#FFFFFF" />
        </Pressable>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 2,
  },
  pressed: {opacity: 0.85},
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
  },
  ratingValue: {
    color: colors.textPrimary,
    marginLeft:moderateScale(2),
  },
  imageWrap: {
    height: moderateScale(90),
    marginVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {width: '100%', height: '100%'},
  title: {marginTop: 2},
  footer: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(ProductCardGrid);
