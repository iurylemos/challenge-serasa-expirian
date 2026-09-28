import {
  type PaymentMethod,
  PaymentMethodDetailIcon,
  PaymentMethodType,
} from "@/src/interfaces/paymentMethod.enum";

export const paymentMethodMock: PaymentMethod[] = [
  {
    id: "pix",
    type: PaymentMethodType.PIX,
    title: "Pix",
    description: "Pagamento na hora, sem sair de casa",
    badge: "Mais rápido",
  },
  {
    id: "boleto",
    type: PaymentMethodType.BILLET,
    title: "Boleto",
    description: "Pague no app do banco ou em lotéricas",
    details: [
      {
        id: "due-date",
        icon: PaymentMethodDetailIcon.CALENDAR,
        text: "Vencimento em 30/09/2026 (3 dias úteis).",
      },
      {
        id: "compensation",
        icon: PaymentMethodDetailIcon.CLOCK,
        text: "A compensação leva até 3 dias úteis após o pagamento.",
      },
    ],
  },
];
