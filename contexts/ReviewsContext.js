import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "astech.reviews";
const Ctx = createContext({
  reviewsByProduct: {},
  addReview: () => {},
  averageFor: () => ({ average: 0, count: 0 }),
});

const seedReviews = {
  8: [
    {
      id: "r1",
      productId: 8,
      name: "Mira K.",
      rating: 4,
      comment: "Solid laptop, runs cool under load. Screen is gorgeous.",
      createdAt: "2024-12-04T18:12:00Z",
    },
    {
      id: "r2",
      productId: 8,
      name: "Devon S.",
      rating: 3,
      comment: "Battery life is fine but the touchpad takes getting used to.",
      createdAt: "2025-01-21T08:00:00Z",
    },
  ],
};

export const ReviewsProvider = ({ children }) => {
  const [reviewsByProduct, setReviewsByProduct] = useState(seedReviews);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const stored = JSON.parse(raw);
          setReviewsByProduct({ ...seedReviews, ...stored });
        } catch {
          /* keep seed */
        }
      }
    });
  }, []);

  const persist = (next) => {
    setReviewsByProduct(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addReview = ({ productId, name, rating, comment }) => {
    if (!productId || !name) return;
    const id = `r_${Date.now()}`;
    const entry = {
      id,
      productId,
      name,
      rating: Math.max(1, Math.min(5, Number(rating) || 0)),
      comment: comment || "",
      createdAt: new Date().toISOString(),
    };
    const existing = reviewsByProduct[productId] || [];
    const next = {
      ...reviewsByProduct,
      [productId]: [entry, ...existing],
    };
    persist(next);
    return entry;
  };

  const averageFor = (productId) => {
    const list = reviewsByProduct[productId] || [];
    if (list.length === 0) return { average: 0, count: 0 };
    const total = list.reduce((sum, r) => sum + r.rating, 0);
    return { average: +(total / list.length).toFixed(2), count: list.length };
  };

  return (
    <Ctx.Provider value={{ reviewsByProduct, addReview, averageFor }}>
      {children}
    </Ctx.Provider>
  );
};

export const useReviews = () => useContext(Ctx);
export default Ctx;
