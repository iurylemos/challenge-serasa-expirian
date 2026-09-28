import type { JSX } from "react";
import type { PaymentMethod } from "@/src/interfaces/paymentMethod.enum";
import { PaymentMethodListConstants } from "@/src/components/organisms/PaymentMethodList/PaymentMethodList.constants";
import PaymentMethodCard from "@/src/components/molecules/PaymentMethodCard";

type PaymentMethodListProps = {
  paymentMethods: PaymentMethod[];
  isPending: boolean;
  isError: boolean;
  selectedPaymentMethodId: string | null;
  onSelectPaymentMethod: (paymentMethodId: string) => void;
};

export default function PaymentMethodList({
  paymentMethods,
  isPending,
  isError,
  selectedPaymentMethodId,
  onSelectPaymentMethod,
}: Readonly<PaymentMethodListProps>): JSX.Element {
  if (isPending) {
    return <p role="status">{PaymentMethodListConstants.PENDING_MESSAGE}</p>;
  }

  if (isError) {
    return <p role="alert">{PaymentMethodListConstants.ERROR_MESSAGE}</p>;
  }

  if (!paymentMethods.length) {
    return <p role="status">{PaymentMethodListConstants.NOT_FOUND_MESSAGE}</p>;
  }

  return (
    <fieldset className="min-w-0 space-y-3">
      <legend className="sr-only">{PaymentMethodListConstants.LABEL}</legend>

      {paymentMethods.map((paymentMethod) => (
        <PaymentMethodCard
          key={paymentMethod.id}
          {...paymentMethod}
          groupName={PaymentMethodListConstants.GROUP_NAME}
          isSelected={paymentMethod.id === selectedPaymentMethodId}
          onSelect={() => onSelectPaymentMethod(paymentMethod.id)}
        />
      ))}
    </fieldset>
  );
}
