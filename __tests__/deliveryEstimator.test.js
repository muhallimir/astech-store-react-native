import { estimateDeliveryDate, formatDeliveryDate, getShippingOptions, getShippingCost, isFreeShippingEligible } from '../utils/deliveryEstimator';

describe('Delivery Estimator - ASTECH Feature 24', () => {
  test('estimateDeliveryDate returns date', () => {
    const date = estimateDeliveryDate('standard');
    expect(date).toBeInstanceOf(Date);
  });

  test('formatDeliveryDate formats', () => {
    const date = new Date('2024-01-15');
    expect(formatDeliveryDate(date)).toContain('Jan');
  });

  test('getShippingOptions returns options', () => {
    const options = getShippingOptions();
    expect(options).toHaveLength(3);
  });

  test('getShippingCost returns cost', () => {
    expect(getShippingCost('standard', 60)).toBe(0); // free
    expect(getShippingCost('express', 60)).toBe(9.99);
  });

  test('isFreeShippingEligible checks threshold', () => {
    expect(isFreeShippingEligible(60)).toBe(true);
    expect(isFreeShippingEligible(30)).toBe(false);
  });
});