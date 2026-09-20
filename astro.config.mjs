// @ts-check
import { defineConfig } from 'astro/config';
import remarkObsidian from './src/remark-obsidian.mjs';

// The club's custom domain. The same value is in public/CNAME.
// If this is ever emptied, the site falls back to the default GitHub Pages URL.
const CUSTOM_DOMAIN = 'llmsafetyclub.org';

const location = CUSTOM_DOMAIN
  ? { site: `https://${CUSTOM_DOMAIN}`, base: '/' }
  : { site: 'https://llmsafetyclub.github.io', base: '/Website' };

export default defineConfig({
  ...location,
  markdown: {
    remarkPlugins: [[remarkObsidian, { contentDir: 'content', base: location.base }]],
  },
});
