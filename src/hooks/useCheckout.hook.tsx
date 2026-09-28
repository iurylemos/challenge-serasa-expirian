import { create, type StoreApi, type UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";
import {
  CheckoutStep,
  type CheckoutState,
  type CheckoutStore,
} from "@/src/interfaces/checkout.interface";

type IUseCheckout = UseBoundStore<StoreApi<CheckoutStore>>;

const initialState: CheckoutState = {
  step: CheckoutStep.OFFERS,
  selectedOfferId: null,
  selectedPaymentMethodId: null,
};

export const useCheckout: IUseCheckout = create<CheckoutStore>()(
  devtools(
    (set) => ({
      ...initialState,
      selectOffer: (offerId: string): void => {
        set(
          { selectedOfferId: offerId, step: CheckoutStep.PAYMENT },
          false,
          "checkout/selectOffer",
        );
      },
      selectPaymentMethod: (paymentMethodId: string): void => {
        set(
          { selectedPaymentMethodId: paymentMethodId },
          false,
          "checkout/selectPaymentMethod",
        );
      },
      goToStep: (step: CheckoutStep): void => {
        set({ step }, false, "checkout/goToStep");
      },
      reset: (): void => {
        set(initialState, false, "checkout/reset");
      },
    }),
    { name: "checkout" },
  ),
);
