import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme';
import AppText from './AppText';
import RatingBar from './RatingBar';
import { Product } from '../types/product';
import { formatPrice } from '../utils/formatters';
import { moderateScale } from '../theme/responsive';

interface ProductCardListProps {
  product: Product;
  onPress: (product: Product) => void;
}

const ProductCardList: React.FC<ProductCardListProps> = ({ product, onPress }) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${product.title}`}
      onPress={() => onPress(product)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.body}>
        <AppText  numberOfLines={2} style={styles.title}>
          {product.title}
        </AppText>
        <View style={styles.ratingRow}>
          <RatingBar mode="stars" rating={product.rating} size={moderateScale(16)} spacing={moderateScale(4)} />
        </View>
        <AppText variant="body" style={styles.price}>
          {formatPrice(product.price)}
        </AppText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius:moderateScale(24),
    padding: spacing.md,
    marginBottom: spacing.md,
    minHeight: moderateScale(120),
  },
  pressed: { opacity: 0.9 },
  imageWrap: {
    width: moderateScale(110),
    height: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  body: {
    flex: 1,
    marginLeft: spacing.sm,
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  title: {
    fontWeight: '600',
    fontFamily: 'Inter-regular',
    marginBottom: spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  price: {
    fontWeight: '500',
    color: colors.textPrimary,
  },
});

export default memo(ProductCardList);
