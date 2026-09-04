export const PROMO_CODES = {
  SAVE10: { type: "percent", value: 10, label: "10% off" },
  WELCOME20: { type: "percent", value: 20, label: "20% off" },
  FREESHIP: { type: "shipping", value: 0, label: "Free shipping" },
  FLAT15: { type: "fixed", value: 15, label: "$15 off" },
};

export const validatePromoCode = (code) => {
  if (!code) return { valid: false, reason: "empty" };
  const normalized = code.trim().toUpperCase();
  const promo = PROMO_CODES[normalized];
  if (!promo) return { valid: false, reason: "unknown" };
  return { valid: true, code: normalized, ...promo };
};

export const calculateDiscount = (subtotal, shipping, promo) => {
  if (!promo || !promo.valid) return { discount: 0, shipping };
  if (promo.type === "percent") {
    return { discount: +(subtotal * (promo.value / 100)).toFixed(2), shipping };
  }
  if (promo.type === "fixed") {
    return { discount: Math.min(promo.value, subtotal), shipping };
  }
  if (promo.type === "shipping") {
    return { discount: 0, shipping: 0 };
  }
  return { discount: 0, shipping };
};
