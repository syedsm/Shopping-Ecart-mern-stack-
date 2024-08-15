import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log('API URL in Viteconfig:', https://shopping-ecart-backend.onrender.com);

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: "https://shopping-ecart-backend.onrender.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
