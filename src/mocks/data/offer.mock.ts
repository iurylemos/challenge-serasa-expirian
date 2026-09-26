import type { Offer } from "@/src/interfaces/offer.interface";

export const mockOffers: Offer[] = [
  {
    id: "offer-1",
    name: "Plano Básico",
    price: 49.9,
    description: "Ideal para quem está começando.",
  },
  {
    id: "offer-2",
    name: "Plano Profissional",
    price: 99.9,
    description: "Mais recursos e suporte prioritário.",
  },
  {
    id: "offer-3",
    name: "Plano Empresarial",
    price: 199.9,
    description: "Para times que precisam de escala.",
  },
];
