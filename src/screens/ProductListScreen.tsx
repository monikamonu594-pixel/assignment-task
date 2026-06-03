import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  SectionList,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';
import AppText from '../components/AppText';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import SectionHeader from '../components/SectionHeader';
import ProductCardGrid from '../components/ProductCardGrid';
import ProductCardList from '../components/ProductCardList';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loadProducts } from '../redux/slices/productsSlice';
import {
  addToCart,
  setSearchQuery,
  setViewMode,
  toggleFavorite,
} from '../redux/slices/uiSlice';
import type { ProductListScreenProps } from '../navigation/types';
import { groupProductsByDate, ProductGroup } from '../utils/dateGroup';
import { useDebounce } from '../hooks/useDebounce';
import { Product } from '../types/product';
import { showToast } from '../utils/toast';
import { moderateScale } from '../theme/responsive';

const SCREEN_PADDING = spacing.lg;
const TAB_BAR_HEIGHT = moderateScale(72);
const COLUMN_GAP = spacing.md;
const NUM_COLUMNS = 2;
const ITEMS_PER_ROW = NUM_COLUMNS;
const PAGE_SIZE = 20;
const ProductListScreen: React.FC<ProductListScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const status = useAppSelector(s => s.products.status);
  const items = useAppSelector(s => s.products.items);
  const error = useAppSelector(s => s.products.error);
  const viewMode = useAppSelector(s => s.ui.viewMode);
  const isOnline = useAppSelector(s => s.ui.isOnline);
  const searchQuery = useAppSelector(s => s.ui.searchQuery);
  const favorites = useAppSelector(s => s.ui.favorites ?? []);
  const debouncedQuery = useDebounce(searchQuery, 250);
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);
  const [page, setPage] = React.useState(1);
  const [loadingMore, setLoadingMore] = React.useState(false);
  useEffect(() => {
    if (isOnline) {
      dispatch(loadProducts());
    }
  }, [dispatch, isOnline]);
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);
  const onRefresh = useCallback(() => {
    if (isOnline) dispatch(loadProducts());
  }, [dispatch, isOnline]);

  const onOpenDetail = useCallback(
    (p: Product) => navigation.navigate('ProductDetail', { productId: p.id }),
    [navigation],
  );

  const onLike = useCallback(
    (p: Product) => {
      dispatch(toggleFavorite(p.id));
    },
    [dispatch],
  );

  const onAdd = useCallback(
    (p: Product) => {
      dispatch(addToCart({ id: p.id, qty: 1 }));
      showToast(`${p.title} added to bag`);
    },
    [dispatch],
  );

  const filteredItems = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      p =>
        p.title.toLowerCase().includes(q) ||
        (p.brand ? p.brand.toLowerCase().includes(q) : false) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)),
    );
  }, [items, debouncedQuery]);
  const paginatedItems = useMemo(
    () => filteredItems.slice(0, page * PAGE_SIZE),
    [filteredItems, page],
  );
  const sections = useMemo<ProductGroup[]>(
    () => groupProductsByDate(paginatedItems),
    [paginatedItems],
  );

  const sectionListData = useMemo(() => {
    if (viewMode === 'grid') {
      return sections.map(s => ({
        ...s,
        data: chunkRows(s.data, ITEMS_PER_ROW),
      }));
    }
    return sections.map(s => ({ ...s, data: s.data.map(p => [p]) }));
  }, [sections, viewMode]);



  const screenWidth = Dimensions.get('window').width;
  const cardWidth =
    (screenWidth - SCREEN_PADDING * 2 - COLUMN_GAP * (NUM_COLUMNS - 1)) /
    NUM_COLUMNS;

  const renderRow = useCallback(
    ({ item: row }: { item: Product[] }) => (
      <View style={styles.row}>
        {row.map(product => {
          if (viewMode === 'grid') {
            return (
              <View key={product.id} style={{ marginRight: COLUMN_GAP }}>
                <ProductCardGrid
                  product={product}
                  width={cardWidth}
                  onPress={onOpenDetail}
                  onLike={onLike}
                  onAdd={onAdd}
                  liked={favoriteSet.has(product.id)}
                />
              </View>
            );
          }
          return (
            <View key={product.id} style={styles.listRowItem}>
              <ProductCardList product={product} onPress={onOpenDetail} />
            </View>
          );
        })}
      </View>
    ),
    [viewMode, cardWidth, onOpenDetail, onLike, onAdd, favoriteSet],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: { label: string; data: Product[][] } }) => {
      return (
        <SectionHeader
          label={section.label}
          count={filteredItems.length}
        />
      );
    },
    [filteredItems.length],
  );


  const showInitialLoader = status === 'loading' && items.length === 0;
  const showError =
    status === 'failed' && items.length === 0 && error && !isOnline;

  const listBottomPad = TAB_BAR_HEIGHT + insets.bottom + spacing.lg;
  const loadMore = useCallback(() => {
    if (loadingMore) return;

    if (page * PAGE_SIZE >= filteredItems.length) {
      return;
    }

    setLoadingMore(true);

    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoadingMore(false);
    }, 500);
  }, [page, filteredItems.length, loadingMore]);
  const renderFooter = useCallback(() => {
    if (!loadingMore) return null;

    return (
      <View style={{ paddingVertical: moderateScale(20) }}>
        <ActivityIndicator
          size="small"
          color={colors.primary}
        />
      </View>
    );
  }, [loadingMore]);

  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']} style={styles.safe}>
        <View style={styles.header}>
          <AppText variant="h1">Explore</AppText>

          <AppText
            variant="caption"
            color={colors.textSecondary}>
            Showing {paginatedItems.length} of {filteredItems.length} Products
          </AppText>
        </View>

        <View style={styles.searchRow}>
          <SearchBar
            value={searchQuery}
            onChangeText={t => dispatch(setSearchQuery(t))}
            placeholder="Quick search products"
          />
        </View>


        <ViewToggle
          mode={viewMode}
          onChange={m => dispatch(setViewMode(m))}
        />


        {showInitialLoader ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : showError ? (
          <ErrorState
            message={error || 'Failed to load products.'}
            onRetry={onRefresh}
          />
        ) : sections.length === 0 ? (
          <EmptyState
            title="No products found"
            message={
              debouncedQuery
                ? 'Try a different search term.'
                : 'Pull down to refresh.'
            }
          />
        ) : (
          <SectionList
            sections={sectionListData}
            keyExtractor={(row, idx) =>
              row.map(p => p.id).join('-') + '-' + idx
            }
            stickySectionHeadersEnabled={false}
            renderItem={renderRow}
            renderSectionHeader={renderSectionHeader}
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: listBottomPad },
            ]}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={
              viewMode === 'grid' ? GridItemSeparator : ListItemSeparator
            }
            SectionSeparatorComponent={SectionSeparator}
            refreshControl={
              <RefreshControl
                refreshing={status === 'loading' && items.length > 0}
                onRefresh={onRefresh}
                tintColor={colors.primary}
              />
            }
            onEndReached={loadMore}
            onEndReachedThreshold={0.3}
            initialNumToRender={6}
            maxToRenderPerBatch={8}
            windowSize={9}
            removeClippedSubviews
            ListFooterComponent={renderFooter}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

const GridItemSeparator: React.FC = () => (
  <View style={{ height: spacing.md }} />
);
const ListItemSeparator: React.FC = () => null;
const SectionSeparator: React.FC = () => <View style={{ height: spacing.sm }} />;

function chunkRows<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.screenBg },
  safe: { flex: 1, backgroundColor: colors.screenBg },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  countRow: {
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: spacing.sm,
  },
  searchRow: { paddingHorizontal: SCREEN_PADDING, marginBottom: spacing.sm, marginTop: spacing.md },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: spacing.xs,
  },
  dotsCol: { flexDirection: 'row', alignItems: 'center' },
  dot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(4),
    marginRight: spacing.xs,
  },
  dotInactive: { backgroundColor: colors.starInactive },
  listContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: spacing.xxxl,
  },
  row: { flexDirection: 'row' },
  listRowItem: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default ProductListScreen;
