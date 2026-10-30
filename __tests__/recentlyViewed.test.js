import {
  addToRecentlyViewed,
  getRecentlyViewed,
  clearRecentlyViewed,
  getRecentlyViewedCount,
  isRecentlyViewed,
  formatViewedTime,
  MAX_RECENTLY_VIEWED,
} from '../utils/recentlyViewed';

describe('Recently Viewed Utils - ASTECH Feature 7', () => {
  const p1 = { _id: '1', name: 'Product 1' };
  const p2 = { _id: '2', name: 'Product 2' };

  test('MAX_RECENTLY_VIEWED is 10', () => {
    expect(MAX_RECENTLY_VIEWED).toBe(10);
  });

  test('addToRecentlyViewed adds product', () => {
    const result = addToRecentlyViewed([], p1);
    expect(result).toHaveLength(1);
    expect(result[0]._id).toBe('1');
    expect(result[0].viewedAt).toBeDefined();
  });

  test('addToRecentlyViewed moves duplicate to front', () => {
    const result = addToRecentlyViewed([p1, p2], p1);
    expect(result).toHaveLength(2);
    expect(result[0]._id).toBe('1');
  });

  test('addToRecentlyViewed limits to max', () => {
    let items = [];
    for (let i = 0; i < 12; i++) {
      items = addToRecentlyViewed(items, { _id: String(i), name: `P${i}` });
    }
    expect(items).toHaveLength(10);
  });

  test('addToRecentlyViewed handles invalid', () => {
    expect(addToRecentlyViewed([], null)).toEqual([]);
    expect(addToRecentlyViewed([], {})).toEqual([]);
  });

  test('getRecentlyViewed sorts by viewedAt desc', () => {
    const items = [
      { _id: '1', viewedAt: 1000 },
      { _id: '2', viewedAt: 2000 },
    ];
    const sorted = getRecentlyViewed(items);
    expect(sorted[0]._id).toBe('2');
  });

  test('clearRecentlyViewed returns empty', () => {
    expect(clearRecentlyViewed()).toEqual([]);
  });

  test('getRecentlyViewedCount returns count', () => {
    expect(getRecentlyViewedCount([p1, p2])).toBe(2);
    expect(getRecentlyViewedCount(null)).toBe(0);
  });

  test('isRecentlyViewed checks membership', () => {
    expect(isRecentlyViewed([p1], '1')).toBe(true);
    expect(isRecentlyViewed([p1], '99')).toBe(false);
  });

  test('formatViewedTime formats correctly', () => {
    expect(formatViewedTime(Date.now())).toBe('Just now');
    expect(formatViewedTime(Date.now() - 300000)).toBe('5m ago');
  });

  test('formatViewedTime handles null', () => {
    expect(formatViewedTime(null)).toBe('');
  });
});