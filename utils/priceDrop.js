// Price Drop Alert utilities - pure functions for TDD

export function checkPriceDrop(product, previousPrice) {
  if (!product || previousPrice == null) return null;
  const currentPrice = Number(product.price);
  if (isNaN(currentPrice) || isNaN(previousPrice)) return null;
  if (currentPrice < previousPrice) {
    const drop = previousPrice - currentPrice;
    const percentDrop = ((drop / previousPrice) * 100).toFixed(1);
    return {
      productId: product._id,
      productName: product.name,
      previousPrice,
      currentPrice,
      dropAmount: drop,
      percentDrop: Number(percentDrop),
      isOnSale: true,
    };
  }
  return null;
}

export function getPriceDropBadge(alert) {
  if (!alert) return null;
  return {
    text: `${alert.percentDrop}% OFF`,
    color: '#dc2626',
    bgColor: '#fef2f2',
  };
}

export function filterPriceDrops(alerts) {
  if (!Array.isArray(alerts)) return [];
  return alerts.filter(a => a && a.isOnSale);
}

export function getPriceDropMessage(alert) {
  if (!alert) return '';
  return `${alert.productName} dropped from $${alert.previousPrice.toFixed(2)} to $${alert.currentPrice.toFixed(2)} (${alert.percentDrop}% off)`;
}

export function sortPriceDrops(alerts, order = 'desc') {
  if (!Array.isArray(alerts)) return [];
  const sorted = [...alerts].sort((a, b) => b.percentDrop - a.percentDrop);
  return order === 'asc' ? sorted.reverse() : sorted;
}