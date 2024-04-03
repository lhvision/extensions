import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'
import MakeManifestPlugin from './plugins/make-manifest'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const srcDir = join(rootDir, 'src')
const storesDir = join(srcDir, 'stores')

// eslint-disable-next-line node/prefer-global/process
const isDev = process.env.__DEV__ === 'true'
const isProd = !isDev

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@src': srcDir,
      '@stores': storesDir,
    },
  },
  plugins: [vue(), UnoCSS(), MakeManifestPlugin()],
  build: {
    sourcemap: isDev,
    minify: isProd,
    reportCompressedSize: isProd,
    // 构建时清空目录
    emptyOutDir: !isDev,
    rollupOptions: {
      input: {
        newtab: join(rootDir, 'index.html'),
        background: join(rootDir, 'background', 'index.ts'),
      },
      output: {
        entryFileNames: 'src/[name]/index.js',
        chunkFileNames: isDev ? 'assets/js/[name].js' : 'assets/js/[name].[hash].js',
      },
    },
  },
})
