import { http, HttpHandler, HttpResponse, type JsonBodyType } from "msw";
import { mockOffers } from "@/src/mocks/data/offer.mock";
import { MagicNumber } from "@/src/interfaces/magicNumber.enum";
import { paymentMethodMock } from "@/src/mocks/data/paymentMethod.mock";

export const offerHandlers: HttpHandler[] = [
  http.get("/api/offers", async (): Promise<HttpResponse<JsonBodyType>> => {
    await new Promise((resolve) =>
      setTimeout(resolve, MagicNumber.THREE_HUNDRED),
    );

    return HttpResponse.json(mockOffers);
  }),
  http.get(
    "/api/payment-method",
    async (): Promise<HttpResponse<JsonBodyType>> => {
      await new Promise((resolve) =>
        setTimeout(resolve, MagicNumber.THREE_HUNDRED),
      );

      return HttpResponse.json(paymentMethodMock);
    },
  ),
  http.post(
    "/api/agreement/confirm",
    async (): Promise<HttpResponse<JsonBodyType>> => {
      await new Promise((resolve) =>
        setTimeout(resolve, MagicNumber.EIGHT_HUNDRED),
      );

      if (Math.random() < MagicNumber.ZERO_THREE) {
        return new HttpResponse(null, { status: MagicNumber.FIVE_HUNDRED });
      }

      return HttpResponse.json({ success: true });
    },
  ),
];
