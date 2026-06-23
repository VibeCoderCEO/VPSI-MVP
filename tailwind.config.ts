import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purion: {
          dark: '#062d1a',
          primary: '#1a8344',
          light: '#22c55e',
          accent: '#facc15',
          danger: '#ef4444',
        },
      },
    },
  },
  plugins: [],
};
export default config;
