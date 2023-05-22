import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [{ src: 'dist/*', dest: '../academify/dist/src/client/dist' }],
      hook: 'buildEnd',
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4006',
        changeOrigin: true,
      },
    },
  },
});
