import { defineConfig } from "vitepress";

export default defineConfig({
  title: "simple-email",
  description: "Runtime emails for Typescript",
  titleTemplate: "%s - simple-email",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/plushdohn/simple-email" },
    ],
  },
});
