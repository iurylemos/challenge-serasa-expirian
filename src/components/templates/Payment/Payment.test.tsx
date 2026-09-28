import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";

import PaymentTemplate from "./index";
import { server } from "@/src/mocks/server";
import { CheckoutStep } from "@/src/interfaces/checkout.interface";
import { PaymentConstants } from "@/src/components/templates/Payment/Payment.constants";
import type { Offer } from "@/src/interfaces/offer.interface";
import { paymentMethodMock } from "@/src/mocks/data/paymentMethod.mock";
import { PaymentMethodService } from "@/src/services/paymentMethod/paymentMethod.service";

const selectedOffer: Offer = {
  id: "",
  isBestOffer: false,
  subtitle: "",
  companyInitials: "BH",
  companyName: "Banco Horizonte",
  originalPrice: 1000,
  finalPrice: 800,
  discountPercentage: 20,
  paymentDescription: "À vista",
};

const selectedPaymentMethod = paymentMethodMock[0];

function renderPayment(
  overrides: Partial<React.ComponentProps<typeof PaymentTemplate>> = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const props: React.ComponentProps<typeof PaymentTemplate> = {
    selectPaymentMethod: vi.fn(),
    selectedPaymentMethod,
    selectedOffer,
    handleBackToOffers: vi.fn(),
    goToStep: vi.fn(),
    ...overrides,
  };

  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <PaymentTemplate {...props} />
      </QueryClientProvider>,
    ),
    props,
  };
}

describe("PaymentTemplate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display the payment methods returned by the API", async () => {
    renderPayment();

    expect(await screen.findByText("Pix")).toBeInTheDocument();
    expect(screen.getByText("Boleto")).toBeInTheDocument();

    expect(
      screen.getByText("Pagamento na hora, sem sair de casa"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Pague no app do banco ou em lotéricas"),
    ).toBeInTheDocument();
  });

  it("should display the loading state", () => {
    server.use(
      http.get("/api/payment-methods", async () => {
        await new Promise(() => {});
        return HttpResponse.json(paymentMethodMock);
      }),
    );

    renderPayment();

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should display an error message when the API fails", async () => {
    vi.spyOn(PaymentMethodService, "getAll").mockRejectedValue(
      new Error("Failed to fetch payment methods"),
    );

    renderPayment();

    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });

  it("should display the selected offer summary", async () => {
    renderPayment();

    expect(await screen.findByText("Banco Horizonte")).toBeInTheDocument();

    expect(
      screen.getByRole("complementary", {
        name: PaymentConstants.RESUME_AGREEMENT,
      }),
    ).toBeInTheDocument();
  });

  it("should call selectPaymentMethod when a payment method is selected", async () => {
    const user = userEvent.setup();

    vi.spyOn(PaymentMethodService, "getAll").mockResolvedValue(
      paymentMethodMock,
    );

    const { props } = renderPayment();

    await screen.findByText("Pix");

    await user.click(screen.getByText("Boleto"));

    expect(props.selectPaymentMethod).toHaveBeenCalledWith(
      paymentMethodMock[1],
    );
  });

  it("should call handleBackToOffers when clicking change offer", async () => {
    const user = userEvent.setup();
    const { props } = renderPayment();

    await screen.findByText("Banco Horizonte");

    await user.click(
      screen.getByRole("button", {
        name: "Trocar oferta",
      }),
    );

    expect(props.handleBackToOffers).toHaveBeenCalledTimes(1);
  });

  it("should call handleBackToOffers when clicking back", async () => {
    const user = userEvent.setup();
    const { props } = renderPayment();

    await screen.findByText("Banco Horizonte");

    await user.click(
      screen.getByRole("button", {
        name: "Voltar",
      }),
    );

    expect(props.handleBackToOffers).toHaveBeenCalledTimes(1);
  });

  it("should go to review when clicking continue", async () => {
    const user = userEvent.setup();
    const { props } = renderPayment();

    await screen.findByText("Banco Horizonte");

    const continueButton = screen.getByRole("button", {
      name: PaymentConstants.GO_REVIEW,
    });

    expect(continueButton).toBeEnabled();

    await user.click(continueButton);

    expect(props.goToStep).toHaveBeenCalledWith(CheckoutStep.REVIEW);
  });

  it("should disable continue when no payment method is selected", async () => {
    renderPayment({
      selectedPaymentMethod: {
        id: "",
      } as React.ComponentProps<
        typeof PaymentTemplate
      >["selectedPaymentMethod"],
    });

    await screen.findByText("Banco Horizonte");

    const continueButton = screen.getByRole("button", {
      name: PaymentConstants.GO_REVIEW,
    });

    expect(continueButton).toBeDisabled();
  });
});
