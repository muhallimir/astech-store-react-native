import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  addToComparison,
  removeFromComparison,
  isInComparison,
  canAddMore,
  clearComparison,
} from '../utils/comparison';

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [items, setItems] = useState([]);

  const add = useCallback((product) => {
    setItems(prev => addToComparison(prev, product));
  }, []);

  const remove = useCallback((productId) => {
    setItems(prev => removeFromComparison(prev, productId));
  }, []);

  const toggle = useCallback((product) => {
    if (isInComparison(items, product._id)) {
      remove(product._id);
    } else if (canAddMore(items)) {
      add(product);
    }
  }, [items, add, remove]);

  const clear = useCallback(() => {
    setItems(clearComparison());
  }, []);

  const value = {
    items,
    add,
    remove,
    toggle,
    clear,
    isInComparison: (id) => isInComparison(items, id),
    canAddMore: () => canAddMore(items),
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within CompareProvider');
  }
  return context;
}