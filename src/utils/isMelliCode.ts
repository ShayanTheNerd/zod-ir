export function isMelliCode(code: string): boolean {
  if (!/^\d{10}$/.test(code)) return false;

  const check = parseInt(code[9]);
  const sum =
    code
      .substring(0, 9)
      .split("")
      .reduce((acc, x, i) => acc + parseInt(x) * (10 - i), 0) % 11;

  return sum < 2 ? check === sum : check === 11 - sum;
}
