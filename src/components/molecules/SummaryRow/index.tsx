import type { JSX, ReactNode } from "react";

type SummaryRowProps = {
  label: string;
  children: ReactNode;
};

export default function SummaryRow({
  label,
  children,
}: Readonly<SummaryRowProps>): JSX.Element {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-3 text-sm last:border-b-0">
      <dt className="text-gray-500">{label}</dt>
      <dd className="text-right font-semibold text-gray-900">{children}</dd>
    </div>
  );
}
