import { resolve } from 'path';

export default {
    publicDir: false,
    build: {
    outDir: 'widgets/assets/js/min',
    assetDir: 'chunks',  // para que quede en assets/build/
    emptyOutDir: false,        // no borres otras cosas del plugin
    sourcemap: true,
    rollupOptions: {
      input: {
        // una entrada por widget que tenga JS
        'hello-word': resolve(__dirname, 'widgets/hello-word/js/index.js'),
        'gift-card-form': resolve(__dirname, 'widgets/gift-card-form/js/index.js'),
        'hero-slider': resolve(__dirname, 'widgets/hero-slider/js/index.js'),
      },
      output: {
        entryFileNames: '[name].js',   // => assets/build/widget-ejemplo.js
        chunkFileNames: 'chunks/[name]-[hash].js',
        // assetFileNames: 'assets/[name]-[hash][extname]'
      }
    },
    modulePreload: { polyfill: true }
  }
};
