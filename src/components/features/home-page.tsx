import { AppHeader, AppShell } from '@/components/features/app-shell/app-shell';
import { HomeHero } from '@/components/features/home/home-hero';

export function HomePage() {
  return (
    <AppShell>
      <AppHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 sm:px-6">
        <HomeHero />
        <footer className="mt-auto flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>React Template · MIT License</p>
          <p>React 19 · Vite 8 · shadcn/ui</p>
        </footer>
      </div>
    </AppShell>
  );
}
