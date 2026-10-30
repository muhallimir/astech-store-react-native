// Recently Viewed Products utilities - pure functions for TDD

export const MAX_RECENTLY_VIEWED = 10;

export function addToRecentlyViewed(current, product) {
  if (!product || !product._id) return current;
  const filtered = current.filter(p => p._id !== product._id);
  const entry = { ...product, viewedAt: Date.now() };
  return [entry, ...filtered].slice(0, MAX_RECENTLY_VIEWED);
}

export function getRecentlyViewed(current) {
  if (!Array.isArray(current)) return [];
  return [...current].sort((a, b) => (b.viewedAt || 0) - (a.viewedAt || 0));
}

export function clearRecentlyViewed() {
  return [];
}

export function getRecentlyViewedCount(current) {
  if (!Array.isArray(current)) return 0;
  return current.length;
}

export function isRecentlyViewed(current, productId) {
  if (!Array.isArray(current)) return false;
  return current.some(p => p._id === productId);
}

export function formatViewedTime(timestamp) {
  if (!timestamp) return '';
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}