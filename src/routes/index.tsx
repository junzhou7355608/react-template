import { createFileRoute } from '@tanstack/react-router';

import { HomePage } from '@/components/features/home-page';

export const Route = createFileRoute('/')({
  component: HomePage,
});
