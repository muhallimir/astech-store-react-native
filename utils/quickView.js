// Quick View Modal utilities - pure functions for TDD

export function getQuickViewData(product) {
  if (!product) return null;
  return {
    id: product._id,
    name: product.name || 'Unknown Product',
    price: product.price || 0,
    image: product.image || '',
    rating: product.rating || 0,
    numReviews: product.numReviews || 0,
    description: product.description || '',
    category: product.category || 'General',
    inStock: product.countInStock > 0,
    stockCount: product.countInStock || 0,
  };
}

export function formatQuickViewPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

export function getStockStatus(countInStock) {
  if (countInStock <= 0) return { text: 'Out of Stock', color: '#dc2626', available: false };
  if (countInStock <= 5) return { text: `Only ${countInStock} left`, color: '#f59e0b', available: true };
  return { text: 'In Stock', color: '#16a34a', available: true };
}

export function truncateDescription(desc, maxLength = 150) {
  if (!desc) return '';
  if (desc.length <= maxLength) return desc;
  return desc.substring(0, maxLength).trim() + '...';
}