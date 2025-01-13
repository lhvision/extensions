import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { isDev, isProd, watchOption } from '@lhvision/extension-scripts'
import { defineConfig } from 'vite'
import MakeManifestPlugin from './plugins/make-manifest'

const __filename = fileURLToPath(import.meta.url)
const rootDir = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [MakeManifestPlugin()],
  build: {
    sourcemap: isDev,
    // 是否报告压缩后的文件大小
    reportCompressedSize: isProd,
    // 构建时清空目录
    emptyOutDir: false,
    watch: watchOption,
    lib: {
      entry: join(rootDir, 'src/background.ts'),
      formats: ['iife'],
      name: 'BackgroundScript',
      fileName: 'background',
    },
    outDir: resolve(rootDir, '../../dist'),
  },
  envDir: '../..',
})
