// Product Variant Selector utilities - pure functions for TDD

export function getProductVariants(product) {
  if (!product) return { sizes: [], colors: [] };
  return {
    sizes: product.sizes || [],
    colors: product.colors || [],
  };
}

export function isVariantAvailable(variant, stock) {
  if (!variant || !stock) return false;
  const key = `${variant.size}-${variant.color}`;
  return (stock[key] || 0) > 0;
}

export function getVariantStock(variant, stock) {
  if (!variant || !stock) return 0;
  const key = `${variant.size}-${variant.color}`;
  return stock[key] || 0;
}

export function selectVariant(current, size, color) {
  return { size, color };
}

export function getVariantPrice(basePrice, variant, priceModifiers = {}) {
  if (!variant) return basePrice;
  const key = `${variant.size}-${variant.color}`;
  const modifier = priceModifiers[key] || 0;
  return basePrice + modifier;
}

export function formatVariantLabel(variant) {
  if (!variant) return '';
  const parts = [];
  if (variant.size) parts.push(`Size: ${variant.size}`);
  if (variant.color) parts.push(`Color: ${variant.color}`);
  return parts.join(' | ');
}

export function isVariantSelected(current, size, color) {
  if (!current) return false;
  return current.size === size && current.color === color;
}