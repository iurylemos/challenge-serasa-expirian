"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "@/src/services/offer/offer.service";
import { Tags } from "@/src/interfaces/tags.enum";
import { useCheckout } from "@/src/hooks/useCheckout.hook";
import OfferList from "@/src/components/organisms/OfferList";
import Header from "@/src/components/organisms/Header";
import StepTabs from "../../molecules/StepTabs";
import Heading from "../../atoms/Heading";

const CURRENT_USER = {
  name: "Maria",
  initials: "MS",
};

export default function Offers(): JSX.Element {
  const {
    data: offers,
    isPending,
    isError,
  } = useQuery({
    queryKey: [Tags.OFFERS],
    queryFn: OfferService.getAll,
  });

  const { step, selectedOfferId, selectOffer } = useCheckout();

  return (
    <section
      aria-label="Negociação de dívidas"
      className="min-h-screen bg-gray-50"
    >
      <Header
        userName={CURRENT_USER.name}
        userInitials={CURRENT_USER.initials}
      />

      <div className="mx-auto max-w-4xl px-6 py-8">
        <StepTabs currentStep={step} />

        <Heading
          title="Escolha como quitar sua dívida"
          subtitle="Ofertas para limpar seu nome. Os valores já incluem os descontos"
        />

        <OfferList
          offers={offers ?? []}
          isPending={isPending}
          isError={isError}
          selectedOfferId={selectedOfferId}
          onSelectOffer={selectOffer}
        />
      </div>
    </section>
  );
}
