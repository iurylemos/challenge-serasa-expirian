import { MagicNumber } from "@/src/interfaces/magicNumber.enum";
import { Tags } from "@/src/interfaces/tags.enum";
import { PaymentMethod } from "@/src/interfaces/paymentMethod.enum";

export class PaymentMethodService {
  public static async getAll(): Promise<PaymentMethod[]> {
    const response = await fetch("/api/payment-method", {
      next: {
        tags: [Tags.PAYMENT_METHOD],
        revalidate: MagicNumber.THREE_THOUSAND_SIX_HUNDRED,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch offers");
    }

    return response.json();
  }
}
