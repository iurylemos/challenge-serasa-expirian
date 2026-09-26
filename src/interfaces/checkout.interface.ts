export enum CheckoutStep {
  OFFERS = "OFFERS",
  PAYMENT = "PAYMENT",
  REVIEW = "REVIEW",
}

export interface CheckoutState {
  step: CheckoutStep;
  selectedOfferId: string | null;
  selectedPaymentMethodId: string | null;
}

export interface CheckoutActions {
  selectOffer: (offerId: string) => void;
  selectPaymentMethod: (paymentMethodId: string) => void;
  goToStep: (step: CheckoutStep) => void;
  reset: () => void;
}

export type CheckoutStore = CheckoutState & CheckoutActions;
