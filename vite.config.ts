import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // with RegEx
      '^/api/.*': {
        target: 'http://localhost:5500',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path);

          const p = path.replace(/^\/api/, '');
          console.log(p);
          return p;
        },
      },
    },
  },
});
