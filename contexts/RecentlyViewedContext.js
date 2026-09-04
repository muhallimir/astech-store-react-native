import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "astech.recentlyViewed";
const MAX_ITEMS = 12;
const Ctx = createContext({ items: [], track: () => {}, clear: () => {} });

export const RecentlyViewedProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          setItems(JSON.parse(raw));
        } catch {
          setItems([]);
        }
      }
    });
  }, []);

  const persist = (next) => {
    setItems(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const track = (product) => {
    if (!product || !product._id) return;
    const filtered = items.filter((p) => p._id !== product._id);
    const next = [product, ...filtered].slice(0, MAX_ITEMS);
    persist(next);
  };

  const clear = () => persist([]);

  return <Ctx.Provider value={{ items, track, clear }}>{children}</Ctx.Provider>;
};

export const useRecentlyViewed = () => useContext(Ctx);
export default Ctx;
