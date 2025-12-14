import { describe, it, expect } from "vitest";
import { zMelliCode, zCardNumber, zIranianMobile } from "./index";

describe("Iranian Validation Logic", () => {
  // --- Melli Code ---
  describe("Melli Code", () => {
    it("should validate correct melli code", () => {
      // این کد ملی از نظر ریاضی کاملاً صحیح است:
      // (1*10 + 2*9 + ... + 9*2) % 11 = 1 -> Remainder < 2 -> Check Digit = 1
      const validCode = "1234567891";
      expect(zMelliCode().safeParse(validCode).success).toBe(true);
    });

    it("should fail invalid melli code", () => {
      // این کد ظاهرش درسته اما ریاضیش غلطه
      expect(zMelliCode().safeParse("0067936168").success).toBe(false);
    });

    it("should use custom error message", () => {
      const result = zMelliCode({ message: "خطای اختصاصی" }).safeParse("000");
      if (result.success === false) {
        expect(result.error.issues[0].message).toBe("خطای اختصاصی");
      }
    });

    it("should use english locale", () => {
      const result = zMelliCode({ locale: "en" }).safeParse("000");
      if (result.success === false) {
        expect(result.error.issues[0].message).toBe("Invalid national code");
      }
    });
  });

  // --- Card Number ---
  describe("Card Number", () => {
    it("should validate correct card number", () => {
      // این یک الگوی معتبر Luhn است (تست شده)
      const validCard = "1111222233334444";
      expect(zCardNumber().safeParse(validCard).success).toBe(true);
    });

    it("should fail invalid card number", () => {
      // همان کارت بالا با تغییر رقم آخر
      const invalidCard = "1111222233334445";
      expect(zCardNumber().safeParse(invalidCard).success).toBe(false);
    });
  });

  // --- Mobile Number ---
  // این بخش تست می‌کند که آیا شماره موبایل‌های ایرانی درست تشخیص داده می‌شوند یا نه
  describe("Mobile Number", () => {
    it("should validate standard mobile", () => {
      expect(zIranianMobile().safeParse("09121111111").success).toBe(true);
    });

    it("should validate +98 format", () => {
      expect(zIranianMobile().safeParse("+989121111111").success).toBe(true);
    });

    it("should fail non-iranian mobile prefix", () => {
      expect(zIranianMobile().safeParse("08121111111").success).toBe(false);
    });
  });
});
