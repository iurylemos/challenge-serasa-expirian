import type { ButtonHTMLAttributes, JSX } from "react";
import ChevronRightIcon from "@/src/components/atoms/ChevronRightIcon";

interface ChevronButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function ChevronButton({
  label,
  ...buttonProps
}: Readonly<ChevronButtonProps>): JSX.Element {
  return (
    <button
      type="button"
      className="flex cursor-pointer w-full items-center justify-center gap-1 rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300"
      {...buttonProps}
    >
      {label}
      <ChevronRightIcon />
    </button>
  );
}
