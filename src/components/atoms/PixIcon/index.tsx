import type { JSX } from "react";

export default function PixIcon(): JSX.Element {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Pix"
    >
      <path
        d="M7.5 7.5L10.5 4.5C11.33 3.67 12.67 3.67 13.5 4.5L16.5 7.5L19.5 10.5C20.33 11.33 20.33 12.67 19.5 13.5L16.5 16.5L13.5 19.5C12.67 20.33 11.33 20.33 10.5 19.5L7.5 16.5L4.5 13.5C3.67 12.67 3.67 11.33 4.5 10.5L7.5 7.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M8 8L10.5 10.5C11.33 11.33 12.67 11.33 13.5 10.5L16 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M8 16L10.5 13.5C11.33 12.67 12.67 12.67 13.5 13.5L16 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
