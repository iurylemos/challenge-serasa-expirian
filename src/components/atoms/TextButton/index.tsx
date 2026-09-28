import type { HTMLProps, JSX, MouseEvent } from "react";
import ChevronRightIcon from "@/src/components/atoms/ChevronRightIcon";

type TextButtonProps = {
  label: string;
  chevronEnabled: boolean;
  className: HTMLProps<HTMLElement>["className"];
  onClick: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) => void;
};

export default function TextButton({
  label,
  chevronEnabled,
  className,
  onClick,
}: Readonly<TextButtonProps>): JSX.Element {
  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1 text-sm font-semibold hover:underline ${className}`}
      onClick={onClick}
    >
      {label}
      {chevronEnabled && <ChevronRightIcon />}
    </button>
  );
}
