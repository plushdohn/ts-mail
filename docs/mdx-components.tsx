import type { NextComponentType } from "next";
import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";

const themeComponents = getThemeComponents();

export function useMDXComponents(components: NextComponentType[]) {
  return {
    ...themeComponents,
    ...components,
  };
}
