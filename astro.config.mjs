// @ts-check
import { defineConfig } from 'astro/config';
import { getSiteUrl } from "./src/lib/site-url.js";

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(process.env.SITE_URL),
});
