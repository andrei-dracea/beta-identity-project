import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "@/assets/variables.scss";
        `,
        sassOptions: { quietDeps: true },
      },
    },
  },
  build: {
    assetsInlineLimit: 0,

    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.svg')) {
            // For SVG files, remove the hash and only use the name
            return 'assets/[name][extname]'
          }
          // Default behavior for other assets
          return 'assets/[name]-[hash][extname]'
        },
      },
    },
  },
})
