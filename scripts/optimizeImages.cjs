/**
 * Generates lightweight WebP versions of every studio photo.
 *
 *   media/originals/wedding/RUDRA0288.JPG
 *     -> media/opt/800/wedding/RUDRA0288.webp   (cards & grids)
 *     -> media/opt/1920/wedding/RUDRA0288.webp  (hero & lightbox)
 *
 * Already-generated files are skipped, so re-running only processes new photos.
 * Usage: npm run optimize-images
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_DIR = path.join(__dirname, "..", "media", "originals");
const OUT_DIR = path.join(__dirname, "..", "media", "opt");
const WIDTHS = [800, 1920];
const EXTENSIONS = new Set([".jpg", ".jpeg", ".png"]);

sharp.concurrency(2);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return EXTENSIONS.has(path.extname(entry.name).toLowerCase()) ? [full] : [];
  });
}

async function optimize(file) {
  const rel = path.relative(SRC_DIR, file).replace(/\.[^.]+$/, ".webp");
  for (const width of WIDTHS) {
    const out = path.join(OUT_DIR, String(width), rel);
    if (fs.existsSync(out)) continue;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    await sharp(file, { limitInputPixels: false, failOn: "none" })
      .rotate() // respect camera EXIF orientation
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width > 1000 ? 80 : 75 })
      .toFile(out);
  }
}

// Client logos: media/logos-src/*  ->  media/logos/<slug>.webp (whitespace trimmed, 180px tall)
const LOGO_SRC = path.join(__dirname, "..", "media", "logos-src");
const LOGO_OUT = path.join(__dirname, "..", "media", "logos");

async function optimizeLogos() {
  if (!fs.existsSync(LOGO_SRC)) return;
  fs.mkdirSync(LOGO_OUT, { recursive: true });
  for (const name of fs.readdirSync(LOGO_SRC)) {
    const slug = name.replace(/\.[^.]+$/, "");
    const out = path.join(LOGO_OUT, `${slug}.webp`);
    if (fs.existsSync(out)) continue;
    await sharp(path.join(LOGO_SRC, name))
      .trim({ background: "#ffffff", threshold: 18 })
      .resize({ height: 180, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toFile(out);
    console.log(`  logo: ${slug}.webp`);
  }
}

(async () => {
  await optimizeLogos();
  const files = walk(SRC_DIR);
  console.log(`Optimizing ${files.length} images...`);
  let done = 0;
  let failed = 0;
  const queue = [...files];
  const workers = Array.from({ length: 4 }, async () => {
    while (queue.length) {
      const file = queue.shift();
      try {
        await optimize(file);
      } catch (err) {
        failed++;
        console.warn(`  ! ${path.relative(SRC_DIR, file)}: ${err.message}`);
      }
      if (++done % 50 === 0) console.log(`  ${done}/${files.length}`);
    }
  });
  await Promise.all(workers);
  console.log(`Done. ${done - failed} optimized, ${failed} failed.`);
})();
