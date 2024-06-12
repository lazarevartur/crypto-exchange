import type { DeepPartial, ThemeOverride } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const themeConfig: DeepPartial<ThemeOverride> = {
  sizes: { container: { xl: "1140px" } },
  styles: {
    global: () => ({
      html: { height: "100%" },
      body: {
        height: "100%",
        bg: "#f5f7f9",
        color: "dark",
      },
      "#__next": {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      },
      ".chakra-form-control": {
        fontSize: "16px",
        lineHeight: "16px",
        fontWeight: 500,
      },
      "::-webkit-scrollbar-thumb": {
        background: "disable",
        borderRadius: "64px",
      },
      "::-webkit-scrollbar": {
        w: "6px",
        h: "6px",
      },
    }),
  },
  fonts: {
    heading: "var(--font-DM-sans)",
    body: "var(--font-DM-sans)",
  },
  breakpoints: {
    sm: "360px",
    md: "768px",
    xl: "1440px",
  },
  config: {
    initialColorMode: "light",
  },
};

export const mainTheme = extendTheme(themeConfig);
