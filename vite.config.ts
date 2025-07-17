import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),         // Enables React and JSX support
    tailwindcss(),   // Your preferred Tailwind plugin
  ],
  server: {
    // Vite uses 'historyApiFallback' via the 'middlewareMode' or with a custom proxy,
    // but the direct option is not supported. For SPA fallback, use 'spa-fallback' option:
    // https://vitejs.dev/config/server-options.html#server-fs-strict
    // For most React SPAs, the default behavior is sufficient.
    // If you need to support client-side routing in dev, you usually don't need to set anything.
    // If you want to proxy all 404s to index.html, use the following:
    fs: {
      strict: true,
    },
  },
})
