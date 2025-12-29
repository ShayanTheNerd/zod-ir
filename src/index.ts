import { z } from "zod";
import { verifyAndNormalize } from "./utils/helpers";
import { getMessage, BaseOptions } from "./locales";

interface CryptoOptions extends BaseOptions {
  ticker?: "TRX" | "ETH" | "BTC";
}

import { isMelliCode, isShenaseMelli, isPassport } from "./modules/identity";
import {
  isCardNumber,
  isSheba,
  getBankInfo,
  getFinancialInfo,
  isFinancialValue,
  type BankInfo,
  type FinancialInfo,
} from "./modules/financial";
import {
  isIranianMobile,
  getMobileOperator,
  isPostalCode,
  getPostalCodeInfo,
  isLandline,
  getLandlineInfo,
  type OperatorInfo,
  type PostalCodeInfo,
  type LandlineInfo,
} from "./modules/contact";
import { isPlateNumber, getPlateInfo, type PlateInfo } from "./modules/vehicle";
import {
  isBillIdValid,
  isPaymentIdValid,
  getBillInfo,
  type BillInfo,
} from "./modules/bill";
import {
  isJalaliDate,
  getJalaliDateInfo,
  type JalaliDateInfo,
} from "./modules/date";
import {
  isCryptoAddress,
  getCryptoInfo,
  type CryptoInfo,
} from "./modules/crypto";
import {
  transformToCurrency,
  formatCurrency,
  numberToText,
} from "./modules/currency";

export const zMelliCode = (options?: BaseOptions) =>
  z.string().refine((val) => isMelliCode(val), {
    message: getMessage("melliCode", options),
  });

export const zShenaseMelli = (options?: BaseOptions) =>
  z.string().refine((val) => isShenaseMelli(val), {
    message: getMessage("shenaseMelli", options),
  });

export const zPassport = (options?: BaseOptions) =>
  z.string().refine((val) => isPassport(val), {
    message: getMessage("passport", options),
  });

export const zCardNumber = (options?: BaseOptions) =>
  z.string().refine((val) => isCardNumber(val), {
    message: getMessage("cardNumber", options),
  });

export const zToman = (
  options?: { min?: number; max?: number } & BaseOptions
) =>
  z.preprocess(
    (val) =>
      typeof val === "string" || typeof val === "number"
        ? transformToCurrency(val)
        : val,
    z
      .number({ invalid_type_error: getMessage("currency", options) })
      .min(options?.min ?? 0, getMessage("currencyMin", options))
      .max(
        options?.max ?? Number.MAX_SAFE_INTEGER,
        getMessage("currencyMax", options)
      )
  );

export const zRial = zToman;

export const zCurrencyRich = (
  options?: { min?: number; max?: number } & BaseOptions
) =>
  z
    .string()
    .or(z.number())
    .transform((val, ctx) => {
      const num = transformToCurrency(val);

      if (num === null || isNaN(num)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: getMessage("currency", options),
        });
        return z.NEVER;
      }

      if (options?.min !== undefined && num < options.min) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: getMessage("currencyMin", options),
        });
      }

      if (options?.max !== undefined && num > options.max) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: getMessage("currencyMax", options),
        });
      }

      return {
        value: num,
        formatted: formatCurrency(num),
        text: numberToText(num),
      };
    });

interface MobileOptions extends BaseOptions {
  strictZero?: boolean | "optional";
}

export const zIranianMobile = (options?: MobileOptions) =>
  z
    .string()
    .refine(
      (val) => isIranianMobile(val, { strictZero: options?.strictZero }),
      { message: getMessage("mobile", options) }
    );

export const zSheba = (options?: BaseOptions) =>
  z.string().refine((val) => isSheba(val), {
    message: getMessage("sheba", options),
  });

export const zPostalCode = (options?: BaseOptions) =>
  z.string().refine((val) => isPostalCode(val), {
    message: getMessage("postalCode", options),
  });

export const zLandline = (options?: BaseOptions) =>
  z.string().refine((val) => isLandline(val), {
    message: getMessage("landline", options),
  });

export const zBillId = (options?: BaseOptions) =>
  z.string().refine((val) => isBillIdValid(val), {
    message: getMessage("billId", options),
  });

export const zPaymentId = (options?: BaseOptions) =>
  z.string().refine((val) => val.length >= 6 && val.length <= 13, {
    message: getMessage("paymentId", options),
  });

export const zPlateNumber = (options?: BaseOptions) =>
  z.string().refine((val) => isPlateNumber(val), {
    message: getMessage("plateNumber", options),
  });

export const zJalaliDate = (options?: BaseOptions) =>
  z.string().refine((val) => isJalaliDate(val), {
    message: getMessage("date", options),
  });

export const zFinancial = (options?: BaseOptions) =>
  z.string().refine((val) => isFinancialValue(val), {
    message: getMessage("financial", options),
  });

export const zCrypto = (options?: CryptoOptions) =>
  z.string().refine((val) => isCryptoAddress(val, options?.ticker), {
    message: getMessage("crypto", options),
  });

export const preprocessNumber = (schema: z.ZodTypeAny) =>
  z.preprocess((val) => {
    if (typeof val === "string") {
      return verifyAndNormalize(val);
    }
    return val;
  }, schema);

export {
  verifyAndNormalize,
  isMelliCode,
  isShenaseMelli,
  isPassport,
  isCardNumber,
  isSheba,
  getBankInfo,
  isIranianMobile,
  getMobileOperator,
  isPostalCode,
  getPostalCodeInfo,
  isLandline,
  getLandlineInfo,
  isPlateNumber,
  getPlateInfo,
  isBillIdValid,
  isPaymentIdValid,
  getBillInfo,
  isJalaliDate,
  getJalaliDateInfo,
  getFinancialInfo,
  isFinancialValue,
  isCryptoAddress,
  getCryptoInfo,
  transformToCurrency,
  formatCurrency,
  numberToText,
  type CryptoInfo,
  type JalaliDateInfo,
  type BankInfo,
  type OperatorInfo,
  type PostalCodeInfo,
  type LandlineInfo,
  type BillInfo,
  type PlateInfo,
  type BaseOptions,
  type FinancialInfo,
};
