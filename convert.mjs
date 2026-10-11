// Usage:  node convert.mjs <input-folder> <output-folder>
// Example: node convert.mjs originals/carousel-a public/images/graphics/carousel-a
//
// Converts every PNG/JPG in the input folder to WebP (quality 80, max 1600px wide),
// numbered in natural order: 01.webp, 02.webp, 03.webp ...

import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';

const [input, output] = process.argv.slice(2);
if (!input || !output) {
  console.log('Usage: node convert.mjs <input-folder> <output-folder>');
  process.exit(1);
}

await mkdir(output, { recursive: true });

// natural sort so "slide (2)" comes before "slide (10)"
const collator = new Intl.Collator(undefined, { numeric: true });
const files = (await readdir(input))
  .filter((f) => ['.png', '.jpg', '.jpeg'].includes(path.extname(f).toLowerCase()))
  .sort(collator.compare);

if (files.length === 0) {
  console.log('No PNG or JPG files found in', input);
  process.exit(1);
}

for (const [i, file] of files.entries()) {
  const outName = `${String(i + 1).padStart(2, '0')}.webp`;
  await sharp(path.join(input, file))
    .resize({ width: 1600, withoutEnlargement: true }) // never scales small images up
    .webp({ quality: 80 })
    .toFile(path.join(output, outName));
  console.log(`${file}  ->  ${outName}`);
}

console.log(`Done. ${files.length} file(s) written to ${output}`);
