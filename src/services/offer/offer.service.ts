import type { Offer } from "@/src/interfaces/offer.interface";

export class OfferService {
  public static async getAll(): Promise<Offer[]> {
    const response = await fetch("/api/offers");

    if (!response.ok) {
      throw new Error("Failed to fetch offers");
    }

    return response.json();
  }
}
