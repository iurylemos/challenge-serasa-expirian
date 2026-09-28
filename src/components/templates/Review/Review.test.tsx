import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ReviewTemplate from "./index";
import { ReviewConstants } from "@/src/components/templates/Review/Review.constants";
import type { Offer } from "@/src/interfaces/offer.interface";
import type { PaymentMethod } from "@/src/interfaces/paymentMethod.enum";
import { paymentMethodMock } from "@/src/mocks/data/paymentMethod.mock";

const selectedOffer: Offer = {
  id: "",
  isBestOffer: true,
  companyInitials: "BH",
  companyName: "Banco Horizonte",
  subtitle: "Acordo especial",
  originalPrice: 1000,
  finalPrice: 800,
  discountPercentage: 20,
  paymentDescription: "À vista",
};

const selectedPaymentMethod: PaymentMethod = paymentMethodMock[0];

function renderReview(
  overrides: Partial<React.ComponentProps<typeof ReviewTemplate>> = {},
) {
  const props: React.ComponentProps<typeof ReviewTemplate> = {
    selectedOffer,
    selectedPaymentMethod,
    isTermsAccepted: false,
    handleReadFullTerms: vi.fn(),
    handleConfirmAgreement: vi.fn(),
    handleBackToPayment: vi.fn(),
    setIsTermsAccepted: vi.fn(),
    ...overrides,
  };

  return {
    ...render(<ReviewTemplate {...props} />),
    props,
  };
}

describe("ReviewTemplate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should disable confirm when terms are not accepted", () => {
    renderReview({
      isTermsAccepted: false,
    });

    expect(
      screen.getByRole("button", {
        name: ReviewConstants.CONFIRM,
      }),
    ).toBeDisabled();
  });

  it("should enable confirm when terms are accepted", () => {
    renderReview({
      isTermsAccepted: true,
    });

    expect(
      screen.getByRole("button", {
        name: ReviewConstants.CONFIRM,
      }),
    ).toBeEnabled();
  });

  it("should call setIsTermsAccepted when terms acceptance changes", async () => {
    const user = userEvent.setup();
    const { props } = renderReview();

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(props.setIsTermsAccepted).toHaveBeenCalledWith(true);
  });

  it("should call handleReadFullTerms when reading the full terms", async () => {
    const user = userEvent.setup();
    const { props } = renderReview();

    const readTermsButton = screen.getByRole("button", {
      name: /ler termos completos/i,
    });

    await user.click(readTermsButton);

    expect(props.handleReadFullTerms).toHaveBeenCalledTimes(1);
  });

  it("should call handleConfirmAgreement when confirming the agreement", async () => {
    const user = userEvent.setup();
    const { props } = renderReview({
      isTermsAccepted: true,
    });

    const confirmButton = screen.getByRole("button", {
      name: ReviewConstants.CONFIRM,
    });

    await user.click(confirmButton);

    expect(props.handleConfirmAgreement).toHaveBeenCalledTimes(1);
  });

  it("should call handleBackToPayment when clicking back", async () => {
    const user = userEvent.setup();
    const { props } = renderReview();

    await user.click(
      screen.getByRole("button", {
        name: "Voltar",
      }),
    );

    expect(props.handleBackToPayment).toHaveBeenCalledTimes(1);
  });
});
