import type { JSX } from "react";
import type { Offer } from "@/src/interfaces/offer.interface";
import OfferCard from "@/src/components/organisms/OfferCard";

type OfferListProps = {
  offers: Offer[];
  isPending: boolean;
  isError: boolean;
  selectedOfferId: string | null;
  onSelectOffer: (offerId: string) => void;
};

export default function OfferList({
  offers,
  isPending,
  isError,
  selectedOfferId,
  onSelectOffer,
}: Readonly<OfferListProps>): JSX.Element {
  if (isPending) {
    return <p role="status">Carregando ofertas...</p>;
  }

  if (isError) {
    return <p role="alert">Não foi possível carregar as ofertas.</p>;
  }

  if (!offers.length) {
    return <p role="status">Nenhuma oferta disponível no momento.</p>;
  }

  return (
    <ul
      aria-label="Lista de ofertas"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {offers.map((offer) => (
        <li
          key={offer.id}
          aria-current={offer.id === selectedOfferId ? "true" : undefined}
        >
          <OfferCard {...offer} onContinue={() => onSelectOffer(offer.id)} />
        </li>
      ))}
    </ul>
  );
}
