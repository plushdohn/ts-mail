import {
  getEmailWithLayout,
  computeContentAsHtml,
  computeContentAsText,
} from "./render";
import type { BuildEmailParams, EmailOptions, EmailParams } from "./types";

export async function buildEmail(params: BuildEmailParams) {
  const [text, content] = await Promise.all([
    computeContentAsText(params),
    computeContentAsHtml(params),
  ]);

  const renderedLayout = getEmailWithLayout(content, {
    footer: params.footer,
    styles: params.styles,
  });

  const contentHtml = renderedLayout.html.replace(
    /\{\{([a-zA-Z0-9_]+)\}\}/g,
    (match, key) => params.data[key] || match
  );

  const html = `<html>
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="color-scheme" content="light dark" />

<style>${renderedLayout.css}${params.css || ""}</style>
</head>
<body>${contentHtml}</body>
</html>`;

  return {
    html,
    text,
  };
}

export function createEmailBuilder(options: EmailOptions) {
  async function build(params: EmailParams) {
    return buildEmail({
      ...options,
      ...params,
    });
  }

  return {
    build,
  };
}

export type { BuildEmailParams, EmailOptions, EmailParams };

export { GRAYS } from "./colors";
