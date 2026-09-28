import type { JSX } from "react";
import { AgreementSummaryConstants } from "@/src/components/organisms/AgreementSummary/AgreementSummary.constants";
import { CurrencyUtil } from "@/src/utils/currency.util";
import ChevronButton from "@/src/components/atoms/ChevronButton";
import TextButton from "@/src/components/atoms/TextButton";

type AgreementSummaryProps = {
  totalValue: number;
  canContinue: boolean;
  onContinue: () => void;
  onBack: () => void;
};

export default function AgreementSummary({
  totalValue,
  canContinue,
  onContinue,
  onBack,
}: Readonly<AgreementSummaryProps>): JSX.Element {
  return (
    <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <dl className="flex items-center justify-between">
        <dt className="text-sm text-gray-500">
          {AgreementSummaryConstants.VALUE_AGREEMENT}
        </dt>
        <dd className="text-lg font-bold text-gray-900">
          {CurrencyUtil.format(totalValue)}
        </dd>
      </dl>

      <ChevronButton
        label={AgreementSummaryConstants.GO_REVIEW}
        disabled={!canContinue}
        onClick={onContinue}
      />

      <TextButton
        label={AgreementSummaryConstants.BACK_LABEL}
        chevronEnabled={false}
        onClick={onBack}
        className="w-full justify-center cursor-pointer"
      />
    </div>
  );
}
