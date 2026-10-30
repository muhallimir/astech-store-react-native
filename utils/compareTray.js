// ASTECH Feature 28: Compare Tray utilities

export function addToCompareTray(tray, product, maxItems = 3) {
  if (!product) return tray;
  if (tray.some(p => (p._id || p.id) === (product._id || product.id))) return tray;
  if (tray.length >= maxItems) return tray;
  return [...tray, product];
}

export function removeFromCompareTray(tray, productId) {
  return tray.filter(p => (p._id || p.id) !== productId);
}

export function canCompareProducts(tray, product) {
  if (tray.length === 0) return { ok: true };
  const group = tray[0].category;
  if (product.category !== group) return { ok: false, reason: 'Different category' };
  if (tray.length >= 3) return { ok: false, reason: 'Max 3 products' };
  if (tray.some(p => (p._id || p.id) === (product._id || product.id))) return { ok: false, reason: 'Already added' };
  return { ok: true };
}

export function getCompareTrayCount(tray) {
  return Array.isArray(tray) ? tray.length : 0;
}

export function clearCompareTray() {
  return [];
}