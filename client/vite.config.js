import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // OPTIONAL: keep CRA’s build folder name so Dockerfile can stay similar
  build: {
    outDir: 'build',
    emptyOutDir: true,
  },

  // OPTIONAL: choose a fixed dev port
  server: {
    port: 5173,
    strictPort: true,
  },
});
