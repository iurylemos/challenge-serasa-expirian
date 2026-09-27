import { useMemo, type JSX } from "react";
import { CheckoutStep } from "@/src/interfaces/checkout.interface";

type StepTabsProps = {
  currentStep: CheckoutStep;
};

type StepLabel = { key: CheckoutStep; label: string };

export default function StepTabs({
  currentStep,
}: Readonly<StepTabsProps>): JSX.Element {
  const memoSteps = useMemo<StepLabel[]>(
    () => [
      { key: CheckoutStep.OFFERS, label: "Ofertas" },
      { key: CheckoutStep.PAYMENT, label: "Pagamento" },
      { key: CheckoutStep.REVIEW, label: "Revisão" },
    ],
    [],
  );

  return (
    <nav aria-label="Etapas do checkout">
      <ol className="flex">
        {memoSteps.map((step: StepLabel) => {
          const isActive = step.key === currentStep;

          return (
            <li key={step.key} className="flex-1">
              <span
                aria-current={isActive ? "step" : undefined}
                className={`inline-block w-full border-t-3 pt-2 text-sm ${
                  isActive
                    ? "border-blue-500 text-black font-bold"
                    : "border-gray-200 text-gray-400 font-normal"
                }`}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
