import type { Config } from "tailwindcss";
import defaultScreens from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      // xp: "375px",
      ...defaultScreens.screens,
    },
    extend: {
      fontFamily: {
        "App-Inter": "'Inter', sans-serif",
      },
      colors: {
        app: {
          primary: "#814226",
          green: "#2B372A",
          white: "#FFFFFF",
          grey: "#9A9897",
          yellow: "#EAD42D",
          "grey-white": "#FAF9F9",
          "text-sub": "#1A202C",
        },
      },
      boxShadow: {
        "app-box": "rgba(0, 0, 0, 0.03) 0px 12px 16px, rgba(16, 24, 40, 0.02) 0px 4px 6px",
        "app-message": "rgba(129, 65, 38, 45%) 0px -1px 31px, rgb(129 65 38 / 45%) 0px 4px 22px",
      },
      backgroundImage: {
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
export default config;
