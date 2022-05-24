import { defineConfig } from 'vite';
import { resolve } from 'path';

const root = resolve(__dirname, 'src/public');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  build: {
    outDir,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        play: resolve(root, 'play/index.html'),
      },
    },
  },
});
