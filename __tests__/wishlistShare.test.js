import { createWishlistShareLink, parseWishlistLink, getWishlistShareText, canShareWishlist } from '../utils/wishlistShare';

describe('Wishlist Sharing - ASTECH Feature 11', () => {
  test('createWishlistShareLink creates link', () => {
    const link = createWishlistShareLink('user1', [{ _id: '1' }, { _id: '2' }]);
    expect(link).toContain('user1');
    expect(link).toContain('items=1,2');
  });

  test('createWishlistShareLink handles empty', () => {
    expect(createWishlistShareLink('user1', [])).toBe('');
    expect(createWishlistShareLink(null, [])).toBe('');
  });

  test('parseWishlistLink parses correctly', () => {
    const result = parseWishlistLink('https://astech-store.app/wishlist/user1?items=1,2');
    expect(result.userId).toBe('user1');
    expect(result.itemIds).toEqual(['1', '2']);
  });

  test('parseWishlistLink handles invalid', () => {
    const result = parseWishlistLink('invalid');
    expect(result.userId).toBeNull();
    expect(result.itemIds).toEqual([]);
  });

  test('getWishlistShareText formats', () => {
    expect(getWishlistShareText([{ _id: '1' }, { _id: '2' }])).toBe('Check out my wishlist with 2 item(s)!');
    expect(getWishlistShareText([])).toBe('');
  });

  test('canShareWishlist checks items', () => {
    expect(canShareWishlist([{ _id: '1' }])).toBe(true);
    expect(canShareWishlist([])).toBe(false);
  });
});