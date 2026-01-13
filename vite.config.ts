import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  server: {
    proxy: {
      '/proxy/test': {
        target: 'https://test.digiteal.eu',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/proxy\/test/, ''),
      },
      '/proxy/production': {
        target: 'https://app.digiteal.eu',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/proxy\/production/, ''),
      },
    },
  },
});
