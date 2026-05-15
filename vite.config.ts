import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/BOBBY-LOVES-REPOS/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

// Made with Bob
