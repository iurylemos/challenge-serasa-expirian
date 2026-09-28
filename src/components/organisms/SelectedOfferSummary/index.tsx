import type { JSX } from "react";
import { SelectedOfferSummaryConstants } from "@/src/components/organisms/SelectedOfferSummary/SelectedOfferSummary.constants";
import { CurrencyUtil } from "@/src/utils/currency.util";
import Avatar from "@/src/components/atoms/Avatar";
import Badge from "@/src/components/atoms/Badge";
import TextButton from "@/src/components/atoms/TextButton";

type SelectedOfferSummaryProps = {
  companyInitials: string;
  companyName: string;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  paymentLabel: string;
  onChangeOffer: () => void;
};

export default function SelectedOfferSummary({
  companyInitials,
  companyName,
  originalPrice,
  finalPrice,
  discountPercentage,
  paymentLabel,
  onChangeOffer,
}: Readonly<SelectedOfferSummaryProps>): JSX.Element {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-2">
        <Avatar
          initials={companyInitials}
          className="h-10 w-10 text-xs bg-white text-black border border-gray-200"
        />
        <div className="flex-1">
          <p className="font-bold text-gray-900">{companyName}</p>
          <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
            <span className="font-bold text-gray-900">
              {CurrencyUtil.format(finalPrice)} {paymentLabel}
            </span>
            <s className="text-xs text-gray-400">
              <span className="sr-only">
                {SelectedOfferSummaryConstants.ORIGINAL_PRICE}
              </span>
              {CurrencyUtil.format(originalPrice)}
            </s>
          </p>
        </div>

        <Badge
          description={`-${discountPercentage}%`}
          iconEnabled={false}
          className="bg-green-100 font-medium text-black"
        />
      </div>

      <div className="flex flex-col border-t-2 border-gray-200 mt-3 mb-2">
        <TextButton
          label={SelectedOfferSummaryConstants.CHANGE_OFFER_LABEL}
          chevronEnabled
          onClick={onChangeOffer}
          className="mt-4 cursor-pointer text-blue-600"
        />
      </div>
    </div>
  );
}
