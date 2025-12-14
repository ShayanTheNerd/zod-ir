import { z } from "zod";
import { isMelliCode, isCardNumber, isIranianMobile } from "./utils";
import { getMessage, BaseOptions } from "./constants";

/**
 * Zod schema for validating Iranian National Code (Melli Code).
 */
export const zMelliCode = (options?: BaseOptions) =>
  z.string().refine((val) => isMelliCode(val), {
    message: getMessage("melliCode", options),
  });

/**
 * Zod schema for validating Iranian Bank Card Numbers (Luhn Algorithm).
 */
export const zCardNumber = (options?: BaseOptions) =>
  z.string().refine((val) => isCardNumber(val), {
    message: getMessage("cardNumber", options),
  });

interface MobileOptions extends BaseOptions {
  strictZero?: boolean | "optional";
}

/**
 * Zod schema for validating Iranian Mobile Numbers.
 */
export const zIranianMobile = (options?: MobileOptions) =>
  z
    .string()
    .refine(
      (val) => isIranianMobile(val, { strictZero: options?.strictZero }),
      {
        message: getMessage("mobile", options),
      }
    );

// Export raw utility functions for non-Zod usage
export { isMelliCode, isCardNumber, isIranianMobile };
