import type { Offer } from "@/src/interfaces/offer.interface";
import { PaymentMethod } from "@/src/interfaces/paymentMethod.enum";

export enum CheckoutStep {
  OFFERS = "OFFERS",
  PAYMENT = "PAYMENT",
  REVIEW = "REVIEW",
}

export interface CheckoutState {
  step: CheckoutStep;
  selectedOffer: Offer;
  selectedPaymentMethod: PaymentMethod;
}

export interface CheckoutActions {
  selectOffer: (offer: Offer) => void;
  selectPaymentMethod: (paymentMethod: PaymentMethod) => void;
  goToStep: (step: CheckoutStep) => void;
  reset: () => void;
}

export type CheckoutStore = CheckoutState & CheckoutActions;
