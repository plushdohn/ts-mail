import { useMDXComponents as getThemeComponents } from "nextra-theme-docs";
import type { ComponentType } from "react";

const themeComponents = getThemeComponents();

export function useMDXComponents(components: ComponentType[] = []) {
  return {
    ...themeComponents,
    ...components,
  };
}
