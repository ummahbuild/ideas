import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ideas.ummah.build',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  trailingSlash: 'always',
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
