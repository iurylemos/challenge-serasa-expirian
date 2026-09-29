import type { JSX } from "react";
import type { Offer } from "@/src/interfaces/offer.interface";
import type { PaymentMethod } from "@/src/interfaces/paymentMethod.enum";
import {
  REVIEW_AGREEMENT_TERMS,
  ReviewConstants,
} from "@/src/components/templates/Review/Review.constants";
import AgreementReview from "@/src/components/organisms/AgreementReview";
import AgreementTerms from "@/src/components/organisms/AgreementTerms";
import AgreementSummary from "@/src/components/organisms/AgreementSummary";

type ReviewTemplateProps = {
  selectedOffer: Offer;
  selectedPaymentMethod: PaymentMethod;
  isTermsAccepted: boolean;
  handleReadFullTerms: () => void;
  handleConfirmAgreement: () => void;
  handleBackToPayment: () => void;
  setIsTermsAccepted: (isAccepted: boolean) => void;
  isConfirming: boolean;
};

export default function ReviewTemplate({
  selectedOffer,
  selectedPaymentMethod,
  isTermsAccepted,
  handleReadFullTerms,
  handleConfirmAgreement,
  handleBackToPayment,
  setIsTermsAccepted,
  isConfirming,
}: ReviewTemplateProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-6">
        <AgreementReview
          companyInitials={selectedOffer.companyInitials}
          companyName={selectedOffer.companyName}
          subtitle={selectedOffer.subtitle}
          originalPrice={selectedOffer.originalPrice}
          finalPrice={selectedOffer.finalPrice}
          discountPercentage={selectedOffer.discountPercentage}
          condition={selectedOffer.paymentDescription}
          paymentMethodTitle={selectedPaymentMethod.title}
          dueDate={selectedPaymentMethod.dueDate}
        />

        <AgreementTerms
          terms={REVIEW_AGREEMENT_TERMS}
          isAccepted={isTermsAccepted}
          onAcceptedChange={setIsTermsAccepted}
          onReadFullTerms={handleReadFullTerms}
        />
      </div>

      <aside
        aria-label={ReviewConstants.RESUME_AGREEMENT}
        className="self-start"
      >
        <AgreementSummary
          totalValue={selectedOffer.finalPrice}
          canContinue={isTermsAccepted}
          continueLabel={
            isConfirming ? ReviewConstants.IN_PROGRESS : ReviewConstants.CONFIRM
          }
          note={selectedPaymentMethod.note}
          onContinue={handleConfirmAgreement}
          onBack={handleBackToPayment}
        />
      </aside>
    </div>
  );
}
