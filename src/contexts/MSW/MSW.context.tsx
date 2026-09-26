"use client";

import { type JSX, type ReactNode, useEffect, useState } from "react";

type MSWProviderProps = {
  children: ReactNode;
};

let mswStartPromise: Promise<void> | null = null;

export default function MSWProvider({
  children,
}: MSWProviderProps): JSX.Element {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    async function enableMocking(): Promise<void> {
      if (process.env.NEXT_PUBLIC_API_MOCKING !== "true") {
        setReady(true);
        return;
      }

      if (!mswStartPromise) {
        mswStartPromise = import("@/src/mocks/browser").then(
          async ({ worker }) => {
            await worker.start({
              onUnhandledRequest: "bypass",
            });
          },
        );
      }

      await mswStartPromise;

      setReady(true);
    }

    enableMocking().catch(console.error);
  }, []);

  if (!ready) {
    return <></>;
  }

  return <>{children}</>;
}
