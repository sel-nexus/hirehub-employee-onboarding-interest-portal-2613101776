import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Configure the Vite development and production build pipeline. */
export default defineConfig({
  plugins: [react()],
});
