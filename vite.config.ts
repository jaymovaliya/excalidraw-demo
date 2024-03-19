import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// export default defineConfig({
//   define: {
//     'process.env': process.env
//   }
// });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.IS_PREACT": "true",
  },
});
