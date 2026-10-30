// ASTECH Feature 13: Save for Later utilities

export function saveForLater(cartItems, productId) {
  const item = cartItems.find(i => (i._id || i.id) === productId);
  if (!item) return { cart: cartItems, saved: [] };
  return {
    cart: cartItems.filter(i => (i._id || i.id) !== productId),
    saved: [item],
  };
}

export function moveToCart(savedItems, productId) {
  const item = savedItems.find(i => (i._id || i.id) === productId);
  if (!item) return { cart: [], saved: savedItems };
  return {
    cart: [item],
    saved: savedItems.filter(i => (i._id || i.id) !== productId),
  };
}

export function getSavedCount(savedItems) {
  return Array.isArray(savedItems) ? savedItems.length : 0;
}

export function isSaved(savedItems, productId) {
  if (!Array.isArray(savedItems)) return false;
  return savedItems.some(i => (i._id || i.id) === productId);
}

export function getSavedTotal(savedItems) {
  if (!Array.isArray(savedItems)) return 0;
  return savedItems.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
}