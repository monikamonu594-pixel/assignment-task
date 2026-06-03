import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppText from '../components/AppText';
import EmptyState from '../components/EmptyState';
import QuantitySelector from '../components/QuantitySelector';
import { TrashIcon } from '../components/icons/Icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addToCart, removeFromCart } from '../redux/slices/uiSlice';
import { colors, radius, spacing } from '../theme';
import { formatPrice } from '../utils/formatters';
import { showToast } from '../utils/toast';
import type { RootStackParamList } from '../navigation/types';
import { Product } from '../types/product';
import { moderateScale } from '../theme/responsive';

interface BagLine {
  product: Product;
  qty: number;
}

const BagScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cart = useAppSelector(s => s.ui.cart ?? {});
  const byId = useAppSelector(s => s.products.byId);

  const lines = useMemo<BagLine[]>(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({
          product: byId[Number(id)],
          qty: Number(qty),
        }))
        .filter((l): l is BagLine => Boolean(l.product) && l.qty > 0),
    [cart, byId],
  );

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.qty, 0),
    [lines],
  );

  const onOpen = useCallback(
    (p: Product) => navigation.navigate('ProductDetail', { productId: p.id }),
    [navigation],
  );

  const onChangeQty = useCallback(
    (id: number, oldQty: number, newQty: number) => {
      const delta = newQty - oldQty;
      if (delta === 0) return;
      dispatch(addToCart({ id, qty: delta }));
    },
    [dispatch],
  );

  const onRemove = useCallback(
    (id: number) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  const onCheckout = useCallback(() => {
    showToast(`Checkout ${formatPrice(total)}`);
  }, [total]);

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <AppText variant="h1">My Bag</AppText>

      </View>

      {lines.length === 0 ? (
        <EmptyState
          title="Your bag is empty"
          message="Tap the + on any product or Buy Now from a product page."
        />
      ) : (
        <>
          <FlatList
            data={lines}
            keyExtractor={l => String(l.product.id)}
            contentContainerStyle={[
              styles.list,
              { paddingBottom: moderateScale(160) + insets.bottom },
            ]}
            ItemSeparatorComponent={Separator}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => onOpen(item.product)}
                style={({ pressed }) => [
                  styles.line,
                  pressed && { opacity: 0.9 },
                ]}>
                <View style={styles.thumbWrap}>
                  <Image
                    source={{ uri: item.product.thumbnail }}
                    style={styles.thumb}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.body}>
                  <AppText variant="title" numberOfLines={1} weight="700">
                    {item.product.title}
                  </AppText>
                  <AppText
                    variant="caption"
                    color={colors.textSecondary}
                    style={styles.brand}>
                    {item.product.brand || item.product.category}
                  </AppText>
                  <View style={styles.priceRow}>
                    <AppText variant="title" weight="700">
                      {formatPrice(item.product.price * item.qty)}
                    </AppText>
                    <QuantitySelector
                      value={item.qty}
                      onChange={newQty =>
                        onChangeQty(item.product.id, item.qty, newQty)
                      }
                    />
                  </View>
                </View>
                <Pressable
                  onPress={() => onRemove(item.product.id)}
                  style={({ pressed }) => [
                    styles.trashBtn,
                    pressed && { opacity: 0.7 },
                  ]}
                  accessibilityLabel="Remove from bag"
                  hitSlop={8}>
                  <TrashIcon size={18} color={'#ffff'} />
                </Pressable>
              </Pressable>
            )}
          />

          <View
            style={[
              styles.checkoutBar,
              { bottom: moderateScale(20) },
            ]}>
            <View>
              <AppText variant="caption" color={colors.textSecondary}>
                Total
              </AppText>
              <AppText variant="h1" weight="700">
                {formatPrice(total)}
              </AppText>
            </View>
            <Pressable
              onPress={onCheckout}
              style={({ pressed }) => [
                styles.checkoutBtn,
                pressed && { opacity: 0.9 },
              ]}>
              <AppText variant="title" color="#FFFFFF" weight="700">
                Checkout
              </AppText>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const Separator: React.FC = () => <View style={{ height: spacing.md }} />;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.screenBg },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  list: { paddingHorizontal: spacing.lg },
  line: {
    flexDirection: 'row',
    backgroundColor: colors.surface,

    borderRadius: radius.lg,

    padding: spacing.md,
    alignItems: 'center',
  },
  thumbWrap: {
    width: moderateScale(80),
    height: moderateScale(80),
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: { width: '85%', height: '85%' },
  body: { flex: 1, marginLeft: spacing.md },
  brand: { marginTop:moderateScale(2), marginBottom: spacing.sm },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trashBtn: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
    marginTop: moderateScale(-60),
    backgroundColor: colors.primary,
    borderRadius: radius.sm,

  },
  checkoutBar: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  checkoutBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.xl,
  },
});

export default BagScreen;
