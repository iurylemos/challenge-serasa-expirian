import type { JSX } from "react";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/src/libs/tanstack/tanstack.lib";
import { OfferService } from "@/src/services/offer/offer.service";
import Offers from "@/src/components/organisms/Offers";
import MSWContext from "@/src/contexts/MSW/MSW.context";
import HydrateContext from "@/src/contexts/Hydrate/Hydrate.context";

export default async function Home(): Promise<JSX.Element> {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["offers"],
    queryFn: OfferService.getAll,
  });

  return (
    <MSWContext>
      <HydrateContext state={dehydrate(queryClient)}>
        <Offers />
      </HydrateContext>
    </MSWContext>
  );
}
