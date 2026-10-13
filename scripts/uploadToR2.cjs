/**
 * Uploads the studio's media to Cloudflare R2.
 *
 *   media/opt/**        -> public bucket  (R2_BUCKET)          website photos (WebP)
 *   media/videos/**     -> public bucket  (R2_BUCKET)          website videos
 *   media/logos/**      -> public bucket  (R2_BUCKET)          client logos
 *   media/originals/**  -> private bucket (R2_ARCHIVE_BUCKET)  full-resolution originals, PSDs
 *   media/logos-src/**  -> private bucket (R2_ARCHIVE_BUCKET)  original client logo files
 *   media/videos-src/** -> private bucket (R2_ARCHIVE_BUCKET)  full-length source videos
 *
 * Files already in the bucket with the same size are skipped, so re-running only
 * uploads new or changed files.
 *
 * Usage:
 *   npm run upload-r2                    upload everything
 *   npm run upload-r2 -- --dry-run       show what would be uploaded
 *   npm run upload-r2 -- --only=opt      only one folder (opt | videos | logos | originals | logos-src | videos-src)
 *
 * Required in .env: R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET
 * Optional:         R2_ARCHIVE_BUCKET (originals and *-src folders are skipped when it is not set)
 */
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");

const MEDIA_DIR = path.join(__dirname, "..", "media");
const CONCURRENCY = 6;

const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_ARCHIVE_BUCKET } = process.env;

const args = process.argv.slice(2);
// npm (e.g. from PowerShell) may consume --dry-run itself and expose it as npm_config_dry_run
const dryRun = args.includes("--dry-run") || process.env.npm_config_dry_run === "true";
const only = (args.find((a) => a.startsWith("--only=")) || "").split("=")[1];

const CONTENT_TYPES = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".psd": "image/vnd.adobe.photoshop",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm"
};

// Which bucket each top-level media folder goes to, and how long browsers may cache it
const TARGETS = [
  { folder: "opt", bucket: R2_BUCKET, bucketVar: "R2_BUCKET", cacheControl: "public, max-age=31536000, immutable" },
  { folder: "videos", bucket: R2_BUCKET, bucketVar: "R2_BUCKET", cacheControl: "public, max-age=31536000, immutable" },
  { folder: "logos", bucket: R2_BUCKET, bucketVar: "R2_BUCKET", cacheControl: "public, max-age=31536000, immutable" },
  { folder: "originals", bucket: R2_ARCHIVE_BUCKET, bucketVar: "R2_ARCHIVE_BUCKET", cacheControl: "private, max-age=0" },
  { folder: "logos-src", bucket: R2_ARCHIVE_BUCKET, bucketVar: "R2_ARCHIVE_BUCKET", cacheControl: "private, max-age=0" },
  { folder: "videos-src", bucket: R2_ARCHIVE_BUCKET, bucketVar: "R2_ARCHIVE_BUCKET", cacheControl: "private, max-age=0" }
];

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

async function listExisting(client, bucket, prefix) {
  const existing = new Map();
  let token;
  do {
    const page = await client.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, ContinuationToken: token })
    );
    for (const obj of page.Contents || []) existing.set(obj.Key, obj.Size);
    token = page.IsTruncated ? page.NextContinuationToken : undefined;
  } while (token);
  return existing;
}

async function uploadTarget(client, { folder, bucket, cacheControl, bucketVar }) {
  const files = walk(path.join(MEDIA_DIR, folder));
  if (!files.length) {
    console.log(`- ${folder}/: no files, skipping`);
    return { uploaded: 0, skipped: 0, failed: 0 };
  }
  if (!bucket) {
    console.log(`- ${folder}/: ${files.length} files skipped (set ${bucketVar} in .env)`);
    return { uploaded: 0, skipped: files.length, failed: 0 };
  }

  const existing = await listExisting(client, bucket, `${folder}/`);
  const queue = files
    .map((file) => ({
      file,
      key: path.relative(MEDIA_DIR, file).split(path.sep).join("/"),
      size: fs.statSync(file).size
    }))
    .filter(({ key, size }) => existing.get(key) !== size);

  const totalMB = queue.reduce((sum, f) => sum + f.size, 0) / 1048576;
  console.log(
    `- ${folder}/ -> ${bucket}: ${queue.length} to upload (${totalMB.toFixed(1)} MB), ${files.length - queue.length} already there`
  );
  if (dryRun || !queue.length) return { uploaded: 0, skipped: files.length - queue.length, failed: 0 };

  let uploaded = 0;
  let failed = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const { file, key } = queue.shift();
      try {
        await new Upload({
          client,
          params: {
            Bucket: bucket,
            Key: key,
            Body: fs.createReadStream(file),
            ContentType: CONTENT_TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
            CacheControl: cacheControl
          },
          partSize: 16 * 1024 * 1024 // large originals / PSDs go up in 16 MB parts
        }).done();
        uploaded++;
        if (uploaded % 50 === 0) console.log(`    ${uploaded} uploaded...`);
      } catch (err) {
        failed++;
        console.warn(`    ! ${key}: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);
  return { uploaded, skipped: files.length - uploaded - failed, failed };
}

(async () => {
  const missing = ["R2_ACCOUNT_ID", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY", "R2_BUCKET"].filter((k) => !process.env[k]);
  if (missing.length) {
    console.error(`Missing in .env: ${missing.join(", ")} (see .env.example)`);
    process.exit(1);
  }

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY }
  });

  console.log(dryRun ? "Dry run - nothing will be uploaded.\n" : "Uploading media to Cloudflare R2...\n");
  const totals = { uploaded: 0, skipped: 0, failed: 0 };
  for (const target of TARGETS.filter((t) => !only || t.folder === only)) {
    const result = await uploadTarget(client, target);
    for (const k of Object.keys(totals)) totals[k] += result[k];
  }
  console.log(`\nDone. ${totals.uploaded} uploaded, ${totals.skipped} skipped, ${totals.failed} failed.`);
  if (totals.failed) process.exit(1);
})().catch((err) => {
  console.error(`Upload failed: ${err.message}`);
  process.exit(1);
});
