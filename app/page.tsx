import type { JSX } from "react";
import { dehydrate, noop } from "@tanstack/react-query";
import { getQueryClient } from "@/src/libs/tanstack/tanstack.lib";
import { OfferService } from "@/src/services/offer/offer.service";
import { Tags } from "@/src/interfaces/tags.enum";
import OffersTemplate from "@/src/components/templates/Offers";
import MSWContext from "@/src/contexts/MSW/MSW.context";
import HydrateContext from "@/src/contexts/Hydrate/Hydrate.context";

export default async function Home(): Promise<JSX.Element> {
  const queryClient = getQueryClient();

  await queryClient
    .query({
      queryKey: [Tags.OFFERS],
      queryFn: OfferService.getAll,
    })
    .catch(noop);

  return (
    <MSWContext>
      <HydrateContext state={dehydrate(queryClient)}>
        <OffersTemplate />
      </HydrateContext>
    </MSWContext>
  );
}
