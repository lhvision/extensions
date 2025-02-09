import { readFileSync } from 'node:fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))

/**
 * 更改后，请在 chrome://extensions 重新加载扩展程序
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: 'lhvision extension',
  version: packageJson.version,
  description: packageJson.description,
  host_permissions: [
    '<all_urls>',
  ],
  permissions: [
    'storage',
    'bookmarks',
    'favicon',
    'tabs',
    'scripting',
    'notifications',
    'sidePanel',
  ],
  icons: {
    128: 'icon.png',
  },
  action: {
    // 地址栏右侧的扩展图标
    default_popup: 'popup/index.html',
    default_icon: 'icon.png',
  },
  background: {
    service_worker: 'background.iife.js',
    type: 'module',
  },
  // content_scripts: [
  // {
  //   "matches": [
  //     "http://*/*",
  //     "https://*/*",
  //     "<all_urls>"
  //   ],
  //   "js": [
  //     "content/main.iife.js"
  //   ]
  // },
  // {
  //   "matches": [
  //     "http://*/*",
  //     "https://*/*",
  //     "<all_urls>"
  //   ],
  //   "js": [
  //     "content-runtime/main.iife.js"
  //   ]
  // }
  // {
  //   "matches": [
  //     "http://*/*",
  //     "https://*/*",
  //     "<all_urls>"
  //   ],
  //   "css": [
  //     "content.css"
  //   ]
  // }
  // ],
  chrome_url_overrides: {
    newtab: 'new-tab/index.html',
  },
  web_accessible_resources: [
    {
      resources: [
        '_favicon/*',
        '*.js',
        '*.map',
        '*.css',
        '*.svg',
        'icon.png',
      ],
      matches: [
        '*://*/*',
        '<all_urls>',
      ],
    },
  ],
}

export default manifest
