import type { Config } from "tailwindcss";

import { colors } from "./styles/colors";
import { shadows } from "./styles/shadows";
import { spacing } from "./styles/spacing";
import { typography } from "./styles/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors,
      spacing,
      boxShadow: shadows,
      fontSize: typography.sizes,
      fontWeight: typography.weights,
    },
  },
};

export default config;
