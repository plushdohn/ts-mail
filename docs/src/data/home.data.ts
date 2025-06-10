import { codeToHtml } from "shiki";
import { createEmailBuilder } from "simple-email";
import { defaultLayout } from "simple-email/layouts/default";

const emails = createEmailBuilder({
  layout: defaultLayout({
    signature: "Acme Corp LLC, Mountain View, CA 94043",
  }),
});

const markdown = `
# Hello, {{user}}.

Your one-time code is: **{{code}}**.

---

If you did not request this code, please ignore this email.
`;

const welcomeTemplate = await emails.build({
  subject: "Here's your one-time code",
  markdown,
  data: {
    user: "John",
    code: "123456",
  },
});

const code = `const emails = createEmailBuilder({
  layout: defaultLayout({
    signature: "Acme Corp LLC, Mountain View, CA 94043"
  }),
});

const content = \`
# Hello, {{user}}.

Your one-time code is: **{{code}}**.

---

If you did not request this code, please ignore this email.
\`;

const welcomeTemplate = await emails.build({
  subject: "Here's your one-time code",
  markdown: content,
  data: {
    user: "John",
    code: "123456",
  },
});`;

const html = await codeToHtml(code, {
  lang: "javascript",
  theme: "vitesse-dark",
});

export default {
  async load() {
    return {
      codeHtml: html,
      templateHtml: welcomeTemplate.html,
    };
  },
};
