export function isCardNumber(code: string): boolean {
  if (!/^\d{16}$/.test(code)) return false;

  let sum = 0;
  for (let i = 0; i < 16; i++) {
    let digit = parseInt(code[i]);
    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
}
