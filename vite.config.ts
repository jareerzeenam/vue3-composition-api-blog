/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    environment: 'jsdom',
  },
  server: {
    proxy: {
      // with RegEx
      '^/api/.*': {
        target: 'http://localhost:5500',
        changeOrigin: true,
        rewrite: (path) => {
          const p = path.replace(/^\/api/, '');
          return p;
        },
      },
    },
  },
});
