// ASTECH Feature 11: Product Wishlist Sharing utilities

export function createWishlistShareLink(userId, items) {
  if (!userId || !Array.isArray(items) || items.length === 0) return '';
  const itemIds = items.map(i => i._id || i.id).join(',');
  return `https://astech-store.app/wishlist/${userId}?items=${itemIds}`;
}

export function parseWishlistLink(link) {
  if (!link) return { userId: null, itemIds: [] };
  try {
    const url = new URL(link);
    const pathParts = url.pathname.split('/');
    const userId = pathParts[pathParts.length - 1];
    const items = url.searchParams.get('items');
    const itemIds = items ? items.split(',') : [];
    return { userId, itemIds };
  } catch {
    return { userId: null, itemIds: [] };
  }
}

export function getWishlistShareText(items) {
  if (!Array.isArray(items) || items.length === 0) return '';
  return `Check out my wishlist with ${items.length} item(s)!`;
}

export function canShareWishlist(items) {
  return Array.isArray(items) && items.length > 0;
}