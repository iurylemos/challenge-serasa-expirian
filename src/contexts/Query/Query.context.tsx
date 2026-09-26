"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type JSX, type ReactNode, useMemo } from "react";

type QueryProviderProps = {
  children: ReactNode;
};

export default function QueryProvider({
  children,
}: QueryProviderProps): JSX.Element {
  const queryClientMemo = useMemo<QueryClient>(() => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          retry: 1,
        },
      },
    });

    return queryClient;
  }, []);

  return (
    <QueryClientProvider client={queryClientMemo}>
      {children}
    </QueryClientProvider>
  );
}
