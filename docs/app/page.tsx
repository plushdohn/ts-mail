import Link from "next/link";
import { ChevronsRightIcon } from "lucide-react";

import { EmailDemoSwitch } from "./_components/email-demo-switch";

export default function Page() {
  return (
    <div className="flex flex-col gap-8 items-center py-8 bg-gradient-to-bl from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900">
      <div className="max-w-(--nextra-content-width) w-full px-6 flex gap-8 justify-between items-center py-16">
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-7xl font-bold leading-20">
            Simple{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-400">
              emails
            </span>
            <br />
            for Typescript
          </h1>
          <p className="text-xl leading-8">
            Write emails in plain text or markdown and send them with ease.{" "}
            <br />
            No build-step required.
          </p>

          <Link
            href="/docs/getting-started"
            className="bg-blue-500 py-2 px-4 rounded-full self-start mt-8 inline-flex items-center gap-2"
          >
            Get started <ChevronsRightIcon className="size-4" />
          </Link>
        </div>

        <EmailDemoSwitch />
      </div>
    </div>
  );
}
