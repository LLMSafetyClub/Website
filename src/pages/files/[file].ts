// Publishes every file in the vault's attachments folder at /files/<name>, so notes can
// link to or embed PDFs and other documents.
import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute } from 'astro';

const dir = path.resolve('content/attachments');

const TYPES: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ipynb': 'application/json',
  '.zip': 'application/zip',
};

export async function getStaticPaths() {
  const files = await fs.readdir(dir).catch(() => []);
  return files.filter((file) => !file.startsWith('.')).map((file) => ({ params: { file } }));
}

export const GET: APIRoute = async ({ params }) => {
  const file = path.basename(params.file ?? '');
  const body = await fs.readFile(path.join(dir, file));
  const type = TYPES[path.extname(file).toLowerCase()] ?? 'application/octet-stream';
  return new Response(new Uint8Array(body), { headers: { 'Content-Type': type } });
};
