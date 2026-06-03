import React, { useCallback, useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppText from '../components/AppText';
import EmptyState from '../components/EmptyState';
import ProductCardList from '../components/ProductCardList';
import { HeartIcon } from '../components/icons/Icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleFavorite } from '../redux/slices/uiSlice';
import { colors, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { Product } from '../types/product';
import { moderateScale } from '../theme/responsive';

const LikesScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const favorites = useAppSelector(s => s.ui.favorites ?? []);
  const byId = useAppSelector(s => s.products.byId);

  const likedProducts = useMemo<Product[]>(
    () =>
      favorites
        .map(id => byId[id])
        .filter((p): p is Product => Boolean(p)),
    [favorites, byId],
  );

  const onPress = useCallback(
    (p: Product) => navigation.navigate('ProductDetail', { productId: p.id }),
    [navigation],
  );

  const onRemove = useCallback(
    (p: Product) => dispatch(toggleFavorite(p.id)),
    [dispatch],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <AppText variant="h1">Likes</AppText>
    
      </View>

      {likedProducts.length === 0 ? (
        <EmptyState
          title="No favourites yet"
          message="Tap the heart on any product to save it here."
        />
      ) : (
        <FlatList
          data={likedProducts}
          keyExtractor={p => String(p.id)}
          contentContainerStyle={[
            styles.list,
            { paddingBottom: 100 + insets.bottom },
          ]}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <View style={styles.cardWrap}>
                <ProductCardList product={item} onPress={onPress} />
              </View>
              <Pressable
                onPress={() => onRemove(item)}
                style={({ pressed }) => [
                  styles.removeBtn,
                  pressed && { opacity: 0.7 },
                ]}
                accessibilityLabel="Remove from likes"
                hitSlop={8}>
                <HeartIcon size={20} color={colors.heart} filled />
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

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
  row: { position: 'relative' },
  cardWrap: { flex: 1 },
  removeBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LikesScreen;
