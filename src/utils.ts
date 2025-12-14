/**
 * Validates Iranian National Code (Melli Code) based on the official algorithm.
 * @param code The 10-digit national code string.
 */
export function isMelliCode(code: string): boolean {
  // Basic format check
  if (!/^\d{10}$/.test(code)) return false;

  // Check for repeated digits (e.g., 1111111111) which are invalid
  const check = parseInt(code[9]);
  if (/^(\d)\1+$/.test(code)) return false;

  // Calculate control digit
  const sum =
    code
      .substring(0, 9)
      .split("")
      .reduce((acc, x, i) => acc + parseInt(x) * (10 - i), 0) % 11;

  return sum < 2 ? check === sum : check === 11 - sum;
}

/**
 * Validates Bank Card Number using the Luhn algorithm.
 * @param code The 16-digit card number.
 */
export function isCardNumber(code: string): boolean {
  // Remove hyphens or spaces if present
  const sanitized = code.replace(/[\-\s]/g, "");
  if (!/^\d{16}$/.test(sanitized)) return false;

  let sum = 0;
  let shouldDouble = false;

  // Traverse from right to left
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i]);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

interface MobileValidationOptions {
  /**
   * strictZero:
   * - true: Must start with 0 (e.g., 0912...)
   * - false: Must NOT start with 0 (e.g., 912...)
   * - "optional": Both are accepted (default)
   */
  strictZero?: boolean | "optional";
}

/**
 * Validates Iranian Mobile Number.
 * Supports 09xx, 9xx, and +989xx formats.
 */
export function isIranianMobile(
  mobile: string,
  { strictZero = "optional" }: MobileValidationOptions = {}
): boolean {
  const corePattern = "9\\d{9}";
  let pattern = "";

  if (strictZero === true) {
    pattern = `^0${corePattern}$`;
  } else if (strictZero === false) {
    pattern = `^${corePattern}$`;
  } else {
    pattern = `^(?:0|\\+98)?${corePattern}$`;
  }

  return new RegExp(pattern).test(mobile);
}
