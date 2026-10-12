import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Chemins relatifs : fonctionne sur GitHub Pages (sous-dossier /<repo>/) comme en local.
  base: './',
  plugins: [react()],
  server: { port: 5173, open: true },
});
