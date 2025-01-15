import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
         /*  ViteImageOptimizer({
            png: { quality: 80 },
            jpeg: { quality: 75 },
            webp: { quality: 80 },
            avif: { quality: 70 },
            svg: {
                plugins: [
                    { name: 'removeViewBox', active: false },
                    { name: 'sortAttrs' },
                ],
            },
        }),
  ],
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src'),
    }
  } */
  ],
  assetsInclude : ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg'],
})
