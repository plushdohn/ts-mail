# ts-mail

ts-mail is a tiny library for writing pretty emails templates in Typescript using either plain text or markdown.

> [!WARNING]
> This is still a VERY experimental library! It's been used by myself in a couple of work projects and its APIs will change drastically between versions. All patches under 0.0.x may include breaking changes.

## Installation

```bash
npm install ts-mail
```

## Usage

Here's a simple example of how to use `ts-mail` with default styles:

```ts
import { buildEmail } from "ts-mail";

const { html, text } = await buildEmail({
  subject: "Hello World",
  from: "your-email@example.com",
  to: "recipient@example.com",
  text: "Hello World",
  markdown: "# Hello World\nThis is a simple email template.",
});
```

### Builder API

You might prefer defining some base attributes (such as footer) for all your emails, and reuse those for each email you send. You can do this by using the builder API:

```ts
import { createEmailBuilder } from "ts-mail";

const emails = createEmailBuilder({
  footer: "This is the default footer",
  from: "your-email@example.com",
});

const { html, text } = await emails.build({
  subject: "Hello World",
  to: "recipient@example.com",
  text: "Hello World",
  markdown: "# Hello World\nThis is a simple email template.",
});
```

## Styling

You can customize the styles of your email by passing a `styles` object to the `buildEmail` function.
This allows you to override default styles for various elements and sections of the email.

You can override the styles for the following elements and sections:

- `footer`: font size, color (light/dark), alignment
- `links`: color (light/dark)
- `document`: background color (light/dark)
- `content`: background color (light/dark), border radius, border (width, color)
- `paragraphs`: color (light/dark)

Each color property accepts a `{ light: string, dark: string }` object.

### Example

```ts
import { buildEmail } from "ts-mail";

const { html, text } = await buildEmail({
  // other options...,
  styles: {
    content: {
      backgroundColor: {
        light: "#ffffff",
        dark: "#18181b",
      },
      border: {
        width: "2px",
        color: {
          light: "#e5e7eb",
          dark: "#27272a",
        },
      },
      borderRadius: "1em",
    },
    links: {
      color: {
        light: "#2563eb",
        dark: "#60a5fa",
      },
    },
    footer: {
      fontSize: "14px",
      color: {
        light: "#a1a1aa",
        dark: "#71717a",
      },
      align: "right",
    },
  },
});
```

### Dark Mode

- The generated CSS includes `@media (prefers-color-scheme: dark)` rules.
- You can specify both `light` and `dark` values for colors; defaults are provided if omitted.

### Custom CSS

You can provide arbitrary CSS via the `css` property. This will be appended to the generated CSS.
