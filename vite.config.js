import { defineConfig } from 'vite';

// React se carga como UMD desde cdnjs (window.React / window.ReactDOM).
// El bundle de la app queda liviano y en formato IIFE para incrustarlo en una sola página.
export default defineConfig(({ isSsrBuild }) => ({
  esbuild: {
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    jsxInject: `import React from 'react'`,
  },
  build: isSsrBuild
    ? { outDir: 'dist-ssr', emptyOutDir: true, rollupOptions: { external: ['react', 'react-dom', 'react-dom/server'] } }
    : {
        outDir: 'dist',
        emptyOutDir: true,
        cssCodeSplit: false,
        modulePreload: false,
        rollupOptions: {
          input: 'src/main.jsx',
          external: ['react', 'react-dom', 'react-dom/client'],
          output: {
            format: 'iife',
            globals: { react: 'React', 'react-dom': 'ReactDOM', 'react-dom/client': 'ReactDOM' },
            entryFileNames: 'app.js',
            assetFileNames: 'app.[ext]',
            inlineDynamicImports: true,
          },
        },
      },
}));
