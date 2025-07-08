// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), tailwind()],
  server: {
    port: 3000,
    host: true
  },
  vite: {
    define: {
      'process.env.MONGODB_URI': JSON.stringify(process.env.MONGODB_URI),
      'process.env.JWT_SECRET': JSON.stringify(process.env.JWT_SECRET),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }
  }
});
