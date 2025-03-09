import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '$', replacement: resolve(__dirname, './') }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      include: ['**/*.tsx'],
      exclude: [
        '**/node_modules/**',
        '**/*.test.tsx',
        '**/*.spec.tsx',
        'src/__tests__/setup.ts',
        'src/App.tsx',
        'src/main.tsx',
        'pages/_app.tsx',
        'pages/_document.tsx',
        '**/dist/**',
        '**/.next/**',
      ],
    },
  },
});
