import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    // The 3D engine (Three.js) is big by nature. It loads separately after the
    // text, so a larger file here is expected and doesn't slow the first view.
    chunkSizeWarningLimit: 1200,
    // Two pages: the home page (scroll film) and the earlier design, kept as a backup.
    // (public/prototype.html just forwards the old prototype address to the home page.)
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        classic: resolve(import.meta.dirname, 'classic.html'),
      },
    },
  },
})
