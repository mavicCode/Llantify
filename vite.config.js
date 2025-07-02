import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // Esto permite que Vite tome el index.html raíz
  build: {
    outDir: 'dist'
  }
})
