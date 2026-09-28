import { useId, type JSX } from "react";
import { MagicNumber } from "@/src/interfaces/magicNumber.enum";
import {
  type PaymentMethod,
  type PaymentMethodDetail,
  PaymentMethodDetailIcon,
  PaymentMethodType,
} from "@/src/interfaces/paymentMethod.enum";
import Badge from "@/src/components/atoms/Badge";
import QrCodeIcon from "@/src/components/atoms/QrCodeIcon";
import BilletIcon from "@/src/components/atoms/BilletIcon";
import CalendarIcon from "@/src/components/atoms/CalendarIcon";
import ClockIcon from "@/src/components/atoms/ClockIcon";

type PaymentMethodCardProps = PaymentMethod & {
  groupName: string;
  isSelected: boolean;
  onSelect: () => void;
};

export default function PaymentMethodCard({
  id,
  type,
  title,
  description,
  badge,
  details = [],
  groupName,
  isSelected,
  onSelect,
}: Readonly<PaymentMethodCardProps>): JSX.Element {
  const inputId = useId();
  const descriptionId = useId();
  const detailsId = useId();

  const hasDetails = isSelected && details.length > MagicNumber.ZERO;

  const describedBy = hasDetails
    ? `${descriptionId} ${detailsId}`
    : descriptionId;

  return (
    <div
      className={`relative rounded-xl border bg-white p-4 shadow-sm transition-colors has-focus-visible:ring-2 has-focus-visible:ring-blue-500 ${
        isSelected ? "border-blue-600" : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <input
          id={inputId}
          type="radio"
          name={groupName}
          value={id}
          checked={isSelected}
          onChange={onSelect}
          aria-describedby={describedBy}
          className="sr-only"
        />

        <span
          aria-hidden="true"
          className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${
            isSelected ? "border-blue-600" : "border-gray-300"
          }`}
        >
          {isSelected && <span className="size-2.5 rounded-full bg-blue-600" />}
        </span>

        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-700"
        >
          {type === PaymentMethodType.PIX ? <QrCodeIcon /> : <BilletIcon />}
        </span>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor={inputId}
              className="cursor-pointer font-semibold text-gray-900 after:absolute after:inset-0"
            >
              {title}
            </label>
            {badge && (
              <Badge
                iconEnabled={false}
                description={badge}
                className="bg-green-100 font-medium text-gray-700"
              />
            )}
          </div>
          <p id={descriptionId} className="text-sm text-gray-500">
            {description}
          </p>
        </div>
      </div>

      {hasDetails && (
        <ul
          id={detailsId}
          className="mt-3 space-y-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600"
        >
          {details.map((detail: PaymentMethodDetail) => {
            return (
              <li key={detail.id} className="flex items-center gap-2">
                {detail.icon === PaymentMethodDetailIcon.CALENDAR ? (
                  <CalendarIcon />
                ) : detail.icon === PaymentMethodDetailIcon.QR_CODE ? (
                  <QrCodeIcon />
                ) : (
                  <ClockIcon />
                )}
                <span>{detail.text}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
