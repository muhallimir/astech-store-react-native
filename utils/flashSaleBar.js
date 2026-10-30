// ASTECH Feature 20: Flash Sale Bar utilities

export function getFlashSaleProducts(products, saleEndTime) {
  if (!Array.isArray(products)) return [];
  const now = Date.now();
  if (saleEndTime && now > saleEndTime) return [];
  return products.filter(p => p.onSale || p.discountPercent > 0);
}

export function getFlashSaleCountdown(endTime) {
  if (!endTime) return null;
  const diff = new Date(endTime).getTime() - Date.now();
  if (diff <= 0) return { expired: true, hours: 0, minutes: 0, seconds: 0 };
  return {
    expired: false,
    hours: Math.floor(diff / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export function formatFlashSaleCountdown(countdown) {
  if (!countdown || countdown.expired) return 'Sale Ended';
  const { hours, minutes, seconds } = countdown;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function getFlashSaleDiscount(product) {
  if (!product) return 0;
  return product.discountPercent || 0;
}

export function isFlashSaleActive(sale) {
  if (!sale) return false;
  const now = Date.now();
  return now >= new Date(sale.startTime).getTime() && now <= new Date(sale.endTime).getTime();
}