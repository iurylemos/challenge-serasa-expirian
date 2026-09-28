import { create, type StoreApi, type UseBoundStore } from "zustand";
import { devtools } from "zustand/middleware";
import {
  CheckoutStep,
  type CheckoutState,
  type CheckoutStore,
} from "@/src/interfaces/checkout.interface";
import type { Offer } from "@/src/interfaces/offer.interface";
import {
  type PaymentMethod,
  PaymentMethodType,
} from "@/src/interfaces/paymentMethod.enum";
import { MagicNumber } from "@/src/interfaces/magicNumber.enum";

type IUseCheckout = UseBoundStore<StoreApi<CheckoutStore>>;

const initialState: CheckoutState = {
  step: CheckoutStep.OFFERS,
  selectedOffer: {
    companyInitials: "",
    companyName: "",
    discountPercentage: MagicNumber.ZERO,
    finalPrice: MagicNumber.ZERO,
    id: "",
    isBestOffer: false,
    originalPrice: MagicNumber.ZERO,
    paymentDescription: "",
    subtitle: "",
  },
  selectedPaymentMethod: {
    description: "",
    dueDate: "",
    id: "",
    note: "",
    title: "",
    type: PaymentMethodType.PIX,
  },
};

export const useCheckout: IUseCheckout = create<CheckoutStore>()(
  devtools(
    (set) => ({
      ...initialState,
      selectOffer: (offer: Offer): void => {
        set(
          { selectedOffer: offer, step: CheckoutStep.PAYMENT },
          false,
          "checkout/selectOffer",
        );
      },
      selectPaymentMethod: (paymentMethod: PaymentMethod): void => {
        set(
          { selectedPaymentMethod: paymentMethod },
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
