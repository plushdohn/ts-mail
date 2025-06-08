type DefaultLayoutOptions = {
  signature?:
    | string
    | {
        text: string;
        fontSize?: string;
        color?: string;
        align?: "left" | "center" | "right";
      };
  links?: {
    color: string;
  };
  document?: {
    backgroundColor?: string;
  };
  content?: {
    backgroundColor?: string;
    borderRadius?: string;
  };
};

export function defaultLayout(options: DefaultLayoutOptions) {
  return (content: string) => {
    const signatureText =
      typeof options.signature === "string"
        ? options.signature
        : options.signature?.text || null;

    const signatureOptions =
      typeof options.signature === "object" ? options.signature : null;

    const signatureAlign = signatureOptions?.align || "left";
    const signatureFontSize = signatureOptions?.fontSize || "14px";
    const signatureColor = signatureOptions?.color || "#6b7280";

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
      signatureText !== null
        ? `<tr><td><table cell-padding="0" cell-spacing="0" class="signature"><tbody><tr><td style="text-align: ${signatureAlign}; font-size: ${signatureFontSize}; color: ${signatureColor}">${signatureText.replace(
            /\n/g,
            "<br>"
          )}</td></tr></tbody></table></td></tr>`
        : ""
    }
  </tbody>
</table>`;

    const css = `body {
  background-color: ${options.document?.backgroundColor || "#e4e4e7"};
  padding: 2em;
  font-family: Helvetica, sans-serif;
}

.root {
  border: none; 
  width: 100%;
  margin: 0 auto;
  max-width: 576px;
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
  border: 1px solid #a1a1aa;
  padding: 3em;
  border-radius: ${options.content?.borderRadius || "1em"};
  background-color: ${options.content?.backgroundColor || "#e4e4e7"};
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
  color: ${options.links?.color || "#007bff"};
}

a:hover {
  text-decoration: underline;
}
  
.signature {
  width: 100%;
  margin: auto;
  padding: 2em 0;
  color: ${signatureOptions?.color || "#71717a"};
  font-size: ${signatureOptions?.fontSize || "12px"};
  text-align: ${signatureOptions?.align || "center"};
}`;

    return {
      css,
      html,
    };
  };
}
