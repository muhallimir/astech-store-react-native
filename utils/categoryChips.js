// ASTECH Feature 27: Category Chips utilities

export function getCategoryChips(products) {
  if (!Array.isArray(products)) return ['All'];
  const seen = new Set();
  const categories = [];
  products.forEach(p => {
    if (p.category && !seen.has(p.category)) {
      seen.add(p.category);
      categories.push(p.category);
    }
  });
  return ['All', ...categories];
}

export function getCategoryCount(products, category) {
  if (!Array.isArray(products)) return 0;
  if (category === 'All') return products.length;
  return products.filter(p => p.category === category).length;
}

export function isCategoryActive(active, category) {
  return active === category;
}