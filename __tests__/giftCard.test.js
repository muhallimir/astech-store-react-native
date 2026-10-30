import { generateGiftCardCode, validateGiftCard, applyGiftCard, getGiftCardStatus } from '../utils/giftCard';

describe('Gift Card - ASTECH Feature 17', () => {
  test('generateGiftCardCode generates code', () => {
    const code = generateGiftCardCode();
    expect(code.length).toBeGreaterThan(0);
    expect(code).toContain('-');
  });

  test('validateGiftCard validates valid card', () => {
    const result = validateGiftCard({ code: 'ABCD-1234', balance: 50, expired: false });
    expect(result.valid).toBe(true);
  });

  test('validateGiftCard rejects expired', () => {
    const result = validateGiftCard({ code: 'ABCD-1234', balance: 50, expired: true });
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Card expired');
  });

  test('validateGiftCard rejects zero balance', () => {
    const result = validateGiftCard({ code: 'ABCD-1234', balance: 0, expired: false });
    expect(result.valid).toBe(false);
  });

  test('applyGiftCard applies correctly', () => {
    const result = applyGiftCard(100, 50);
    expect(result.appliedAmount).toBe(50);
    expect(result.newTotal).toBe(50);
    expect(result.remainingBalance).toBe(0);
  });

  test('applyGiftCard handles full payment', () => {
    const result = applyGiftCard(50, 100);
    expect(result.appliedAmount).toBe(50);
    expect(result.newTotal).toBe(0);
    expect(result.remainingBalance).toBe(50);
  });

  test('getGiftCardStatus returns status', () => {
    expect(getGiftCardStatus({ expired: true, balance: 50 })).toBe('expired');
    expect(getGiftCardStatus({ expired: false, balance: 0 })).toBe('depleted');
    expect(getGiftCardStatus({ expired: false, balance: 50 })).toBe('active');
  });
});