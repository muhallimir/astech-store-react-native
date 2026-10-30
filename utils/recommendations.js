// ASTECH Feature 14: Product Recommendations utilities

export function getRecommendations(products, currentProductId, limit = 4) {
  if (!Array.isArray(products) || !currentProductId) return [];
  const current = products.find(p => (p._id || p.id) === currentProductId);
  if (!current) return [];
  return products
    .filter(p => (p._id || p.id) !== currentProductId)
    .filter(p => p.category === current.category || p.brand === current.brand)
    .slice(0, limit);
}

export function getFrequentlyBoughtTogether(products, currentProductId, limit = 3) {
  if (!Array.isArray(products)) return [];
  return products
    .filter(p => (p._id || p.id) !== currentProductId)
    .slice(0, limit);
}

export function getTrendingProducts(products, limit = 5) {
  if (!Array.isArray(products)) return [];
  return [...products]
    .sort((a, b) => (b.numReviews || 0) - (a.numReviews || 0))
    .slice(0, limit);
}

export function getNewArrivals(products, limit = 5) {
  if (!Array.isArray(products)) return [];
  return [...products]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, limit);
}