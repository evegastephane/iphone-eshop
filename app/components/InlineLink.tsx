import type { ReactNode } from "react";

export default function InlineLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className="font-medium text-zinc-950 dark:text-zinc-50">
      {children}
    </a>
  );
}
