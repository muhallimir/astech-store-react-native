// ASTECH Feature 26: Sort Select utilities

export const SORT_OPTIONS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price_asc', label: 'Price: Low to High' },
  { key: 'price_desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Highest Rated' },
  { key: 'newest', label: 'Newest First' },
  { key: 'name', label: 'Name: A-Z' },
];

export function sortProducts(products, sortBy) {
  if (!Array.isArray(products)) return [];
  const sorted = [...products];
  switch (sortBy) {
    case 'price_asc': return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case 'price_desc': return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    case 'rating': return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    case 'newest': return sorted.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    case 'name': return sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    default: return sorted;
  }
}

export function getSortLabel(key) {
  const option = SORT_OPTIONS.find(o => o.key === key);
  return option ? option.label : 'Featured';
}