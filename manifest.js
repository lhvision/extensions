import fs from 'node:fs'

const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: 'CustomExtension',
  version: packageJson.version,
  description: '想象中的 chrome://newtab',
  icons: {
    128: 'icon.png',
  },
  action: {
    // 地址栏右侧的扩展图标
    default_icon: 'icon.png',
  },
  background: {
    service_worker: 'src/background/index.js', // 可选的后台脚本
  },
  // 'content_scripts': [
  //   {
  //     'matches': ['<all_urls>'],
  //     'js': ['content.js']
  //   }
  // ],
  chrome_url_overrides: {
    newtab: 'index.html',
  },
  permissions: ['storage', 'bookmarks', 'favicon'],
  web_accessible_resources: [
    {
      resources: ['_favicon/*', 'assets/*.js', 'assets/*.css', 'icon.png'],
      matches: ['<all_urls>'],
    },
  ],
}

export default manifest
