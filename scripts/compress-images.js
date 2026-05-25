/* eslint-disable no-console */
/**
 * One-shot image compression for public/assets/images.
 *
 * Walks every PNG/JPG/JPEG/JFIF, resizes it down to MAX_WIDTH if larger,
 * re-encodes with optimal compression, and replaces the original in place.
 *
 * - File names and extensions are preserved (no broken refs in code).
 * - PNGs stay PNG (palette + max compression), JPEGs stay JPEG (q=82,
 *   mozjpeg). JFIF is normalised to JPEG bytes under the .jfif filename.
 * - Run: `node scripts/compress-images.js`
 */

const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..', 'public', 'assets', 'images');
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 82;
const PNG_COMPRESSION = 9;

const EXT_RE = /\.(png|jpe?g|jfif)$/i;

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT_RE.test(entry.name)) yield full;
  }
}

async function compressOne(file) {
  const ext = path.extname(file).toLowerCase();
  const before = (await fs.stat(file)).size;

  const input = sharp(file, { failOn: 'none' });
  const meta = await input.metadata();
  const needsResize = (meta.width || 0) > MAX_WIDTH;
  const pipeline = needsResize
    ? input.resize({ width: MAX_WIDTH, withoutEnlargement: true })
    : input;

  let buffer;
  if (ext === '.png') {
    // palette: false → lossless. palette mode produced banding on
    // photographic backgrounds (hero, brand-story). For real shrinkage
    // on photo PNGs, convert to .jpg manually outside this script.
    buffer = await pipeline
      .png({ compressionLevel: PNG_COMPRESSION, palette: false, effort: 10 })
      .toBuffer();
  } else {
    // jpg / jpeg / jfif → mozjpeg, kept under original extension
    buffer = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
  }

  if (buffer.length >= before) {
    return { file, before, after: before, skipped: true };
  }
  await fs.writeFile(file, buffer);
  return { file, before, after: buffer.length, skipped: false };
}

async function main() {
  const stats = await fs.stat(ROOT).catch(() => null);
  if (!stats || !stats.isDirectory()) {
    console.error(`Image root not found: ${ROOT}`);
    process.exit(1);
  }

  console.log(`Scanning ${ROOT} ...`);
  const files = [];
  for await (const f of walk(ROOT)) files.push(f);
  console.log(`Found ${files.length} candidate files.\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let touched = 0;

  for (const file of files) {
    try {
      const res = await compressOne(file);
      totalBefore += res.before;
      totalAfter += res.after;
      const rel = path.relative(ROOT, res.file);
      if (res.skipped) {
        console.log(`= ${rel}  (kept: ${formatBytes(res.before)})`);
      } else {
        const pct = Math.round((1 - res.after / res.before) * 100);
        console.log(
          `↓ ${rel}  ${formatBytes(res.before)} → ${formatBytes(res.after)}  (-${pct}%)`
        );
        touched++;
      }
    } catch (err) {
      console.error(`! ${file}: ${err.message}`);
    }
  }

  const savedPct = totalBefore
    ? Math.round((1 - totalAfter / totalBefore) * 100)
    : 0;
  console.log(
    `\nDone. Compressed ${touched}/${files.length} files. ${formatBytes(
      totalBefore
    )} → ${formatBytes(totalAfter)} (-${savedPct}% total).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
