// ASTECH Feature 19: Product Availability Alert utilities

export function createAvailabilityAlert(productId, email, userId) {
  if (!productId || !email) return null;
  if (!isValidEmail(email)) return null;
  return {
    id: `alert-${Date.now()}`,
    productId,
    email,
    userId: userId || null,
    createdAt: Date.now(),
    notified: false,
  };
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function getActiveAlerts(alerts, productId) {
  if (!Array.isArray(alerts)) return [];
  return alerts.filter(a => a.productId === productId && !a.notified);
}

export function markAlertNotified(alert) {
  if (!alert) return null;
  return { ...alert, notified: true, notifiedAt: Date.now() };
}

export function getAlertSummary(alerts) {
  if (!Array.isArray(alerts) || alerts.length === 0) return 'No alerts set';
  const active = alerts.filter(a => !a.notified).length;
  return `${active} active alert(s)`;
}