import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsReducer from './slices/productsSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  version: 2,
  whitelist: ['products', 'ui'],
  migrate: (state: unknown) => {
    const s = state as {
      ui?: {favorites?: unknown; cart?: unknown};
    } | undefined;
    if (s?.ui) {
      if (!Array.isArray(s.ui.favorites)) {
        s.ui.favorites = [];
      }
      if (!s.ui.cart || typeof s.ui.cart !== 'object') {
        s.ui.cart = {};
      }
    }
    return Promise.resolve(state as never);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
