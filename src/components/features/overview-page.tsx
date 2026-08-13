import { AppHeader, AppShell } from '@/components/features/app-shell/app-shell';
import { OverviewSummary } from '@/components/features/overview/overview-summary';
import { WelcomeHero } from '@/components/features/overview/welcome-hero';

export function OverviewPage() {
  return (
    <AppShell>
      <AppHeader />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-3 pb-8 sm:px-6 lg:pb-10">
        <WelcomeHero>
          <OverviewSummary />
        </WelcomeHero>
      </main>
    </AppShell>
  );
}
