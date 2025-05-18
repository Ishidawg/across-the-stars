import { defineConfig } from 'vite'
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react'
import path from "path"

// ESLINT was shitting on on the alias, so this is just to no get warnings
const __filename = fileURLToPath(import.meta.url);
const __dirname = __dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets")
    },
  },
})
