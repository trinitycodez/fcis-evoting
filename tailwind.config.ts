import type { Config } from "tailwindcss";
import defaultScreens from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./icons/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "0px",
      xp: "425px",
      ...defaultScreens.screens,
    },
    extend: {
      fontFamily: {
        original: "sans-serif",
        "App-Inter": "'Inter', sans-serif",
      },
      colors: {
        app: {
          primary: "#814226",
          green: "#2B372A",
          white: "#FFFFFF",
          grey: "#9A9897",
          yellow: "#EAD42D",
          "light-primary": "#FAEBD7",
          "grey-white": "#FAF9F9",
          "text-sub": "#1A202C",
        },
      },
      backgroundSize: {
        "img-70": "70%",
      },
      backgroundPosition: {
        sm: "right -6%",
        md: "122% -6%",
        lg: "137% 15%",
      },
      boxShadow: {
        "app-box": "rgba(0, 0, 0, 0.03) 0px 12px 16px, rgba(16, 24, 40, 0.02) 0px 4px 6px",
        "app-message": "rgba(129, 65, 38, 45%) 0px -1px 31px, rgb(129 65 38 / 45%) 0px 4px 22px",
        "app-toggle": "rgb(0 0 0 / 0.25) 0px -28px 33px 5px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
export default config;
