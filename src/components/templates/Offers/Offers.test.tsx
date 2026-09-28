import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { beforeEach, describe, expect, it } from "vitest";

import Offers from "./index";
import { server } from "@/src/mocks/server";
import { StepLabel } from "@/src/interfaces/step.enum";
import { useCheckout } from "@/src/hooks/useCheckout.hook";

function renderOffers() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
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
      http.get("/api/offers", () => new HttpResponse(null, { status: 500 })),
    );

    renderOffers();

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Não foi possível carregar as ofertas.",
    );
  });

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
  });

  it.each(["Trocar oferta", "Voltar"])(
    'should go back to the offers step when clicking "%s"',
    async (buttonName) => {
      const user = await renderAndSelectFirstOffer();

      await user.click(await screen.findByRole("button", { name: buttonName }));

      expect(
        screen.getByRole("heading", { name: StepLabel.TITLE_OFFERS }),
      ).toBeInTheDocument();
      expect(await screen.findByText("Conecta Telecom")).toBeInTheDocument();
    },
  );
});
