// @ts-check
import { defineConfig } from 'astro/config';

// Set this to the club's custom domain (e.g. 'llmsafetyclub.org') once DNS is
// pointed at GitHub Pages, and put the same value in public/CNAME.
// While it is empty the site is served from the default GitHub Pages URL.
const CUSTOM_DOMAIN = '';

export default defineConfig(
  CUSTOM_DOMAIN
    ? { site: `https://${CUSTOM_DOMAIN}` }
    : { site: 'https://llmsafetyclub.github.io', base: '/Website' },
);
