import type { JSX } from "react";
import CalendarIcon from "@/src/components/atoms/CalendarIcon";

type PaymentScheduleProps = {
  description: string;
};

export default function PaymentSchedule({
  description,
}: Readonly<PaymentScheduleProps>): JSX.Element {
  return (
    <div className="flex items-center gap-1.5 text-sm text-gray-900 font-bold">
      <CalendarIcon />
      <span>{description}</span>
    </div>
  );
}
