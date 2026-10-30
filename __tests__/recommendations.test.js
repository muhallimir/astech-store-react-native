import { getRecommendations, getFrequentlyBoughtTogether, getTrendingProducts, getNewArrivals } from '../utils/recommendations';

describe('Recommendations - ASTECH Feature 14', () => {
  const products = [
    { _id: '1', name: 'Laptop', category: 'Electronics', brand: 'Acer', numReviews: 10 },
    { _id: '2', name: 'Mouse', category: 'Electronics', brand: 'Logitech', numReviews: 5 },
    { _id: '3', name: 'Shirt', category: 'Clothing', brand: 'Nike', numReviews: 20 },
  ];

  test('getRecommendations filters by category/brand', () => {
    const recs = getRecommendations(products, '1');
    expect(recs.length).toBeGreaterThan(0);
    expect(recs.every(r => r._id !== '1')).toBe(true);
  });

  test('getRecommendations handles null', () => {
    expect(getRecommendations(null, '1')).toEqual([]);
  });

  test('getFrequentlyBoughtTogether returns items', () => {
    const items = getFrequentlyBoughtTogether(products, '1', 2);
    expect(items).toHaveLength(2);
  });

  test('getTrendingProducts sorts by reviews', () => {
    const trending = getTrendingProducts(products, 2);
    expect(trending[0]._id).toBe('3'); // most reviews
  });

  test('getNewArrivals sorts by createdAt', () => {
    const items = [
      { _id: '1', createdAt: 100 },
      { _id: '2', createdAt: 200 },
    ];
    const arrivals = getNewArrivals(items, 2);
    expect(arrivals[0]._id).toBe('2');
  });
});