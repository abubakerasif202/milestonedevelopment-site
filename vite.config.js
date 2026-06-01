import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        services: resolve(__dirname, "services.html"),
        residential: resolve(__dirname, "residential-construction.html"),
        commercial: resolve(__dirname, "commercial-construction.html"),
        industrial: resolve(__dirname, "industrial-construction.html"),
        renovations: resolve(__dirname, "renovations.html"),
        design: resolve(__dirname, "design-and-construct.html"),
        packages: resolve(__dirname, "home-and-land-packages.html"),
        management: resolve(__dirname, "management-services.html"),
        projects: resolve(__dirname, "projects.html"),
        process: resolve(__dirname, "process.html"),
        team: resolve(__dirname, "team.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
});
