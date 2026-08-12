import { GitBranch, Layers3 } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <a
          className="flex items-center gap-2 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          href="#overview"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Layers3 className="size-4" aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight">React Template</span>
        </a>

        <div className="ml-auto flex items-center gap-2">
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            v1.0.0
          </span>
          <Button asChild size="sm" variant="outline">
            <a
              href="https://github.com/junzhou7355608/react-template"
              rel="noreferrer"
              target="_blank"
            >
              <GitBranch aria-hidden="true" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
