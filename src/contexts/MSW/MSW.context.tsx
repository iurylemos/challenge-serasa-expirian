"use client";

import { type JSX, type ReactNode, useEffect, useState } from "react";
import { getWorker } from "@/src/mocks/browser";

type MSWContextProps = {
  children: ReactNode;
};

let isMSWStarted = false;

export default function MSWContext({ children }: MSWContextProps): JSX.Element {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    async function enableMocking(): Promise<void> {
      if (process.env.NEXT_PUBLIC_API_MOCKING !== "true") {
        setReady(true);
        return;
      }

      if (isMSWStarted) {
        setReady(true);
        return;
      }

      const worker = getWorker();

      await worker.start({
        onUnhandledRequest: "bypass",
      });

      isMSWStarted = true;
      setReady(true);
    }

    enableMocking().catch((error) => {
      console.error("MSW failed to start:", error);
    });
  }, []);

  if (!ready) {
    return <></>;
  }

  return <>{children}</>;
}
