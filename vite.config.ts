import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },

  resolve: {
    alias: [{ find: '~', replacement: resolve(__dirname, 'src') }],
  },

  build: {
    sourcemap: false,
  },

  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },

  plugins: [
    nodePolyfills(),
    react({
      babel: {
        plugins: [
          ['auto-import', { declarations: [{ default: 'React', path: 'react' }] }],
          'babel-plugin-macros',
          [
            '@emotion/babel-plugin-jsx-pragmatic',
            { export: 'jsx', import: '__cssprop', module: '@emotion/react' },
          ],
          ['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }, 'twin.macro'],
        ],
      },
    }),
    tsconfigPaths(),
  ],
});
