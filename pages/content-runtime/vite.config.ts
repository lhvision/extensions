import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { vitePageConfig } from '@lhvision/extension-scripts'

const __filename = fileURLToPath(import.meta.url)
const rootDir = dirname(__filename)
const srcDir = resolve(rootDir, 'src')

export default vitePageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  build: {
    lib: {
      entry: resolve(srcDir, 'main.ts'),
      formats: ['iife'],
      name: 'ContentRuntimeScript',
      fileName: 'index',
    },
    outDir: resolve(rootDir, '../../dist/content-runtime'),
  },
})
