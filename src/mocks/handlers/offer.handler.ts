import { http, HttpHandler, HttpResponse } from "msw";
import { mockOffers } from "@/src/mocks/data/offer.mock";

export const offerHandlers: HttpHandler[] = [
  http.get("/api/offers", async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json(mockOffers);
  }),
];
