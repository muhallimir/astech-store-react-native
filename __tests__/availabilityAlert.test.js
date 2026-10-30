import { createAvailabilityAlert, isValidEmail, getActiveAlerts, markAlertNotified, getAlertSummary } from '../utils/availabilityAlert';

describe('Availability Alert - ASTECH Feature 19', () => {
  test('isValidEmail validates email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('invalid')).toBe(false);
  });

  test('createAvailabilityAlert creates alert', () => {
    const alert = createAvailabilityAlert('prod1', 'test@example.com', 'user1');
    expect(alert).not.toBeNull();
    expect(alert.productId).toBe('prod1');
    expect(alert.email).toBe('test@example.com');
    expect(alert.notified).toBe(false);
  });

  test('createAvailabilityAlert rejects invalid email', () => {
    expect(createAvailabilityAlert('prod1', 'invalid', 'user1')).toBeNull();
  });

  test('createAvailabilityAlert rejects missing productId', () => {
    expect(createAvailabilityAlert(null, 'test@example.com')).toBeNull();
  });

  test('getActiveAlerts filters active', () => {
    const alerts = [
      { productId: 'prod1', notified: false },
      { productId: 'prod1', notified: true },
    ];
    const active = getActiveAlerts(alerts, 'prod1');
    expect(active).toHaveLength(1);
  });

  test('markAlertNotified marks notified', () => {
    const alert = { notified: false };
    const result = markAlertNotified(alert);
    expect(result.notified).toBe(true);
    expect(result.notifiedAt).toBeDefined();
  });

  test('getAlertSummary formats', () => {
    const alerts = [{ notified: false }, { notified: true }];
    expect(getAlertSummary(alerts)).toBe('1 active alert(s)');
    expect(getAlertSummary([])).toBe('No alerts set');
  });
});