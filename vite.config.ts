import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // The 3D engine (Three.js) is big by nature. It loads separately after the
    // text, so a larger file here is expected and doesn't slow the first view.
    chunkSizeWarningLimit: 1200,
  },
})
