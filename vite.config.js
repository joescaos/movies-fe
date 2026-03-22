import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Sin este plugin, el JSX puede compilarse como React.createElement sin importar React → "React is not defined"
export default defineConfig({
  plugins: [react()],
});
