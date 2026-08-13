import { AppHeader, AppShell } from '@/components/features/app-shell/app-shell';
import { OverviewSummary } from '@/components/features/overview/overview-summary';
import { WelcomeHero } from '@/components/features/overview/welcome-hero';

export function OverviewPage() {
  return (
    <AppShell>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-8 sm:px-6 lg:pb-10">
        <WelcomeHero />
        <OverviewSummary />
        <footer className="mt-auto flex flex-col gap-2 border-t pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>数据更新时间：2026年8月13日 09:30</p>
          <p>React Template · 工作空间概览</p>
        </footer>
      </main>
    </AppShell>
  );
}
