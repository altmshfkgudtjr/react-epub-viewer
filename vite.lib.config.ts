import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

/**
 * Library build configuration.
 * - Entry: src/modules/index.ts (EpubViewer, ReactEpubViewer)
 * - Output: dist/index.mjs (ESM), dist/index.cjs (CJS), dist/index.d.ts (types)
 * - react / react-dom / epubjs are kept external (not bundled).
 */
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      rollupTypes: true,
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      include: ['src'],
      exclude: ['src/**/*.{test,spec}.{ts,tsx}', 'src/index.tsx'],
    }),
  ],
  build: {
    target: 'es2019',
    sourcemap: true,
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/modules/index.ts'),
      formats: ['es', 'cjs'],
      fileName: format => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'epubjs'],
      output: {
        // Mark the bundle as a client component for React Server Components
        // (Next.js App Router) consumers.
        banner: "'use client';",
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          epubjs: 'ePub',
        },
      },
    },
  },
});
