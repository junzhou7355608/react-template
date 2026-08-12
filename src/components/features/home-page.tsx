import { DocsHero } from '@/components/features/docs/docs-hero';
import { DocsHeader } from '@/components/features/docs/docs-navigation';

export function HomePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <DocsHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6">
        <DocsHero />
        <footer className="mt-auto flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>React Template · MIT License</p>
          <p>React 19 · Vite 8 · shadcn/ui</p>
        </footer>
      </main>
    </div>
  );
}
