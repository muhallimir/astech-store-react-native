import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'wishlistItems';

const readPersistedItems = () => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    const raw = AsyncStorage.getItem(STORAGE_KEY);
    if (typeof raw === 'string' && raw.length > 0) {
      return JSON.parse(raw);
    }
  } catch (e) {
    return [];
  }
  return [];
};

const initialState = {
  items: readPersistedItems(),
};

const persistItems = (items) => {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    // persistence is best-effort
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const productId = action.payload;
      if (!state.items.includes(productId)) {
        state.items.push(productId);
        persistItems(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((id) => id !== productId);
      persistItems(state.items);
    },
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter((id) => id !== productId);
      } else {
        state.items.push(productId);
      }
      persistItems(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      persistItems(state.items);
    },
    hydrateWishlist: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.items = action.payload;
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, hydrateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
