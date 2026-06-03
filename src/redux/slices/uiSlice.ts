import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ViewMode = 'grid' | 'list';

export interface UiState {
  viewMode: ViewMode;
  searchQuery: string;
  isOnline: boolean;
  hasSeenIntro: boolean;
  favorites: number[];
  cart: Record<number, number>;
}

const initialState: UiState = {
  viewMode: 'grid',
  searchQuery: '',
  isOnline: true,
  hasSeenIntro: false,
  favorites: [],
  cart: {},
};

function ensureUiArrays(state: UiState): void {
  if (!Array.isArray(state.favorites)) {
    state.favorites = [];
  }
  if (!state.cart || typeof state.cart !== 'object') {
    state.cart = {};
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload;
    },
    toggleViewMode(state) {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid';
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setOnline(state, action: PayloadAction<boolean>) {
      state.isOnline = action.payload;
    },
    setHasSeenIntro(state, action: PayloadAction<boolean>) {
      state.hasSeenIntro = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      ensureUiArrays(state);
      const id = action.payload;
      const idx = state.favorites.indexOf(id);
      if (idx === -1) {
        state.favorites.push(id);
      } else {
        state.favorites.splice(idx, 1);
      }
    },
    addToCart(state, action: PayloadAction<{id: number; qty?: number}>) {
      ensureUiArrays(state);
      const {id, qty = 1} = action.payload;
      state.cart[id] = (state.cart[id] || 0) + qty;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      ensureUiArrays(state);
      delete state.cart[action.payload];
    },
  },
});

export const {
  setViewMode,
  toggleViewMode,
  setSearchQuery,
  setOnline,
  setHasSeenIntro,
  toggleFavorite,
  addToCart,
  removeFromCart,
} = uiSlice.actions;

export default uiSlice.reducer;
