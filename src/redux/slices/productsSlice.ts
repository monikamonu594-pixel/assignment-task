import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchAllProducts, fetchProductById} from '../../api/productApi';
import {ApiError} from '../../api/apiClient';
import {Product} from '../../types/product';

export type ListStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ProductsState {
  items: Product[];
  byId: Record<number, Product>;
  status: ListStatus;
  detailStatus: Record<number, ListStatus>;
  error: string | null;
  lastFetchedAt: number | null;
}

const initialState: ProductsState = {
  items: [],
  byId: {},
  status: 'idle',
  detailStatus: {},
  error: null,
  lastFetchedAt: null,
};

export const loadProducts = createAsyncThunk<
  Product[],
  void,
  {rejectValue: string}
>('products/loadAll', async (_, {rejectWithValue}) => {
  try {
    return await fetchAllProducts();
  } catch (e) {
    const message =
      e instanceof ApiError ? e.message : 'Failed to load products.';
    return rejectWithValue(message);
  }
});

export const loadProductDetail = createAsyncThunk<
  Product,
  number,
  {rejectValue: string}
>('products/loadDetail', async (id, {rejectWithValue}) => {
  try {
    return await fetchProductById(id);
  } catch (e) {
    const message =
      e instanceof ApiError ? e.message : 'Failed to load product detail.';
    return rejectWithValue(message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    hydrateProductFromCache(state, action: PayloadAction<Product>) {
      state.byId[action.payload.id] = action.payload;
    },
    clearProductsError(state) {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProducts.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastFetchedAt = Date.now();
        action.payload.forEach(p => {
          state.byId[p.id] = p;
        });
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load products.';
      })
      .addCase(loadProductDetail.pending, (state, action) => {
        state.detailStatus[action.meta.arg] = 'loading';
      })
      .addCase(loadProductDetail.fulfilled, (state, action) => {
        state.detailStatus[action.payload.id] = 'succeeded';
        state.byId[action.payload.id] = action.payload;
      })
      .addCase(loadProductDetail.rejected, (state, action) => {
        state.detailStatus[action.meta.arg] = 'failed';
      });
  },
});

export const {hydrateProductFromCache, clearProductsError} =
  productsSlice.actions;

export default productsSlice.reducer;
