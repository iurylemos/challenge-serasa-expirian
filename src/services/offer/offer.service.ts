import { MagicNumber } from "@/src/interfaces/magicNumber.enum";
import type { Offer } from "@/src/interfaces/offer.interface";

export class OfferService {
  public static async getAll(): Promise<Offer[]> {
    const response = await fetch("/api/offers", {
      next: {
        tags: ["offers"],
        revalidate: MagicNumber.THREE_THOUSAND_SIX_HUNDRED,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch offers");
    }

    return response.json();
  }
}
