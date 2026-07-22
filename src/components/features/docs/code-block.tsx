import { Terminal } from 'lucide-react';
import type { ReactNode } from 'react';

interface CodeBlockProps {
  children: ReactNode;
  label?: string;
}

export function CodeBlock({ children, label = 'Terminal' }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-zinc-950 text-zinc-100 shadow-sm">
      <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4 text-xs text-zinc-400">
        <Terminal className="size-3.5" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-[0.8125rem]/6">
        <code>{children}</code>
      </pre>
    </div>
  );
}
