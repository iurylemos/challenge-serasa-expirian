// src/components/molecules/StepTabs.test.tsx

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CheckoutStep } from "@/src/interfaces/checkout.interface";
import StepTabs from ".";

const LABELS = ["Ofertas", "Pagamento", "Revisão"];

describe("StepTabs", () => {
  it("should display the three checkout steps in order", () => {
    render(<StepTabs currentStep={CheckoutStep.OFFERS} />);

    const navigation = screen.getByRole("navigation", {
      name: "Etapas do checkout",
    });

    expect(navigation).toBeInTheDocument();
    expect(
      screen.getAllByRole("listitem").map((item) => item.textContent),
    ).toEqual(LABELS);
  });

  it.each([
    [CheckoutStep.OFFERS, "Ofertas"],
    [CheckoutStep.PAYMENT, "Pagamento"],
    [CheckoutStep.REVIEW, "Revisão"],
  ])(
    "should mark only the current step as active when on %s",
    (currentStep, activeLabel) => {
      render(<StepTabs currentStep={currentStep} />);

      LABELS.forEach((label) => {
        const step = screen.getByText(label);

        if (label === activeLabel) {
          expect(step).toHaveAttribute("aria-current", "step");
        } else {
          expect(step).not.toHaveAttribute("aria-current");
        }
      });
    },
  );

  it.each([
    [CheckoutStep.OFFERS, []],
    [CheckoutStep.PAYMENT, ["Ofertas"]],
    [CheckoutStep.REVIEW, ["Ofertas", "Pagamento"]],
  ])(
    "should show the check icon only on completed steps when on %s",
    (currentStep, completedLabels) => {
      render(<StepTabs currentStep={currentStep} />);

      LABELS.forEach((label) => {
        const icon = screen.getByText(label).querySelector("svg");

        if (completedLabels.includes(label)) {
          expect(icon).toBeInTheDocument();
        } else {
          expect(icon).not.toBeInTheDocument();
        }
      });
    },
  );
});
