import type { HTMLProps, JSX } from "react";

type AvatarProps = {
  initials: string;
  className: HTMLProps<HTMLElement>["className"];
};

export default function Avatar({
  initials,
  className,
}: Readonly<AvatarProps>): JSX.Element {
  return (
    <span
      role="img"
      aria-label={`Avatar de ${initials}`}
      className={`flex items-center justify-center rounded-full font-medium ${className}`}
    >
      {initials}
    </span>
  );
}
