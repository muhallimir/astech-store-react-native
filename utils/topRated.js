// ASTECH Feature 22: Top Rated Spotlight utilities

export function getTopRatedProducts(products, limit = 4) {
  if (!Array.isArray(products)) return [];
  return [...products]
    .filter(p => (p.rating || 0) >= 4)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0) || (b.numReviews || 0) - (a.numReviews || 0))
    .slice(0, limit);
}

export function getSpotlightBadge(product) {
  if (!product) return null;
  if ((product.rating || 0) >= 4.5) return { text: 'Top Rated', color: '#f59e0b', icon: '⭐' };
  if ((product.rating || 0) >= 4) return { text: 'Highly Rated', color: '#3b82f6', icon: '👍' };
  return null;
}

export function isTopRated(product, threshold = 4) {
  if (!product) return false;
  return (product.rating || 0) >= threshold;
}