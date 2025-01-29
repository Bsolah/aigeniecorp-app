// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      // Proxy all API requests to the backend server
      '/api': {
        target: 'http://localhost:5000', // Your backend server URL
        changeOrigin: true,  // Change the origin of the request to the target
      },
    },
  },
});
