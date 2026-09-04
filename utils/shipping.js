export const calculateShipping = (subtotal, expedited = false) => {
  const base = subtotal >= 100 ? 0 : 9.99;
  if (expedited) {
    return subtotal >= 100 ? 15 : 24.99;
  }
  return base;
};

export const calculateTax = (subtotal, rate = 0.08) => {
  return +(subtotal * rate).toFixed(2);
};

export const calculateOrderTotal = (subtotal, shipping, tax) => {
  return +(subtotal + shipping + tax).toFixed(2);
};
