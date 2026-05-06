import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://farshad.io",
  integrations: [mdx()],
  vite: {
    server: {
      fs: {
        allow: ["..", "../..", "../../shared"],
      },
    },
  },
});
