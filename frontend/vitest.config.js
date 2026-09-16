import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

/** Configure browser-like component tests with the React transform. */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true,
    globals: true,
  },
});
