import { verifyAndNormalize } from "../utils/helpers";
import { MOBILE_OPERATORS } from "../data/constants";

export type OperatorInfo = {
  name: string;
  label: string;
  logo: string;
} | null;

export function getMobileOperator(mobile: string): OperatorInfo {
  const normalized = verifyAndNormalize(mobile);
  let prefix = "";
  if (normalized.startsWith("09")) {
    prefix = normalized.substring(0, 4);
  } else if (normalized.startsWith("9")) {
    prefix = "0" + normalized.substring(0, 3);
  } else if (normalized.startsWith("+98")) {
    prefix = "0" + normalized.substring(3, 6);
  }
  if (prefix.length !== 4) return null;
  for (const [key, op] of Object.entries(MOBILE_OPERATORS)) {
    // @ts-ignore
    if (op.prefixes.includes(prefix)) {
      return {
        name: key,
        label: op.label,
        logo: op.logo,
      };
    }
  }
  return null;
}

interface MobileValidationOptions {
  strictZero?: boolean | "optional";
}

export function isIranianMobile(
  mobile: string,
  { strictZero = "optional" }: MobileValidationOptions = {}
): boolean {
  const normalized = verifyAndNormalize(mobile);
  const corePattern = "9\\d{9}";
  let pattern = "";
  if (strictZero === true) pattern = `^0${corePattern}$`;
  else if (strictZero === false) pattern = `^${corePattern}$`;
  else pattern = `^(?:0|\\+98)?${corePattern}$`;
  return new RegExp(pattern).test(normalized);
}

export function isPostalCode(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  return /^[1-9]\d{9}$/.test(normalized);
}

export function isLandline(code: string): boolean {
  const normalized = verifyAndNormalize(code);
  return /^0\d{2}\d{8}$/.test(normalized);
}
