
export type Language = "fa" | "en";

export const ERROR_MESSAGES = {
  fa: {
    melliCode: "کد ملی نامعتبر است",
    cardNumber: "شماره کارت نامعتبر است",
    mobile: "شماره موبایل نامعتبر است",
  },
  en: {
    melliCode: "Invalid National Code",
    cardNumber: "Invalid Card Number",
    mobile: "Invalid Mobile Number",
  },
};

export interface BaseOptions {
  /**
   * پیام خطای اختصاصی (اگر وارد شود، اولویت دارد)
   */
  message?: string;
  /**
   * زبان پیام خطا (پیش‌فرض: fa)
   */
  locale?: Language;
}

export const getMessage = (
  opts?: BaseOptions,
  key: keyof typeof ERROR_MESSAGES.fa = "melliCode"
) => {
  if (opts?.message) return opts.message;
  const lang = opts?.locale || "fa";
  return ERROR_MESSAGES[lang][key];
};
