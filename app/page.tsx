import type { JSX } from "react";
import Offers from "@/src/components/organisms/Offers";
import MSWProvider from "@/src/contexts/MSW/MSW.context";
import QueryProvider from "@/src/contexts/Query/Query.context";

export default function Home(): JSX.Element {
  return (
    <MSWProvider>
      <QueryProvider>
        <Offers />
      </QueryProvider>
    </MSWProvider>
  );
}
