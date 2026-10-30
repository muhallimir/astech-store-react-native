// ASTECH Feature 21: Search Suggestions utilities

export function getSearchSuggestions(products, query, limit = 5) {
  if (!Array.isArray(products) || !query) return [];
  const term = query.toLowerCase().trim();
  if (term.length < 2) return [];
  const suggestions = new Set();
  products.forEach(p => {
    if (p.name && p.name.toLowerCase().includes(term)) suggestions.add(p.name);
    if (p.category && p.category.toLowerCase().includes(term)) suggestions.add(p.category);
    if (p.brand && p.brand.toLowerCase().includes(term)) suggestions.add(p.brand);
  });
  return [...suggestions].slice(0, limit);
}

export function highlightMatch(text, query) {
  if (!text || !query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return {
    before: text.substring(0, idx),
    match: text.substring(idx, idx + query.length),
    after: text.substring(idx + query.length),
  };
}

export function getRecentSearches(searches, limit = 5) {
  if (!Array.isArray(searches)) return [];
  return [...new Set(searches)].slice(0, limit);
}

export function addRecentSearch(searches, query) {
  if (!query || query.trim().length === 0) return searches;
  const filtered = searches.filter(s => s !== query);
  return [query, ...filtered].slice(0, 10);
}