import { defineConfig, presetAttributify, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex justify-center items-center'],
    ['text-ellipsis-nowrap', 'text-ellipsis overflow-hidden whitespace-nowrap'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts(),
  ],
})
