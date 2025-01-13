import { createApp } from 'vue'
import App from './App.vue'
import injectedStyle from './index.css?inline'

export function mount() {
  // 创建容器元素
  const root = document.createElement('div')
  root.id = 'chrome-extension-vue-content-runtime'
  document.body.append(root)

  // 创建 Shadow DOM 容器
  const shadowContainer = document.createElement('div')
  shadowContainer.id = 'shadow-root'

  // 附加 Shadow DOM
  const shadowRoot = root.attachShadow({ mode: 'open' })

  // 注入样式到 Shadow DOM
  const styleSheet = new CSSStyleSheet()
  styleSheet.replaceSync(injectedStyle)
  shadowRoot.adoptedStyleSheets = [styleSheet]

  // 添加容器到 Shadow DOM
  shadowRoot.appendChild(shadowContainer)

  // 创建并挂载 Vue 应用
  const app = createApp(App)
  app.mount(shadowContainer)

  return {
    destroy: () => {
      app.unmount()
      root.remove()
    },
  }
}

// 挂载 UI
const { destroy } = mount()

// 可选：监听卸载事件
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'UNMOUNT_UI') {
    destroy()
  }
})
