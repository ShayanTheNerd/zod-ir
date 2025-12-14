import { describe, it, expect } from "vitest";
import {
  zMelliCode,
  zCardNumber,
  zIranianMobile,
  zSheba,
  zPostalCode,
  zLandline,
} from "./index";

describe("Zod Iranian Utils Tests", () => {
  describe("Melli Code", () => {
    it("should pass valid code", () => {
      expect(zMelliCode().safeParse("1234567891").success).toBe(true);
    });
    it("should fail invalid code", () => {
      expect(zMelliCode().safeParse("1234567890").success).toBe(false);
    });
  });

  describe("Card Number", () => {
    it("should pass valid card", () => {
      expect(zCardNumber().safeParse("1111222233334444").success).toBe(true);
    });
    it("should fail invalid card", () => {
      expect(zCardNumber().safeParse("1111222233334445").success).toBe(false);
    });
  });

  describe("Mobile", () => {
    it("should pass standard mobile", () => {
      expect(zIranianMobile().safeParse("09120001122").success).toBe(true);
    });
    it("should respect strictZero", () => {
      const schema = zIranianMobile({ strictZero: true });
      expect(schema.safeParse("9120001122").success).toBe(false);
    });
  });

  describe("Sheba (IBAN)", () => {
    it("should pass valid IR Sheba", () => {
      const validSheba = "IR330620000000202901868005";
      expect(zSheba().safeParse(validSheba).success).toBe(true);
    });

    it("should fail invalid length", () => {
      expect(zSheba().safeParse("IR123").success).toBe(false);
    });

    it("should fail invalid checksum", () => {
      const invalidSheba = "IR020770000000000000000002";
      expect(zSheba().safeParse(invalidSheba).success).toBe(false);
    });
  });

  describe("Postal Code", () => {
    it("should pass valid postal code", () => {
      expect(zPostalCode().safeParse("1234567890").success).toBe(true);
    });
    it("should fail if starts with 0", () => {
      expect(zPostalCode().safeParse("0123456789").success).toBe(false);
    });
    it("should fail if not 10 digits", () => {
      expect(zPostalCode().safeParse("12345").success).toBe(false);
    });
  });

  describe("Landline", () => {
    it("should pass valid landline", () => {
      expect(zLandline().safeParse("02122334455").success).toBe(true);
    });
    it("should fail if no area code", () => {
      expect(zLandline().safeParse("22334455").success).toBe(false);
    });
  });
});
