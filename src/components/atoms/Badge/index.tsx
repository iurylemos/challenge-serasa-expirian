import type { HTMLProps, JSX } from "react";
import TrophyIcon from "@/src/components/atoms/TrophyIcon";

type BadgeProps = {
  description: string;
  className: HTMLProps<HTMLElement>["className"];
  iconEnabled: boolean;
};

export default function Badge({
  description,
  className,
  iconEnabled,
}: Readonly<BadgeProps>): JSX.Element {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded px-2 py-1 text-sm ${className}`}
    >
      {iconEnabled ? <TrophyIcon /> : <></>}

      {description}
    </span>
  );
}
