import { Provider } from 'jotai';
import type { PropsWithChildren } from 'react';

import { ReactQueryProvider } from './react-query-provider';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReactQueryProvider>
      <Provider>{children}</Provider>
    </ReactQueryProvider>
  );
}
