import type { JSX } from "react";
import { VariantCurrency } from "@/src/interfaces/variant.enum";

type CurrencyTextProps = {
  value: number;
  variant: VariantCurrency;
};

export default function CurrencyText({
  value,
  variant,
}: Readonly<CurrencyTextProps>): JSX.Element {
  const formatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  if (variant === VariantCurrency.OLD) {
    return (
      <span className="text-sm text-gray-400 line-through">De {formatted}</span>
    );
  }

  return (
    <span className="text-lg font-bold text-gray-900">Por {formatted}</span>
  );
}
