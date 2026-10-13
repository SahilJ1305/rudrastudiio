import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const MEDIA_DIR = path.resolve(import.meta.dirname, 'media')
const MEDIA_TYPES = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' }

/**
 * Photos and videos live in Cloudflare R2 (VITE_MEDIA_BASE_URL). Without that URL,
 * the dev server serves the same /opt/... and /videos/... paths from the local media/ folder.
 */
function localMedia() {
  return {
    name: 'local-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = decodeURIComponent((req.url || '').split('?')[0])
        if (!/^\/(opt|videos|logos)\//.test(urlPath)) return next()
        const file = path.join(MEDIA_DIR, urlPath)
        if (!file.startsWith(MEDIA_DIR) || !fs.existsSync(file)) return next()

        const { size } = fs.statSync(file)
        res.setHeader('Content-Type', MEDIA_TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream')
        res.setHeader('Accept-Ranges', 'bytes')
        // Range support so <video> can stream and loop
        const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '')
        if (range) {
          const start = range[1] ? Number(range[1]) : 0
          const end = range[2] ? Number(range[2]) : size - 1
          res.statusCode = 206
          res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
          res.setHeader('Content-Length', end - start + 1)
          fs.createReadStream(file, { start, end }).pipe(res)
        } else {
          res.setHeader('Content-Length', size)
          fs.createReadStream(file).pipe(res)
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  if (command === 'build' && !env.VITE_MEDIA_BASE_URL) {
    console.warn('\n⚠  VITE_MEDIA_BASE_URL is not set: photos and videos will not load in this build.\n')
  }

  return {
    plugins: [react(), tailwindcss(), localMedia()],
  }
})
