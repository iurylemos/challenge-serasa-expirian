import { useMemo, type JSX } from "react";
import { CheckoutStep } from "@/src/interfaces/checkout.interface";
import CheckIcon from "@/src/components/atoms/CheckIcon";

type StepTabsProps = {
  currentStep: CheckoutStep;
};

type StepLabel = { key: CheckoutStep; label: string };

const STEP_ORDER: CheckoutStep[] = [
  CheckoutStep.OFFERS,
  CheckoutStep.PAYMENT,
  CheckoutStep.REVIEW,
];

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

  const currentIndex = STEP_ORDER.indexOf(currentStep);

  return (
    <nav aria-label="Etapas do checkout">
      <ol className="flex gap-2">
        {memoSteps.map((step: StepLabel) => {
          const stepIndex = STEP_ORDER.indexOf(step.key);
          const isActive = step.key === currentStep;
          const isCompleted = stepIndex < currentIndex;

          return (
            <li key={step.key} className="flex-1">
              <span
                aria-current={isActive ? "step" : undefined}
                className={`inline-flex w-full items-center gap-1.5 border-t-3 pt-3 text-sm ${
                  isActive || isCompleted
                    ? "border-blue-500 text-black font-bold"
                    : "border-gray-200 text-gray-400 font-normal"
                }`}
              >
                {isCompleted && <CheckIcon />}
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
