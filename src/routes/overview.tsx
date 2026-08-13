import { createFileRoute } from '@tanstack/react-router';

import { OverviewPage } from '@/components/features/overview-page';

export const Route = createFileRoute('/overview')({
  component: OverviewPage,
});
