// app/providers.tsx
'use client';

import { RouteProvider } from '../context/RouteContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RouteProvider>
      {children}
    </RouteProvider>
  );
}