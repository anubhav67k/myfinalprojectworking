import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/agent': 'https://psychic-fishstick-5gpq954vgpjh44gr-8000.app.github.dev',
      '/scenario': 'https://psychic-fishstick-5gpq954vgpjh44gr-8000.app.github.dev',
      '/chat': 'https://psychic-fishstick-5gpq954vgpjh44gr-8000.app.github.dev',
    },
  },
})
