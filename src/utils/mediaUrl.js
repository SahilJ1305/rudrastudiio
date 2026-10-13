// Resolves photo and video URLs.
//
// All media lives in the Cloudflare R2 bucket (uploaded by scripts/uploadToR2.cjs)
// with the same layout as the local media/ folder:
//   opt/800/<album>/<photo>.webp    cards & grids
//   opt/1920/<album>/<photo>.webp   hero banners & lightbox
//   videos/hero/<clip>.mp4          homepage background video
//
// VITE_MEDIA_BASE_URL points at the bucket's public URL (e.g. https://media.rudrastudiio.in).
// When it is empty (local development) the same paths are served from media/ by vite.config.js.

const MEDIA_BASE_URL = (import.meta.env.VITE_MEDIA_BASE_URL || "").replace(/\/+$/, "");

/**
 * Full URL for a file inside the media bucket.
 * @param {string} mediaPath - e.g. "/videos/hero/deer-forest.mp4"
 */
export function getMediaUrl(mediaPath) {
  if (!mediaPath) return "";
  if (/^https?:\/\//i.test(mediaPath)) return mediaPath;
  const normalized = mediaPath.startsWith("/") ? mediaPath : `/${mediaPath}`;
  return `${MEDIA_BASE_URL}${encodeURI(normalized)}`;
}

/**
 * Optimized WebP URL for a studio photo.
 * @param {string} rawPath - Photo path as stored in the data files (e.g. '/Images/wedding/RUDRA0288.JPG') or a full URL
 * @param {object} options - { width }: up to 800 uses the grid size, larger uses the 1920px version
 */
export function getOptimizedImageUrl(rawPath, options = {}) {
  if (!rawPath) return "";
  if (!rawPath.startsWith("/Images/")) return getMediaUrl(rawPath);

  const size = options.width && options.width <= 800 ? 800 : 1920;
  const relativePath = rawPath.replace(/^\/Images\//, "").replace(/\.[^./]+$/, ".webp");
  return getMediaUrl(`/opt/${size}/${relativePath}`);
}

/** Card & grid thumbnails (800px WebP) */
export function getThumbUrl(rawPath, width = 700) {
  return getOptimizedImageUrl(rawPath, { width });
}

/** Hero banners & lightbox (1920px WebP) */
export function getFullsizeUrl(rawPath) {
  return getOptimizedImageUrl(rawPath, { width: 1920 });
}

export default getOptimizedImageUrl;
