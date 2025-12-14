export function isMelliCode(code: string): boolean {
  if (!/^\d{10}$/.test(code)) return false;
  if (/^(\d)\1+$/.test(code)) return false;

  const check = parseInt(code[9]);
  const sum =
    code
      .substring(0, 9)
      .split("")
      .reduce((acc, x, i) => acc + parseInt(x) * (10 - i), 0) % 11;

  return sum < 2 ? check === sum : check === 11 - sum;
}

export function isCardNumber(code: string): boolean {
  const sanitized = code.replace(/[\-\s]/g, "");
  if (!/^\d{16}$/.test(sanitized)) return false;

  let sum = 0;
  let shouldDouble = false;

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
  strictZero?: boolean | "optional";
}

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

export function isSheba(code: string): boolean {
  const iban = code.toUpperCase().replace(/[\-\s]/g, "");

  if (iban.length !== 26 || !iban.startsWith("IR")) return false;

  const newStr = iban.substring(4) + iban.substring(0, 4);

  const numericString = newStr
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);
      return code >= 48 && code <= 57 ? char : (code - 55).toString();
    })
    .join("");

  try {
    const remainder = BigInt(numericString) % BigInt(97);
    return remainder === BigInt(1);
  } catch {
    return false;
  }
}

export function isPostalCode(code: string): boolean {
  return /^[1-9]\d{9}$/.test(code);
}

export function isLandline(code: string): boolean {
  return /^0\d{2}\d{8}$/.test(code);
}
