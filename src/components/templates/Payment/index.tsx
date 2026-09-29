import type { JSX } from "react";
import type { Offer } from "@/src/interfaces/offer.interface";
import type { PaymentMethod } from "@/src/interfaces/paymentMethod.enum";
import { CheckoutStep } from "@/src/interfaces/checkout.interface";
import { PaymentConstants } from "@/src/components/templates/Payment/Payment.constants";
import { useQuery } from "@tanstack/react-query";
import { Tags } from "@/src/interfaces/tags.enum";
import { PaymentMethodService } from "@/src/services/paymentMethod/paymentMethod.service";
import AgreementSummary from "@/src/components/organisms/AgreementSummary";
import PaymentMethodList from "@/src/components/organisms/PaymentMethodList";
import SelectedOfferSummary from "@/src/components/organisms/SelectedOfferSummary";

type PaymentTemplateProps = {
  selectPaymentMethod: (paymentMethod: PaymentMethod) => void;
  selectedPaymentMethod: PaymentMethod;
  selectedOffer: Offer;
  handleBackToOffers: () => void;
  goToStep: (step: CheckoutStep) => void;
};

export default function PaymentTemplate({
  selectPaymentMethod,
  selectedPaymentMethod,
  selectedOffer,
  handleBackToOffers,
  goToStep,
}: Readonly<PaymentTemplateProps>): JSX.Element {
  const {
    data: paymentMethods,
    isPending: isPaymentMethodsPending,
    isError: isPaymentMethodsError,
  } = useQuery({
    queryKey: [Tags.PAYMENT_METHOD],
    queryFn: PaymentMethodService.getAll,
  });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_20rem]">
      <PaymentMethodList
        paymentMethods={paymentMethods ?? []}
        isPending={isPaymentMethodsPending}
        isError={isPaymentMethodsError}
        selectedPaymentMethod={selectedPaymentMethod}
        onSelectPaymentMethod={selectPaymentMethod}
      />

      {selectedOffer.id && (
        <aside
          aria-label={PaymentConstants.RESUME_AGREEMENT}
          className="space-y-4"
        >
          <SelectedOfferSummary
            companyInitials={selectedOffer.companyInitials}
            companyName={selectedOffer.companyName}
            originalPrice={selectedOffer.originalPrice}
            finalPrice={selectedOffer.finalPrice}
            discountPercentage={selectedOffer.discountPercentage}
            paymentLabel={selectedOffer.paymentDescription}
            onChangeOffer={handleBackToOffers}
          />

          <AgreementSummary
            totalValue={selectedOffer.finalPrice}
            canContinue={!!selectedPaymentMethod.id}
            onContinue={() => goToStep(CheckoutStep.REVIEW)}
            onBack={handleBackToOffers}
            continueLabel={PaymentConstants.GO_REVIEW}
          />
        </aside>
      )}
    </div>
  );
}
