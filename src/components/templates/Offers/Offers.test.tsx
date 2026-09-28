import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, delay, http } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Offers from "./index";
import { server } from "@/src/mocks/server";
import { useCheckout } from "@/src/hooks/useCheckout.hook";
import { OffersConstants } from "@/src/components/templates/Offers/Offers.constants";
import { StepLabel } from "@/src/interfaces/step.enum";

function renderOffers() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <Offers />
    </QueryClientProvider>,
  );
}

async function renderAndSelectFirstOffer() {
  const user = userEvent.setup();

  renderOffers();

  // A primeira oferta do mock é a do Banco Horizonte
  const [firstContinueButton] = await screen.findAllByRole("button", {
    name: "Continuar",
  });

  await user.click(firstContinueButton);

  return user;
}

describe("Offers", () => {
  beforeEach(() => {
    useCheckout.getState().reset();
  });

  it("should display the offers returned by the API", async () => {
    renderOffers();

    expect(await screen.findByText("Banco Horizonte")).toBeInTheDocument();

    expect(screen.getByText("Conecta Telecom")).toBeInTheDocument();

    expect(screen.getByText("Loja Vitrine")).toBeInTheDocument();
  });

  it("should display the loading state", () => {
    renderOffers();

    expect(screen.getByRole("status")).toHaveTextContent(
      "Carregando ofertas...",
    );
  });

  it("should display an error message when the API fails", async () => {
    server.use(
      http.get("/api/offers", () => {
        return new HttpResponse(null, {
          status: 500,
        });
      }),
    );

    renderOffers();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível carregar as ofertas.",
    );
  });

  describe("payment step", () => {
    it("should navigate to the payment step when an offer is selected", async () => {
      await renderAndSelectFirstOffer();

      expect(
        await screen.findByRole("heading", { name: StepLabel.TITLE_PAYMENT }),
      ).toBeInTheDocument();

      const steps = screen.getByRole("navigation", {
        name: "Etapas do checkout",
      });

      expect(within(steps).getByText("Pagamento")).toHaveAttribute(
        "aria-current",
        "step",
      );
      expect(within(steps).getByText("Ofertas")).not.toHaveAttribute(
        "aria-current",
      );
    });

    it("should display the summary of the selected offer", async () => {
      await renderAndSelectFirstOffer();

      const summary = await screen.findByRole("complementary", {
        name: OffersConstants.RESUME_AGREEMENT,
      });

      expect(within(summary).getByText("Banco Horizonte")).toBeInTheDocument();
      expect(within(summary).getByText("R$ 689,00")).toBeInTheDocument();
    });

    it("should not fetch the payment methods before the payment step", async () => {
      const paymentMethodsRequest = vi.fn();

      server.use(
        http.get("/api/payment-method", () => {
          paymentMethodsRequest();

          return HttpResponse.json([]);
        }),
      );

      renderOffers();

      expect(await screen.findByText("Banco Horizonte")).toBeInTheDocument();
      expect(paymentMethodsRequest).not.toHaveBeenCalled();
    });

    it("should fetch and display the payment methods", async () => {
      await renderAndSelectFirstOffer();

      expect(
        await screen.findByRole("radio", { name: "Pix" }),
      ).not.toBeChecked();
      expect(screen.getByRole("radio", { name: "Boleto" })).not.toBeChecked();
    });

    it("should display the loading state while the payment methods are being fetched", async () => {
      server.use(
        http.get("/api/payment-method", async () => {
          await delay("infinite");

          return HttpResponse.json([]);
        }),
      );

      await renderAndSelectFirstOffer();

      expect(await screen.findByRole("status")).toHaveTextContent(
        "Carregando formas de pagamento...",
      );
    });

    it("should display an error message when the payment methods API fails", async () => {
      server.use(
        http.get("/api/payment-method", () => {
          return new HttpResponse(null, {
            status: 500,
          });
        }),
      );

      await renderAndSelectFirstOffer();

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Não foi possível carregar as formas de pagamento.",
      );
    });

    it("should display the boleto details only when it is selected", async () => {
      const user = await renderAndSelectFirstOffer();

      const boleto = await screen.findByRole("radio", { name: "Boleto" });

      expect(screen.queryByText(/Vencimento/)).not.toBeInTheDocument();

      await user.click(boleto);

      expect(screen.getByText(/Vencimento/)).toBeInTheDocument();
    });

    it("should only enable the review button after a payment method is selected", async () => {
      const user = await renderAndSelectFirstOffer();

      const reviewButton = await screen.findByRole("button", {
        name: "Ir para revisão",
      });

      expect(reviewButton).toBeDisabled();

      await user.click(await screen.findByRole("radio", { name: "Boleto" }));

      expect(reviewButton).toBeEnabled();
    });

    it("should go to the review step when continuing with a payment method selected", async () => {
      const user = await renderAndSelectFirstOffer();

      await user.click(await screen.findByRole("radio", { name: "Pix" }));
      await user.click(screen.getByRole("button", { name: "Ir para revisão" }));

      expect(
        await screen.findByRole("heading", { name: StepLabel.TITLE_REVIEWS }),
      ).toBeInTheDocument();
    });

    it.each(["Trocar oferta", "Voltar"])(
      'should go back to the offers step when clicking "%s"',
      async (buttonName) => {
        const user = await renderAndSelectFirstOffer();

        await user.click(
          await screen.findByRole("button", { name: buttonName }),
        );

        expect(
          screen.getByRole("heading", { name: StepLabel.TITLE_OFFERS }),
        ).toBeInTheDocument();
        expect(await screen.findByText("Conecta Telecom")).toBeInTheDocument();
      },
    );
  });
});
