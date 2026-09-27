import type { JSX } from "react";
import { VariantCurrency } from "@/src/interfaces/variant.enum";
import CurrencyText from "@/src/components/atoms/CurrencyText";
import Badge from "@/src/components/atoms/Badge";

type OfferPriceSummaryProps = {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
};

export default function OfferPriceSummary({
  originalPrice,
  finalPrice,
  discountPercentage,
}: Readonly<OfferPriceSummaryProps>): JSX.Element {
  return (
    <div className="space-y-1">
      <CurrencyText value={originalPrice} variant={VariantCurrency.OLD} />
      <div className="flex items-center gap-2">
        <CurrencyText value={finalPrice} variant={VariantCurrency.NEW} />
        <Badge
          className="bg-green-50 text-black font-bold"
          iconEnabled={false}
          description={`${discountPercentage}% de desconto`}
        />
      </div>
    </div>
  );
}
