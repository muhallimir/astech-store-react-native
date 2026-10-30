import { saveForLater, moveToCart, getSavedCount, isSaved, getSavedTotal } from '../utils/saveForLater';

describe('Save for Later - ASTECH Feature 13', () => {
  const cart = [{ _id: '1', name: 'Laptop', price: 999, qty: 1 }];

  test('saveForLater moves item', () => {
    const result = saveForLater(cart, '1');
    expect(result.cart).toHaveLength(0);
    expect(result.saved).toHaveLength(1);
  });

  test('saveForLater handles not found', () => {
    const result = saveForLater(cart, '99');
    expect(result.cart).toHaveLength(1);
    expect(result.saved).toHaveLength(0);
  });

  test('moveToCart moves item back', () => {
    const saved = [{ _id: '1', name: 'Laptop', price: 999, qty: 1 }];
    const result = moveToCart(saved, '1');
    expect(result.cart).toHaveLength(1);
    expect(result.saved).toHaveLength(0);
  });

  test('getSavedCount returns count', () => {
    expect(getSavedCount([{ _id: '1' }])).toBe(1);
    expect(getSavedCount(null)).toBe(0);
  });

  test('isSaved checks membership', () => {
    expect(isSaved([{ _id: '1' }], '1')).toBe(true);
    expect(isSaved([{ _id: '1' }], '2')).toBe(false);
  });

  test('getSavedTotal calculates total', () => {
    expect(getSavedTotal([{ price: 100, qty: 2 }])).toBe(200);
  });
});