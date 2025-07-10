import { marked } from "marked";
import type { EmailLayoutOptions, EmailParams, EmailStyles } from "./types";
import { createTextRenderer } from "./marked/render-text";
import { GRAYS } from "./colors";

export function getEmailWithLayout(
  content: string,
  options: EmailLayoutOptions
) {
  const styles = getStylesWithDefaults(options.styles);

  const html = `<table cell-padding="0" cell-spacing="0" class="root">
  <tbody>
    <tr>
      <td>
        <table cell-padding="0" cell-spacing="0" class="content">
          <tbody>
            <tr>
              <td class="content-root">${content}</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
    ${
      options.footer
        ? `<tr><td><table cell-padding="0" cell-spacing="0" class="signature"><tbody><tr><td>${options.footer}</td></tr></tbody></table></td></tr>`
        : ""
    }
  </tbody>
</table>`;

  const css = `
html {
  height: 100%;
}

:root {
  color-scheme: light dark;
}

body {
  background-color: ${styles.document.backgroundColor.light};
  padding: 2em;
  font-family: Helvetica, sans-serif;
}

.root {
  border: none; 
  width: 100%;
  margin: 0 auto;
  max-width: 576px;
}

p {
  color: ${styles.paragraphs.color.light};
  line-height: 1.5;
}

hr {
  margin: 2em 0;
  border: none;
  height: 1px;
  background-color: #d4d4d8;
}

.content {
  width: 100%;
  margin: 0 auto;
  ${
    styles.content.border
      ? `border: ${styles.content.border.width} solid ${styles.content.border.color.light};`
      : ""
  }
  padding: 2em;
  border-radius: ${styles.content.borderRadius};
  background-color: ${styles.content.backgroundColor.light};
}

.content-root > *:first-child {
  margin-top: 0;
}

.content-root > *:last-child {
  margin-bottom: 0;
}

a {
  text-decoration: none;
  font-weight: 500;
  color: ${styles.links.color.light};
}

a:hover {
  text-decoration: underline;
}
  
.signature {
  width: 100%;
  margin: auto;
  padding: 2em 0;
  color: ${styles.footer.color.light};
  font-size: ${styles.footer.fontSize};
  text-align: ${styles.footer.align};
}
  
@media (prefers-color-scheme: dark) {
  body {
    background-color: ${styles.document.backgroundColor.dark};
  }

  .content {
    border-color: #27272a;
    background-color: ${styles.content.backgroundColor.dark};
  }

  a {
    color: ${styles.links.color.dark};
  }

  hr {
    background-color: #27272a;
  }

  p {
    color: ${styles.paragraphs.color.dark};
  }

  .signature {
    color: ${styles.footer.color.dark};
  }
}`;

  return {
    css,
    html,
  };
}

function getStylesWithDefaults(styles?: EmailStyles) {
  // TODO: Make this configurable
  const chosenGrays = GRAYS.zinc;

  return {
    ...styles,
    footer: {
      fontSize: "12px",
      color: {
        light: chosenGrays[500],
        dark: chosenGrays[500],
      },
      align: "center",
      ...styles?.footer,
    },
    links: {
      color: {
        light: chosenGrays[600],
        dark: chosenGrays[600],
      },
      ...styles?.links,
    },
    document: {
      backgroundColor: {
        light: chosenGrays[100],
        dark: chosenGrays[800],
      },
      ...styles?.document,
    },
    content: {
      backgroundColor: {
        light: chosenGrays[100],
        dark: chosenGrays[900],
      },
      borderRadius: "0.75em",
      ...styles?.content,
      border: {
        width: "1px",
        color: {
          light: chosenGrays[200],
          dark: chosenGrays[700],
        },
        ...styles?.content?.border,
      },
    },
    paragraphs: {
      color: {
        light: chosenGrays[700],
        dark: chosenGrays[400],
      },
      ...styles?.paragraphs,
    },
  };
}

export async function computeContentAsHtml(params: EmailParams) {
  const content =
    "markdown" in params
      ? await marked(params.markdown)
      : "html" in params
      ? params.html
      : params.text.replace(/\n/g, "<br>");

  const withInjectedVariables = getTextWithInjectedVariables(
    content,
    params.data
  );

  return withInjectedVariables;
}

export async function computeContentAsText(params: EmailParams) {
  const text =
    "markdown" in params
      ? await marked(params.markdown, {
          renderer: createTextRenderer(),
        })
      : "text" in params
      ? params.text
      : null;

  if (!text) {
    return null;
  }

  const withInjectedVariables = getTextWithInjectedVariables(text, params.data);

  return withInjectedVariables;
}

function getTextWithInjectedVariables(
  content: string,
  data: Record<string, string>
) {
  return content.replace(
    /\{\{([a-zA-Z0-9_]+)\}\}/g,
    (match, key) => data[key] || match
  );
}
