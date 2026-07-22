import { GitBranch, Layers3, Menu } from 'lucide-react';

import { documentationLinks } from '@/components/features/docs/docs-data';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavigationLinksProps {
  className?: string;
  closeOnSelect?: boolean;
}

function NavigationLinks({
  className,
  closeOnSelect = false,
}: NavigationLinksProps) {
  return (
    <nav aria-label="文档章节" className={cn('grid gap-1', className)}>
      {documentationLinks.map((item) => {
        const link = closeOnSelect ? (
          <SheetClose key={item.href} asChild>
            <a
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              href={item.href}
            >
              {item.label}
            </a>
          </SheetClose>
        ) : (
          <a
            key={item.href}
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            href={item.href}
          >
            {item.label}
          </a>
        );

        return link;
      })}
    </nav>
  );
}

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="lg:hidden"
              size="icon"
              type="button"
              variant="ghost"
            >
              <Menu aria-hidden="true" />
              <span className="sr-only">打开文档导航</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[min(22rem,85vw)]" side="left">
            <SheetHeader>
              <SheetTitle>React Template</SheetTitle>
              <SheetDescription>选择章节并继续阅读。</SheetDescription>
            </SheetHeader>
            <NavigationLinks className="px-2" closeOnSelect />
          </SheetContent>
        </Sheet>

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

export function DocsSidebar() {
  return (
    <aside className="hidden border-r lg:block">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto px-4 py-8">
        <p className="mb-3 px-3 text-xs font-medium tracking-wider text-muted-foreground uppercase">
          文档
        </p>
        <NavigationLinks />
      </div>
    </aside>
  );
}
