// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// CHANGE THIS LINE:
export default defineConfig({
  // base: '/TDM-Manthan/',  <-- Delete or comment out this line
  base: './', // <-- ADD THIS LINE for robust GitHub Pages deployment
  plugins: [react()],
})
