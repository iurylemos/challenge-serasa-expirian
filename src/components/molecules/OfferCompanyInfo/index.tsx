import type { JSX } from "react";
import Avatar from "@/src/components/atoms/Avatar";
import { VariantSize } from "@/src/interfaces/variant.enum";

type OfferCompanyInfoProps = {
  initials: string;
  companyName: string;
  subtitle: string;
};

export default function OfferCompanyInfo({
  initials,
  companyName,
  subtitle,
}: Readonly<OfferCompanyInfoProps>): JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <Avatar initials={initials} size={VariantSize.MD} />
      <div>
        <p className="font-semibold text-gray-900">{companyName}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
