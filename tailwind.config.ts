import type { Config } from "tailwindcss";

import { colors } from "./styles/colors";
import { shadows } from "./styles/shadows";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors,
      boxShadow: shadows,
    },
  },
};

export default config;
