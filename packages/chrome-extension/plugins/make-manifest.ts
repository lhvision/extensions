import type { PluginOption } from 'vite'
import { existsSync, mkdirSync, statSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { processByte } from '@lhvision/helpers'
import chalk from 'chalk'

// eslint-disable-next-line no-console
const log = console.log

// 获取当前模块的绝对路径
const currentModulePath = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(currentModulePath, '..')
const distDir = resolve(rootDir, '../../dist')
const manifestFilePath = join(rootDir, 'manifest.js')

function getManifestWithCacheBurst(): Promise<{ default: chrome.runtime.ManifestV3 }> {
  const withCacheBurst = (path: string) => `${path}?${Date.now().toString()}`
  /**
   * 在 Windows 环境下，对于绝对路径，必须将其转换为有效的 file: URL 才能供 ESM 加载器使用.
   * 使用 node 内置的 url.pathToFileURL 方法完成转换
   */
  // eslint-disable-next-line node/prefer-global/process
  if (process.platform === 'win32')
    return import(withCacheBurst(pathToFileURL(manifestFilePath).href))

  return import(withCacheBurst(manifestFilePath))
}

/**
 * 自动将 manifest.js 文件转化为 manifest.json 文件，并写入到 dist 目录下
 */
export default function makeManifestPlugin(): PluginOption {
  return {
    name: 'make-manifest',
    buildStart() {
      this.addWatchFile(manifestFilePath)
    },
    async writeBundle() {
      if (!existsSync(distDir))
        mkdirSync(distDir)

      const manifestContent = await getManifestWithCacheBurst()
      const manifestPath = join(distDir, 'manifest.json')
      await writeFile(manifestPath, JSON.stringify(manifestContent.default, null, 2))
      log(chalk.blue('\n\rmake-manifest ') + chalk.green('Manifest file copy complete'))
      log(`${chalk.dim('../../dist/')}${chalk.green('manifest.json ')}${chalk.bold.gray(`${processByte(statSync(manifestPath).size, 'KB')}`)}`)
    },
  }
}

// 快速启一个服务 python -m http.server 8080
