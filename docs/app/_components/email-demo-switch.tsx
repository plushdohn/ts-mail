import { buildEmail, EmailParams } from "ts-mail";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { codeToHtml } from "shiki";

const options: EmailParams & { markdown: string } = {
  markdown: `# Hello, {{name}}

Welcome to ts-mail. This is a markdown email.

---

If you don't want to check out this library, feel free to ignore this email.`,
  footer: "Acme Corp LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043",
  subject: "Hello",
  data: {
    name: "John",
  },
};

function createDemoCode(params: EmailParams & { markdown: string }) {
  return `const markdown = \`
  
${params.markdown}
\`;
  
const email = await buildEmail({
  markdown,
  subject: \"${params.subject}\",
  footer: \"${params.footer}\",
  data: {
    name: \"John\",
  },
});`;
}

export async function EmailDemoSwitch() {
  const email = await buildEmail(options);

  const code = await codeToHtml(createDemoCode(options), {
    lang: "javascript",
    theme: "github-dark",
  });

  return (
    <div className="flex flex-col flex-1">
      <Tabs defaultValue="code">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <div className="h-[50vh] overflow-hidden rounded-md border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-900">
          <TabsContent value="code" className="w-full h-full relative">
            <div
              dangerouslySetInnerHTML={{ __html: code }}
              className="[&>pre]:p-4 [&>pre]:h-full h-full text-sm [&>pre]:whitespace-pre-wrap"
            />
          </TabsContent>
          <TabsContent value="preview" className="h-full">
            <iframe srcDoc={email.html} className="rounded-lg w-full h-full" />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
