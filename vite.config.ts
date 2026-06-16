import path from 'path';
import react from '@vitejs/plugin-react-swc';
// @ts-ignore
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default {
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
  build: {
    // minify: 'terser'
  },
};
