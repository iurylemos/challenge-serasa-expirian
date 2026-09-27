import type { Offer } from "@/src/interfaces/offer.interface";
import { MagicNumber } from "@/src/interfaces/magicNumber.enum";
import { Tags } from "@/src/interfaces/tags.enum";

export class OfferService {
  public static async getAll(): Promise<Offer[]> {
    const response = await fetch("/api/offers", {
      next: {
        tags: [Tags.OFFERS],
        revalidate: MagicNumber.THREE_THOUSAND_SIX_HUNDRED,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch offers");
    }

    return response.json();
  }
}
