import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Mini_InstaPay_Frontend/',
  plugins: [react()]
});
// This configuration sets the base path for the application to '/Mini_InstaPay_Frontend/'
