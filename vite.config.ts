import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const repoName = env.GITHUB_REPOSITORY?.split('/')[1] ?? 'Portfolio-better';
  const base = '/';
  const projectRoot = path.dirname(fileURLToPath(import.meta.url));

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(projectRoot, '.'),
      },
    },
  };
});
