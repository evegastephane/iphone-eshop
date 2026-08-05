import type { ReactNode } from "react";

const BASE =
  "flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 transition-colors md:w-[158px]";

const VARIANTS = {
  primary:
    "bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc]",
  secondary:
    "border border-solid border-black/[.08] hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]",
} as const;

export default function CtaLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: keyof typeof VARIANTS;
  children: ReactNode;
}) {
  return (
    <a
      className={`${BASE} ${VARIANTS[variant]}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
