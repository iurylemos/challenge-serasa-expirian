"use client";

import type { JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "@/src/services/offer/offer.service";

export default function Offers(): JSX.Element {
  const { data, isPending, isError } = useQuery({
    queryKey: ["offers"],
    queryFn: OfferService.getAll,
  });

  if (isPending) return <p>Loading...</p>;

  if (isError) return <p>Error...</p>;

  return (
    <ul className="space-y-2">
      {data.map((offer) => (
        <li key={offer.id} className="rounded-xl bg-neutral-900 p-4">
          <h2 className="text-white">{offer.name}</h2>
          <p className="text-white">{offer.description}</p>
          <strong className="text-white">R$ {offer.price.toFixed(2)}</strong>
        </li>
      ))}
    </ul>
  );
}
