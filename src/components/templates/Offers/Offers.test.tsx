import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";

import Offers from "./index";
import { server } from "@/src/mocks/server";

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

describe("Offers", () => {
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
});
