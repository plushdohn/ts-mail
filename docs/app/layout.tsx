import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import { Footer, Layout, Navbar } from "nextra-theme-docs";

import "./global.css";

const navbar = <Navbar logo={<b>ts-mail</b>} />;

const footer = <Footer>MIT {new Date().getFullYear()} © ts-mail</Footer>;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout navbar={navbar} pageMap={await getPageMap()} footer={footer}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
