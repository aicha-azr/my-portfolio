import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Serves the Vercel functions in /api during `npm run dev`
const vercelApi = () => ({
  name: 'vercel-api',
  configureServer(server) {
    const apiDir = join(server.config.root, 'api')

    // /api/projects → api/projects.js or api/projects/index.js; /api/projects/123 → api/projects/[id].js
    const resolve = (pathname) => {
      const parts = pathname.replace(/^\/api\/?/, '').split('/').filter(Boolean)
      if (parts.some((part) => part.startsWith('_') || part.includes('..'))) return null
      const base = join(apiDir, ...parts)
      if (existsSync(`${base}.js`)) return { file: `${base}.js`, params: {} }
      if (existsSync(join(base, 'index.js'))) return { file: join(base, 'index.js'), params: {} }

      const parent = join(apiDir, ...parts.slice(0, -1))
      const dynamic = existsSync(parent) && readdirSync(parent).find((name) => /^\[\w+\]\.js$/.test(name))
      if (!dynamic) return null
      return { file: join(parent, dynamic), params: { [dynamic.slice(1, -4)]: parts.at(-1) } }
    }

    server.middlewares.use('/api', async (req, res) => {
      const url = new URL(req.originalUrl, 'http://localhost')
      const match = resolve(url.pathname)
      if (!match) {
        res.statusCode = 404
        return res.end(JSON.stringify({ error: 'Not found' }))
      }

      let raw = ''
      for await (const chunk of req) raw += chunk
      try {
        req.body = raw ? JSON.parse(raw) : undefined
      } catch {
        req.body = raw
      }
      req.query = { ...Object.fromEntries(url.searchParams), ...match.params }

      const { default: handler } = await server.ssrLoadModule(match.file)
      await handler(req, res)
    })
  },
})

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Make server-only secrets from .env available to the dev API
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), vercelApi()],
  }
})
