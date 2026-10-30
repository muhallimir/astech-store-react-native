// ASTECH Feature 15: Flash Sale Timer utilities

export function getTimeRemaining(endTime) {
  if (!endTime) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  const diff = new Date(endTime).getTime() - Date.now();
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { hours, minutes, seconds, expired: false };
}

export function formatCountdown(remaining) {
  if (!remaining || remaining.expired) return 'Expired';
  const { hours, minutes, seconds } = remaining;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function isFlashSaleActive(sale) {
  if (!sale) return false;
  const now = Date.now();
  return now >= new Date(sale.startTime).getTime() && now <= new Date(sale.endTime).getTime();
}

export function getDiscountedPrice(originalPrice, discountPercent) {
  if (!originalPrice || !discountPercent) return originalPrice;
  return originalPrice * (1 - discountPercent / 100);
}

export function getFlashSaleBadge(sale) {
  if (!sale) return null;
  return {
    text: `${sale.discountPercent}% OFF`,
    color: '#dc2626',
    bgColor: '#fef2f2',
  };
}