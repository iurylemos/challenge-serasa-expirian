import type { AgreementDataConfirm } from "@/src/interfaces/agreement.interface";
import { MagicNumber } from "@/src/interfaces/magicNumber.enum";
import { Tags } from "@/src/interfaces/tags.enum";

export class AgreementService {
  public static async confirm(): Promise<AgreementDataConfirm> {
    const response = await fetch("/api/agreement/confirm", {
      next: {
        tags: [Tags.AGREEMENT],
        revalidate: MagicNumber.THREE_THOUSAND_SIX_HUNDRED,
      },
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to confirm the agreement");
    }

    return response.json();
  }
}
