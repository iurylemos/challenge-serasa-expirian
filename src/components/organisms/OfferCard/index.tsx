import type { JSX } from "react";
import OfferPriceSummary from "@/src/components/molecules/OfferPriceSummary";
import OfferCompanyInfo from "@/src/components/molecules/OfferCompanyInfo";
import PaymentSchedule from "@/src/components/molecules/PaymentSchedule";
import ChevronButton from "@/src/components/atoms/ChevronButton";
import Badge from "@/src/components/atoms/Badge";

type OfferCardProps = {
  companyInitials: string;
  companyName: string;
  subtitle: string;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  paymentDescription: string;
  isBestOffer: boolean;
  onContinue: () => void;
};

export default function OfferCard({
  companyInitials,
  companyName,
  subtitle,
  originalPrice,
  finalPrice,
  discountPercentage,
  paymentDescription,
  isBestOffer,
  onContinue,
}: Readonly<OfferCardProps>): JSX.Element {
  return (
    <article className="flex md:h-72 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-1 flex-col gap-4">
        {isBestOffer && (
          <Badge
            description="Melhor oferta"
            className="bg-green-700 text-white font-medium w-fit"
            iconEnabled
          />
        )}

        <OfferCompanyInfo
          initials={companyInitials}
          companyName={companyName}
          subtitle={subtitle}
        />

        <OfferPriceSummary
          originalPrice={originalPrice}
          finalPrice={finalPrice}
          discountPercentage={discountPercentage}
        />

        <PaymentSchedule description={paymentDescription} />
      </div>

      <ChevronButton label="Continuar" onClick={onContinue} />
    </article>
  );
}
