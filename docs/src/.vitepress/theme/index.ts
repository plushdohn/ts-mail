import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";

const theme: Theme = {
  extends: DefaultTheme,
  Layout,
};

export default theme;
