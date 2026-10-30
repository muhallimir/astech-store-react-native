import {
  getProductVariants,
  isVariantAvailable,
  getVariantStock,
  selectVariant,
  getVariantPrice,
  formatVariantLabel,
  isVariantSelected,
} from '../utils/variants';

describe('Product Variant Utils - ASTECH Feature 4', () => {
  const product = {
    _id: '1',
    name: 'T-Shirt',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'Blue', 'Black'],
  };

  test('getProductVariants returns sizes and colors', () => {
    const v = getProductVariants(product);
    expect(v.sizes).toEqual(['S', 'M', 'L', 'XL']);
    expect(v.colors).toEqual(['Red', 'Blue', 'Black']);
  });

  test('getProductVariants handles null', () => {
    const v = getProductVariants(null);
    expect(v.sizes).toEqual([]);
    expect(v.colors).toEqual([]);
  });

  test('isVariantAvailable checks stock', () => {
    const stock = { 'M-Red': 5, 'L-Blue': 0 };
    expect(isVariantAvailable({ size: 'M', color: 'Red' }, stock)).toBe(true);
    expect(isVariantAvailable({ size: 'L', color: 'Blue' }, stock)).toBe(false);
    expect(isVariantAvailable({ size: 'S', color: 'Red' }, stock)).toBe(false);
  });

  test('getVariantStock returns stock count', () => {
    const stock = { 'M-Red': 5 };
    expect(getVariantStock({ size: 'M', color: 'Red' }, stock)).toBe(5);
    expect(getVariantStock({ size: 'S', color: 'Red' }, stock)).toBe(0);
  });

  test('selectVariant creates variant object', () => {
    const v = selectVariant(null, 'M', 'Red');
    expect(v).toEqual({ size: 'M', color: 'Red' });
  });

  test('getVariantPrice applies modifier', () => {
    const modifiers = { 'M-Red': 5 };
    expect(getVariantPrice(100, { size: 'M', color: 'Red' }, modifiers)).toBe(105);
    expect(getVariantPrice(100, { size: 'S', color: 'Blue' }, modifiers)).toBe(100);
  });

  test('formatVariantLabel formats correctly', () => {
    expect(formatVariantLabel({ size: 'M', color: 'Red' })).toBe('Size: M | Color: Red');
    expect(formatVariantLabel({ size: 'L' })).toBe('Size: L');
    expect(formatVariantLabel(null)).toBe('');
  });

  test('isVariantSelected checks selection', () => {
    const current = { size: 'M', color: 'Red' };
    expect(isVariantSelected(current, 'M', 'Red')).toBe(true);
    expect(isVariantSelected(current, 'L', 'Red')).toBe(false);
    expect(isVariantSelected(null, 'M', 'Red')).toBe(false);
  });
});