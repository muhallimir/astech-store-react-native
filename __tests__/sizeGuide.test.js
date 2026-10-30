import { getSizeGuide, getRecommendedSize, formatSizeGuide, getAllSizes } from '../utils/sizeGuide';

describe('Size Guide - ASTECH Feature 16', () => {
  test('getSizeGuide returns guide', () => {
    const guide = getSizeGuide('M');
    expect(guide).not.toBeNull();
    expect(guide.chest).toBe('38-40');
  });

  test('getSizeGuide returns null for unknown', () => {
    expect(getSizeGuide('XXXL')).toBeNull();
  });

  test('getRecommendedSize recommends correctly', () => {
    expect(getRecommendedSize({ chest: 36, waist: 28 })).toBe('S');
    expect(getRecommendedSize({ chest: 42, waist: 36 })).toBe('L');
  });

  test('formatSizeGuide formats correctly', () => {
    const guide = getSizeGuide('M');
    expect(formatSizeGuide(guide)).toContain('Chest');
  });

  test('getAllSizes returns all sizes', () => {
    expect(getAllSizes()).toContain('S');
    expect(getAllSizes()).toContain('XXL');
  });
});