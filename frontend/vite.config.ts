import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/agent': 'http://localhost:8000',
      '/scenario': 'http://localhost:8000',
      '/chat': 'http://localhost:8000',
    },
  },
})
