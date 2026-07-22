import { DocsHero } from '@/components/features/docs/docs-hero';
import {
  DocsHeader,
  DocsSidebar,
} from '@/components/features/docs/docs-navigation';
import { GettingStartedSection } from '@/components/features/docs/getting-started-section';
import { StateShowcaseSection } from '@/components/features/docs/state-showcase-section';
import { UiShowcaseSection } from '@/components/features/docs/ui-showcase-section';
import { WorkflowSection } from '@/components/features/docs/workflow-section';
import { Separator } from '@/components/ui/separator';

export function HomePage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <DocsHeader />
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[13rem_minmax(0,1fr)]">
        <DocsSidebar />
        <main className="min-w-0 px-4 sm:px-6 lg:px-10 xl:px-14">
          <DocsHero />
          <Separator className="mt-16 sm:mt-20" />
          <GettingStartedSection />
          <Separator />
          <UiShowcaseSection />
          <Separator />
          <StateShowcaseSection />
          <Separator />
          <WorkflowSection />
          <footer className="flex flex-col gap-2 border-t py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>React Template · MIT License</p>
            <p>React 19 · Vite 8 · shadcn/ui</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
