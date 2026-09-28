import type { JSX } from "react";
import { MagicNumber } from "@/src/interfaces/magicNumber.enum";

export default function CheckIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={MagicNumber.ONE_FIVE}
      stroke="currentColor"
      className="size-4 text-green-500"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 12.75 6 6 9-13.5"
      />
    </svg>
  );
}
