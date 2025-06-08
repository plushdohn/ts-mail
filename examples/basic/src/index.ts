import path from "node:path";
import { createEmailBuilder } from "simple-email";
import { defaultLayout } from "simple-email/layouts/default";

const file = Bun.file(path.join(__dirname, "md", "welcome.md"));

const emails = createEmailBuilder({
  layout: defaultLayout({
    links: {
      color: "#007bff",
    },
    document: {
      backgroundColor: "#e4e4e7",
    },
    content: {
      backgroundColor: "#ffffff",
      borderRadius: "0.5em",
    },
    signature: {
      text: "Volamail is a brand by VLK Studio SRLs\n\nVia Pietro Martini 31 09016 Iglesias (SU), Italy - P.IVA 04081440929",
      align: "center",
    },
  }),
});

const welcomeTemplate = await emails.build({
  subject: "Welcome to Volamail",
  markdown: await file.text(),
  data: {
    name: "Luca",
    link: "https://volamail.com/login?token=13j90123i91203",
  },
});

Bun.write("./welcome.html", welcomeTemplate.html);
