"use client";

import { getQueryClient } from "@/src/libs/tanstack/tanstack.lib";
import {
  type DehydratedState,
  HydrationBoundary,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { JSX, ReactNode } from "react";

type HydrateContextProps = {
  state: DehydratedState;
  children: ReactNode;
};

export default function HydrateContext({
  state,
  children,
}: HydrateContextProps): JSX.Element {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state}>{children}</HydrationBoundary>
    </QueryClientProvider>
  );
}
