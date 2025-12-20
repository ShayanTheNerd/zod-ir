export function verifyAndNormalize(value: string): string {
  if (!value) return "";
  const PERSIAN_ZERO = 1776;
  const PERSIAN_NINE = 1785;
  const ARABIC_ZERO = 1632;
  const ARABIC_NINE = 1641;
  const ARABIC_YEH = 1610;
  const PERSIAN_YE = 1740;
  const ARABIC_KAF = 1603;
  const PERSIAN_KE = 1705;

  let result = "";
  for (let i = 0; i < value.length; i++) {
    const code = value.charCodeAt(i);
    let char = value[i];

    if (code >= PERSIAN_ZERO && code <= PERSIAN_NINE) {
      char = String(code - PERSIAN_ZERO);
    } else if (code >= ARABIC_ZERO && code <= ARABIC_NINE) {
      char = String(code - ARABIC_ZERO);
    } else if (code === ARABIC_YEH) {
      char = String.fromCharCode(PERSIAN_YE);
    } else if (code === ARABIC_KAF) {
      char = String.fromCharCode(PERSIAN_KE);
    }
    result += char;
  }
  return result;
}
