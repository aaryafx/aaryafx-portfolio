import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Served from https://aaryafx.github.io/aaryafx-portfolio/
  base: '/aaryafx-portfolio/',
  server: { port: 5173 },
})
