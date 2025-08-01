import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/agent': 'https://psychic-fish-xxxxxx-8000.app.github.dev',
      '/scenario': 'https://psychic-fish-xxxxxx-8000.app.github.dev',
      '/chat': 'https://psychic-fish-xxxxxx-8000.app.github.dev',
    },
  },
})
