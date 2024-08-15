import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target:env.VITE_SERVER_URL,
          // target: "https://shopping-ecart-backend.onrender.com",
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
