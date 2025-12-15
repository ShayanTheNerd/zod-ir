<div align="center">
  <h1>zod-ir</h1>
  <p>
    <strong>Comprehensive Zod validations for Iranian data structures</strong>
  </p>
  <p>
    A lightweight, TypeScript-first extension for Zod.
    <br />
    Compatible with React Hook Form, Next.js, and Node.js.
  </p>
  
  <p>
    <a href="[https://www.npmjs.com/package/zod-ir](https://www.npmjs.com/package/zod-ir)">
      <img src="[https://img.shields.io/npm/v/zod-ir?style=flat-square&color=blue](https://img.shields.io/npm/v/zod-ir?style=flat-square&color=blue)" alt="npm version" />
    </a>
    <a href="[https://bundlephobia.com/result?p=zod-ir](https://bundlephobia.com/result?p=zod-ir)">
      <img src="[https://img.shields.io/bundlephobia/minzip/zod-ir?style=flat-square&color=green](https://img.shields.io/bundlephobia/minzip/zod-ir?style=flat-square&color=green)" alt="bundle size" />
    </a>
    <a href="[https://www.npmjs.com/package/zod-ir](https://www.npmjs.com/package/zod-ir)">
      <img src="[https://img.shields.io/npm/l/zod-ir?style=flat-square&color=orange](https://img.shields.io/npm/l/zod-ir?style=flat-square&color=orange)" alt="license" />
    </a>
  </p>
</div>

<hr />

## Features ✨

* ✅ **National Code:** Validates using the official checksum algorithm.
* 💳 **Bank Card:** Validates 16-digit card numbers (Luhn algorithm).
* 📱 **Mobile Number:** Validates `09xx`, `+989xx`, `9xx`.
* 🏦 **Sheba (IBAN):** Validates structure and checksum (ISO 7064).
* 📮 **Postal Code:** Validates 10-digit Iranian postal codes.
* ☎️ **Landline:** Validates fixed line numbers with area codes.
* 🌍 **Bilingual:** Built-in error messages in **Persian** and **English**.

---

## Installation 📦

```bash
npm install zod zod-ir
# or
yarn add zod zod-ir

Usage 🚀
1. Basic Validation

```bash
import { z } from "zod";
import { 
  zMelliCode, 
  zIranianMobile, 
  zCardNumber,
  zSheba,
  zPostalCode,
  zLandline
} from "zod-ir";

const UserSchema = z.object({
  // 1. National Code (Default Persian Error)
  nationalCode: zMelliCode(),
  
  // 2. Mobile (Strict Mode: Must start with 0)
  mobile: zIranianMobile({ strictZero: true, message: "شماره موبایل اشتباه است" }),
  
  // 3. Bank Card
  card: zCardNumber(),

  // 4. Sheba (IBAN) - English Error
  iban: zSheba({ locale: "en" }),

  // 5. Postal Code
  postal: zPostalCode(),

  // 6. Landline (Phone)
  phone: zLandline({ message: "تلفن ثابت نامعتبر است" })
});

// Example Usage
const result = UserSchema.safeParse({
  nationalCode: "1234567891",
  mobile: "09121234567",
  card: "6037991155667788",
  iban: "IR120770000000000000000001",
  postal: "1234567890",
  phone: "02122334455"
});

if (!result.success) {
  console.log(result.error.issues);
}


2. Usage with React Hook Form 📋
```bash
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { zMelliCode } from "zod-ir";

const schema = z.object({
  nationalId: zMelliCode({ message: "کد ملی صحیح نیست" })
});

export default function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(d => console.log(d))}>
      <input {...register("nationalId")} placeholder="Code Melli" />
      <p>{errors.nationalId?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}

API Reference 📚
Validator	Description	Options
zMelliCode	National ID validation	message, locale
zCardNumber	Bank Card (Luhn) validation	message, locale
zIranianMobile	Mobile Number validation	strictZero, message, locale
zSheba	IBAN (Sheba) validation	message, locale
zPostalCode	Postal Code validation	message, locale
zLandline	Landline phone validation	message, locale


