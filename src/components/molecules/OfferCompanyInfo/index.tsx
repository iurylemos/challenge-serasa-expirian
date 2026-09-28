import type { JSX } from "react";
import Avatar from "@/src/components/atoms/Avatar";

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
      <Avatar
        initials={initials}
        className="h-8 w-8 text-xs bg-gray-100 text-blue-600"
      />
      <div>
        <p className="font-semibold text-gray-900">{companyName}</p>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}
