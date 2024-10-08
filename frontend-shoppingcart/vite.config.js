import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  // console.log(env.VITE_API_URL);
  return {
    plugins: [react()],
    server: {
      // proxy: {
      //   '/api': {
      //     target:env.VITE_SERVER_URL,
      //     // target: env.VITE_API_URL,
      //     changeOrigin: true,
      //     secure: false,
      //   },
      // },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // build: {
    //   rollupOptions: {
    //     input: 'index.html'
    //   }
    // },
  };
});
