import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Pages from 'vite-plugin-pages'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/scss/globalVals";`
      }
    }
  },
  plugins: [
    vue(),
    Pages({
      dirs: [
        { dir: 'src/views', baseRoute: '' },
      ]
    }),
    AutoImport({
      imports: [
        'vue'
      ]
    }),
    Components({
      dirs: ['./src/views', './src/components'],
      resolvers: [ElementPlusResolver()],
    }),]
})
