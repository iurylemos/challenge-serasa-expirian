"use client";

import { useMemo, useState, type JSX } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferService } from "@/src/services/offer/offer.service";
import { Tags } from "@/src/interfaces/tags.enum";
import { useCheckout } from "@/src/hooks/useCheckout.hook";
import { OffersConstants } from "@/src/components/templates/Offers/Offers.constants";
import { CheckoutStep } from "@/src/interfaces/checkout.interface";
import { StepLabel } from "@/src/interfaces/step.enum";
import type { HeadingProps } from "@/src/interfaces/heading.interface";
import PaymentTemplate from "@/src/components/templates/Payment";
import ReviewTemplate from "@/src/components/templates/Review";
import OfferList from "@/src/components/organisms/OfferList";
import Header from "@/src/components/organisms/Header";
import StepTabs from "@/src/components/molecules/StepTabs";
import Heading from "@/src/components/atoms/Heading";

export default function OffersTemplate(): JSX.Element {
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);

  const {
    step,
    selectedOffer,
    selectedPaymentMethod,
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

  const memoLabelHeading = useMemo<HeadingProps>(() => {
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

  const handleBackToPayment = (): void => {
    setIsTermsAccepted(false);
    goToStep(CheckoutStep.PAYMENT);
  };

  const handleReadFullTerms = (): void => {
    // TODO: abrir modal/página com os termos completos
  };

  const handleConfirmAgreement = (): void => {
    // TODO: disparar a mutation de confirmação do acordo
  };

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
            selectedOffer={selectedOffer}
            onSelectOffer={selectOffer}
          />
        )}

        {step === CheckoutStep.PAYMENT && (
          <PaymentTemplate
            goToStep={goToStep}
            handleBackToOffers={handleBackToOffers}
            selectPaymentMethod={selectPaymentMethod}
            selectedOffer={selectedOffer}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        )}

        {step === CheckoutStep.REVIEW && (
          <ReviewTemplate
            handleBackToPayment={handleBackToPayment}
            handleConfirmAgreement={handleConfirmAgreement}
            handleReadFullTerms={handleReadFullTerms}
            isTermsAccepted={isTermsAccepted}
            selectedOffer={selectedOffer}
            selectedPaymentMethod={selectedPaymentMethod}
            setIsTermsAccepted={setIsTermsAccepted}
          />
        )}
      </div>
    </section>
  );
}
