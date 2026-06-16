// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output (default) — Cloudflare Pages serves the built `dist/` directly.
// Build command: `npm run build`; output dir: `dist`.
export default defineConfig({
  site: 'https://artemisorthoapp.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
