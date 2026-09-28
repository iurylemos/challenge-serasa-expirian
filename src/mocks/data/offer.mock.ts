import type { Offer } from "@/src/interfaces/offer.interface";

export const mockOffers: Offer[] = [
  {
    id: "offer-1",
    companyInitials: "BH",
    companyName: "Banco Horizonte",
    subtitle: "Cartão de crédito · desde mar/2023",
    originalPrice: 3480.9,
    finalPrice: 689.0,
    discountPercentage: 80,
    paymentDescription: "á vista",
    isBestOffer: true,
  },
  {
    id: "offer-2",
    companyInitials: "CT",
    companyName: "Conecta Telecom",
    subtitle: "Conta de celular · desde ago/2024",
    originalPrice: 412.97,
    finalPrice: 98.9,
    discountPercentage: 76,
    paymentDescription: "á vista",
    isBestOffer: false,
  },
  {
    id: "offer-3",
    companyInitials: "LV",
    companyName: "Loja Vitrine",
    subtitle: "Crediário · desde jan/2024",
    originalPrice: 1950.0,
    finalPrice: 450.0,
    discountPercentage: 64,
    paymentDescription: "Entrada de R$ 90,00 + 4x de R$ 90,00",
    isBestOffer: false,
  },
];
