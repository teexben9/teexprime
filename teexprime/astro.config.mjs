// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Set SITE_URL to the real domain when it is known. Used for canonical and language links.
export default defineConfig({
  site: process.env.SITE_URL || 'https://teexprime.com',
  trailingSlash: 'always',
  // Cast: Tailwind's Vite types can differ from Astro's bundled Vite version.
  vite: { plugins: [/** @type {any} */ (tailwindcss())] },
});
