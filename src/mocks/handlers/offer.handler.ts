import { http, HttpHandler, HttpResponse, type JsonBodyType } from "msw";
import { mockOffers } from "@/src/mocks/data/offer.mock";
import { MagicNumber } from "@/src/interfaces/magicNumber.enum";

export const offerHandlers: HttpHandler[] = [
  http.get("/api/offers", async (): Promise<HttpResponse<JsonBodyType>> => {
    await new Promise((resolve) =>
      setTimeout(resolve, MagicNumber.THREE_HUNDRED),
    );

    return HttpResponse.json(mockOffers);
  }),
];
