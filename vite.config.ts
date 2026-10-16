import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    // CommonJS package; bundle it into the prerender build so named imports work in Node.
    noExternal: ['react-helmet-async'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
