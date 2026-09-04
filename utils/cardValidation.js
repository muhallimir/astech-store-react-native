export const luhnCheck = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
};

export const detectCardBrand = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, "");
  if (/^4/.test(digits)) return "visa";
  if (/^5[1-5]/.test(digits)) return "mastercard";
  if (/^3[47]/.test(digits)) return "amex";
  if (/^6(?:011|5)/.test(digits)) return "discover";
  return "unknown";
};

export const maskCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 4) return digits;
  return "**** **** **** " + digits.slice(-4);
};

export const isValidExpiry = (mmYY) => {
  const match = mmYY.match(/^(\d{2})\/?(\d{2})$/);
  if (!match) return false;
  const month = parseInt(match[1], 10);
  if (month < 1 || month > 12) return false;
  const year = 2000 + parseInt(match[2], 10);
  const now = new Date();
  const exp = new Date(year, month, 0);
  return exp >= new Date(now.getFullYear(), now.getMonth(), 1);
};
