import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["./src/index.ts", "./src/layouts/*"],
  dts: true,
});
