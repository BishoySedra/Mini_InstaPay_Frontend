import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace with your repo name
const repoName = 'Mini_InstaPay_Frontend'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`
})