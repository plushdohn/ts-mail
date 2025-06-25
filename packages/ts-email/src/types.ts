export type ResponsiveColor = { light: string; dark: string };

export interface EmailStyles {
  footer?: {
    fontSize?: string;
    color?: ResponsiveColor;
    align?: "left" | "center" | "right";
  };
  links?: {
    color: ResponsiveColor;
  };
  document?: {
    backgroundColor?: ResponsiveColor;
  };
  content?: {
    backgroundColor?: ResponsiveColor;
    borderRadius?: string;
    border?:
      | {
          width?: string;
          color?: ResponsiveColor;
        }
      | false;
  };
  paragraphs?: {
    color?: ResponsiveColor;
  };
}

export interface EmailOptions {
  footer?: string;
  styles?: EmailStyles;
}

export type EmailContent =
  | { text: string }
  | { markdown: string }
  | { html: string };

export type EmailParams = EmailContent & {
  subject: string;
  data: Record<string, string>;
  footer?: string;
  styles?: EmailStyles;
  css?: string;
};

export interface EmailLayoutOptions {
  footer?: string;
  styles?: EmailStyles;
}

export type BuildEmailParams = EmailParams & EmailLayoutOptions;
