import { useId, type JSX } from "react";
import { CurrencyUtil } from "@/src/utils/currency.util";
import { AgreementReviewConstants } from "@/src/components/organisms/AgreementReview/AgreementReview.constants";
import OfferCompanyInfo from "@/src/components/molecules/OfferCompanyInfo";
import SummaryRow from "@/src/components/molecules/SummaryRow";

type AgreementReviewProps = {
  companyInitials: string;
  companyName: string;
  subtitle: string;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  condition: string;
  paymentMethodTitle: string;
  dueDate: string;
};

export default function AgreementReview({
  companyInitials,
  companyName,
  subtitle,
  originalPrice,
  finalPrice,
  discountPercentage,
  condition,
  paymentMethodTitle,
  dueDate,
}: Readonly<AgreementReviewProps>): JSX.Element {
  const titleId = useId();
  const discountValue = originalPrice - finalPrice;

  return (
    <section
      aria-labelledby={titleId}
      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
    >
      <h2 id={titleId} className="font-semibold text-gray-900">
        {AgreementReviewConstants.REVIEW}
      </h2>

      <div className="mt-4">
        <OfferCompanyInfo
          initials={companyInitials}
          companyName={companyName}
          subtitle={subtitle}
        />
      </div>

      <dl className="mt-4">
        <SummaryRow label={AgreementReviewConstants.ORIGINAL_VALUE}>
          <s className="font-normal text-gray-400">
            {CurrencyUtil.format(originalPrice)}
          </s>
        </SummaryRow>

        <SummaryRow label={AgreementReviewConstants.DISCOUNT}>
          <span className="text-green-700">
            <span aria-hidden="true">{AgreementReviewConstants.FEW_VAL}</span>
            <span className="sr-only">{AgreementReviewConstants.FEW}</span>
            {CurrencyUtil.format(discountValue)} ({discountPercentage}%)
          </span>
        </SummaryRow>

        <SummaryRow label={AgreementReviewConstants.CONDITION}>
          {condition}
        </SummaryRow>

        <SummaryRow label={AgreementReviewConstants.FORM_PAYMENT}>
          {paymentMethodTitle}
        </SummaryRow>

        {dueDate && (
          <SummaryRow label={AgreementReviewConstants.DUE}>
            {AgreementReviewConstants.UNTIL}
            {dueDate}
          </SummaryRow>
        )}

        <div className="flex items-center justify-between pt-4">
          <dt className="font-semibold text-gray-900">
            {AgreementReviewConstants.NEGOTIATED_AMOUNT}
          </dt>
          <dd className="text-xl font-bold text-gray-900">
            {CurrencyUtil.format(finalPrice)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
