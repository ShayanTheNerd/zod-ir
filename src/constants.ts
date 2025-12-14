/**
 * Default error messages for validation failures.
 * Supports Persian (fa) and English (en).
 */
export const ERROR_MESSAGES = {
  fa: {
    melliCode: "کد ملی نامعتبر است",
    cardNumber: "شماره کارت نامعتبر است",
    mobile: "شماره موبایل نامعتبر است",
  },
  en: {
    melliCode: "Invalid national code",
    cardNumber: "Invalid card number",
    mobile: "Invalid mobile number",
  },
} as const;

export type Language = keyof typeof ERROR_MESSAGES;

export interface BaseOptions {
  /** Custom error message to override the default one */
  message?: string;
  /** Language for the default error message (default: 'fa') */
  locale?: Language;
}

/**
 * Helper to resolve the error message based on options.
 */
export const getMessage = (
  key: keyof (typeof ERROR_MESSAGES)["fa"],
  options?: BaseOptions
): string => {
  if (options?.message) return options.message;
  const lang = options?.locale || "fa";
  return ERROR_MESSAGES[lang][key];
};
