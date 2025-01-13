import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// eslint-disable-next-line node/prefer-global/process
export const isDev = process.env.__DEV__ === 'true'
export const isProd = !isDev

export const watchOption = isDev
  ? {
      buildDelay: 100,
      // 忽略构建时监听的文件
      chokidar: {
        ignored: [
          /\/packages\/.*\.(ts|tsx|map)$/,
        ],
      },
    }
  : undefined

export function vitePageConfig(config: UserConfig) {
  return defineConfig({
    ...config,
    base: '',
    plugins: [vue(), ...(config.plugins || [])],
    build: {
      sourcemap: isDev,
      // 是否报告压缩后的文件大小
      reportCompressedSize: isProd,
      // 构建时清空目录
      emptyOutDir: isProd,
      watch: watchOption,
      ...config.build,
    },
    define: {
      'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
    },
    envDir: '../..',
  })
}
