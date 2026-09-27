import type { JSX } from "react";
import { VariantSize } from "@/src/interfaces/variant.enum";

type AvatarProps = {
  initials: string;
  size: VariantSize;
};

export default function Avatar({
  initials,
  size,
}: Readonly<AvatarProps>): JSX.Element {
  const sizeClasses =
    size === VariantSize.SM ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  return (
    <span
      role="img"
      aria-label={`Avatar de ${initials}`}
      className={`flex items-center justify-center rounded-full bg-gray-100 font-medium text-blue-600 ${sizeClasses}`}
    >
      {initials}
    </span>
  );
}
