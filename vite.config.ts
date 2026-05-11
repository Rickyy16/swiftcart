import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
// import { reactRouter } from "@react-router/dev/vite";
// import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    // reactRouter(),
    // tsconfigPaths(),
  ],
  server: {
    host: true, // This exposes the server on your local network
    port: 5173, // Optional: you can specify a fixed port
  },
})

