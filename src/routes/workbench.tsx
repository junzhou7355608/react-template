import { createFileRoute } from '@tanstack/react-router';

import { WorkbenchPage } from '@/components/features/workbench-page';

export const Route = createFileRoute('/workbench')({
  component: WorkbenchPage,
});
