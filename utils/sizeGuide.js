// ASTECH Feature 16: Size Guide utilities

export const SIZE_GUIDE = {
  S: { chest: '34-36', waist: '28-30', length: '27' },
  M: { chest: '38-40', waist: '32-34', length: '28' },
  L: { chest: '42-44', waist: '36-38', length: '29' },
  XL: { chest: '46-48', waist: '40-42', length: '30' },
  XXL: { chest: '50-52', waist: '44-46', length: '31' },
};

export function getSizeGuide(size) {
  return SIZE_GUIDE[size] || null;
}

export function getRecommendedSize(measurements) {
  if (!measurements) return null;
  const { chest, waist } = measurements;
  if (chest <= 36 && waist <= 30) return 'S';
  if (chest <= 40 && waist <= 34) return 'M';
  if (chest <= 44 && waist <= 38) return 'L';
  if (chest <= 48 && waist <= 42) return 'XL';
  return 'XXL';
}

export function formatSizeGuide(guide) {
  if (!guide) return '';
  return `Chest: ${guide.chest}in, Waist: ${guide.waist}in, Length: ${guide.length}in`;
}

export function getAllSizes() {
  return Object.keys(SIZE_GUIDE);
}