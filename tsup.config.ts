import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // خروجی هم برای CommonJS هم ES Modules
  dts: true, // تولید فایل‌های تایپ (Typescript Declaration)
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true, // فشرده‌سازی کد نهایی
});
