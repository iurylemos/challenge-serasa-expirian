import {
  PaymentMethod,
  PaymentMethodDetailIcon,
  PaymentMethodType,
} from "@/src/interfaces/paymentMethod.enum";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PaymentMethodCard from ".";

const pix: PaymentMethod = {
  id: "pix",
  type: PaymentMethodType.PIX,
  title: "Pix",
  description: "Pagamento na hora, sem sair de casa",
  badge: "Mais rápido",
};

const boleto: PaymentMethod = {
  id: "boleto",
  type: PaymentMethodType.BILLET,
  title: "Boleto",
  description: "Pague no app do banco ou em lotéricas",
  details: [
    {
      id: "due-date",
      icon: PaymentMethodDetailIcon.CALENDAR,
      text: "Vencimento em 30/09/2026 (3 dias úteis).",
    },
    {
      id: "compensation",
      icon: PaymentMethodDetailIcon.CLOCK,
      text: "A compensação leva até 3 dias úteis após o pagamento.",
    },
  ],
};

function renderCard(paymentMethod: PaymentMethod, isSelected = false) {
  const onSelect = vi.fn();

  render(
    <PaymentMethodCard
      {...paymentMethod}
      groupName="payment-method"
      isSelected={isSelected}
      onSelect={onSelect}
    />,
  );

  return onSelect;
}

describe("PaymentMethodCard", () => {
  it("should expose the method as a radio named after its title", () => {
    renderCard(pix);

    const radio = screen.getByRole("radio", { name: "Pix" });

    expect(radio).toHaveAttribute("name", "payment-method");
    expect(radio).toHaveAccessibleDescription(pix.description);
  });

  it.each([
    [true, "checked"],
    [false, "unchecked"],
  ])("should reflect isSelected=%s as %s", (isSelected) => {
    renderCard(pix, isSelected);

    const radio = screen.getByRole("radio", { name: "Pix" });

    if (isSelected) {
      expect(radio).toBeChecked();
    } else {
      expect(radio).not.toBeChecked();
    }
  });

  it("should display the badge only when provided", () => {
    const { unmount } = render(
      <PaymentMethodCard
        {...pix}
        groupName="payment-method"
        isSelected={false}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText("Mais rápido")).toBeInTheDocument();

    unmount();
    renderCard(boleto);

    expect(screen.queryByText("Mais rápido")).not.toBeInTheDocument();
  });

  it("should call onSelect when the radio is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = renderCard(pix);

    await user.click(screen.getByRole("radio", { name: "Pix" }));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("should call onSelect when the title is clicked", async () => {
    const user = userEvent.setup();
    const onSelect = renderCard(pix);

    await user.click(screen.getByText("Pix"));

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("should be selectable with the keyboard", async () => {
    const user = userEvent.setup();
    const onSelect = renderCard(pix);

    await user.tab();

    expect(screen.getByRole("radio", { name: "Pix" })).toHaveFocus();

    await user.keyboard(" ");

    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("should hide the details while the method is not selected", () => {
    renderCard(boleto, false);

    expect(screen.queryByText(/Vencimento/)).not.toBeInTheDocument();
    expect(screen.queryByText(/compensação/)).not.toBeInTheDocument();
  });

  it("should display the details and describe the radio with them when selected", () => {
    renderCard(boleto, true);

    expect(screen.getByText(/Vencimento/)).toBeInTheDocument();
    expect(screen.getByText(/compensação/)).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: "Boleto" }),
    ).toHaveAccessibleDescription(/Vencimento/);
  });

  it("should not render a details list when the selected method has no details", () => {
    renderCard(pix, true);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
