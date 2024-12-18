import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import mkcert from 'vite-plugin-mkcert';

const isDev = process.env.NODE_ENV === 'development';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
