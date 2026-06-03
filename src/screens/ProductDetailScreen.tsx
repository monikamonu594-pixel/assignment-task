import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '../components/AppText';
import QuantitySelector from '../components/QuantitySelector';
import { AddBagIcon, BackIcon, BagIcon } from '../components/icons/Icons';
import { colors, spacing } from '../theme';
import type { ProductDetailScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadProductDetail } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/uiSlice';
import { formatPrice } from '../utils/formatters';
import ErrorState from '../components/ErrorState';
import { showToast } from '../utils/toast';
import { moderateScale, RF } from '../theme/responsive';

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { productId } = route.params;
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const cachedProduct = useAppSelector(s => s.products.byId[productId]);
  const detailStatus = useAppSelector(
    s => s.products.detailStatus[productId],
  );
  const isOnline = useAppSelector(s => s.ui.isOnline);
  const [quantity, setQuantity] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const { width: screenWidth } = useWindowDimensions();

  const onAddToBag = useCallback(() => {
    if (!cachedProduct) return;
    dispatch(addToCart({ id: cachedProduct.id, qty: quantity }));
    showToast(`${cachedProduct.title} added to bag`);
  }, [dispatch, cachedProduct, quantity]);

  const onBuyNow = useCallback(() => {
    if (!cachedProduct) return;
    dispatch(addToCart({ id: cachedProduct.id, qty: quantity }));
    showToast(`Buying ${cachedProduct.title} \u00d7${quantity}`);
  }, [dispatch, cachedProduct, quantity]);

  useEffect(() => {
    if (!isOnline) return;
    dispatch(loadProductDetail(productId));
  }, [dispatch, productId, isOnline]);

  const product = cachedProduct;

  const images = useMemo(() => {
    if (!product?.thumbnail) return [] as string[];
    return [product.thumbnail, product.thumbnail, product.thumbnail];
  }, [product]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const idx = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
      if (idx !== pageIndex) setPageIndex(idx);
    },
    [pageIndex, screenWidth],
  );

  if (!product) {
    if (detailStatus === 'failed') {
      return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
          <ErrorState
            message="Couldn't load this product. Please try again."
            onRetry={() => dispatch(loadProductDetail(productId))}
          />
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
        <View style={[styles.heroWrap, { paddingTop: insets.top }]}>
          <BackBtn onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.heroWrap, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <BackBtn onPress={() => navigation.goBack()} />
        </View>

        <FlatList
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          keyExtractor={(_u, i) => `slide-${i}`}
          renderItem={({ item }) => (
            <View style={[styles.heroPage, { width: screenWidth }]}>
              <Image
                source={{ uri: item }}
                style={styles.heroImage}
                resizeMode="contain"
              />
            </View>
          )}
        />

        {images.length > 1 ? (
          <View style={styles.dotsRow}>
            {images.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === pageIndex ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.sheet}>
        <ScrollView
          style={styles.sheetScroll}
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}>
          <View style={styles.titleRow}>
            <View style={styles.titleCol}>
              <AppText variant="h1" numberOfLines={2} style={styles.productTitle}>
                {product.title}
              </AppText>
              <AppText variant="body" color={colors.textSecondary}>
                {capitalize(product.category)}
              </AppText>
            </View>
            <View style={styles.priceCol}>
              <AppText variant="body" color={colors.textPrimary}>
                Price
              </AppText>
              <AppText variant="h1" style={styles.priceValue}>
                {formatPrice(product.price)}
              </AppText>
              <View style={styles.qtyWrap}>
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </View>
            </View>
          </View>

          <AppText variant="h2" style={styles.sectionTitle}>
            Description
          </AppText>
          <AppText
            variant="title"
            color={colors.textSecondary} style={styles.desc}>
            {product.description}
          </AppText>
        </ScrollView>

        <View
          style={[
            styles.footerBar,
            { paddingBottom: Math.max(insets.bottom, spacing.md) },
          ]}>
          <Pressable
            onPress={onAddToBag}
            accessibilityRole="button"
            accessibilityLabel="Add to bag"
            style={({ pressed }) => [styles.bagOuter, pressed && { opacity: 0.85 }]}>
            <View style={styles.bagInner}>
              <AddBagIcon size={moderateScale(26)} />
            </View>
          </Pressable>
          <Pressable
            onPress={onBuyNow}
            style={({ pressed }) => [styles.buyBtn, pressed && { opacity: 0.9 }]}
            accessibilityRole="button"
            accessibilityLabel="Buy Now">
            <AppText variant="title" color="#FFFFFF" weight="700">
              Buy Now
            </AppText>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const BackBtn: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <Pressable
    onPress={onPress}
    style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.7 }]}
    accessibilityLabel="Go back"
    hitSlop={12}>
    <BackIcon size={moderateScale(44)} color={colors.textPrimary} />
  </Pressable>
);

function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.heroBg },
  safe: { flex: 1, backgroundColor: colors.heroBg },
  heroWrap: {
    backgroundColor: colors.heroBg,
    paddingBottom: spacing.sm,
  },
  headerRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backBtn: {
    width: moderateScale(44),
    height: moderateScale(44),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heroPage: {
    height: moderateScale(220),
    alignItems: 'center',
    justifyContent: 'center',
  },

  heroImage: { width: '78%', height: '100%' },
  dotsRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xxxl,
    gap: 10,
  },
  dot: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(7),
  },
  dotActive: {
    width: moderateScale(15),
    height: moderateScale(15),
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderRadius: moderateScale(10),
    borderColor: '#FFFFFF',
  },
  dotInactive: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: moderateScale(5),
  },

  sheet: {
    flex: 1,
    marginTop: -spacing.xl,
    backgroundColor: colors.surface,
    borderTopLeftRadius: moderateScale(34),
    borderTopRightRadius: moderateScale(34),
    overflow: 'hidden',
  },
  sheetScroll: { flex: 1 },
  sheetContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  titleCol: { flex: 1, marginRight: spacing.md },
  productTitle: { fontWeight: '700', marginBottom: spacing.xxs },
  priceCol: { alignItems: 'flex-start', fontSize: moderateScale(17) },
  priceValue: { fontWeight: '700', marginTop: moderateScale(2) },
  qtyWrap: { marginTop: spacing.md },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  desc: { lineHeight: moderateScale(22), fontSize: RF(17), },
  footerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  bagOuter: {
    width:moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(26),
    backgroundColor: colors.bagCircle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bagInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyBtn: {
    flex: 1,
    height: moderateScale(60),
    borderRadius: moderateScale(14),
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductDetailScreen;
