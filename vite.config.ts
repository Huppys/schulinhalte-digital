import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
   base: '/',
   appType: 'spa',
   publicDir: 'public',
   plugins: [
      vue()
   ],
   assetsInclude: [
      'assets/*'
   ],
   resolve: {
      alias: {
         '@': fileURLToPath(new URL('./src', import.meta.url))
      }
   }
});
