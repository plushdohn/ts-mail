import { createEmailBuilder } from "ts-mail";

const emails = createEmailBuilder({
  footer: "Acme Corp LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043",
});

const markdown = `
# Hello, {{user}}.

Your one-time code is: **{{code}}**.
`;

const welcomeTemplate = await emails.build({
  subject: "Here's your one-time code",
  markdown,
  data: {
    user: "John",
    code: "123456",
  },
});

Bun.write("welcome.html", welcomeTemplate.html);
