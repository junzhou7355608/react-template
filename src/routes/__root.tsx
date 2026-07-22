import { createRootRoute, Outlet } from '@tanstack/react-router';

import { AppLayout } from '@/components/layouts/app-layout';
import { AppProviders } from '@/components/providers/app-providers';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <AppProviders>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </AppProviders>
  );
}

function NotFoundComponent() {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div>
        <h1>404</h1>
        <p>Page not found</p>
      </div>
    </main>
  );
}
