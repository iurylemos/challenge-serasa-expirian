"use client";

import { useMemo, type JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "@/src/services/offer/offer.service";
import { Tags } from "@/src/interfaces/tags.enum";
import { useCheckout } from "@/src/hooks/useCheckout.hook";
import { OffersConstants } from "@/src/components/templates/Offers/Offers.constants";
import { CheckoutStep } from "@/src/interfaces/checkout.interface";
import { StepLabel } from "@/src/interfaces/step.enum";
import { PaymentMethodService } from "@/src/services/paymentMethod/paymentMethod.service";
import OfferList from "@/src/components/organisms/OfferList";
import PaymentMethodList from "@/src/components/organisms/PaymentMethodList";
import SelectedOfferSummary from "@/src/components/organisms/SelectedOfferSummary";
import AgreementSummary from "@/src/components/organisms/AgreementSummary";
import Header from "@/src/components/organisms/Header";
import StepTabs from "@/src/components/molecules/StepTabs";
import Heading from "@/src/components/atoms/Heading";

type LabelHeading = {
  title: string;
  subtitle: string;
};

export default function Offers(): JSX.Element {
  const {
    step,
    selectedOfferId,
    selectedPaymentMethodId,
    selectOffer,
    selectPaymentMethod,
    goToStep,
  } = useCheckout();

  const {
    data: offers,
    isPending: isOffersPending,
    isError: isOffersError,
  } = useQuery({
    queryKey: [Tags.OFFERS],
    queryFn: OfferService.getAll,
  });

  const {
    data: paymentMethods,
    isPending: isPaymentMethodsPending,
    isError: isPaymentMethodsError,
  } = useQuery({
    queryKey: [Tags.PAYMENT_METHOD],
    queryFn: PaymentMethodService.getAll,
    enabled: step === CheckoutStep.PAYMENT,
  });

  const selectedOffer = offers?.find((offer) => offer.id === selectedOfferId);

  const memoLabelHeading = useMemo<LabelHeading>(() => {
    switch (step) {
      case CheckoutStep.OFFERS: {
        return {
          title: StepLabel.TITLE_OFFERS,
          subtitle: StepLabel.SUBTITLE_OFFERS,
        };
      }
      case CheckoutStep.PAYMENT: {
        return {
          title: StepLabel.TITLE_PAYMENT,
          subtitle: StepLabel.SUBTITLE_PAYMENT,
        };
      }
      default: {
        return {
          title: StepLabel.TITLE_REVIEWS,
          subtitle: StepLabel.SUBTITLE_REVIEWS,
        };
      }
    }
  }, [step]);

  const handleBackToOffers = (): void => goToStep(CheckoutStep.OFFERS);

  return (
    <section
      aria-label={OffersConstants.ARIA_LABEL}
      className="min-h-screen bg-gray-50"
    >
      <Header
        userName={OffersConstants.USER_NAME}
        userInitials={OffersConstants.USER_INITIALS}
      />

      <div className="mx-auto max-w-4xl px-6 py-8">
        <StepTabs currentStep={step} />

        <Heading
          title={memoLabelHeading.title}
          subtitle={memoLabelHeading.subtitle}
        />

        {step === CheckoutStep.OFFERS && (
          <OfferList
            offers={offers ?? []}
            isPending={isOffersPending}
            isError={isOffersError}
            selectedOfferId={selectedOfferId}
            onSelectOffer={selectOffer}
          />
        )}

        {step === CheckoutStep.PAYMENT && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1fr)_20rem]">
            <PaymentMethodList
              paymentMethods={paymentMethods ?? []}
              isPending={isPaymentMethodsPending}
              isError={isPaymentMethodsError}
              selectedPaymentMethodId={selectedPaymentMethodId}
              onSelectPaymentMethod={selectPaymentMethod}
            />

            {selectedOffer && (
              <aside
                aria-label={OffersConstants.RESUME_AGREEMENT}
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
                  canContinue={selectedPaymentMethodId !== null}
                  onContinue={() => goToStep(CheckoutStep.REVIEW)}
                  onBack={handleBackToOffers}
                />
              </aside>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
