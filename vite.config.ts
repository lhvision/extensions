import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path';

const srcDir = fileURLToPath(new URL('./src', import.meta.url))
const storesDir = join(srcDir, 'stores')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': srcDir,
      '@stores': storesDir,
    },
  },
  plugins: [vue(), UnoCSS()],
  base: '/dist',
})
