import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
  ],
  shims: true,
  clean: true,
  format: ['esm'],
  dts: true,
})
