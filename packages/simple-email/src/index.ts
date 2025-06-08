import { marked } from "marked";
import { createTextRenderer } from "./marked/render-text";

type EmailLayout = (content: string) => {
  css: string;
  html: string;
};

export function createEmailBuilder({ layout }: { layout: EmailLayout }) {
  async function build(
    params: {
      subject: string;
      data: Record<string, string>;
    } & ({ text: string } | { markdown: string } | { html: string })
  ) {
    const text: string | null =
      "markdown" in params
        ? await marked(params.markdown, {
            renderer: createTextRenderer(),
          })
        : "text" in params
        ? params.text
        : null;

    const content =
      "markdown" in params
        ? await marked(params.markdown)
        : "html" in params
        ? params.html
        : params.text.replace(/\n/g, "<br>");

    const renderedLayout = layout(content);

    const contentHtml = renderedLayout.html.replace(
      /\{\{([a-zA-Z0-9_]+)\}\}/g,
      (match, key) => params.data[key] || match
    );

    const html = `<html>
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />

  <style>${renderedLayout.css}</style>
</head>
<body>${contentHtml}</body>
</html>`;

    return {
      html,
      text,
    };
  }

  return {
    build,
  };
}
