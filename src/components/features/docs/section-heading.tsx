import type { ReactNode } from 'react';

interface SectionHeadingProps {
  description: string;
  eyebrow: string;
  title: ReactNode;
}

export function SectionHeading({
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <header className="max-w-2xl">
      <p className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-base/7 text-muted-foreground">{description}</p>
    </header>
  );
}
