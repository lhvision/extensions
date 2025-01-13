import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { vitePageConfig } from '@lhvision/extension-scripts'
import UnoCSS from 'unocss/vite'

const __filename = fileURLToPath(import.meta.url)
const rootDir = dirname(__filename)
const srcDir = join(rootDir, 'src')
const storesDir = join(srcDir, 'stores')

// https://vitejs.dev/config/
export default vitePageConfig({
  resolve: {
    alias: {
      '@stores': storesDir,
      '@src': srcDir,
    },
  },
  plugins: [UnoCSS()],
  build: {
    outDir: resolve(rootDir, '../../dist/popup'),
  },
})
