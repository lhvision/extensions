import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

// eslint-disable-next-line ts/no-unsafe-argument
createApp(App).use(pinia).mount('#app')
