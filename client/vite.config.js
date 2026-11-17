import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://localhost:5193', changeOrigin: true },
      '/doctors': { target: 'http://localhost:5193', changeOrigin: true }
    }
  },
  base: './',
  build: {
    // Ide irányítjuk a kimenetet a .NET MVC wwwroot mappájába
    outDir: resolve(__dirname, '../HospitalReservation/wwwroot/dist'),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
})