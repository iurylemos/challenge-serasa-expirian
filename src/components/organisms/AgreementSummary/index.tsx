import type { JSX } from "react";
import { CurrencyUtil } from "@/src/utils/currency.util";
import { AgreementSummaryConstants } from "@/src/components/organisms/AgreementSummary/AgreementSummary.constants";
import InfoIcon from "@/src/components/atoms/InfoIcon";
import ChevronButton from "@/src/components/atoms/ChevronButton";
import TextButton from "@/src/components/atoms/TextButton";

type AgreementSummaryProps = {
  totalValue: number;
  canContinue: boolean;
  continueLabel: string;
  note?: string;
  onContinue: () => void;
  onBack: () => void;
};

export default function AgreementSummary({
  totalValue,
  canContinue,
  continueLabel,
  note,
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
        label={continueLabel}
        disabled={!canContinue}
        onClick={onContinue}
      />

      <TextButton
        label={AgreementSummaryConstants.BACK_LABEL}
        chevronEnabled={false}
        onClick={onBack}
        className="w-full justify-center"
      />

      {note && (
        <p className="flex items-start justify-start gap-2 text-xs text-gray-500">
          <InfoIcon />
          {note}
        </p>
      )}
    </div>
  );
}
