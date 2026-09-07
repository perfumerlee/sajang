import { lstat, realpath, rm } from 'node:fs/promises';
import { dirname, resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
// Fixed, disposable Astro generated files and Astro/Vite caches only.
const caches = ['.astro', 'node_modules/.astro', 'node_modules/.vite'];

for (const cache of caches) {
  const target = resolve(root, cache);
  let info;
  try {
    info = await lstat(target);
  } catch (error) {
    if (error.code === 'ENOENT') continue;
    throw error;
  }
  const resolved = await realpath(target);
  const withinRoot = relative(root, resolved);
  if (info.isSymbolicLink() || !info.isDirectory() ||
      !withinRoot || withinRoot.startsWith('..') || isAbsolute(withinRoot) || resolved !== target) {
    throw new Error(`Refusing to clean unexpected cache path: ${target}`);
  }
  await rm(target, { recursive: true, force: true });
  console.log(`Removed regenerable cache: ${cache}`);
}
