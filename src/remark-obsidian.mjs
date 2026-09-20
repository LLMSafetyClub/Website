// Lets notes written in Obsidian render on the site as they look in Obsidian:
//   ![[figure.png]] and ![[figure.png|alt text]]  image embeds from content/attachments/
//   [[Some note]] and [[Some note|label]]          links to the event, post, or page with that file name
//   > [!note] Title                                callouts
//   %%private comment%%                            removed
import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import { visit, SKIP } from 'unist-util-visit';

const IMAGE = /\.(png|jpe?g|gif|webp|avif|svg)$/i;
const TOKEN = /(!?)\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]/g;
const ROUTES = { events: '/events/', posts: '/blog/' };
const PAGES = { home: '/', about: '/about/', join: '/join/', events: '/events/', blog: '/blog/', materials: '/materials/', announcements: '/announcements/' };

const slug = (name) => new GithubSlugger().slug(name);

function noteUrls(contentDir) {
  const urls = new Map();
  for (const [folder, route] of Object.entries(ROUTES)) {
    const dir = path.join(contentDir, folder);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (file.endsWith('.md')) urls.set(slug(file.slice(0, -3)), `${route}${slug(file.slice(0, -3))}/`);
    }
  }
  for (const [name, url] of Object.entries(PAGES)) if (!urls.has(name)) urls.set(name, url);
  return urls;
}

export default function remarkObsidian({ contentDir = 'content', base = '/' } = {}) {
  const root = path.resolve(contentDir);
  const prefix = base.replace(/\/$/, '');

  return (tree, file) => {
    const urls = noteUrls(root);
    const fromDir = file.path ? path.dirname(file.path) : root;

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === undefined) return;
      const value = node.value.replace(/%%[\s\S]*?%%/g, '');
      if (value === node.value && !value.includes('[[')) return;

      const out = [];
      let last = 0;
      for (const match of value.matchAll(TOKEN)) {
        const [whole, bang, rawTarget, label] = match;
        const target = rawTarget.split('#')[0].trim();
        if (match.index > last) out.push({ type: 'text', value: value.slice(last, match.index) });
        last = match.index + whole.length;

        if (bang && IMAGE.test(target)) {
          const abs = path.join(root, 'attachments', path.basename(target));
          let url = path.relative(fromDir, abs).split(path.sep).join('/');
          if (!url.startsWith('.')) url = `./${url}`;
          // Obsidian uses the part after | for a pixel width; only keep it when it is real alt text.
          const alt = label && !/^\d+(x\d+)?$/.test(label) ? label : '';
          out.push({ type: 'image', url, alt, title: null });
        } else {
          const text = label || path.basename(target);
          const url = urls.get(slug(path.basename(target).replace(/\.md$/, '')));
          out.push(
            url && !bang
              ? { type: 'link', url: `${prefix}${url}`, title: null, children: [{ type: 'text', value: text }] }
              : { type: 'text', value: text },
          );
        }
      }
      if (last < value.length) out.push({ type: 'text', value: value.slice(last) });

      parent.children.splice(index, 1, ...out);
      return [SKIP, index + out.length];
    });

    visit(tree, 'blockquote', (node) => {
      const first = node.children[0];
      const lead = first?.type === 'paragraph' ? first.children[0] : undefined;
      const match = lead?.type === 'text' ? lead.value.match(/^\[!(\w+)\][+-]?[ \t]*([^\n]*)\n?/) : null;
      if (!match) return;

      const [whole, kind, title] = match;
      lead.value = lead.value.slice(whole.length);
      if (!lead.value) first.children.shift();
      if (first.children.length === 0) node.children.shift();

      const heading = title || kind.charAt(0).toUpperCase() + kind.slice(1).toLowerCase();
      node.children.unshift({
        type: 'paragraph',
        data: { hProperties: { className: ['callout-title'] } },
        children: [{ type: 'text', value: heading }],
      });
      node.data = { hName: 'aside', hProperties: { className: ['callout'], 'data-callout': kind.toLowerCase() } };
    });
  };
}
