import { AppHeader, AppShell } from '@/components/features/app-shell/app-shell';

export function WorkbenchPage() {
  return (
    <AppShell>
      <AppHeader />
      <main aria-label="工作台" className="flex-1" />
    </AppShell>
  );
}
