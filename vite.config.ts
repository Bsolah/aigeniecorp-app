import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';
const API_URL = process.env.VITE_API_URL;

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            src: resolve(__dirname, 'src'),
        },
    },
    esbuild: {
        loader: 'tsx',
        include: /src\/.*\.tsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        include: ["simplebar-react"],
        esbuildOptions: {
            plugins: [
                {
                    name: 'load-js-files-as-tsx',
                    setup(build) {
                        build.onLoad(
                            { filter: /src\\.*\.js$/ },
                            async (args) => ({
                                loader: 'tsx',
                                contents: await fs.readFile(args.path, 'utf8'),
                            })
                        );
                    },
                },
            ],
        },
    },
    
    // plugins: [react(),svgr({
    //   exportAsDefault: true
    // })],

    plugins: [svgr(), react()],
    server: {
        proxy: {
          // Proxy all API requests to the backend server
          '/api': {
            target: API_URL, // Your backend server URL
            changeOrigin: true,  // Change the origin of the request to the target
          },
        },
      },
      build: {
        commonjsOptions: {
          transformMixedEsModules: true,
        },
        rollupOptions: {
            external: ["apexhcarts"]
        }
      },
});