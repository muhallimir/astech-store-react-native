// ASTECH Feature 17: Gift Card utilities

export function generateGiftCardCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 16; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
    if ((i + 1) % 4 === 0 && i < 15) code += '-';
  }
  return code;
}

export function validateGiftCard(card) {
  if (!card) return { valid: false, error: 'Invalid card' };
  if (!card.code) return { valid: false, error: 'Missing code' };
  if (card.balance <= 0) return { valid: false, error: 'No balance' };
  if (card.expired) return { valid: false, error: 'Card expired' };
  return { valid: true, balance: card.balance };
}

export function applyGiftCard(cartTotal, cardBalance) {
  const applied = Math.min(cartTotal, cardBalance);
  return {
    appliedAmount: applied,
    remainingBalance: cardBalance - applied,
    newTotal: Math.max(0, cartTotal - applied),
  };
}

export function getGiftCardStatus(card) {
  if (!card) return 'invalid';
  if (card.expired) return 'expired';
  if (card.balance <= 0) return 'depleted';
  return 'active';
}