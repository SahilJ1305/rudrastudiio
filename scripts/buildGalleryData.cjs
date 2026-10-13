// Script to generate src/data/categories.js and src/data/galleryData.js
// based on the original photos in media/originals.
// Photo paths are stored as "/Images/<folder>/<file>"; src/utils/mediaUrl.js turns
// them into the optimized WebP URLs (local or Cloudflare R2).

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicImagesDir = path.join(__dirname, '..', 'media', 'originals');

const resolveMediaUrl = (localRelPath) => localRelPath || '';

const categoryMapping = [
  {
    id: 'wedding',
    slug: 'wedding',
    folder: 'wedding',
    name: 'Wedding Photography',
    tagline: 'Eternal Vows & Sacred Traditions',
    description: 'Every emotion, every sacred ritual, and every unforgettable gaze. We document royal ceremonies and intimate vows with cinematic grace.',
    shortDesc: 'Every emotion. Every ritual. Every unforgettable moment.',
    accent: 'Traditional & Royal Heritage',
    featured: true
  },
  {
    id: 'pre-wedding',
    slug: 'pre-wedding',
    folder: 'Prewdding',
    name: 'Pre-Wedding Photography',
    tagline: 'Your Romance, Unscripted',
    description: 'Whimsical, intimate, and scenic couple shoots in breathtaking destinations that celebrate the quiet anticipation before the big day.',
    shortDesc: 'Cinematic love stories against stunning backdrops.',
    accent: 'Destination & Golden Hour',
    featured: true
  },
  {
    id: 'baby',
    slug: 'baby',
    folder: 'baby',
    name: 'Baby & Milestone',
    tagline: 'Pure Innocence & Tender Wonders',
    description: 'Gentle, safe, and heartwarming newborn and baby sessions capturing tiny fingers, sleepy smiles, and the sweet wonder of new beginnings.',
    shortDesc: 'Tender beginnings and the innocent wonders of childhood.',
    accent: 'Newborn & Milestone',
    featured: true
  },
  {
    id: 'maternity',
    slug: 'maternity',
    folder: 'Maternity',
    name: 'Maternity Photography',
    tagline: 'The Poetry of Motherhood',
    description: 'Graceful and empowering portraits honoring the sacred bond of life, glowing maternal beauty, and the profound journey of welcoming a child.',
    shortDesc: 'Honoring the beauty, strength, and joy of expecting mothers.',
    accent: 'Fine Art & Studio Glow',
    featured: true
  },
  {
    id: 'fashion',
    slug: 'fashion',
    folder: 'model shoot',
    name: 'Fashion & Model Shoot',
    tagline: 'Haute Couture & Striking Aesthetics',
    description: 'High-octane editorial spreads, designer lookbooks, and avant-garde styling with dynamic movement and runway-level perfection.',
    shortDesc: 'Bold aesthetic styling, lookbooks, and fashion portfolios.',
    accent: 'Lookbooks & Haute Couture',
    featured: true
  },
  {
    id: 'portrait',
    slug: 'portrait',
    folder: 'corporate profile',
    name: 'Corporate & Portraits',
    tagline: 'Professional Identity & Executive Presence',
    description: 'Striking editorial portraits, executive headshots, and leadership profiles using master lighting that reveals character.',
    shortDesc: 'Executive headshots and leadership portraits with character.',
    accent: 'Executive & Professional',
    featured: false
  },
  {
    id: 'product',
    slug: 'product',
    folder: 'product',
    name: 'Product Photography',
    tagline: 'Precision, Texture & Luxury Appeal',
    description: 'Crisp commercial imagery, packshots, and creative still-life styling engineered for maximum visual desire and brand conversion.',
    shortDesc: 'Flawless commercial and luxury product imagery.',
    accent: 'Commercial & Studio Still Life',
    featured: true
  },
  {
    id: 'jwellery',
    slug: 'jwellery',
    folder: 'jwellery',
    name: 'Jewellery Photography',
    tagline: 'Heritage Gold, Diamonds & Sparkle',
    description: 'Macro-focus precision capturing the dazzling brilliance, faceted gemstone fire, and opulent craftsmanship of bridal and fine jewellery.',
    shortDesc: 'Macro precision highlighting fine gold, diamonds, and gems.',
    accent: 'Diamonds, Gold & Polki',
    featured: true
  },
  {
    id: 'food',
    slug: 'food',
    folder: 'food',
    name: 'Food & Culinary Styling',
    tagline: 'Gourmet Flavors & Artistic Compositions',
    description: 'Mouthwatering culinary spreads, artisanal beverages, and restaurant menus shot with natural highlights and vibrant appetite appeal.',
    shortDesc: 'Sensory culinary storytelling for menus, chefs, and cafes.',
    accent: 'Culinary & Restaurant Menus',
    featured: false
  },
  {
    id: 'interior',
    slug: 'interior',
    folder: 'Interior',
    name: 'Interior & Architecture',
    tagline: 'Spatial Elegance & Ambient Light',
    description: 'Architectural perspectives, luxury residential estates, boutique hotels, and design installations captured with spatial depth and balance.',
    shortDesc: 'Architectural and spatial elegance for designers and resorts.',
    accent: 'Architectural & Hospitality',
    featured: false
  },
  {
    id: 'industrial',
    slug: 'industrial',
    folder: 'Industrial',
    name: 'Industrial Photography',
    tagline: 'Scale, Engineering & Manufacturing',
    description: 'Dynamic documentation of manufacturing plants, machinery, infrastructure, and heavy engineering processes with dramatic industrial lighting.',
    shortDesc: 'Engineering scale, manufacturing floors, and machinery.',
    accent: 'Engineering & Factory Infrastructure',
    featured: false
  },
  {
    id: 'sports',
    slug: 'sports',
    folder: 'sports',
    name: 'Sports & Action Photography',
    tagline: 'Speed, Power & Decisive Moments',
    description: 'High-speed shutter captures of athletic intensity, championship matches, fitness campaigns, and kinetic human motion frozen in time.',
    shortDesc: 'Kinetic motion, athletic championships, and decisive moments.',
    accent: 'High-Speed Action & Athletics',
    featured: false
  },
  {
    id: 'events',
    slug: 'events',
    folder: 'done',
    name: 'Events & Celebrations',
    tagline: 'Atmosphere, Energy & Grandeur',
    description: 'Comprehensive visual documentation of vibrant birthday milestones, cultural soirees, family jubilees, and festive celebrations.',
    shortDesc: 'Candid emotional storytelling across family and festive galas.',
    accent: 'Milestones & Cultural Galas',
    featured: false
  }
];

function cleanTitle(filename, index, categoryName) {
  let base = path.parse(filename).name;
  base = base.replace(/ copy.*$/i, '').replace(/[\(\)]/g, '').trim();
  if (/^(DSC|231A|RUDRA|_DSC|IMG|\d+)/i.test(base)) {
    return `${categoryName} Frame #${index + 1}`;
  }
  return base || `${categoryName} Frame #${index + 1}`;
}

const allCategoriesData = [];
const allGalleryPhotos = [];
let globalIndex = 0;

// Hand-picked album covers (file names inside each category folder)
const COVER_PICKS = {
  wedding: 'RUDRA0337.JPG',
  'pre-wedding': '231A0202 copy.jpg',
  baby: '14.jpg',
  maternity: '231A6704 copy.JPG',
  fashion: '231A9417 copy.jpg',
  portrait: '231A7645.JPG',
  product: '231A9126 copy.jpg',
  jwellery: '231A1942 (1).JPG',
  food: '231A7597 copy.JPG',
  interior: '231A6987 copy.jpg',
  industrial: '231A1500 copy.jpg',
  sports: '231A1092 copy.jpg',
  events: 'DSC_9541 copy.jpg'
};

// Real orientation from the image itself (EXIF rotation respected)
async function detectOrientation(filePath) {
  try {
    const { width, height, orientation } = await sharp(filePath).metadata();
    const [w, h] = orientation >= 5 ? [height, width] : [width, height];
    const ratio = w / h;
    if (ratio > 1.1) return { orientation: 'landscape', aspectRatio: '16/10' };
    if (ratio < 0.9) return { orientation: 'portrait', aspectRatio: '3/4' };
    return { orientation: 'square', aspectRatio: '1/1' };
  } catch (e) {
    return { orientation: 'portrait', aspectRatio: '3/4' };
  }
}

// ---------------------------------------------------------------------------
// Diverse selection: many albums contain bursts of near-identical frames, so instead of
// "the first N files" we pick up to MAX_PER_ALBUM photos that look as different as possible.
// Each photo is reduced to an 8x8 colour layout; we repeatedly add the photo that is
// furthest from everything already chosen (starting with the cover), and stop adding
// once what's left is too similar to the chosen set.
// ---------------------------------------------------------------------------
// Files that are saved sideways / upside down in the original (no rotation tag), so they are never shown
const EXCLUDE_FILES = new Set(['231A4063.JPG', '231A0844 copy.jpg', '231A4011.JPG']);

const MAX_PER_ALBUM = 24;
const MIN_PER_ALBUM = 6;      // small albums keep at least this many even if similar
const SIMILAR_BELOW = 32;     // colour-layout distance (0-255) under which two photos count as "the same shot"
const optDir = path.join(__dirname, '..', 'media', 'opt', '800');

async function colourLayout(folder, file) {
  const webp = path.join(optDir, folder, file.replace(/\.[^.]+$/, '.webp'));
  const source = fs.existsSync(webp) ? webp : path.join(publicImagesDir, folder, file);
  const { data } = await sharp(source, { failOn: 'none' }).resize(8, 8, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  return Array.from(data);
}

const layoutDistance = (a, b) => Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0) / a.length);

async function pickDiverse(folder, files, coverFile) {
  const layouts = new Map();
  for (const file of files) {
    try { layouts.set(file, await colourLayout(folder, file)); } catch (e) { /* unreadable file: skip */ }
  }
  const pool = files.filter((f) => layouts.has(f) && !EXCLUDE_FILES.has(f));
  const chosen = [];
  const nearest = new Map(pool.map((f) => [f, Infinity]));

  const add = (file) => {
    chosen.push(file);
    for (const other of pool) {
      nearest.set(other, Math.min(nearest.get(other), layoutDistance(layouts.get(file), layouts.get(other))));
    }
  };

  if (coverFile && layouts.has(coverFile)) add(coverFile);
  while (chosen.length < MAX_PER_ALBUM) {
    let best = null;
    for (const f of pool) {
      if (!chosen.includes(f) && (best === null || nearest.get(f) > nearest.get(best))) best = f;
    }
    if (best === null) break;
    if (nearest.get(best) < SIMILAR_BELOW && chosen.length >= MIN_PER_ALBUM) break;
    add(best);
  }
  return chosen;
}

(async () => {
for (const cat of categoryMapping) {
  const folderPath = path.join(publicImagesDir, cat.folder);
  let files = [];
  if (fs.existsSync(folderPath)) {
    files = fs.readdirSync(folderPath).filter(f => /\.(jpe?g|png|webp|avif)$/i.test(f));
  }

  // Cover image: hand-picked best shot (also shown on the homepage), else first image in folder
  const coverFile = COVER_PICKS[cat.id] && files.includes(COVER_PICKS[cat.id]) ? COVER_PICKS[cat.id] : files[0];
  const localCoverPath = coverFile ? `/Images/${cat.folder}/${coverFile}` : '';
  const coverUrl = resolveMediaUrl(localCoverPath, true);

  // Up to MAX_PER_ALBUM clearly different photos per album (cover first)
  const selectedFiles = await pickDiverse(cat.folder, files, coverFile);

  allCategoriesData.push({
    id: cat.id,
    slug: cat.slug,
    name: cat.name,
    tagline: cat.tagline,
    description: cat.description,
    shortDesc: cat.shortDesc,
    coverImage: coverUrl,
    photoCount: selectedFiles.length,
    featured: cat.featured,
    accent: cat.accent
  });

  for (const [idx, file] of selectedFiles.entries()) {
    globalIndex++;
    const { orientation, aspectRatio } = await detectOrientation(path.join(folderPath, file));
    const isFeatured = idx < 2 && ['wedding', 'pre-wedding', 'baby', 'maternity', 'fashion', 'product', 'jwellery'].includes(cat.id);
    const localPhotoPath = `/Images/${cat.folder}/${file}`;

    allGalleryPhotos.push({
      id: `${cat.id}-${idx + 1}`,
      categoryId: cat.id,
      title: cat.name,
      orientation: orientation,
      aspectRatio: aspectRatio,
      featured: isFeatured,
      url: resolveMediaUrl(localPhotoPath, false),
      thumb: resolveMediaUrl(localPhotoPath, true)
    });
  }
}

// Write categories.js
const categoriesCode = `// Real Photography Categories for Rudra Studiio (Auto-generated from public/Images)
export const categories = ${JSON.stringify(allCategoriesData, null, 2)};

export const getCategoryById = (id) => {
  if (!id) return null;
  const normalized = id.toLowerCase().trim();
  return categories.find(
    (c) => c.id === normalized || c.slug === normalized
  );
};
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'categories.js'), categoriesCode, 'utf8');
console.log('✓ Successfully wrote src/data/categories.js with ' + allCategoriesData.length + ' real categories.');

// Write galleryData.js
const galleryCode = `// Master Photography Library for Rudra Studiio (Real Studio Photos)
export const galleryPhotos = ${JSON.stringify(allGalleryPhotos, null, 2)};

// Helper functions for gallery queries
export const getFeaturedPhotos = () => galleryPhotos.filter(p => p.featured);

export const getPhotosByCategory = (catId) => {
  if (!catId || catId === 'all') return galleryPhotos;
  return galleryPhotos.filter(p => p.categoryId.toLowerCase() === catId.toLowerCase());
};

export const getPhotoById = (id) => galleryPhotos.find(p => p.id === id);
`;

fs.writeFileSync(path.join(__dirname, '..', 'src', 'data', 'galleryData.js'), galleryCode, 'utf8');
console.log('✓ Successfully wrote src/data/galleryData.js with ' + allGalleryPhotos.length + ' real photos.');
})();
