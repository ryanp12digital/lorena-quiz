import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Garante que o Vite consiga importar ativos a partir do root do projeto
      allow: ['.'],
    },
  },
})

