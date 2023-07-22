import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

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

  plugins: [
    react({
      babel: {
        plugins: [['auto-import', { declarations: [{ default: 'React', path: 'react' }] }]],
      },
    }),
    tsconfigPaths(),
  ],
});
