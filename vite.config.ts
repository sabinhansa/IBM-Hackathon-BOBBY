import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/IBM-Hackathon-BOBBY/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})

// Made with Bob
