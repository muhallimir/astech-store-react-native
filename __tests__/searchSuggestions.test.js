import { getSearchSuggestions, highlightMatch, getRecentSearches, addRecentSearch } from '../utils/searchSuggestions';

describe('Search Suggestions - ASTECH Feature 21', () => {
  const products = [
    { name: 'Laptop Acer', category: 'Electronics', brand: 'Acer' },
    { name: 'Mouse Logitech', category: 'Electronics', brand: 'Logitech' },
  ];

  test('getSearchSuggestions returns suggestions', () => {
    const suggestions = getSearchSuggestions(products, 'lap');
    expect(suggestions.length).toBeGreaterThan(0);
  });

  test('getSearchSuggestions returns empty for short query', () => {
    expect(getSearchSuggestions(products, 'l')).toEqual([]);
  });

  test('highlightMatch highlights', () => {
    const result = highlightMatch('Laptop', 'lap');
    expect(result.match).toBe('Lap');
  });

  test('addRecentSearch adds query', () => {
    const result = addRecentSearch([], 'laptop');
    expect(result).toContain('laptop');
  });

  test('getRecentSearches returns unique', () => {
    const result = getRecentSearches(['a', 'b', 'a'], 5);
    expect(result).toHaveLength(2);
  });
});