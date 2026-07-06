import { defineConfig } from 'vitest/config';

// Standalone config so tests do not load vite.config.ts (dev-server plugins).
export default defineConfig({
  test: {
    include: ['client/src/**/*.test.ts'],
    environment: 'node',
  },
});
